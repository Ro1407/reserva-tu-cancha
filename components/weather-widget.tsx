"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, Droplets, Wind } from "lucide-react";
import { useCalendar } from "@/context/calendar";
import { getWeatherReport } from "@/lib/weather";
import { WeatherReport } from "@/types/weather-report";

interface WeatherWidgetProps {
  city: string;
}

function getIcon(state: WeatherReport["state"]) {
  switch (state) {
    case "Soleado":
      return <Sun className="w-5 h-5 text-yellow-500 mr-2" />;
    case "Nublado":
      return <Cloud className="w-5 h-5 text-gray-400 mr-2" />;
    case "Lluvioso":
      return <Droplets className="w-5 h-5 text-blue-500 mr-2" />;
    case "Ventoso":
      return <Wind className="w-5 h-5 text-gray-500 mr-2" />;
  }
}

export function WeatherWidget({ city }: WeatherWidgetProps) {
  const { selectedDate } = useCalendar();
  const [weather, setWeather] = useState<WeatherReport | null>(null);

  useEffect((): void => {
    /* TODO: cambiar esto para que use el prop "city",
    *        cuando este garantizado que el valor de court.location
    *        es por ejemplo "Buenos Aires" y no "CABA, Belgrano" */
    getWeatherReport("bahía blanca", selectedDate.toISOString().slice(0, 16)).then((data: WeatherReport): void => {
      setWeather(data);
    });
  }, [selectedDate]);

  if (weather)
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">Tiempo para el día seleccionado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {getIcon(weather.state)}
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
