import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { MapIcon, MapPin, Phone, Star } from "lucide-react";
import { Club } from "@/types/club";
import { Court } from "@/types/court";
import { getClubById } from "@/lib/actions";
import { formatDBPriceToCurrency } from "@/lib/utils";

interface CourtDetailsProps {
  court: Court;
}

export async function CourtDetails({ court }: CourtDetailsProps) {
  const club: Club | null = await getClubById(court.clubId);
  return (
    <>
      {club ? (
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
                    {club.location + ", " + court.address}
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
                  <div className="text-3xl font-bold">{formatDBPriceToCurrency(court.price)}</div>
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
                    <Badge key={amenity} variant={BadgeVariant.secondary} className="justify-center text-xl">
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
        ) :
        (<div className="text-center p-6">
            <h2 className="text-2xl font-bold mb-4">Club no encontrado</h2>
            <p className="text-gray-600 dark:text-gray-400">Lo sentimos, no pudimos encontrar el club asociado a esta
              cancha.</p>
          </div>
        )
      }
    </>
  );
}
