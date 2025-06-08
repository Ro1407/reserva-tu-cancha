import { CourtDetails } from "@/components/court-details"
import { BookingForm } from "@/components/booking-form"
import { WeatherWidget } from "@/components/weather-widget"

const court = {
  id: 1,
  name: "Cancha de Fútbol 5 - Central",
  location: "Palermo, CABA",
  price: 8000,
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  sport: "Fútbol",
  rating: 4.8,
  description:
    "Cancha de fútbol 5 con césped sintético de última generación. Iluminación LED, vestuarios con duchas, estacionamiento gratuito. Ideal para partidos entre amigos o torneos.",
  amenities: ["Césped sintético", "Iluminación LED", "Vestuarios", "Duchas", "Estacionamiento", "Buffet"],
  club: {
    name: "Club Deportivo Central",
    phone: "+54 11 1234-5678",
    address: "Av. Santa Fe 1234, Palermo, CABA",
  },
}

export default function CourtDetailPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CourtDetails court={court} />
          <div className="mt-8">
            <WeatherWidget />
          </div>
        </div>
        <div className="lg:col-span-1">
          <BookingForm court={court} />
        </div>
      </div>
    </div>
  )
}
