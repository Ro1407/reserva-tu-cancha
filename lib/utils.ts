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
 * Formats a date string into ISO format
 * @param {Date} date - The date to format.
 * @return {string} The formatted date string.
 */
export const formatDateToISO: (date: Date) => string = (date: Date): string => {
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




