"use client";

import { useEffect } from "react";
import { useCart } from "@/context/cart-context";

export default function Pending() {
  const { clearCart } = useCart();

  useEffect((): void => {
    clearCart();
  }, []);

  return (
    <div className="mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Pago Pendiente</h1>
      <p className="text-gray-600 mb-8 dark:text-gray-400">
        Tu pago está siendo procesado. Por favor, espera a que se complete. Si tienes alguna pregunta, contacta al
        soporte.
      </p>
    </div>
  );
}
