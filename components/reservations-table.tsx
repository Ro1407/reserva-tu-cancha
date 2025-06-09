import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, X } from "lucide-react";
import { Reservation } from "@/types/reservation";
import { reservations } from "@/lib/data";

export function ReservationsTable() {
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
                <TableCell className="font-medium">{reservation.court}</TableCell>
                <TableCell>{reservation.client}</TableCell>
                <TableCell>{reservation.date}</TableCell>
                <TableCell>{reservation.hours}</TableCell>
                <TableCell>${reservation.price.toLocaleString()}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
