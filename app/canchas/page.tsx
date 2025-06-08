import { CourtCard } from "@/components/court-card"
import { CourtFilters } from "@/components/court-filters"
import { Pagination } from "@/components/pagination"

const courts = [
  {
    id: 1,
    name: "Cancha de Fútbol 5 - Central",
    location: "Palermo, CABA",
    price: 8000,
    image: "/placeholder.svg?height=200&width=300",
    sport: "Fútbol",
    rating: 4.8,
    available: true,
  },
  {
    id: 2,
    name: "Cancha de Tenis - Norte",
    location: "Belgrano, CABA",
    price: 6000,
    image: "/placeholder.svg?height=200&width=300",
    sport: "Tenis",
    rating: 4.6,
    available: true,
  },
  {
    id: 3,
    name: "Cancha de Pádel - Sur",
    location: "San Telmo, CABA",
    price: 7000,
    image: "/placeholder.svg?height=200&width=300",
    sport: "Pádel",
    rating: 4.7,
    available: false,
  },
  {
    id: 4,
    name: "Cancha de Básquet - Oeste",
    location: "Caballito, CABA",
    price: 5500,
    image: "/placeholder.svg?height=200&width=300",
    sport: "Básquet",
    rating: 4.5,
    available: true,
  },
  {
    id: 5,
    name: "Cancha de Fútbol 11 - Este",
    location: "Puerto Madero, CABA",
    price: 12000,
    image: "/placeholder.svg?height=200&width=300",
    sport: "Fútbol",
    rating: 4.9,
    available: true,
  },
  {
    id: 6,
    name: "Cancha de Vóley - Centro",
    location: "Microcentro, CABA",
    price: 4500,
    image: "/placeholder.svg?height=200&width=300",
    sport: "Vóley",
    rating: 4.4,
    available: true,
  },
]

export default function CanchasPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Canchas Disponibles</h1>
        <p className="text-gray-600 dark:text-gray-400">Encontramos {courts.length} canchas disponibles para ti</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <CourtFilters />
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {courts.map((court) => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  )
}
