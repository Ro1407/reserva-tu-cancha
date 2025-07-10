"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ReservationCardData } from "@/types/reservation";
import { ReservationStateKey } from "@/types/enumerates";
import { getAllReservationsCardData } from "@/lib/actions-client";
import { formatDBPriceToCurrency, formatISODateToHumanReadable, formatTimeSlotToString } from "@/lib/utils";
import { Create, See, Edit, Delete, DeleteReservation } from "@/components/ui/dashboard-buttons";
import { Modal } from "@/components/modal";
import { BadgeVariant, Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReservationCard } from "@/components/reservation-card";
import { useRouter } from "next/navigation";

export function ReservationsTable() {

  const [reservations, setReservations] = useState<ReservationCardData[]>([]);
  const [reservationForView, setReservationForView] = useState<ReservationCardData | null>(null);
  const [reservationForDelete, setReservationForDelete] = useState<ReservationCardData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        return await getAllReservationsCardData();
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    };

    fetchData().then((data) => {
      setReservations(data);
    });
  }, []);


  function handleDeleteReservation() {
    // Actualizar el estado local inmediatamente
    if (reservationForDelete) {
      setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== reservationForDelete.id));
    }

    setReservationForDelete(null);

    // Refresh con un pequeño delay para asegurar que la Server Action termine
    setTimeout(() => {
      router.refresh();
    }, 100);
  }

  return (
    <>
      {/* Render the reservations table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="mb-2">Gestión de Reservas</CardTitle>
          <Create href="/dashboard/reservas/crear" buttonText="Nueva Reserva"></Create>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cancha</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha y Hora</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Deporte</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation: ReservationCardData) => (
                <TableRow key={reservation.id}>
                  <TableCell>
                    <span className="font-medium">{reservation.courtName}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{reservation.userEmail}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{formatISODateToHumanReadable(reservation.date)}</span>
                    <span className="font-medium">{formatTimeSlotToString(reservation.timeSlot)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{reservation.clubLocation + " - " + reservation.courtAddress}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{formatDBPriceToCurrency(reservation.price)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{reservation.courtSport}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStateVariant(reservation.state)} className="text-xs">
                      {reservation.state}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <See onSeeClick={() => setReservationForView(reservation)} />
                      <Edit editHref={`/dashboard/reservas/editar/${reservation.id}`} />
                      <Delete onClick={() => setReservationForDelete(reservation)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Render the reservation details view */}
      {reservationForView != null &&
        <Modal onModalClose={(): void => setReservationForView(null)}>
          <ReservationCard reservation={reservationForView} />
        </Modal>}

      {/* Render the modal only when a reservation is selected for deleting */}
      {reservationForDelete != null && (
        <Modal onModalClose={() => setReservationForDelete(null)}>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar la reserva de "{reservationForDelete.courtName}" efectuada por
              "{reservationForDelete.userEmail}" ?</p>
            <p> El usuario en cuestión será notificado </p>
            <div className="mt-6 flex justify-end gap-4">
              <Button variant="outline" onClick={() => setReservationForDelete(null)}>Cancelar</Button>
              <DeleteReservation reservation={reservationForDelete} afterSubmit={handleDeleteReservation} />
            </div>
          </div>
        </Modal>
      )}
    </>);
}

// Helper function to get state badge variant
function getStateVariant(state: ReservationStateKey): BadgeVariant {
  switch (state) {
    case "Confirmada":
      return BadgeVariant.confirmada;
    case "Pendiente":
      return BadgeVariant.pendiente;
    case "Cancelada":
      return BadgeVariant.cancelada;
    case "Mantenimiento":
      return BadgeVariant.mantenimiento;
  }
  return BadgeVariant.default;
}
