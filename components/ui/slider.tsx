"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { formatDBPriceToCurrency } from "@/lib/utils"

interface SliderProps {
  defaultValue?: number[]
  value?: number
  max?: number
  min?: number
  step?: number
  className?: string
  onValueChange?: (value: number) => void
}

export function Slider({
                         value,
                         max = 100,
                         min = 0,
                         step = 10,
                         className = "",
                         onValueChange,
                       }: SliderProps) {
  const [internalValue, setInternalValue] = useState(max)
  const currentValue = value !== undefined ? value : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)

    if (onValueChange) {
      onValueChange(newValue)
    } else {
      setInternalValue(newValue)
    }
  }

  // Calcular porcentaje para el relleno
  const percentage = ((currentValue - min) / (max - min)) * 100

  return (
    <div className={`relative flex w-full touch-none select-none items-center ${className}`}>
      <div className="relative w-full h-2">
        {/* Track de fondo completo */}
        <div className="absolute w-full h-2 bg-gray-200 rounded-lg dark:bg-gray-700" />

        {/* Track activo (verde) - desde el inicio hasta el valor */}
        <div
          className="absolute h-2 bg-green-600 rounded-l-lg"
          style={{
            left: '0%',
            width: `${percentage}%`,
          }}
        />

        {/* Track inactivo (gris) - desde el valor hasta el final */}
        <div
          className="absolute h-2 bg-gray-300 rounded-r-lg dark:bg-gray-600"
          style={{
            left: `${percentage}%`,
            width: `${100 - percentage}%`,
          }}
        />

        {/* Input range */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-10 slider-thumb"
        />

        {/* Tooltip con valor actual */}
        <div
          className="absolute -top-8 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none"
          style={{ left: `${percentage}%` }}
        >
          {formatDBPriceToCurrency(currentValue)}
        </div>
      </div>

      <style jsx>{`
          .slider-thumb::-webkit-slider-thumb {
              appearance: none;
              height: 20px;
              width: 20px;
              border-radius: 50%;
              background: #16a34a;
              cursor: pointer;
              border: 2px solid white;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
              position: relative;
              z-index: 3;
          }

          .slider-thumb::-moz-range-thumb {
              height: 20px;
              width: 20px;
              border-radius: 50%;
              background: #16a34a;
              cursor: pointer;
              border: 2px solid white;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
              position: relative;
              z-index: 3;
              -moz-appearance: none;
          }

          .slider-thumb::-webkit-slider-runnable-track {
              background: transparent;
              border: none;
              height: 2px;
          }

          .slider-thumb::-moz-range-track {
              background: transparent;
              border: none;
              height: 2px;
          }

          .slider-thumb:focus {
              outline: none;
          }

          .slider-thumb:focus::-webkit-slider-thumb {
              box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.2);
          }
      `}</style>
    </div>
  )
}
