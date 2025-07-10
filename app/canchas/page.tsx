import { CourtCard } from "@/components/court-card";
import { CourtFilters } from "@/components/court-filters";
import { Pagination } from "@/components/pagination";
import { Court } from "@/types/court";
import { courts } from "@/lib/data";

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
            {courts.map((court: Court) => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>
          <Pagination totalPages={10} />
        </div>
      </div>
    </div>
  );
}
