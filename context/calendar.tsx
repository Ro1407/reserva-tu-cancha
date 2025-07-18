"use client";

import React, { Context, createContext, useContext, useState } from "react";

export interface CalendarContextProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const CalendarContext: Context<CalendarContextProps | null> = createContext<{
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
} | null>(null);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
  return <CalendarContext.Provider value={{ selectedDate, setSelectedDate }}>{children}</CalendarContext.Provider>;
}

export function useCalendar(): CalendarContextProps {
  const context: CalendarContextProps | null = useContext(CalendarContext);
  if (!context) throw new Error("useCalendar must be used within a CalendarProvider");
  return context;
}
