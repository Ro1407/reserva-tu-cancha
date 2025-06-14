"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Court } from "@/types/court";
import { getAllCourts } from "@/lib/actions";
import { getAllClubsNamesAndIds } from "@/lib/actions-client";
import { ClubNameId } from "@/types/club-name-id";
import { SportValues, CourtStateValues, TimeSlotValues, AmenitieValues,
  SportKey, CourtStateKey, TimeSlotKey, AmenitieKey } from "@/types/enumerates";
import { CourtData } from "@/types/court";

export function CourtsTable() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [isCreating, setIsCreating] = useState(false);
  const emptyCourt: CourtData = {
    name: "",
    address: "",
    clubId: "",
    sport: "" as SportKey,
    description: "",
    price: 0,
    amenities: [] as AmenitieKey[],
    state: "Activa" as CourtStateKey,
    timeSlots: TimeSlotValues as TimeSlotKey[]
  }

  const [newCancha, setNewCancha] = useState<CourtData>(emptyCourt);
  const [courts, setCourts] = useState<Court[]>([]);
  const [clubs, setClubs] = useState<ClubNameId[]>([]);

  useEffect(() => {
    const fetchCourts = async (): Promise<Court[]> => {
      try {
        return await getAllCourts();
      } catch (error) {
        console.error("Error fetching courts:", error);
        return [];
      }
    };

    const fetchClubs = async (): Promise<ClubNameId[]> => {
      try {
        return await getAllClubsNamesAndIds();
      } catch (error) {
        console.error("Error fetching clubs:", error);
        return [];
      }
    };

    fetchCourts().then((courts) => setCourts(courts));
    fetchClubs().then((clubs) => setClubs(clubs));
  }, []);

  const startEdit: (court: Court) => void = (court: Court): void => {
    setEditingId(court.id);
    setEditData({ ...court });
    setIsCreating(false);
  };

  const cancelEdit: () => void = (): void => {
    setEditingId(null);
    setEditData({});
    setIsCreating(false);
    setNewCancha(emptyCourt);
  };

  const saveEdit: () => void = (): void => {
    setEditingId(null);
    setEditData({});
  };

  const deleteCancha: (id: string) => void = (id: string): void => {
    console.log("Eliminando cancha:", id);
  };

  const startCreate: () => void = (): void => {
    setIsCreating(true);
    setEditingId(null);
    setEditData({});
  };

  const saveNew: () => void = (): void => {
    console.log("Creando nueva cancha:", newCancha);
    setIsCreating(false);
    setNewCancha(emptyCourt);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="mb-2">Gestión de Canchas</CardTitle>
        <Button onClick={startCreate} disabled={isCreating || editingId !== null}>
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
            {/* new court */}
            {isCreating && (
              <TableRow className="bg-green-50 dark:bg-green-950/20">
                <TableCell>
                  <Input
                    value={newCancha.name}
                    onChange={(e): void => setNewCancha({ ...newCancha, name: e.target.value })}
                    placeholder="Nombre de la cancha"
                    className="min-w-[200px]"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={newCancha.address}
                    onChange={(e): void => setNewCancha({ ...newCancha, address: e.target.value })}
                    placeholder="Dirección de la cancha"
                    className="min-w-[200px]"
                  />
                </TableCell>
                <TableCell>
                  <Select onValueChange={(value: string): void => setNewCancha({ ...newCancha, clubId: value })}>
                    <SelectTrigger className="min-w-[150px]">
                      <SelectValue placeholder="Seleccionar club" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        clubs.map((club: ClubNameId) => (
                          <SelectItem key={club.id} value={club.name}>
                            {club.name}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select onValueChange={(value: string): void => setNewCancha({ ...newCancha, sport: value as SportKey})}>
                    <SelectTrigger className="min-w-[120px]">
                      <SelectValue placeholder="Seleccionar deporte" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        SportValues.map((sport: SportKey) => (
                          <SelectItem key={sport} value={sport}>
                            {sport}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={newCancha.price || ""}
                    onChange={(e): void => setNewCancha({ ...newCancha, price: Number(e.target.value) })}
                    placeholder="Precio"
                    className="min-w-[100px]"
                  />
                </TableCell>
                <TableCell>
                  <Select onValueChange={(value: string): void => setNewCancha({ ...newCancha, state: value as CourtStateKey })}>
                    <SelectTrigger className="min-w-[130px]">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {CourtStateValues.map((state: CourtStateKey) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={saveNew}
                      disabled={!newCancha.name || !newCancha.clubId || !newCancha.sport || !newCancha.price || !newCancha.state
                    || !newCancha.address}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={cancelEdit}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {/* actual courts */}
            {courts.map((court: Court) => (
              <TableRow key={court.id}>
                <TableCell>
                  {editingId === court.id ? (
                    <Input
                      value={editData.name || ""}
                      onChange={(e): void => setEditData({ ...editData, name: e.target.value })}
                      className="min-w-[200px]"
                    />
                  ) : (
                    <span className="font-medium">{court.name}</span>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === court.id ? (
                    <Select onValueChange={(value: string): void => setEditData({ ...editData, club: value })}>
                      <SelectTrigger className="min-w-[150px]">
                        <SelectValue placeholder="Seleccionar club" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          clubs.map((club: ClubNameId) => (
                            <SelectItem key={club.id} value={club.name}>
                              {club.name}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  ) : (
                    clubs.filter((club) => club.id === court.clubId)[0]?.name || "Club no encontrado"
                  )}
                </TableCell>
                <TableCell>
                  {editingId === court.id ? (
                    <Select onValueChange={(value: string): void => setEditData({ ...editData, sport: value })}>
                      <SelectTrigger className="min-w-[120px]">
                        <SelectValue placeholder="Seleccionar deporte" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          SportValues.map((sport: string) => (
                            <SelectItem key={sport} value={sport}>
                              {sport}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  ) : (
                    court.sport
                  )}
                </TableCell>
                <TableCell>
                  {editingId === court.id ? (
                    <Input
                      type="number"
                      value={editData.price || ""}
                      onChange={(e): void => setEditData({ ...editData, price: Number(e.target.value) })}
                      className="min-w-[100px]"
                    />
                  ) : (
                    `$${court.price.toLocaleString()}`
                  )}
                </TableCell>
                <TableCell>
                  {editingId === court.id ? (
                    <Select onValueChange={(value: string): void => setEditData({ ...editData, status: value })}>
                      <SelectTrigger className="min-w-[130px]">
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {CourtStateValues.map((state: string) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant={court.state === "Activa" ? "default" : "secondary"}>{court.state}</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === court.id ? (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={saveEdit}>
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={cancelEdit}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={(): void => startEdit(court)} disabled={isCreating}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(): void => deleteCancha(court.id)}
                        disabled={isCreating}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
