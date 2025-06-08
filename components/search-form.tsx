"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Sport } from "@/lib/definitions";
import { sports } from "@/lib/data";

export function SearchForm() {
  const [sport, setSport] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const buildSearchURL: () => string = (): string => {
    const params = new URLSearchParams();
    if (sport) params.set("deporte", sport.toLowerCase());
    if (date) params.set("fecha", date.toLowerCase());
    if (time) params.set("horario", time.toLowerCase());
    return `/canchas?${params.toString()}`;
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Deporte</label>
            <Select onValueChange={setSport}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar deporte" />
              </SelectTrigger>
              <SelectContent>
                {sports.map((sport: Sport) => (
                  <SelectItem key={sport.name} value={sport.name}>
                    {sport.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Fecha</label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Horario</label>
            <Select onValueChange={setTime}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar horario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mañana">Mañana (8:00 - 12:00)</SelectItem>
                <SelectItem value="Tarde">Tarde (12:00 - 18:00)</SelectItem>
                <SelectItem value="Noche">Noche (18:00 - 23:00)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button asChild className="w-full" size="lg">
              <Link href={buildSearchURL()} className="inline">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
