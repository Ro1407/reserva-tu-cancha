"use server";
import { CartState, CartItem } from "@/types/cart";

const createReservation: (item: CartItem) => Promise<void> = async (_: CartItem): Promise<void> => {
  /**
   * TODO:
   * Crear en la base de datos una reserva para el item del carrito,
   * y modificar la función para devolver Promise<Reservation>,
   * en lugar de Promise<void>.
   */
  return new Promise<void>((resolve: (value: void) => void): void => {
    setTimeout((): void => {
      resolve();
    }, 500);
  });
};

export const createNewOrder: (cart: CartState) => Promise<void> = async (_: CartState): Promise<void> => {
  /**
   * IMPORTANTE:
   * el id de la orden debe coincidir con el id del carrito,
   * de esta forma se puede relacionar la orden con el carrito
   * al recibir la notificación de mercado pago en el webhook.
   *
   * TODO:
   * 1. chequear que no exista una orden con el mismo id
   * 2. por cada item del carrito, crear una reserva (ver ejemplo abajo)
   * 3. crear una orden con las reservas creadas y estado "Pendiente"
   * 5. guardar la orden en la base de datos
   *
   * ej. para el punto 2
   * const reservas = await Promise.all(cart.items.map(createReservation));
   */
  return new Promise<void>((resolve: (value: void) => void): void => {
    setTimeout((): void => {
      resolve();
    }, 500);
  });
};
