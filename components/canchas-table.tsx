import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Edit, Trash2, Plus} from "lucide-react"

const canchas = [
  {id: 1, name: "Cancha Fútbol 5 - Central", club: "Club Central", sport: "Fútbol", price: 8000, status: "Activa"},
  {id: 2, name: "Cancha Tenis - Norte", club: "Complejo Norte", sport: "Tenis", price: 6000, status: "Activa"},
  {id: 3, name: "Cancha Pádel - Sur", club: "Centro Sur", sport: "Pádel", price: 7000, status: "Mantenimiento"},
  {
    id: 4,
    name: "Cancha Básquet - Oeste",
    club: "Polideportivo Oeste",
    sport: "Básquet",
    price: 5500,
    status: "Activa",
  },
]

export function CanchasTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gestión de Canchas</CardTitle>
        <Button>
          <Plus className="w-4 h-4 mr-2"/>
          Nueva Cancha
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Club</TableHead>
              <TableHead>Deporte</TableHead>
              <TableHead>Precio/Hora</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {canchas.map((cancha) => (
              <TableRow key={cancha.id}>
                <TableCell className="font-medium">{cancha.name}</TableCell>
                <TableCell>{cancha.club}</TableCell>
                <TableCell>{cancha.sport}</TableCell>
                <TableCell>${cancha.price.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={cancha.status === "Activa" ? "default" : "secondary"}>{cancha.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4"/>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4"/>
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
