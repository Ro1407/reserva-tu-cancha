"use server";

import { Payment, Preference, MercadoPagoConfig } from "mercadopago";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { CartState, CartItem } from "@/types/cart";

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "" });
const preference = new Preference(client);

interface PreferenceItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
}

export const processPreference: (cart: CartState) => Promise<string> = async (cart: CartState): Promise<string> => {
  /* TODO: chequear que los items del carrito estén disponibles antes de hacer la compra */
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
  /**
   * TODO:
   * si el pago fue exitoso (payment.status === "approved")
   * crear una reserva por cada item del carrito.
   *
   * pd: chequear que cart no sea undefined
   */
};
