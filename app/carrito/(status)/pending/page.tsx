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
        Su pago está siendo procesado. Por favor, espere a que se complete. Si tiene alguna pregunta, contacte al
        soporte.
      </p>
    </div>
  );
}
