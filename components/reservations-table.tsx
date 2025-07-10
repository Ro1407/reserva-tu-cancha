"use client";

import { useState } from "react";
import { Eye, Edit, X, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Reservation } from "@/types/reservation";
import { reservations } from "@/lib/data";

export function ReservationsTable() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>({});

  const startEdit: (reservation: Reservation) => void = (reservation: Reservation): void => {
    setEditingId(reservation.id);
    setEditData({ ...reservation });
  };

  const cancelEdit: () => void = (): void => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit: () => void = (): void => {
    setEditingId(null);
    setEditData({});
  };

  const viewDetails: (id: number) => void = (id: number): void => {
    console.log("Ver detalles de reserva:", id);
  };

  const deleteReserva: (id: number) => void = (id: number): void => {
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
                    <Select onValueChange={(value: string): void => setEditData({ ...editData, cancha: value })}>
                      <SelectTrigger className="min-w-[200px]">
                        <SelectValue placeholder="Seleccionar cancha" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cancha Fútbol 5 - Central">Cancha Fútbol 5 - Central</SelectItem>
                        <SelectItem value="Cancha Tenis - Norte">Cancha Tenis - Norte</SelectItem>
                        <SelectItem value="Cancha Pádel - Sur">Cancha Pádel - Sur</SelectItem>
                        <SelectItem value="Cancha Básquet - Oeste">Cancha Básquet - Oeste</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <span className="font-medium">{reservation.court}</span>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === reservation.id ? (
                    <Input
                      value={editData.cliente || ""}
                      onChange={(e): void => setEditData({ ...editData, cliente: e.target.value })}
                      className="min-w-[150px]"
                    />
                  ) : (
                    reservation.client
                  )}
                </TableCell>
                <TableCell>
                  {editingId === reservation.id ? (
                    <Input
                      type="date"
                      value={editData.fecha || ""}
                      onChange={(e): void => setEditData({ ...editData, fecha: e.target.value })}
                      className="min-w-[140px]"
                    />
                  ) : (
                    reservation.date
                  )}
                </TableCell>
                <TableCell>
                  {editingId === reservation.id ? (
                    <Select onValueChange={(value: string): void => setEditData({ ...editData, horario: value })}>
                      <SelectTrigger className="min-w-[120px]">
                        <SelectValue placeholder="Seleccionar horario" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="08:00-09:00">08:00-09:00</SelectItem>
                        <SelectItem value="09:00-10:00">09:00-10:00</SelectItem>
                        <SelectItem value="10:00-11:00">10:00-11:00</SelectItem>
                        <SelectItem value="11:00-12:00">11:00-12:00</SelectItem>
                        <SelectItem value="16:00-17:00">16:00-17:00</SelectItem>
                        <SelectItem value="17:00-18:00">17:00-18:00</SelectItem>
                        <SelectItem value="18:00-19:00">18:00-19:00</SelectItem>
                        <SelectItem value="19:00-20:00">19:00-20:00</SelectItem>
                        <SelectItem value="20:00-21:00">20:00-21:00</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    reservation.hours
                  )}
                </TableCell>
                <TableCell>
                  {editingId === reservation.id ? (
                    <Input
                      type="number"
                      value={editData.precio || ""}
                      onChange={(e): void => setEditData({ ...editData, precio: Number(e.target.value) })}
                      className="min-w-[100px]"
                    />
                  ) : (
                    `$${reservation.price.toLocaleString()}`
                  )}
                </TableCell>
                <TableCell>
                  {editingId === reservation.id ? (
                    <Select onValueChange={(value: string): void => setEditData({ ...editData, estado: value })}>
                      <SelectTrigger className="min-w-[120px]">
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Confirmada">Confirmada</SelectItem>
                        <SelectItem value="Pendiente">Pendiente</SelectItem>
                        <SelectItem value="Cancelada">Cancelada</SelectItem>
                        <SelectItem value="Completada">Completada</SelectItem>
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
