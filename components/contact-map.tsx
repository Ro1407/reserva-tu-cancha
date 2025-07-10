import Link from "next/link";
import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Nuestra ubicación
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* map placeholder */}
          <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Av. Corrientes 1234</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Buenos Aires, Argentina</p>
              </div>
            </div>
          </div>
          {/* info */}
          <div className="space-y-2 pb-4">
            <h4 className="font-semibold">Cómo llegar</h4>
            <div className="text-sm text-gray-600 space-y-1 dark:text-gray-400">
              <p>🚇 Subte: Línea B - Estación Callao (2 cuadras)</p>
              <p>🚌 Colectivos: 5, 7, 23, 60, 99, 124, 152</p>
              <p>🚗 Estacionamiento disponible en la zona</p>
            </div>
          </div>
          {/* link to google maps */}
          <Link href="https://maps.google.com/?q=Av.+Corrientes+1234,+CABA" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              <p>Abrir en Google Maps</p>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
