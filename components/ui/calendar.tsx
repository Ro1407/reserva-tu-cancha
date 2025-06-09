"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getDaysInMonth, getYearRange } from "@/lib/utils";
import { daysOfWeek, monthNames } from "@/lib/definitions";

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

export function Calendar({ selected, onSelect, className = "" }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(selected || new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(selected || new Date());
  const [showYearSelector, setShowYearSelector] = useState<boolean>(false);

  const handleClick: (date: Date) => void = (date: Date): void => {
    setSelectedDate(date);
    onSelect?.(date);
  };

  const navigateMonth: (direction: "prev" | "next") => void = (direction: "prev" | "next"): void => {
    setCurrentDate((prev: Date): Date => {
      const newDate = new Date(prev);
      if (direction === "prev") newDate.setMonth(prev.getMonth() - 1);
      else newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const selectYear: (year: number) => void = (year: number): void => {
    setCurrentDate((prev: Date): Date => {
      const newDate = new Date(prev);
      newDate.setFullYear(year);
      return newDate;
    });
    setShowYearSelector(false);
  };

  const days: (Date | null)[] = getDaysInMonth(currentDate);
  const years: number[] = getYearRange(currentDate.getFullYear());

  return (
    <div className={`p-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigateMonth("prev")} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => setShowYearSelector(!showYearSelector)}
          className="font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded"
        >
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </button>
        <button onClick={() => navigateMonth("next")} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Year Selector */}
      {showYearSelector && (
        <div className="mb-4 p-3 border border-gray-200 rounded-lg dark:border-gray-800">
          <div className="grid grid-cols-4 gap-2">
            {years.map((year: number) => (
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
        {days.map((date: Date | null, index: number) => (
          <div key={index} className="p-1">
            {date ? (
              <button
                onClick={(): void => handleClick(date)}
                className={`w-full h-8 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  selectedDate && date.toDateString() === selectedDate.toDateString()
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : ""
                }`}
              >
                {date.getDate()}
              </button>
            ) : (
              <div className="w-full h-8" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
