import { ClubCard } from "@/components/club-card"

const clubs = [
  {
    id: 1,
    name: "Club Deportivo Central",
    location: "Palermo, CABA",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    sports: ["Fútbol", "Tenis", "Pádel"],
    courts: 12,
    description:
      "Club deportivo con más de 50 años de historia, ofreciendo las mejores instalaciones para todos los deportes.",
  },
  {
    id: 2,
    name: "Complejo Atlético Norte",
    location: "Belgrano, CABA",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
    sports: ["Básquet", "Vóley", "Fútbol"],
    courts: 8,
    description: "Moderno complejo deportivo con tecnología de punta y profesores especializados.",
  },
  {
    id: 3,
    name: "Centro Deportivo Sur",
    location: "San Telmo, CABA",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    sports: ["Tenis", "Pádel", "Hockey"],
    courts: 15,
    description: "Centro deportivo familiar con ambiente cálido y canchas de primera calidad.",
  },
  {
    id: 4,
    name: "Polideportivo Oeste",
    location: "Caballito, CABA",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
    sports: ["Fútbol", "Básquet", "Vóley", "Tenis"],
    courts: 20,
    description: "El polideportivo más grande de la zona oeste con múltiples disciplinas deportivas.",
  },
]

export default function ClubesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Clubes Deportivos</h1>
        <p className="text-gray-600 dark:text-gray-400">Descubre los mejores clubes deportivos de la ciudad</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  )
}
