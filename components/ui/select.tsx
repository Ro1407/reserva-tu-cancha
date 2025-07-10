"use client"

import React, { useState } from "react"
import { ChevronDown } from "lucide-react"

interface SelectProps {
  children: React.ReactNode
  onValueChange?: (value: string) => void
}

interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
}

interface SelectContentProps {
  children: React.ReactNode
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
  onSelect?: (value: string) => void
}

interface SelectValueProps {
  placeholder?: string
}

const SelectContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  selectedValue: string
  setSelectedValue: (value: string) => void
  onValueChange?: (value: string) => void
}>({
  isOpen: false,
  setIsOpen: () => {},
  selectedValue: "",
  setSelectedValue: () => {},
})

export function Select({ children, onValueChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState("")

  const handleValueChange = (value: string) => {
    setSelectedValue(value)
    setIsOpen(false)
    onValueChange?.(value)
  }

  return (
    <SelectContext.Provider
      value={{
        isOpen,
        setIsOpen,
        selectedValue,
        setSelectedValue: handleValueChange,
        onValueChange,
      }}
    >
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({ children, className = "" }: SelectTriggerProps) {
  const { isOpen, setIsOpen } = React.useContext(SelectContext)

  return (
    <button
      type="button"
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-950 dark:text-white ${className}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
}

export function SelectValue({ placeholder }: SelectValueProps) {
  const { selectedValue } = React.useContext(SelectContext)

  return <span className={selectedValue ? "" : "text-gray-500 dark:text-gray-400"}>{selectedValue || placeholder}</span>
}

export function SelectContent({ children }: SelectContentProps) {
  const { isOpen } = React.useContext(SelectContext)

  if (!isOpen) return null

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-950">
      {children}
    </div>
  )
}

export function SelectItem({ value, children, onSelect }: SelectItemProps) {
  const { setSelectedValue } = React.useContext(SelectContext)

  const handleClick = () => {
    setSelectedValue(value)
    onSelect?.(value)
  }

  return (
    <div className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800" onClick={handleClick}>
      {children}
    </div>
  )
}
