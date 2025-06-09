"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getDaysInMonth } from "@/lib/utils";
import { daysOfWeek, monthNames } from "@/lib/data";

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

export function Calendar({ selected, onSelect, className = "" }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(selected || new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(selected || new Date());

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

  const days: (Date | null)[] = getDaysInMonth(currentDate);

  return (
    <div className={`p-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigateMonth("prev")} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h2 className="font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button onClick={() => navigateMonth("next")} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

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
