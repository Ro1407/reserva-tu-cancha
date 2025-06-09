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
