import { CourtCard } from "@/components/court-card";
import CourtFilters from "@/components/court-filters";
import Pagination from "@/components/pagination";
import { CourtCardData } from "@/types/court";
import { getAllCourtsCardData, Filters } from "@/lib/actions-client";
import { getAllCourtLocations, getMaxCourtPrice, getMinCourtPrice } from "@/lib/actions";
import { AmenitieKey, SportKey } from "@/types/enumerates";

export default async function CanchasPage(props: {
  searchParams?: Promise<{
    sports?: string;
    maxPrice?: string;
    location?: string;
    amenities?: string;
    onlyAvailable?: string;
    page?: string;
  }>;
}) {
  // Obtener los parámetros a partir de la URL
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  const filters: Filters = {};

  // Deportes: convertir string separado por comas a array
  if (searchParams?.sports) {
    const sportsArray = searchParams.sports.split(",").filter(Boolean) as SportKey[];
    if (sportsArray.length > 0) {
      filters.sports = sportsArray;
    }
  }

  // Precio: convertir string a número
  if (searchParams?.maxPrice) {
    const maxPrice = Number(searchParams.maxPrice);
    if (!isNaN(maxPrice) && maxPrice > 0) {
      filters.maxPrice = maxPrice;
    }
  }

  // Ubicación: asignar directamente si existe
  filters.location = searchParams?.location;

  // Amenities: convertir string separado por comas a array
  if (searchParams?.amenities) {
    const amenitiesArray = searchParams.amenities.split(",").filter(Boolean) as AmenitieKey[];
    if (amenitiesArray.length > 0) {
      filters.amenities = amenitiesArray;
    }
  }

  // Solo disponibles: convertir string a boolean
  if (searchParams?.onlyAvailable === "true") {
    filters.onlyAvailable = true;
  }

  const [minPrice, maxPrice, courtsLocations, [courts, totalPages, totalCourts]] = await Promise.all([
    getMinCourtPrice(),
    getMaxCourtPrice(),
    getAllCourtLocations(),
    getAllCourtsCardData({ currentPage: currentPage, filters: filters })
  ]);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Canchas Disponibles</h1>
          <p className="text-gray-600 dark:text-gray-400">Encontramos {totalCourts} canchas disponibles para ti</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CourtFilters minPrice={minPrice} maxPrice={maxPrice} courtsLocations={courtsLocations} />
          </div>
          <div className="lg:col-span-3">
            {totalCourts > 0 ?
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {courts.map((court: CourtCardData) => (
                    <CourtCard key={court.id} court={court} />
                  ))}
                </div>
                <div className="mt-5 flex w-full justify-center">
                  <Pagination totalPages={totalPages} />
                </div>
              </>
              :
              <div className="container mx-auto px-4 py-8  items-center justify-center">
                <h1 className="text-3xl font-bold mb-2">No hay canchas disponibles</h1>
                <p className="text-gray-600 dark:text-gray-400">Intenta ajustar tus filtros o vuelve más tarde.</p>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}
