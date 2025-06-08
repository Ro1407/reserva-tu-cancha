"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarProps {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  className?: string
}

export function Calendar({ mode = "single", selected, onSelect, className = "" }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(selected)

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    onSelect?.(date)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)

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
        {daysOfWeek.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <div key={index} className="p-1">
            {date ? (
              <button
                onClick={() => handleDateClick(date)}
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
  )
}
