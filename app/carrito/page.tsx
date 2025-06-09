"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItems } from "@/components/cart-items";
import { CartSummary } from "@/components/cart-summary";

export default function CarritoPage() {
  const { getItemCount } = useCart();
  const itemCount: number = getItemCount();

  if (itemCount === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8 dark:text-gray-400">
            No tienes reservas en tu carrito. ¡Explora nuestras canchas y encuentra la perfecta para ti!
          </p>
          <Link href="/canchas">
            <Button size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Buscar Canchas
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/canchas"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Seguir buscando
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">Carrito de Reservas</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartItems />
        </div>
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
