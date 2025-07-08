import { CourtData } from "@/types/court";
import { AmenitieKey, CourtStateKey, SportKey, TimeSlotKey, TimeSlotValues } from "@/types/enumerates";


export default async function Page() {
  const emptyCourt: CourtData = {
    name: "",
    address: "",
    clubId: "",
    sport: "" as SportKey,
    description: "",
    price: 0,
    amenities: [] as AmenitieKey[],
    state: "Activa" as CourtStateKey,
    timeSlots: TimeSlotValues as TimeSlotKey[]
  }

  return (
    <main>

    </main>
  );
}