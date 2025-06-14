"use client";

import { useEffect, useState } from "react";
import { Eye, Edit, X, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Reservation } from "@/types/reservation";
import { ReservationData } from "@/types/reservation";
import { CourtNameId } from "@/types/court-name-id";
import { UsersEmailId } from "@/types/users-email-id";
import { TimeSlotValues, TimeSlotKey, ReservationStateValues, ReservationStateKey } from "@/types/enumerates";
import { getAllCourtsNamesAndIds, getAllUsersEmailsAndIds, getTimeSlots } from "@/lib/actions-client";
import { getAllReservations } from "@/lib/actions";
import { TimeSlot } from "@/types/time-slot";

export function ReservationsTable() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const emptyReservation: ReservationData = {
    date: new Date().toISOString().split("T")[0],
    timeSlot: TimeSlotValues[0],
    price: 0,
    state: "Pendiente" as ReservationStateKey,
    courtId: "",
    userId: ""
  };
  const [editData, setEditData] = useState<ReservationData>(emptyReservation);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [courts, setCourts] = useState<CourtNameId[]>([]);
  const [users, setUsers] = useState<UsersEmailId[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<[CourtNameId[], Reservation[], UsersEmailId[]]> => {
      try {
        return await Promise.all([
          getAllCourtsNamesAndIds(),
          getAllReservations(),
          getAllUsersEmailsAndIds(),
        ]);

      } catch (error) {
        console.error("Error fetching data:", error);
        return [[], [], []];
      }
    };

    fetchData().then(([courts, reservations, users]) => {
      setCourts(courts);
      setReservations(reservations);
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    if (editData.courtId && editData.date) {
      const fetchTimeSlots = async (): Promise<TimeSlot[]> => {
        try {
          return getTimeSlots(new Date(editData.date), editData.courtId);
        } catch (error) {
          console.error("Error fetching time slots:", error);
          return [];
        }
      }
      fetchTimeSlots().then((timeSlots) => {setTimeSlots(timeSlots)})
    }
  }, [editData.courtId, editData.date]);

  const startEdit: (reservation: Reservation) => void = (reservation: Reservation): void => {
    setEditingId(reservation.id);
    setEditData({ ...reservation });
  };

  const cancelEdit: () => void = (): void => {
    setEditingId(null);
    setEditData(emptyReservation);
  };

  const saveEdit: () => void = (): void => {
    setEditingId(null);
    setEditData(emptyReservation);
  };

  const viewDetails: (id: string) => void = (id: string): void => {
    console.log("Ver detalles de reserva:", id);
  };

  const deleteReserva: (id: string) => void = (id: string): void => {
    console.log("Eliminando reserva:", id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Reservas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cancha</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Horario</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation: Reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>
                  {editingId === reservation.id ? (
                    <Select onValueChange={(value: string): void => setEditData({ ...editData, courtId: value })}>
                      <SelectTrigger className="min-w-[200px]">
                        <SelectValue placeholder="Seleccionar cancha" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          courts.map((court: CourtNameId) => (
                            <SelectItem key={court.id} value={court.id}>
                              {court.name}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  ) : (
                    <span className="font-medium">{courts.filter((c) => (c.id === reservation.courtId))[0].name}</span>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === reservation.id ? (
                    <Select onValueChange={(value: string): void => setEditData({ ...editData, userId: value })}>
                      <SelectTrigger className="min-w-[200px]">
                        <SelectValue placeholder="Seleccionar cancha" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                            users.map((user => (
                              <SelectItem key={user.id} value={user.id}>
                                {user.email}
                              </SelectItem>
                            ))
                            )
                        }
                      </SelectContent>
                    </Select>
                  ) : (
                    users.filter((u) => (u.id === reservation.userId))[0].email
                  )}
                </TableCell>
                <TableCell>
                  {editingId === reservation.id ? (
                    <Input
                      type="date"
                      placeholder={"YYY-MM-DD"}
                      value={editData.date || ""}
                      onChange={(e): void => setEditData({ ...editData, date: e.target.value })}
                      className="min-w-[140px]"
                    />
                  ) : (
                    reservation.date
                  )}
                </TableCell>
                <TableCell>
                  {editingId === reservation.id ? (
                    <Select onValueChange={(value: string): void => setEditData({ ...editData, timeSlot: value as TimeSlotKey})}>
                      <SelectTrigger className="min-w-[120px]">
                        <SelectValue placeholder="Seleccionar horario" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          timeSlots.map((slot: TimeSlot) => (
                            <SelectItem key={slot.time} value={slot.time}>
                              {slot.time.replace(/^H(\d{2})(\d{2})$/, "$1:$2")}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  ) : (
                    reservation.timeSlot
                  )}
                </TableCell>
                <TableCell>
                  {editingId === reservation.id ? (
                    <Input
                      type="number"
                      value={editData.price || ""}
                      onChange={(e): void => setEditData({ ...editData, price: Number(e.target.value) })}
                      className="min-w-[100px]"
                    />
                  ) : (
                    `$${reservation.price.toLocaleString()}`
                  )}
                </TableCell>
                <TableCell>
                  {editingId === reservation.id ? (
                    <Select onValueChange={(value: string): void => setEditData({ ...editData, state: value as ReservationStateKey})}>
                      <SelectTrigger className="min-w-[120px]">
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {ReservationStateValues.map((state: ReservationStateKey) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge
                      variant={
                        reservation.state === "Confirmada"
                          ? "default"
                          : reservation.state === "Pendiente"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {reservation.state}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === reservation.id ? (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={saveEdit}>
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={cancelEdit}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={(): void => viewDetails(reservation.id)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={(): void => startEdit(reservation)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={(): void => deleteReserva(reservation.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
