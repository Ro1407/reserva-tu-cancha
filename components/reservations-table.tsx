"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {  ReservationCardData } from "@/types/reservation";
import {  ReservationStateKey } from "@/types/enumerates";
import { getAllReservationsCardData } from "@/lib/actions-client";
import { formatDBPriceToCurrency, formatISODateToHumanReadable, formatTimeSlotToString } from "@/lib/utils";
import { Create, See, Edit } from "@/components/ui/dashboard-buttons";
import { Modal } from "@/components/modal";
import { BadgeVariant, Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReservationCard } from "@/components/reservation-card";


export function ReservationsTable() {

  const [reservations, setReservations] = useState<ReservationCardData[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<ReservationCardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        return await getAllReservationsCardData()
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    };

    fetchData().then((data) => {setReservations(data)});
  }, []);

  const deleteReserva: (id: string) => void = (id: string): void => {
    console.log("Eliminando reserva:", id);
  };

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
                  <span className="font-medium">{formatISODateToHumanReadable(reservation.date)
                    + " - " + formatTimeSlotToString(reservation.timeSlot)}</span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{reservation.clubLocation + ", " + reservation.courtAddress}</span>
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
                      <See onSeeClick={() => setSelectedReservation(reservation)} />
                      <Edit editHref={`/dashboard/reservas/editar/${reservation.id}`} />
                      <Button variant="outline" size="sm" onClick={(): void => deleteReserva(reservation.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  {/* Render the reservation details view */}
  { selectedReservation != null &&
  <Modal onModalClose={(): void => setSelectedReservation(null)}> <ReservationCard reservation={selectedReservation} /> </Modal>}
     </>)
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
