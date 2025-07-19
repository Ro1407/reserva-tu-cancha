"use server";

import { Preference, Payment, MercadoPagoConfig } from "mercadopago";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { CartState, CartItem } from "@/types/cart";
import { sendNotification } from "@/lib/notifications";
import { createReservation } from "@/lib/actions-CRUD";
import { ReservationData } from "@/types/reservation";
import { TimeSlotKey } from "@/types/enumerates";
import { ReservationState } from "@prisma/client";
import {getUserByEmail, isItemAvailable} from "@/lib/actions";
import { User } from "@prisma/client";

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "" });
const preference = new Preference(client);

interface PreferenceItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
}

export const processPreference: (cart: CartState, email: string) => Promise<string> = async (
  cart: CartState, email: string
): Promise<string> => {
  return new Promise<string>((resolve: (value: string) => void, reject: (error: Error) => void): void => {
    if (cart.items.some(async (item: CartItem): Promise<boolean> => !await isItemAvailable(item))) {
      reject(new Error("Algunos de los items ya no están disponibles"));
    }
    preference
      .create({
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
      .then((response: PreferenceResponse): void => {
        if (response.init_point) resolve(response.init_point);
        else reject(new Error("Failed to create Mercado Pago preference: init_point is undefined"));
      })
      .catch((error: Error): void => {
        reject(error);
      });
  });
};

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
            price: item.price * 100,
            state: ReservationState.Confirmada,
            courtId: item.courtId,
            userId: user?.id ?? "78c9b746-c08f-4995-9d73-9cf1b92e8aff",
          };
          await createReservation(reserva).then(async (): Promise<void> => {
            await sendNotification(
              "Se concretó tu reserva!",
              "Solo debes presentarte en el club el día y horario acordado para disfrutar de tu reserva.",
            );
          });
        } catch (error) {
          console.error(`Error al crear la reserva para el item ${item.id}:`, error);
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
