import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone, MapIcon } from "lucide-react";
import { Court, Club } from "@/lib/definitions";
import { clubs } from "@/lib/data";

interface CourtDetailsProps {
  court: Court;
}

export function CourtDetails({ court }: CourtDetailsProps) {
  const club: Club = clubs[court.club];
  return (
    <div className="space-y-6">
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
        <img src={court.image || "/placeholder.svg"} alt={court.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{court.name}</h1>
            <div className="flex items-center text-gray-600 mb-2 dark:text-gray-400">
              <MapPin className="w-4 h-4 mr-1" />
              {court.location}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{court.rating}</span>
              </div>
              <Badge>{court.sport}</Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">${court.price.toLocaleString()}</div>
            <div className="text-gray-600 dark:text-gray-400">por hora</div>
          </div>
        </div>
      </div>
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Descripción</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-gray-600 leading-relaxed dark:text-gray-400">{court.description}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Servicios</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {court.amenities.map((amenity: string) => (
              <Badge key={amenity} variant="secondary" className="justify-center text-xl">
                <span className="text-lg">{amenity}</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="p-1">
          <CardTitle>Información del Club</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div>
            <h4 className="font-medium">{club.name}</h4>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Phone className="w-4 h-4 mr-2" />
            {club.phone}
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <MapIcon className="w-4 h-4 mr-2" />
            {club.address}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
