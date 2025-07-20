import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { Calendar, Clock, CreditCard, MapPin, Star, User } from "lucide-react";
import { formatDBPriceToCurrency, formatISODateToHumanReadable, formatTimeSlotToString } from "@/lib/utils";
import { ReservationCardData } from "@/types/reservation";
import { getStateVariant } from "@/lib/utils"

interface ReservationCardProps {
  reservation: ReservationCardData;
}

export function ReservationCard({ reservation }: ReservationCardProps) {
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
