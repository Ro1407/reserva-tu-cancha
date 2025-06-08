import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, Eye } from "lucide-react";
import { Club } from "@/lib/definitions";
import { clubs } from "@/lib/data";

export function ClubsTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle>Gestión de Clubes</CardTitle>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
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
            {clubs.map((club: Club) => (
              <TableRow key={club.id}>
                <TableCell className="font-medium">{club.name}</TableCell>
                <TableCell>{club.location}</TableCell>
                <TableCell>{club.courts.length}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {club.sports.slice(0, 2).map((sport: string) => (
                      <Badge key={sport} variant="outline" className="text-xs">
                        {sport}
                      </Badge>
                    ))}
                    {club.sports.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{club.sports.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={club.state === "Activo" ? "default" : "secondary"}>{club.state}</Badge>
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
  );
}
