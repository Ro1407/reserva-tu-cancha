import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Clock, ShoppingCart } from "lucide-react";
import { Court } from "@/lib/definitions";

const timeSlots = [
  { time: "08:00", available: true },
  { time: "09:00", available: true },
  { time: "10:00", available: false },
  { time: "11:00", available: true },
  { time: "12:00", available: true },
  { time: "13:00", available: false },
  { time: "14:00", available: true },
  { time: "15:00", available: true },
  { time: "16:00", available: true },
  { time: "17:00", available: false },
  { time: "18:00", available: true },
  { time: "19:00", available: true },
  { time: "20:00", available: true },
  { time: "21:00", available: true },
];

interface BookingFormProps {
  court: Court;
}

export function BookingForm({ court }: BookingFormProps) {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Reservar Cancha
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Selection */}
        <div>
          <Label className="text-base font-medium mb-3 block">Seleccionar Fecha</Label>
          <Calendar mode="single" className="rounded-md border border-gray-200 dark:border-gray-800" />
        </div>
        {/* Time Selection */}
        <div>
          <Label className="text-base font-medium mb-3 block">Horarios Disponibles</Label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot.time}
                variant={slot.available ? "outline" : "secondary"}
                size="sm"
                disabled={!slot.available}
                className="text-xs"
              >
                {slot.time}
              </Button>
            ))}
          </div>
        </div>
        {/* Booking Summary */}
        <div className="border-t border-gray-200 pt-4 dark:border-gray-800">
          <h4 className="font-medium mb-3">Resumen de Reserva</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Cancha:</span>
              <span className="font-medium">{court.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Fecha:</span>
              <span>Seleccionar fecha</span>
            </div>
            <div className="flex justify-between">
              <span>Horario:</span>
              <span>Seleccionar horario</span>
            </div>
            <div className="flex justify-between">
              <span>Duración:</span>
              <span>1 hora</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-medium dark:border-gray-800">
              <span>Total:</span>
              <span>${court.price.toLocaleString()}</span>
            </div>
          </div>
        </div>
        {/* Payment Button */}
        <Button className="w-full" size="lg">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Agregar al Carrito
        </Button>
        <p className="text-xs text-gray-600 text-center dark:text-gray-400">
          Al confirmar la reserva aceptas nuestros términos y condiciones
        </p>
      </CardContent>
    </Card>
  );
}
