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

/**
 * Converts a base64 URL string to a Uint8Array.
 * @param {string} base64String - The base64 URL string to convert.
 * @return {Uint8Array} The converted Uint8Array.
 */
export function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding: string = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64: string = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData: string = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i: number = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Formats a date string into ISO format
 * @param {Date} date - The date to format.
 * @return {string} The formatted date string.
 */
export const formatDateToISO: (date: Date) => string = (date: Date): string => {
  if (!date) return "";
  return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD
}


/**
 * Formats a price in cents to a currency string.
 * @param {number} priceInCents - The price in cents to format.
 * @return {string} The formatted price string.
 */
export const formatDBPriceToCurrency = (priceInCents: number): string => {
  return Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(priceInCents / 100);
}

/**
 * Converts a currency string to a price in cents.
 * @param {string} price - The price string to convert.
 * @return {number} The price in cents.
 */
export const formatCurrencyToDBPrice = (price: string): number => {
  const numericValue = price.replace(/[^0-9,.-]/g, "").replace(",", ".");
  return Math.round(parseFloat(numericValue) * 100);
}

/**
 * Formats a time slot to a human-readable string.
 * @param {string} timeSlot - The time slot to format.
 * @return {string} The formatted time slot string.
 */
export const formatTimeSlotToString = (timeSlot: string): string => {
  const hour = parseInt(timeSlot.slice(1, 3), 10);
  const minute = parseInt(timeSlot.slice(3, 5), 10);
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

/**
 * Formats ISO date string to DD-MM-YYYY date string.
 * @param {string} isoDate - The ISO date string to format.
 * @return {string} The formatted date string.
 */
export const formatISODateToHumanReadable = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("es-ES", {
    timeZone: "UTC",
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

/**
 * Formats a phone number into the string format +54 9 XXX XXX XXXX.
 * @param {string} phoneNumber - The unformatted phone number (e.g., 1141234567).
 * @return {string} The formatted phone number.
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  const countryCode = "+54";
  const mobilePrefix = "9";
  const areaCode = phoneNumber.slice(0, 3);
  const firstPart = phoneNumber.slice(3, 6);
  const secondPart = phoneNumber.slice(6, 10);
  return `${countryCode} ${mobilePrefix} ${areaCode} ${firstPart}-${secondPart}`;
};

/**
 * Converts a time string in HH:mm format to THHMM format.
 * @param time
 */
export const convertTimeToTHHMM = (time: string): string => {
  return `T${time.replace(":", "")}`;
};


/**
 * Generates an array of page numbers for pagination.
 * @param {number} currentPage - The current page number.
 * @param {number} totalPages - The total number of pages.
 * @return {Array<number|string>} An array of page numbers and ellipses.
 */
export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};




