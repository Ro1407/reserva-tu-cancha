"use client"

import type React from "react"
import { createContext, useContext } from "react"
import Link from "next/link";

interface TabsContextType {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

interface TabsProps {
  children: React.ReactNode
  className?: string
}

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

interface TabsTriggerProps {
  tabKey: string
  tabHref: string
  isActive: boolean
  className?: string
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function Tabs({ children, className = "" }: TabsProps) {
  return <div className={className}>{children}</div>
}

export function TabsList({ children, className = "" }: TabsListProps) {
  return (
    <div
      className={`w-full h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 dark:bg-gray-800 dark:text-gray-400 ${className}`}
    >
      {children}
    </div>
  )
}

export function TabsTrigger({ tabKey, tabHref, isActive, className = "" }: TabsTriggerProps) {
  return (
    <Link
      key={tabKey}
      href={tabHref}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isActive
          ? "bg-white text-gray-950 shadow-sm dark:bg-gray-950 dark:text-gray-50"
          : "hover:bg-white/50 dark:hover:bg-gray-950/50"
      } ${className}`
    }
    >
      {tabKey}
    </Link>
  )
}

export function TabsContent({ value, children, className = "" }: TabsContentProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error("TabsContent must be used within Tabs")

  const { activeTab } = context

  if (activeTab !== value) return null

  return (
    <div
      className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </div>
  )
}
