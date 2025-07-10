"use client";

import { useState } from "react";
import { useCalendar } from "@/context/calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getDaysInMonth, getYearRange } from "@/lib/utils";
import { daysOfWeek, monthNames } from "@/lib/definitions";

const BOOKING_WINDOW_DAYS: number = 14;

interface CalendarProps {
  selected?: Date;
  className?: string;
}

export function Calendar({ selected, className = "" }: CalendarProps) {
  const { selectedDate, setSelectedDate } = useCalendar();
  const [currentDate, setCurrentDate] = useState(selected || new Date());
  const [showYearSelector, setShowYearSelector] = useState<boolean>(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxdate = new Date();
  maxdate.setDate(today.getDate() + BOOKING_WINDOW_DAYS);
  maxdate.setHours(23, 59, 59, 999);

  const handleClick: (date: Date) => void = (date: Date): void => {
    setSelectedDate(date);
  };

  const navigateMonth: (direction: "prev" | "next") => void = (direction: "prev" | "next"): void => {
    if (canNavigateToMonth(direction)) {
      setCurrentDate((prev: Date): Date => {
        const newDate = new Date(prev);
        if (direction === "prev") newDate.setMonth(prev.getMonth() - 1);
        else newDate.setMonth(prev.getMonth() + 1);
        return newDate;
      });
    }
  };

  const selectYear: (year: number) => void = (year: number): void => {
    setCurrentDate((prev: Date): Date => {
      const newDate = new Date(prev);
      newDate.setFullYear(year);
      return newDate;
    });
    setShowYearSelector(false);
  };

  // verificar si una fecha está dentro del rango válido
  const isDateInValidRange: (date: Date) => boolean = (date: Date): boolean => {
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck >= today && dateToCheck <= maxdate;
  };

  const canNavigateToMonth: (direction: "prev" | "next") => boolean = (direction: "prev" | "next"): boolean => {
    const testDate = new Date(currentDate);
    if (direction === "prev") testDate.setMonth(currentDate.getMonth() - 1);
    else testDate.setMonth(currentDate.getMonth() + 1);

    // verificar si el mes tiene al menos un día válido
    const firstDayOfMonth = new Date(testDate.getFullYear(), testDate.getMonth(), 1);
    const lastDayOfMonth = new Date(testDate.getFullYear(), testDate.getMonth() + 1, 0);

    return (
      (firstDayOfMonth <= maxdate && lastDayOfMonth >= today) ||
      isDateInValidRange(firstDayOfMonth) ||
      isDateInValidRange(lastDayOfMonth)
    );
  };

  const days: (Date | null)[] = getDaysInMonth(currentDate);
  const years: number[] = getYearRange(currentDate.getFullYear());

  // filtrar años que tengan al menos un día válido
  const validYears: number[] = years.filter((year: number): boolean => {
    const firstDayOfYear = new Date(year, 0, 1);
    const lastDayOfYear = new Date(year, 11, 31);
    return firstDayOfYear <= maxdate && lastDayOfYear >= today;
  });

  return (
    <div className={`p-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={(): void => navigateMonth("prev")}
          disabled={!canNavigateToMonth("prev")}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={(): void => setShowYearSelector(!showYearSelector)}
          className="font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded"
        >
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </button>
        <button
          onClick={(): void => navigateMonth("next")}
          disabled={!canNavigateToMonth("next")}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Year Selector */}
      {showYearSelector && (
        <div className="mb-4 p-3 border border-gray-200 rounded-lg dark:border-gray-800">
          <div className="grid grid-cols-4 gap-2">
            {validYears.map((year: number) => (
              <button
                key={year}
                onClick={(): void => selectYear(year)}
                className={`p-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  year === currentDate.getFullYear() ? "bg-green-600 text-white hover:bg-green-700" : ""
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day: string) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date: Date | null, index: number) => {
          const isValidDate: boolean = date ? isDateInValidRange(date) : false;
          const isSelected: boolean | null = selectedDate && date && date.toDateString() == selectedDate.toDateString();
          const isToday: boolean | null = date && date.toDateString() == today.toDateString();

          return (
            <div key={index} className="p-1">
              {date ? (
                <button
                  onClick={(): void => handleClick(date)}
                  disabled={!isValidDate}
                  className={`w-full h-8 text-sm rounded transition-colors ${
                    isSelected
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : isValidDate
                        ? isToday
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 font-semibold"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        : "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {date.getDate()}
                </button>
              ) : (
                <div className="w-full h-8" />
              )}
            </div>
          );
        })}
      </div>

      {/* Información del rango */}
      <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
        <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
          Puedes seleccionar fechas desde hoy hasta {maxdate.toLocaleDateString("es-ES")}
        </p>
      </div>
    </div>
  );
}
