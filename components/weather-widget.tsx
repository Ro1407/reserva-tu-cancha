import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, Droplets, Wind } from "lucide-react";
import { WeatherReport } from "@/lib/definitions";

/* TODO: obtener esto de la API del tiempo */
const weather: WeatherReport = {
  date: "2023/10/01",
  state: "Soleado",
  rain: 10,
  temperature: 22,
  wind: 15,
  clouds: 20,
  description: "¡Perfecto para jugar al aire libre!",
};

export function WeatherWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sun className="w-5 h-5 mr-2" /> {/*TODO: que esto cambie según el estado del tiempo*/}
          Tiempo para el día seleccionado
        </CardTitle>
        <span>{weather.date}</span>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Sun className="w-8 h-8 text-yellow-500 mr-3" />
            <div>
              <div className="text-2xl font-bold">{weather.temperature}°C</div>
              <div className="text-gray-600 dark:text-gray-400">{weather.state}</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <Droplets className="w-4 h-4 mx-auto text-blue-500" />
            <div className="text-sm font-medium">{weather.rain} %</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Lluvia</div>
          </div>
          <div className="space-y-1">
            <Wind className="w-4 h-4 mx-auto text-gray-500" />
            <div className="text-sm font-medium">{weather.wind} km/h</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Viento</div>
          </div>
          <div className="space-y-1">
            <Cloud className="w-4 h-4 mx-auto text-gray-400" />
            <div className="text-sm font-medium">{weather.clouds} %</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Nubes</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-green-50 rounded-lg dark:bg-green-950/20">
          <p className="text-sm text-green-700 text-center dark:text-green-300">{weather.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
