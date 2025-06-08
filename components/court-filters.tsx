import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CourtFilters() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base font-medium mb-3 block">Deporte</Label>
          <div className="space-y-2">
            {["Fútbol", "Tenis", "Pádel", "Básquet", "Vóley"].map((sport: string) => (
              <div key={sport} className="flex items-center space-x-2">
                <Checkbox id={sport} />
                <Label htmlFor={sport}>{sport}</Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label className="text-base font-medium mb-3 block">Precio por hora</Label>
          <Slider defaultValue={[0, 15000]} max={15000} step={500} className="mb-2" />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>$0</span>
            <span>$15,000</span>
          </div>
        </div>
        <div>
          <Label className="text-base font-medium mb-3 block">Ubicación</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar barrio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="palermo">Palermo</SelectItem>
              <SelectItem value="belgrano">Belgrano</SelectItem>
              <SelectItem value="san-telmo">San Telmo</SelectItem>
              <SelectItem value="caballito">Caballito</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-base font-medium mb-3 block">Disponibilidad</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="available" />
              <Label htmlFor="available">Solo disponibles</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="instant" />
              <Label htmlFor="instant">Reserva instantánea</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
