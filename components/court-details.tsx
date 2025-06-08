import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {MapPin, Star, Phone, MapIcon} from "lucide-react"

interface CourtDetailsProps {
  court: {
    id: number
    name: string
    location: string
    price: number
    images: string[]
    sport: string
    rating: number
    description: string
    amenities: string[]
    club: {
      name: string
      phone: string
      address: string
    }
  }
}

export function CourtDetails({court}: CourtDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
          <img src={court.images[0] || "/placeholder.svg"} alt={court.name} className="w-full h-full object-cover"/>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {court.images.slice(1).map((image, index) => (
            <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
              <img
                src={image || "/placeholder.svg"}
                alt={`${court.name} ${index + 2}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Basic Info */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{court.name}</h1>
            <div className="flex items-center text-gray-600 mb-2 dark:text-gray-400">
              <MapPin className="w-4 h-4 mr-1"/>
              {court.location}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1"/>
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
      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>Descripción</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 leading-relaxed dark:text-gray-400">{court.description}</p>
        </CardContent>
      </Card>
      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Servicios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {court.amenities.map((amenity) => (
              <Badge key={amenity} variant="secondary" className="justify-center">
                {amenity}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Club Info */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Club</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-medium">{court.club.name}</h4>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Phone className="w-4 h-4 mr-2"/>
            {court.club.phone}
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <MapIcon className="w-4 h-4 mr-2"/>
            {court.club.address}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
