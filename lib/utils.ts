import { WeatherReport } from "@/types/weather-report";
import { TimeSlot } from "@/types/time-slot";

/**
 * Gets the current date in the format YYYY-MM-DD.
 * @param {Date} date - The date to format.
 * @return {string} The formatted date string.
 */
export const getDaysInMonth: (date: Date) => (Date | null)[] = (date: Date): (Date | null)[] => {
  const year: number = date.getFullYear();
  const month: number = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth: number = lastDay.getDate();
  const startingDayOfWeek: number = firstDay.getDay();
  const days: (Date | null)[] = [];

  // Add empty cells for days before the first day of the month
  for (let i: number = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let day: number = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }

  return days;
};

/**
 * Generates an array of years centered around the current year.
 * @param currentYear
 */
export const getYearRange: (currentYear: number) => number[] = (currentYear: number): number[] => {
  return Array.from({ length: 12 }, (_: number, i: number): number => currentYear - 6 + i);
};

/**
 * Formats a date string into a human-readable format.
 * @param {string} dateString - The date string to format.
 * @return {string} The formatted date string.
 */
export const formatDate: (dateString: string) => string = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Classifies the weather based on rain, clouds, and wind.
 * @param {Object} params - The weather parameters.
 * @param {number} params.rain - The amount of rain in mm.
 * @param {number} params.clouds - The percentage of cloud cover.
 * @param {number} params.wind - The wind speed in km/h.
 * @return {string} The classified weather state.
 */
export function classifyWeather({
  rain,
  clouds,
  wind,
}: {
  rain: number;
  clouds: number;
  wind: number;
}): WeatherReport["state"] {
  if (rain > 15) return "Tormentoso";
  if (rain > 1) return "Lluvioso";
  if (wind > 30) return "Ventoso";
  if (clouds > 60) return "Nublado";
  return "Soleado";
}

/**
 * Describes the weather conditions based on rain, clouds, and wind.
 * @param {Object} report - The weather report parameters.
 * @param {number} report.rain - The amount of rain in mm.
 * @param {number} report.clouds - The percentage of cloud cover.
 * @param {number} report.wind - The wind speed in km/h.
 * @return {string} A description of the weather conditions.
 */
export function describeWeather(report: { rain: number; clouds: number; wind: number }): string {
  const parts: string[] = [];

  if (report.rain > 15) parts.push("Tormentas fuertes");
  else if (report.rain > 1) parts.push("Probabilidad de lluvia");
  else if (report.clouds > 60) parts.push("Cielo nublado");
  else parts.push("Cielo despejado");

  if (report.wind > 30) parts.push("vientos intensos");
  else if (report.wind > 15) parts.push("brisa");

  return parts.join(" con ");
}

export function getHourTimeSlot(slot: TimeSlot): number {
  return Number(slot.time.split(":")[0]);
}
