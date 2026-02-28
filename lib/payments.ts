"use server";

import { Preference, Payment, MercadoPagoConfig } from "mercadopago";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { CartState, CartItem } from "@/types/cart";
import { sendUnicastNotification } from "@/lib/notifications";
import { createReservation } from "@/lib/actions-CRUD";
import { ReservationData } from "@/types/reservation";
import { TimeSlotKey } from "@/types/enumerates";
import { ReservationState, User } from "@/prisma/generated/client";
import { getUserByEmail, isItemAvailable } from "@/lib/actions";
import { DEFAULT_USER_ID, formatDate } from "@/lib/utils";

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "" });
const preference = new Preference(client);

interface PreferenceItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
}

export const processPreference = async (cart: CartState, email: string): Promise<string> => {

  // Verify if cart items are already reserved by someone else
  for (const item of cart.items) {
    const available = await isItemAvailable(item);

    if (!available) {
      throw new Error(
        `Lo sentimos, la cancha "${item.courtName}" para la fecha "${formatDate(item.date)}" a las ${item.time.time} ya fue reservada por otro usuario. Por favor, elimínala del carrito.`
      );
    }
  }

  let response: PreferenceResponse

  // Create the preference
  try{
    response = await preference.create({
        body: {
          auto_return: "all",
          back_urls: {
            success: `${process.env.NEXT_PUBLIC_APP_URL}/carrito/success`,
            failure: `${process.env.NEXT_PUBLIC_APP_URL}/carrito/failure`,
            pending: `${process.env.NEXT_PUBLIC_APP_URL}/carrito/pending`,
          },
          notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/mercadopago/webhook`,
          external_reference: cart.id,
          metadata: { cart, email },
          items: [
            ...cart.items.map(
              (item: CartItem): PreferenceItem => ({
                id: item.id,
                title: item.courtName,
                quantity: 1,
                unit_price: item.price,
              }),
            ),
          ],
        },
      })
    } catch (error)  {
      throw new Error("Error al conectar con Mercado Pago");
    }

    if (!response.init_point) throw new Error("Failed to create Mercado Pago preference: init_point is undefined");

    return response.init_point;
}


export const processPayment: (id: string) => Promise<void> = async (id: string): Promise<void> => {
  const payment: PaymentResponse = await new Payment(client).get({ id });
  const cart: CartState = payment.metadata?.cart as CartState;
  const email: string = payment.metadata?.email as string;

  if (payment.status === "approved") {
    if (cart) {
      for (const rawItem of cart.items) {
        const item: CartItem = normalizeItem(rawItem);
        const user: User | null = await getUserByEmail(email);
        try {
          const reserva: ReservationData = {
            date: item.date,
            timeSlot: item.time.time as TimeSlotKey,
            price: item.price,
            state: ReservationState.Confirmada,
            courtId: item.courtId,
            userId: user?.id ?? DEFAULT_USER_ID,
          };
          await createReservation(reserva).then(async (): Promise<void> => {
            await sendUnicastNotification(
               "Se concretó tu reserva!",
              "Solo debes presentarte en el club el día y horario acordado para disfrutar de tu reserva.",
              email
            );
          });
        } catch (error) {
          console.error(`Error al crear la reserva para el item ${item.id}:`, error);
          throw new Error("Ocurrió un error al procesar el pago. Intente nuevamente.")
        }
      }
    }
  }
};

function normalizeItem(item: any): CartItem {
  return {
    id: item.id,
    courtId: item.court_id,
    courtName: item.court_name,
    clubName: item.club_name,
    date: item.date,
    time: item.time,
    price: item.price,
    sport: item.sport,
    image: item.image,
  };
}
