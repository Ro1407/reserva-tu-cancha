"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { authenticate } from "@/lib/auth";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircle } from "lucide-react";
import { useSession } from "next-auth/react";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl: string = searchParams.get("callbackUrl") || "/";
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">¡Ya estás logeado!</h2>
            <p className="text-muted-foreground">
              Tu sesión está activa y puedes continuar navegando. Prueba refrescando la página si algo .
            </p>
          </div>
        </div>
        <Link href={callbackUrl}>
          <Button size="lg" className="min-w-[200px]">
            Volver atrás
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-lg bg-green-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">RC</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Ingresa a tu cuenta para continuar</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form action={formAction}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                required
                id="email"
                name="email"
                type="email"
                placeholder="usuario@dominio.com"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                required
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full"
                minLength={6}
              />
            </div>
          </div>
          <div className="space-y-4 mt-4 mb-2">
            <input type="hidden" name="redirectTo" value={callbackUrl} />
            <Button className="w-full" size="lg" aria-disabled={isPending}>
              <input type="submit" value="Entrar" />
            </Button>
            <div className="text-center">
              <span className="text-sm text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:text-gray-100">
                ¿Olvidaste tu contraseña?
              </span>
            </div>
            {errorMessage && (
              <div className="flex gap-1">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </div>
            )}
          </div>
          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿No tienes cuenta?{" "}
              <Link href="/register" className="text-green-600 hover:underline font-medium">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
