"use client";

import { useEffect, useState } from "react";
import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClubCardData } from "@/types/club";
import { getAllClubsCardData } from "@/lib/actions-client";
import { formatPhoneNumber } from "@/lib/utils";
import { Create, Edit, See, Delete, DeleteClub } from "@/components/ui/dashboard-buttons";
import { Modal } from "@/components/modal";
import { ClubCard } from "@/components/club-card";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination";

export function ClubsTable() {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1
  const [totalPages, setTotalPages] = useState(0);

  const [clubs, setClubs] = useState<ClubCardData[]>([]);
  const [clubForView, setClubForView] = useState<ClubCardData | null>(null);
  const [clubForDelete, setClubForDelete] = useState<ClubCardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchClubs = async (): Promise<[ClubCardData[], number]> => {
      try {
        return await getAllClubsCardData(currentPage);
      } catch (error) {
        console.error("Error fetching clubs:", error);
        return [[], 0];
      }
    };
    setIsLoading(true);
    fetchClubs().then((data) => {
      setClubs(data[0]);
      setTotalPages(data[1]);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [currentPage]);

  function handleDeleteClub() {
    // Actualizar el estado local inmediatamente
    if (clubForDelete) {
      setClubs((prevClubs) => prevClubs.filter((club) => club.id !== clubForDelete.id))
    }

    setClubForDelete(null)

    // Refresh con un pequeño delay para asegurar que la Server Action termine
    setTimeout(() => {
      router.refresh()
    }, 100)
  }

  return (
    <>
      {/* Render the clubs table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="mb-2">Gestión de Clubes</CardTitle>
          <Create href="/dashboard/clubes/crear" buttonText="Nuevo Club"></Create>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Cargando clubes...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Dirección</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Deportes</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clubs.map((club) => (
                  <TableRow key={club.id}>
                    <TableCell>
                      <span className="font-medium">{club.name}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{club.location}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{club.address}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{formatPhoneNumber(club.phone)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {club.sports.slice(0, 2).map((sport: string) => (
                          <Badge key={sport} variant={BadgeVariant.outline} className="text-xs">
                            {sport}
                          </Badge>
                        ))}
                        {club.sports.length > 2 && (
                          <Badge variant={BadgeVariant.outline} className="text-xs">
                            +{club.sports.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <See onSeeClick={() => setClubForView(club)} />
                        <Edit editHref={`/dashboard/clubes/editar/${club.id}`}/>
                        <Delete onClick={() => setClubForDelete(club)} />
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
      {/* Render the modal only when a club is selected for viewing */}
      {clubForView != null && (
        <Modal onModalClose={() => setClubForView(null)}>
          <ClubCard club={clubForView} />
        </Modal>
      )}
      {/* Render the modal only when a club is selected for deleting */}
      {clubForDelete != null && (
        <Modal onModalClose={ () => setClubForDelete(null)}>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar el club "{clubForDelete.name}"?</p>
            <div className="mt-6 flex justify-end gap-4">
              <Button variant="outline" onClick={() => setClubForDelete(null)}>Cancelar</Button>
              <DeleteClub club={clubForDelete} afterSubmit={handleDeleteClub}/>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}