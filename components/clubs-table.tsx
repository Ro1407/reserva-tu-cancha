"use client";

import { useState } from "react";
import { Edit, Trash2, Plus, Eye, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Club } from "@/types/club";
import { clubs } from "@/lib/data";

export function ClubsTable() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [isCreating, setIsCreating] = useState(false);
  const [newClub, setNewClub] = useState({
    name: "",
    location: "",
    canchas: 0,
    deportes: "",
    estado: "Activo",
  });

  const startEdit: (club: Club) => void = (club: Club): void => {
    setEditingId(club.id);
    setEditData({ ...club });
    setIsCreating(false);
  };

  const cancelEdit: () => void = (): void => {
    setEditingId(null);
    setEditData({});
    setIsCreating(false);
    setNewClub({
      name: "",
      location: "",
      canchas: 0,
      deportes: "",
      estado: "Activo",
    });
  };

  const saveEdit: () => void = (): void => {
    const dataToSave = {
      ...editData,
    };
    console.log("Guardando edición:", dataToSave);
    setEditingId(null);
    setEditData({});
  };

  const viewDetails: (id: number) => void = (id: number): void => {
    console.log("Ver detalles de club:", id);
  };

  const deleteClub: (id: number) => void = (id: number): void => {
    console.log("Eliminando club:", id);
  };

  const startCreate: () => void = (): void => {
    setIsCreating(true);
    setEditingId(null);
    setEditData({});
  };

  const saveNew: () => void = (): void => {
    const dataToSave = {
      ...newClub,
    };
    console.log("Creando nuevo club:", dataToSave);
    setIsCreating(false);
    setNewClub({
      name: "",
      location: "",
      canchas: 0,
      deportes: "",
      estado: "Activo",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="mb-2">Gestión de Clubes</CardTitle>
        <Button onClick={startCreate} disabled={isCreating || editingId !== null}>
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
            {/* new club */}
            {isCreating && (
              <TableRow className="bg-green-50 dark:bg-green-950/20">
                <TableCell>
                  <Input
                    value={newClub.name}
                    onChange={(e): void => setNewClub({ ...newClub, name: e.target.value })}
                    placeholder="Nombre del club"
                    className="min-w-[200px]"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={newClub.location}
                    onChange={(e): void => setNewClub({ ...newClub, location: e.target.value })}
                    placeholder="Ubicación"
                    className="min-w-[150px]"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={newClub.canchas || ""}
                    onChange={(e): void => setNewClub({ ...newClub, canchas: Number(e.target.value) })}
                    placeholder="Nº canchas"
                    className="min-w-[80px]"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={newClub.deportes}
                    onChange={(e): void => setNewClub({ ...newClub, deportes: e.target.value })}
                    placeholder="Fútbol, Tenis, Pádel"
                    className="min-w-[200px]"
                  />
                </TableCell>
                <TableCell>
                  <Select onValueChange={(value: string): void => setNewClub({ ...newClub, estado: value })}>
                    <SelectTrigger className="min-w-[100px]">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                      <SelectItem value="Suspendido">Suspendido</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={saveNew}
                      disabled={!newClub.name || !newClub.location || !newClub.canchas}
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

            {/* Filas existentes */}
            {clubs.map((club: Club) => (
              <TableRow key={club.id}>
                <TableCell>
                  {editingId === club.id ? (
                    <Input
                      value={editData.name || ""}
                      onChange={(e): void => setEditData({ ...editData, name: e.target.value })}
                      className="min-w-[200px]"
                    />
                  ) : (
                    <span className="font-medium">{club.name}</span>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === club.id ? (
                    <Input
                      value={editData.location || ""}
                      onChange={(e): void => setEditData({ ...editData, location: e.target.value })}
                      className="min-w-[150px]"
                    />
                  ) : (
                    club.location
                  )}
                </TableCell>
                <TableCell>
                  {editingId === club.id ? (
                    <Input
                      type="number"
                      value={editData.canchas || ""}
                      onChange={(e): void => setEditData({ ...editData, canchas: Number(e.target.value) })}
                      className="min-w-[80px]"
                    />
                  ) : (
                    club.courts
                  )}
                </TableCell>
                <TableCell>
                  {editingId === club.id ? (
                    <Input
                      value={editData.deportes || ""}
                      onChange={(e) => setEditData({ ...editData, deportes: e.target.value })}
                      placeholder="Fútbol, Tenis, Pádel"
                      className="min-w-[200px]"
                    />
                  ) : (
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
                  )}
                </TableCell>
                <TableCell>
                  {editingId === club.id ? (
                    <Select onValueChange={(value: string): void => setEditData({ ...editData, estado: value })}>
                      <SelectTrigger className="min-w-[100px]">
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Activo">Activo</SelectItem>
                        <SelectItem value="Inactivo">Inactivo</SelectItem>
                        <SelectItem value="Suspendido">Suspendido</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant={club.state === "Activo" ? "default" : "secondary"}>{club.state}</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === club.id ? (
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(): void => viewDetails(club.id)}
                        disabled={isCreating}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={(): void => startEdit(club)} disabled={isCreating}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(): void => deleteClub(club.id)}
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
