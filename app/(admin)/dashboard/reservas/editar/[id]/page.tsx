
import { notFound } from "next/navigation";
import { Reservation } from "@/types/reservation";
import UpdateReservationForm from "@/components/forms/update-reservation-form";
import { getReservationById } from "@/lib/actions";

export default async function Page(props: { params: Promise<{ id: string; }>; }) {
  const { id } = await props.params;
  const reservation: Reservation | null = await getReservationById(id);

  if (!reservation) {
    return notFound();
  }

  reservation.price = reservation.price/100 // Convert price to a more readable format rather than cents

  return (
    <main>
      <UpdateReservationForm actualReservation={reservation} reservationId={reservation.id}/>
    </main>
  );
}