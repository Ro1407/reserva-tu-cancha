"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Tag } from "lucide-react";
import { processPreference } from "@/lib/payments";
import { Coupon, coupons } from "@/lib/definitions";
import { useSession } from "next-auth/react";
import { logout } from "@/lib/auth";
import { DEFAULT_USER } from "@/lib/utils";


export function CartSummary() {
  const { status, data } = useSession();
  const { replace } = useRouter();
  const { state } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const email: string = data?.user?.email || DEFAULT_USER;

  const subtotal: number = state.total;
  const discountAmount: number = (subtotal * discount) / 100;
  const total: number = subtotal - discountAmount;

  const handleLogout: () => Promise<void> = async (): Promise<void> => {
    logout().then(async (): Promise<void> => {
      window.location.reload();
    });
  };

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
    processPreference(state, email)
      .then((initPoint: string): void => {
        replace(initPoint);
      })
      .catch((_: Error): void => {
        toast.error("Ocurrió un error al procesar el pago. Intente nuevamente.");
      })
      .finally((): void => setIsProcessing(false));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4">
          {status === "authenticated" ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-700 font-medium text-sm">{data?.user?.email?.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-medium">¡Hola {data?.user?.email?.split("@")[0]}!</p>
                  <p className="text-xs text-muted-foreground">Tu compra se vinculará a tu cuenta</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Salir
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm">Inicia sesión para vincular tu compra y acceder al historial de tus pedidos.</p>
              <div className="flex gap-2">
                <Button>
                  <Link href="/login?callbackUrl=/carrito">Iniciar Sesión</Link>
                </Button>
                <Button variant="outline">
                  <Link href="/register?callbackUrl=/carrito">Crear Cuenta</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
