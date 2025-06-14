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
