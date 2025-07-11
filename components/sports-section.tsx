import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Sport, sports } from "@/lib/definitions";

export function SportsSection() {
  const buildSearchURL: (sport: string) => string = (sport: string): string => {
    const params = new URLSearchParams({ deporte: sport.toLowerCase() });
    return `/canchas?${params.toString()}`;
  };

  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Deportes Disponibles</h2>
        <p className="text-gray-600 text-lg dark:text-gray-400">Encuentra canchas para tu deporte favorito</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {sports.map((sport: Sport) => (
          <Link key={sport.key} href={buildSearchURL(sport.key)}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{sport.icon}</div>
                <h3 className="font-semibold">{sport.key}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
