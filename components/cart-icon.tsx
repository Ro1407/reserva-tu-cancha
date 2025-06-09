"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";

export function CartIcon() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <Link href="/carrito">
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Button>
    </Link>
  );
}
