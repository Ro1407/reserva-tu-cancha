import {
  AmenitieKey,
  CourtStateKey,
  ReservationStateKey,
  SportKey,
  TimeSlotKey,
  TimeSlotValues
} from "@/types/enumerates";
import { ReservationData } from "@/types/reservation";


export default async function Page() {
  const emptyReservation: ReservationData = {
    date: new Date().toISOString().split("T")[0],
    timeSlot: TimeSlotValues[0],
    price: 0,
    state: "Pendiente" as ReservationStateKey,
    courtId: "",
    userId: ""
  };

  return (
    <main>

    </main>
  );
}