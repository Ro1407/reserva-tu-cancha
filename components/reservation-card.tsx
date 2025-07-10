import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { Calendar, Clock, CreditCard, MapPin, Star, User } from "lucide-react";
import { formatDBPriceToCurrency, formatISODateToHumanReadable, formatTimeSlotToString } from "@/lib/utils";
import { ReservationStateKey } from "@/types/enumerates";
import { ReservationCardData } from "@/types/reservation";

/* TODO PWA notification  */

interface ReservationCardProps {
  reservation: ReservationCardData;
}

export function ReservationCard({ reservation }: ReservationCardProps) {

  // Helper function to get state badge variant
  function getStateVariant(state: ReservationStateKey): BadgeVariant {
    switch (state) {
      case "Confirmada":
        return BadgeVariant.confirmada;
      case "Pendiente":
        return BadgeVariant.pendiente;
      case "Cancelada":
        return BadgeVariant.cancelada;
      case "Mantenimiento":
        return BadgeVariant.mantenimiento;
    }
    return BadgeVariant.default;
  }

  const canCancel = reservation.state === "Pendiente" || reservation.state === "Confirmada";

return (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <div className="aspect-video bg-gray-100 relative dark:bg-gray-800">
      <img
        src={reservation.courtImage || "/placeholder.svg"}
        alt={reservation.courtName}
        className="w-full h-full object-cover"
      />
      <Badge className="absolute top-2 left-2" variant={getStateVariant(reservation.state)}>
        {reservation.state}
      </Badge>
      <Badge className="absolute top-2 right-2" variant={BadgeVariant.secondary}>
        {reservation.courtSport}
      </Badge>
    </div>

    <CardHeader className="pb-2">
      <CardTitle className="flex items-start justify-between">
        <span className="leading-tight">{reservation.courtName}</span>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
          {reservation.courtRating}
        </div>
      </CardTitle>

      <div className="flex items-center text-gray-600 dark:text-gray-400">
        <User className="w-4 h-4 mr-1" />
        {reservation.userEmail}
      </div>
      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
        <MapPin className="w-4 h-4 mr-1" />
        {reservation.clubLocation + " - " + reservation.courtAddress}
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-1" />
          {formatISODateToHumanReadable(reservation.date)}
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4 mr-1" />
          {formatTimeSlotToString(reservation.timeSlot)}
        </div>
      </div>
    </CardHeader>

    <CardContent>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <CreditCard className="w-4 h-4 mr-1 text-gray-600 dark:text-gray-400" />
          <span className="text-2xl font-bold">{formatDBPriceToCurrency(reservation.price)}</span>
        </div>
      </div>

      <div className="flex gap-2">
        {canCancel && (
          <Button variant="destructive" className="w-full">
            Cancelar
          </Button>
        )}
        <Link href={`/canchas/${reservation.courtId}`} className="w-full">
          <Button variant="outline" className="w-full bg-transparent">
            Ver Cancha
          </Button>
        </Link>
      </div>
    </CardContent>
  </Card>
);
}
