"use server";

import { Coordinates, RawWeatherData, WeatherReport } from "@/types/weather-report";
import { classifyWeather, describeWeather } from "@/lib/utils";

async function getCoordinates(city: string): Promise<Coordinates> {
  const url: string = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
  const res: Response = await fetch(url);
  const data: any = await res.json();
  const location: any = data.results?.[0];

  if (!location) throw new Error("Ciudad no encontrada");

  return {
    latitude: location.latitude,
    longitude: location.longitude,
  };
}

async function getWeather(lat: number, lon: number, date: string): Promise<RawWeatherData> {
  const url: string = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,cloudcover,windspeed_10m&timezone=auto&start_date=${date}&end_date=${date}`;
  const res: Response = await fetch(url);
  return res.json();
}

export async function getWeatherReport(city: string, datetime: string): Promise<WeatherReport> {
  const { latitude, longitude }: Coordinates = await getCoordinates(city);
  const date: string = datetime.split("T")[0];
  const weatherData: RawWeatherData = await getWeather(latitude, longitude, date);
  const index: number = weatherData.hourly.time.findIndex((t: string): boolean => t === datetime);
  if (index === -1) throw new Error("Hora no disponible");

  const rain: number = weatherData.hourly.precipitation[index];
  const clouds: number = weatherData.hourly.cloudcover[index];
  const wind: number = weatherData.hourly.windspeed_10m[index];
  const temperature: number = weatherData.hourly.temperature_2m[index];

  const state: WeatherReport["state"] = classifyWeather({ rain, clouds, wind });
  const description: string = describeWeather({ rain, clouds, wind });

  return {
    date,
    state,
    temperature,
    rain,
    wind,
    clouds,
    description,
  };
}
