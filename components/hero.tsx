import {Button} from "@/components/ui/button"

export function Hero() {
  return (
    <section
      className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-20 md:py-32 dark:from-green-950/20 dark:via-gray-950 dark:to-blue-950/20">
      <div className="container mx-auto px-4 text-center">
        <h1
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          ReserváTuCancha
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto dark:text-gray-400">
          La plataforma más fácil para reservar canchas deportivas en tu ciudad. Encuentra, reserva y juega en minutos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            Buscar Canchas
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8">
            Ver Clubes
          </Button>
        </div>
      </div>
    </section>
  )
}
