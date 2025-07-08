"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CourtCardData } from "@/types/court";
import { getAllCourtsCardData } from "@/lib/actions-client";
import { formatDBPriceToCurrency } from "@/lib/utils";
import { Create, Edit, See } from "@/components/ui/dashboard-buttons";
import { Modal } from "@/components/modal";
import { CourtCard } from "@/components/court-card";

export function CourtsTable() {

  const [courts, setCourts] = useState<CourtCardData[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<CourtCardData | null>(null);

  useEffect(() => {
    const fetchCourts = async (): Promise<CourtCardData[]> => {
      try {
        return await getAllCourtsCardData();
      } catch (error) {
        console.error("Error fetching courts:", error);
        return [];
      }
    };

    fetchCourts().then((courts) => setCourts(courts));
  }, []);

  const deleteCancha: (id: string) => void = (id: string): void => {
    console.log("Eliminando cancha:", id);
  };

  return (
        <>
        { /* Render the courts table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="mb-2">Gestión de Canchas</CardTitle>
            <Create href="/dashboard/crear" buttonText="Nueva Cancha"></Create>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Club</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Deporte</TableHead>
                  <TableHead>Precio/Hora</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courts.map((court: CourtCardData) => (
                  <TableRow key={court.id}>
                    <TableCell>
                        <span className="font-medium">{court.name}</span>
                    </TableCell>
                    <TableCell>
                        <span className="font-medium">{court.clubName}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{court.clubLocation}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{court.sport}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{formatDBPriceToCurrency(court.price)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={court.state === "Activa" ? BadgeVariant.default : BadgeVariant.secondary}>{court.state}</Badge>
                    </TableCell>
                   <TableCell>
                        <div className="flex space-x-2">
                          <See onSeeClick={() => setSelectedCourt(court)} />
                          <Edit editHref={`/dashboard/canchas/editar/${court.id}`} />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(): void => deleteCancha(court.id)}
                          >
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
        {/* Render the modal only when a court is selected for viewing */}
        {selectedCourt != null && <Modal onModalClose={(): void => setSelectedCourt(null)}> <CourtCard court={selectedCourt} /> </Modal>}
    </>
  );
}
