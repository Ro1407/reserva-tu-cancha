import Link from "next/link"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {MapPin, Star, Building} from "lucide-react"

interface Club {
  id: number
  name: string
  location: string
  rating: number
  image: string
  sports: string[]
  courts: number
  description: string
}

interface ClubCardProps {
  club: Club
}

export function ClubCard({club}: ClubCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gray-100 dark:bg-gray-800">
        <img src={club.image || "/placeholder.svg"} alt={club.name} className="w-full h-full object-cover"/>
      </div>
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <span className="leading-tight">{club.name}</span>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1"/>
            {club.rating}
          </div>
        </CardTitle>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <MapPin className="w-4 h-4 mr-1"/>
          {club.location}
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Building className="w-4 h-4 mr-1"/>
          {club.courts} canchas disponibles
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 dark:text-gray-400">{club.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {club.sports.map((sport) => (
            <Badge key={sport} variant="secondary" className="text-xs">
              {sport}
            </Badge>
          ))}
        </div>
        <Link href={`/canchas?club=${club.id}`}>
          <Button className="w-full">Ver Canchas</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
