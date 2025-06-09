import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus } from "lucide-react";
import { Court } from "@/types/court";
import { courts } from "@/lib/data";

export function CourtsTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle>Gestión de Canchas</CardTitle>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
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
            {courts.map((court: Court) => (
              <TableRow key={court.id}>
                <TableCell className="font-medium">{court.name}</TableCell>
                <TableCell>{court.club}</TableCell>
                <TableCell>{court.sport}</TableCell>
                <TableCell>${court.price.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={court.status === "Activa" ? "default" : "secondary"}>{court.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
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
