import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, Eye, PencilIcon, Trash2 } from "lucide-react";
import { deleteClub, deleteReservation, deleteCourt } from "@/lib/actions";
import { ClubCardData } from "@/types/club";
import { ReservationCardData } from "@/types/reservation";
import { CourtCardData } from "@/types/court";

export function Create({href, buttonText}: { href: string, buttonText: string }) {
  return (
    <Link href={href}>
    <Button>
        <Plus className="w-4 h-4 mr-2" />
        {buttonText}
    </Button>
    </Link>
  );
}

export function Volver({volverHref}: { volverHref:string }) {
  return (
    <Link href={volverHref}>
      <Button variant="outline" className="mt-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Button>
    </Link>
  );
}

export function See({onSeeClick}: { onSeeClick: () => void }) {
  return (
      <Button variant="outline" size="sm" onClick={onSeeClick}>
        <Eye className="w-4 h-4" />
      </Button>
  );
}

export function Edit({editHref}: { editHref: string }) {
  return (
    <Link href={editHref}>
      <Button variant="outline" size="sm">
        <PencilIcon className="w-4 h-4"/>
      </Button>
    </Link>
  );
}

export function Delete({onClick}: { onClick: () => void }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}

export function DeleteClub({club, afterSubmit}: { club:ClubCardData, afterSubmit: () => void }) {
  const handleDelete = async () => {
    await deleteClub(club.id).then( (res) => {
      if(res) afterSubmit()
    })
  };

  return (
    <form action={handleDelete}>
      <Button type="submit" variant="destructive">
        Eliminar Club
      </Button>
    </form>
  );
}

export function DeleteReservation({reservation, afterSubmit}: { reservation:ReservationCardData, afterSubmit: () => void }) {
  const handleDelete = async () => {
    await deleteReservation(reservation.id).then( (res) => {
      if(res) afterSubmit()
    })
  };

  return (
    <form action={handleDelete}>
      <Button type="submit" variant="destructive">
        Eliminar Reserva
      </Button>
    </form>
  );
}

export function DeleteCourt({court, afterSubmit}: { court:CourtCardData, afterSubmit: () => void }) {
  const handleDelete = async () => {
    await deleteCourt(court.id).then( (res) => {
      if(res) afterSubmit()
    })
  };

  return (
    <form action={handleDelete}>
      <Button type="submit" variant="destructive">
        Eliminar Cancha
      </Button>
    </form>
  );
}
