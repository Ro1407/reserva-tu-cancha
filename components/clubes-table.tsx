import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Edit, Trash2, Plus, Eye} from "lucide-react"

const clubes = [
  {
    id: 1,
    name: "Club Deportivo Central",
    location: "Palermo, CABA",
    canchas: 12,
    deportes: ["Fútbol", "Tenis", "Pádel"],
    estado: "Activo",
  },
  {
    id: 2,
    name: "Complejo Atlético Norte",
    location: "Belgrano, CABA",
    canchas: 8,
    deportes: ["Básquet", "Vóley", "Fútbol"],
    estado: "Activo",
  },
  {
    id: 3,
    name: "Centro Deportivo Sur",
    location: "San Telmo, CABA",
    canchas: 15,
    deportes: ["Tenis", "Pádel", "Hockey"],
    estado: "Inactivo",
  },
  {
    id: 4,
    name: "Polideportivo Oeste",
    location: "Caballito, CABA",
    canchas: 20,
    deportes: ["Fútbol", "Básquet", "Vóley", "Tenis"],
    estado: "Activo",
  },
]

export function ClubesTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gestión de Clubes</CardTitle>
        <Button>
          <Plus className="w-4 h-4 mr-2"/>
          Nuevo Club
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Canchas</TableHead>
              <TableHead>Deportes</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clubes.map((club) => (
              <TableRow key={club.id}>
                <TableCell className="font-medium">{club.name}</TableCell>
                <TableCell>{club.location}</TableCell>
                <TableCell>{club.canchas}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {club.deportes.slice(0, 2).map((deporte) => (
                      <Badge key={deporte} variant="outline" className="text-xs">
                        {deporte}
                      </Badge>
                    ))}
                    {club.deportes.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{club.deportes.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={club.estado === "Activo" ? "default" : "secondary"}>{club.estado}</Badge>
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
