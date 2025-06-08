import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import {Search} from "lucide-react"

export function SearchForm() {
  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Deporte</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar deporte"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="futbol">Fútbol</SelectItem>
                <SelectItem value="tenis">Tenis</SelectItem>
                <SelectItem value="padel">Pádel</SelectItem>
                <SelectItem value="basquet">Básquet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Fecha</label>
            <Input type="date"/>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Horario</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar horario"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Mañana (8:00 - 12:00)</SelectItem>
                <SelectItem value="afternoon">Tarde (12:00 - 18:00)</SelectItem>
                <SelectItem value="evening">Noche (18:00 - 23:00)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button className="w-full" size="lg">
              <Search className="w-4 h-4 mr-2"/>
              Buscar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
