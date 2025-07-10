"use client"

import { useState } from "react"
import { Check } from "lucide-react"

interface CheckboxProps {
  id?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
}

export function Checkbox({ id, checked: controlledChecked, onCheckedChange, className = "" }: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(false)
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked

  const handleChange = () => {
    const newChecked = !isChecked
    if (controlledChecked === undefined) {
      setInternalChecked(newChecked)
    }
    onCheckedChange?.(newChecked)
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      id={id}
      className={`peer h-4 w-4 shrink-0 rounded-sm border border-gray-300 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:ring-offset-gray-950 ${
        isChecked ? "bg-green-600 text-white border-green-600" : "bg-white dark:bg-gray-950"
      } ${className}`}
      onClick={handleChange}
    >
      {isChecked && <Check className="h-3 w-3" />}
    </button>
  )
}
