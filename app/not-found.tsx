"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold">Página no encontrada</h2>
            <p className="text-muted-foreground">Lo sentimos, la página que buscas no existe o ha sido movida.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button onClick={(): void => window.location.replace("/")} className="flex-1">
              <Home className="mr-2 h-4 w-4" />
              Ir al Inicio
            </Button>
            <Button variant="outline" onClick={(): void => window.history.back()} className="flex-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver atrás
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
