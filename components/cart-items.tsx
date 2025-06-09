"use client";

import { Calendar, Clock, Trash2 } from "lucide-react";
import { CartItem } from "@/lib/definitions";
import { formatDate } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CartItems() {
  const { state, removeFromCart } = useCart();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservas ({state.items.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {state.items.map((item: CartItem) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4 dark:border-gray-800">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 dark:bg-gray-800">
                <img
                  src={item.image || "/placeholder.svg?height=80&width=80"}
                  alt={item.courtName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg leading-tight">{item.courtName}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.clubName}</p>
                  </div>
                  <Badge>{item.sport}</Badge>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(item.date)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    {item.time}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-right">
                      <div className="text-lg font-bold">${item.price.toLocaleString()}</div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(): void => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
