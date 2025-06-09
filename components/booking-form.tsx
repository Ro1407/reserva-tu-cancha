"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Clock, ShoppingCart } from "lucide-react";
import { Court } from "@/types/court";
import { CartItem } from "@/types/cart";
import { TimeSlot } from "@/types/time-slot";
import { getTimeSlots } from "@/lib/actions";

interface BookingFormProps {
  court: Court;
}

export function BookingForm({ court }: BookingFormProps) {
  const { replace } = useRouter();
  const { addToCart } = useCart();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  useEffect((): void => {
    getTimeSlots(selectedDate).then((slots: TimeSlot[]): void => {
      setTimeSlots(slots);
      setSelectedSlot(slots.find((slot: TimeSlot): boolean => slot.available) || null);
    });
  }, [selectedDate]);

  const handleAddToCart: () => void = (): void => {
    if (!selectedDate || !selectedSlot) {
      toast.error("Por favor, selecciona una fecha y un horario antes de agregar al carrito.");
      return;
    }

    setIsAdding(true);
    try {
      const cartItem: Omit<CartItem, "id"> = {
        courtId: court.id,
        courtName: court.name,
        clubName: court.name /* TODO: cambiar esto al nombre del club */,
        date: selectedDate.toISOString().split("T")[0],
        time: selectedSlot.time,
        price: court.price,
        sport: court.sport,
        image: court.image || "/placeholder.svg?height=200&width=300",
      };
      addToCart(cartItem);
      toast.success("¡Reserva agregada al carrito!");
      replace("/");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error al agregar al carrito");
    } finally {
      setIsAdding(false);
    }
  };

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
          <Calendar onSelect={setSelectedDate} className="rounded-md border border-gray-200 dark:border-gray-800" />
        </div>
        {/* Time Selection */}
        <div>
          <Label className="text-base font-medium mb-3 block">Horarios Disponibles</Label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot: TimeSlot) => (
              <Button
                key={slot.time}
                variant={selectedSlot == slot ? "default" : slot.available ? "outline" : "secondary"}
                size="sm"
                className="text-xs"
                disabled={!slot.available}
                onClick={(): void => setSelectedSlot(slot)}
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
              <span>{selectedDate.toISOString().split("T")[0] || "Seleccionar fecha"}</span>
            </div>
            <div className="flex justify-between">
              <span>Horario:</span>
              <span>{selectedSlot?.time || "Seleccionar horario"}</span>
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
        <Button
          className="w-full"
          size="lg"
          disabled={isAdding || !selectedDate || !selectedSlot}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Agregar al Carrito
        </Button>
      </CardContent>
    </Card>
  );
}
