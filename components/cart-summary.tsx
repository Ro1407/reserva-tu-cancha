"use client";

import { useState } from "react";
import { CreditCard, Tag } from "lucide-react";
import { toast } from "react-hot-toast";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coupon, coupons } from "@/lib/definitions";

export function CartSummary() {
  const { state } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal: number = state.total;
  const discountAmount: number = (subtotal * discount) / 100;
  const total: number = subtotal - discountAmount;

  const applyCoupon: () => void = (): void => {
    const coupon: Coupon | undefined = coupons.find(
      (coupon: Coupon): boolean => coupon.code.toUpperCase() === couponCode.toUpperCase(),
    );
    if (coupon) {
      setDiscount(coupon.discount);
      toast.success(`Cupón aplicado: ${coupon.discount}% de descuento`);
    } else {
      setDiscount(0);
      toast.error("El cupón ingresado no es válido");
    }
  };

  const handleCheckout: () => Promise<void> = async (): Promise<void> => {
    setIsProcessing(true);
    setTimeout((): void => {
      toast.error("TODO: Implementar integración con MercadoPago");
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Cupón de descuento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Tag className="w-5 h-5 mr-2" />
            Cupón de descuento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Código de cupón"
              value={couponCode}
              onChange={(e): void => setCouponCode(e.target.value)}
            />
            <Button variant="outline" onClick={applyCoupon}>
              Aplicar
            </Button>
          </div>
          {discount > 0 && <div className="text-sm text-green-600">¡Cupón aplicado! {discount}% de descuento</div>}
        </CardContent>
      </Card>

      {/* Resumen del pedido */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen del pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>
                Subtotal ({state.items.length} reserva{state.items.length > 1 ? "s" : ""})
              </span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Descuento ({discount}%)</span>
                <span>-${discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 dark:border-gray-800">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <Button
            className="w-full"
            size="lg"
            onClick={handleCheckout}
            disabled={isProcessing || state.items.length === 0}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {isProcessing ? "Procesando..." : "Proceder al Pago"}
          </Button>
          <div className="text-xs text-gray-600 text-center dark:text-gray-400">Pago seguro con MercadoPago</div>
        </CardContent>
      </Card>

      {/* Información adicional */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Confirmación inmediata por email</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Cancelación gratuita hasta 2 horas antes</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Soporte 24/7 para cualquier consulta</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
