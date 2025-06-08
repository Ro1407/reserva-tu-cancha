import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Eye, Edit, X} from "lucide-react"

const reservas = [
  {
    id: 1,
    cancha: "Cancha Fútbol 5 - Central",
    cliente: "Juan Pérez",
    fecha: "2024-01-15",
    horario: "18:00-19:00",
    precio: 8000,
    estado: "Confirmada",
  },
  {
    id: 2,
    cancha: "Cancha Tenis - Norte",
    cliente: "María García",
    fecha: "2024-01-15",
    horario: "10:00-11:00",
    precio: 6000,
    estado: "Pendiente",
  },
  {
    id: 3,
    cancha: "Cancha Pádel - Sur",
    cliente: "Carlos López",
    fecha: "2024-01-16",
    horario: "20:00-21:00",
    precio: 7000,
    estado: "Cancelada",
  },
  {
    id: 4,
    cancha: "Cancha Básquet - Oeste",
    cliente: "Ana Martínez",
    fecha: "2024-01-16",
    horario: "16:00-17:00",
    precio: 5500,
    estado: "Confirmada",
  },
]

export function ReservasTable() {
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
            {reservas.map((reserva) => (
              <TableRow key={reserva.id}>
                <TableCell className="font-medium">{reserva.cancha}</TableCell>
                <TableCell>{reserva.cliente}</TableCell>
                <TableCell>{reserva.fecha}</TableCell>
                <TableCell>{reserva.horario}</TableCell>
                <TableCell>${reserva.precio.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      reserva.estado === "Confirmada"
                        ? "default"
                        : reserva.estado === "Pendiente"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {reserva.estado}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4"/>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4"/>
                    </Button>
                    <Button variant="outline" size="sm">
                      <X className="w-4 h-4"/>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
