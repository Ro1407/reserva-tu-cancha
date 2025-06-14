import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import { Court } from "@/types/court";
import { getClubLocationById} from "@/lib/actions";

interface CourtCardProps {
  court: Court;
}

export async function CourtCard({ court }: CourtCardProps) {
  const clubLocation: string | null = await getClubLocationById(court.clubId);
  const canchaActiva: boolean = court.state === "Activa";

  return (
    <>
      {clubLocation ? (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-video bg-gray-100 relative dark:bg-gray-800">
            <img src={court.image || "/placeholder.svg"} alt={court.name} className="w-full h-full object-cover" />
            <Badge className="absolute top-2 left-2"
                   variant={canchaActiva ? "default" : "secondary"}>
              {court.sport}
            </Badge>
            {!canchaActiva && (
              <Badge className="absolute top-2 right-2" variant="destructive">
                No disponible
              </Badge>
            )}
          </div>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-lg leading-tight">{court.name}</h3>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                {court.rating}
              </div>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 mr-1" />
              {court.address}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-2xl font-bold">${court.price.toLocaleString()}</span>
                <span className="text-gray-600 dark:text-gray-400">/hora</span>
              </div>
            </div>
            <Link href={`/canchas/${court.id}`}>
              <Button className="w-full" disabled={!canchaActiva}>
                {canchaActiva ? "Ver Detalles" : "No Disponible"}
              </Button>
            </Link>
          </CardContent>
        </Card>) : (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No fue posible obtener la ubicación de la cancha.</p>
            <Button>
              <Link href="/canchas">Volver a Canchas</Link>
            </Button>
          </CardContent>
        </Card>
      )
      }
    </>
  );
}
