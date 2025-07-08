import { ClubCard } from "@/components/club-card";
import { getAllClubsCardData } from "@/lib/actions-client";
import { ClubCardData } from "@/types/club";

export default async function ClubesPage() {
  const clubCardData= await getAllClubsCardData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Clubes Deportivos</h1>
        <p className="text-gray-600 dark:text-gray-400">Descubre los mejores clubes deportivos de la ciudad</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubCardData.map((data: ClubCardData) => (
          <ClubCard key={data.id} club={data} />
        ))}
      </div>
    </div>
  );
}
