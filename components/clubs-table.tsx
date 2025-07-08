"use client";

import { useCallback, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClubCardData } from "@/types/club";
import { getAllClubsCardData } from "@/lib/actions-client";
import { formatPhoneNumber } from "@/lib/utils";
import { Create, Edit, See } from "@/components/ui/dashboard-buttons";
import { Modal } from "@/components/modal";
import { ClubCard } from "@/components/club-card";

export function ClubsTable() {
  const [clubs, setClubs] = useState<ClubCardData[]>([]);
  const [selectedClub, setSelectedClub] = useState<ClubCardData | null>(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        return await getAllClubsCardData();
      } catch (error) {
        console.error("Error fetching clubs:", error);
        return [];
      }
    };

    fetchClubs().then((data) => {setClubs(data);});
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedClub(null)
  }, [])

  const handleSeeClub = useCallback((club: ClubCardData) => {
    setSelectedClub(club)
  }, [])

  const deleteClub: (id: string) => void = (id: string): void => {
    console.log("Eliminando club:", id);
  };

  return (
    <>
      {/* Render the clubs table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="mb-2">Gestión de Clubes</CardTitle>
          <Create href="/dashboard/clubes/crear" buttonText="Nuevo Club"></Create>
        </CardHeader>
        <CardContent>
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
                      <See onSeeClick={() => handleSeeClub(club)} />
                      <Edit editHref={`/dashboard/clubes/editar/${club.id}`}/>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(): void => deleteClub(club.id)}
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
      {/* Render the modal only when a club is selected for viewing */}
      {selectedClub != null && (
        <Modal onModalClose={handleCloseModal}>
          <ClubCard club={selectedClub} />
        </Modal>
      )}
    </>
  );
}
