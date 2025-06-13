"use client";

import { useEffect } from "react";
import { useCart } from "@/context/cart-context";

export default function Success() {
  const { clearCart } = useCart();

  useEffect((): void => {
    clearCart();
  }, []);

  return (
    <div className="mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">¡Pago Exitoso!</h1>
      <p className="text-gray-600 mb-8 dark:text-gray-400">
        Tu pago ha sido procesado con éxito. Gracias por tu reserva.
      </p>
    </div>
  );
}
