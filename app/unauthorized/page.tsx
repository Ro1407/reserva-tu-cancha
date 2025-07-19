import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Home } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 dark:bg-gray-900/50">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center dark:bg-red-900/20">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-red-600">Acceso No Autorizado</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              No tienes permisos para acceder a esta página. Solo los administradores pueden ver el panel de control.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 dark:bg-red-950/20 dark:border-red-800">
              <p className="text-sm text-red-700 dark:text-red-300">
                <strong>Error 403:</strong> Acceso denegado. Necesitas privilegios de administrador para continuar.
              </p>
            </div>
            <div className="space-y-3">
              <Link href="/" className="block">
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <Home className="w-4 h-4 mr-2" />
                  Volver al Inicio
                </Button>
              </Link>
            </div>
            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ¿Necesitas ayuda?{" "}
                <Link href="/contacto" className="text-green-600 hover:underline font-medium">
                  Contacta con soporte
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
