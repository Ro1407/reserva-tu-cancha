"use client";

import { useEffect, useState } from "react";
import { Trash2, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CourtCardData } from "@/types/court";
import { getAllCourtsCardData } from "@/lib/actions-client";
import { formatDBPriceToCurrency } from "@/lib/utils";
import { Create, DeleteCourt, Edit, See } from "@/components/ui/dashboard-buttons";
import { Modal } from "@/components/modal";
import { CourtCard } from "@/components/court-card";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination";

export function CourtsTable() {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1
  const [totalPages, setTotalPages] = useState(0);

  const [courts, setCourts] = useState<CourtCardData[]>([]);
  const [courtForView, setCourtForView] = useState<CourtCardData | null>(null);
  const [courtForDelete, setCourtForDelete] = useState<CourtCardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCourts = async (): Promise<[CourtCardData[], number, number]> => {
      try {
        return await getAllCourtsCardData({currentPage: currentPage});
      } catch (error) {
        console.error("Error fetching courts:", error);
        return [[], 0, 0];
      }
    };
    setIsLoading(true);
    fetchCourts().then((data) => {
      setCourts(data[0])
      setTotalPages(data[1])
    }).finally(() => {
      setIsLoading(false);
    });
  }, [currentPage]);

  function handleDeleteCourt(){
    // Update local state immediately
    if (courtForDelete) {
      setCourts((prevCourts) => prevCourts.filter((court) => court.id !== courtForDelete.id));
    }

    setCourtForDelete(null);

    // Refresh with a small delay to ensure the server action completes
    setTimeout(() => {
      router.refresh();
    }, 100);
  }

  return (
    <>
      { /* Render the courts table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="mb-2">Gestión de Canchas</CardTitle>
          <Create href="/dashboard/crear" buttonText="Nueva Cancha"></Create>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Cargando canchas...</span>
            </div>
          ) : (
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
                      <Badge
                        variant={court.state === "Activa" ? BadgeVariant.default : BadgeVariant.secondary}>{court.state}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <See onSeeClick={() => setCourtForView(court)} />
                        <Edit editHref={`/dashboard/editar/${court.id}`} />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCourtForDelete(court)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      {/* Render the pagination component */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
      {/* Render the modal only when a court is selected for viewing */}
      {courtForView != null &&
        <Modal onModalClose={(): void => setCourtForView(null)}>
          <CourtCard court={courtForView} />
        </Modal>
      }
      {/* Render the modal only when a court is selected for deleting */}
      {courtForDelete != null && (
        <Modal onModalClose={() => setCourtForDelete(null)}>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar la cancha "{courtForDelete.name}"?</p>
            <div className="mt-6 flex justify-end gap-4">
              <Button variant="outline" onClick={() => setCourtForDelete(null)}>Cancelar</Button>
              <DeleteCourt court={courtForDelete} afterSubmit={handleDeleteCourt} />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}