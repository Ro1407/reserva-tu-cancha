import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ContactForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Send className="w-5 h-5 mr-2" />
          Envíanos un mensaje
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          {/* name */}
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo *</Label>
            <Input required id="name" name="name" type="text" placeholder="Tu nombre completo" />
          </div>
          {/* email and phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input required id="email" name="email" type="email" placeholder="tu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+54 11 1234-5678" />
            </div>
          </div>
          {/* category */}
          <div className="space-y-2">
            <Label>Categoría *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reservas">Consultas sobre reservas</SelectItem>
                <SelectItem value="pagos">Problemas con pagos</SelectItem>
                <SelectItem value="cancelaciones">Cancelaciones y reembolsos</SelectItem>
                <SelectItem value="clubes">Información sobre clubes</SelectItem>
                <SelectItem value="tecnico">Soporte técnico</SelectItem>
                <SelectItem value="sugerencias">Sugerencias y mejoras</SelectItem>
                <SelectItem value="otros">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Asunto *</Label>
            <Input required id="subject" name="subject" type="text" placeholder="Breve descripción del tema" />
          </div>
          {/* message */}
          <div className="space-y-2">
            <Label htmlFor="message">Mensaje *</Label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="Describe tu consulta o problema en detalle..."
              className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-400 resize-none"
            />
          </div>
          {/* submit button */}
          <Button type="submit" className="w-full" size="lg">
            <Send className="w-4 h-4 mr-2" />
            Enviar mensaje
          </Button>
          <p className="text-xs text-gray-600 text-center dark:text-gray-400">
            Te responderemos en un plazo máximo de 24 horas
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
