import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import { Club } from "@/types/club";
import { getAllClubs } from "@/lib/actions";
import Pagination from "@/components/pagination";

export async function FeaturedClubs(props: {
                                      searchParams?: Promise<{ query?: string; page?: string; }>;
                                    }) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const [clubs, totalPages] = await getAllClubs(currentPage);

  return (
    <>
      {clubs ? (
          <section className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Clubes Recomendados</h2>
              <p className="text-gray-600 text-lg dark:text-gray-400">Los mejores clubes deportivos de la ciudad</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs.slice(0, 3).map((club: Club) => (
                <Card key={club.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800">
                    <img src={club.image || "/placeholder.svg"} alt={club.name}
                         className="w-full h-full object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between">
                      <span>{club.name}</span>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        {club.rating}
                      </div>
                    </CardTitle>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-1" />
                      {club.location}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {club.sports.map((sport: string) => (
                        <span
                          key={sport}
                          className="px-2 py-1 bg-gray-100 text-gray-900 rounded-md text-sm dark:bg-gray-800 dark:text-gray-100"
                        >
                    {sport}
                  </span>
                      ))}
                    </div>
                    <Link href={`/canchas?club=${club.id}`}>
                      <Button className="w-full">Ver Canchas</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
              <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
              </div>
            </div>
          </section>
        ) :
        (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">No hay clubes disponibles</h2>
            <p className="text-gray-600 dark:text-gray-400">Por favor, vuelve más tarde.</p>
          </div>
        )
      }
    </>
  );
}
