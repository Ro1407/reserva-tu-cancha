"use client"

import type React from "react"
import { useState } from "react"

interface SliderProps {
  defaultValue?: number[]
  max?: number
  min?: number
  step?: number
  className?: string
  onValueChange?: (value: number[]) => void
}

export function Slider({
  defaultValue = [0],
  max = 100,
  min = 0,
  step = 1,
  className = "",
  onValueChange,
}: SliderProps) {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = [Number.parseInt(e.target.value)]
    setValue(newValue)
    onValueChange?.(newValue)
  }

  return (
    <div className={`relative flex w-full touch-none select-none items-center ${className}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider"
      />
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #16a34a;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #16a34a;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}
