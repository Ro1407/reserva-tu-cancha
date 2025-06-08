import Link from "next/link"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

export function LoginForm() {
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
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="tu@email.com" className="w-full"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" placeholder="••••••••" className="w-full"/>
          </div>
        </div>
        <div className="space-y-4">
          <Button className="w-full" size="lg">
            Entrar
          </Button>
          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:text-gray-100"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>
        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-green-600 hover:underline font-medium">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
