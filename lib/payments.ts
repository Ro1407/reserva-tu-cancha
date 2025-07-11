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
import { convertTimeToTHHMM } from "@/lib/utils";
import { isItemAvailable } from "@/lib/actions";

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "" });
const preference = new Preference(client);

interface PreferenceItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
}

export const processPreference: (cart: CartState) => Promise<string> = async (cart: CartState): Promise<string> => {
  return new Promise<string>((resolve: (value: string) => void, reject: (error: Error) => void): void => {
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
          metadata: { cart },
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
  console.log(cart);


  if(payment.status === "approved"){

    await sendNotification("Tu pago fue procesado!", "Gracias por tu compra. Tu reserva está siendo procesada.");

    if(cart) {
      for (const item of cart.items) {
        try {

          const formattedTime: string = convertTimeToTHHMM(item.time.time);   //HH:MM a THHMM
          const reserva: ReservationData = {
            date: item.date,
            timeSlot: formattedTime as TimeSlotKey,
            price: item.price * 100,
            state: ReservationState.Confirmada,
            courtId: item.courtId,
            userId: "ff62bb55-4d73-4bbb-9d8c-d4dae9680e30"
          };

          await createReservation(reserva).then((): void => {
            sendNotification("Tu reserva está lista!", "Solo debes presentarte en el club el día y horario acordado para disfrutar de tu reserva.");
          })

        } catch (error) {
          console.error(`Error al crear la reserva para el item ${item.id}:`, error);
        }
      }
    }

  }
};
