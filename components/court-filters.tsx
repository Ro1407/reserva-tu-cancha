"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { Filter, RotateCcw } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { AmenitieKey, AmenitieValues, SportKey, SportValues } from "@/types/enumerates";
import { formatDBPriceToCurrency } from "@/lib/utils";

export interface CourtFilters {
  sports: string[]
  maxPrice: number
  location: string
  amenities: string[]
  onlyAvailable: boolean
}

function useCourtFilters(maxPrice: number) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const currentFilters: CourtFilters = {
    sports: searchParams.get("sports")?.split(",").filter(Boolean) || [],
    maxPrice: Number(searchParams.get("maxPrice")) || 0,
    location: searchParams.get("location") || "",
    amenities: searchParams.get("amenities")?.split(",").filter(Boolean) || [],
    onlyAvailable: searchParams.get("onlyAvailable") === "false",
  }

  const applyFilters = useCallback(
    (filters: CourtFilters) => {
      const params = new URLSearchParams(searchParams)
      params.set("page", "1")

      Object.entries(filters).forEach(([key, value]) => {
        if (key === "sports" || key === "amenities") {
          const arrayValue = value as string[]
          if (arrayValue.length > 0) {
            params.set(key, arrayValue.join(","))
          } else {
            params.delete(key)
          }
        } else if (key === "onlyAvailable") {
          if (value) {
            params.set(key, "true")
          } else {
            params.delete(key)
          }
        } else if (key === "maxPrice") {
          const numValue = value as number
          if (numValue > 0 && numValue < maxPrice) {
            params.set(key, numValue.toString())
          } else {
            params.delete(key)
          }
        } else {
          const stringValue = value as string
          if (stringValue.trim()) {
            params.set(key, stringValue.trim())
          } else {
            params.delete(key)
          }
        }
      })

      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, pathname, router],
  )

  const clearFilters = useCallback( ()  => {
    const params = new URLSearchParams(searchParams)

    // Mantener solo la página
    const page = params.get("page") || "1"
    params.delete("sports")
    params.delete("maxPrice")
    params.delete("location")
    params.delete("state")
    params.delete("amenities")
    params.delete("onlyAvailable")
    params.set("page", page)

    router.push(`${pathname}?${params.toString()}`)

  }, [searchParams, pathname, router])

  return {
    currentFilters,
    applyFilters,
    clearFilters
  }
}



function calculateStep(min: number, max: number, steps: number): number {
  const range = max - min;
  const rawStep = range / steps;

  return Math.round(rawStep / 100) * 100;
}

interface CourtFiltersProps {
  minPrice: number;
  maxPrice: number;
  courtsLocations: string[];
}

export default function CourtFilters({ minPrice, maxPrice, courtsLocations }: CourtFiltersProps) {
  const { currentFilters, applyFilters, clearFilters } = useCourtFilters(maxPrice)
  const [localFilters, setLocalFilters] = useState(currentFilters)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSportChange = (sport: SportKey, checked: boolean) => {
    setLocalFilters((prev) => ({
      ...prev,
      sports: checked ? [...prev.sports, sport] : prev.sports.filter((s) => s !== sport),
    }))
  }

  const handleAmenityChange = (amenity: AmenitieKey, checked: boolean) => {
    setLocalFilters((prev) => ({
      ...prev,
      amenities: checked ? [...prev.amenities, amenity] : prev.amenities.filter((a) => a !== amenity),
    }))
  }

  const handlePriceChange = useCallback(
    (value: number) => {
      if (!isNaN(value)) {
        setLocalFilters((prev) => ({ ...prev, maxPrice: value }))
      }
    },
    [],
  )

  const handleLocationChange = (value: string) => {
    setLocalFilters((prev) => ({ ...prev, location: value }))
  }

  const handleAvailabilityChange = (checked: boolean) => {
    setLocalFilters((prev) => ({ ...prev, onlyAvailable: checked }))
  }

  const handleApplyFilters = () => {
    applyFilters(localFilters)
  }

  const handleClearFilters = () => {
    clearFilters()
    setLocalFilters({
      sports: [],
      maxPrice: 0,
      location: "",
      amenities: [],
      onlyAvailable: false,
    })
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <CardTitle>Filtros</CardTitle>
            {Object.values(localFilters).some((value) => Array.isArray(value) ? value.length > 0 : value) && (
              <Badge variant={BadgeVariant.secondary} className="ml-2">
                {localFilters.sports.length +
                  localFilters.amenities.length +
                  (localFilters.location ? 1 : 0) +
                  (localFilters.onlyAvailable ? 1 : 0) +
                  (localFilters.maxPrice > 0 ? 1 : 0)}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {currentFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-white-600 hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Limpiar
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="lg:hidden">
              {isExpanded ? "Ocultar" : "Mostrar"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className={`space-y-6 ${!isExpanded ? "hidden lg:block" : ""}`}>
        {/* Deportes */}
        <div>
          <Label className="text-base font-medium mb-3 block">Deporte</Label>
          <div className="grid grid-cols-2 gap-2">
            {SportValues.map((sport: SportKey) => (
              <div key={sport} className="flex items-center space-x-2">
                <Checkbox
                  id={`sport-${sport}`}
                  checked={localFilters.sports.includes(sport)}
                  onCheckedChange={(checked) => handleSportChange(sport, checked)}
                />
                <Label htmlFor={`sport-${sport}`} className="text-sm cursor-pointer">{sport}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Precio */}
        <div>
          <Label className="text-base font-medium mb-3 block">Precio por hora</Label>
          <div className="px-2 pb-8">
            <Slider
              value={localFilters.maxPrice || maxPrice}
              onValueChange={handlePriceChange}
              max={maxPrice}
              min={minPrice}
              step={calculateStep(minPrice, maxPrice, 10)}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
              <span>{formatDBPriceToCurrency(minPrice)}</span>
              <span>{formatDBPriceToCurrency(maxPrice)}</span>
            </div>
          </div>
        </div>

        {/* Ubicación */}
        <div>
          <Label className="text-base font-medium mb-3 block">Ubicación</Label>
          <Select value={localFilters.location} onValueChange={handleLocationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Todas las ubicaciones" />
            </SelectTrigger>
            <SelectContent>
              {courtsLocations.length > 0 ? (
                courtsLocations.map((location) => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))
              ) : (
                <SelectItem value="">No hay ubicaciones disponibles</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Servicios */}
        <div>
          <Label className="text-base font-medium mb-3 block">Servicios</Label>
          <div className="grid grid-cols-1 gap-2 max-h-48">
            {AmenitieValues.map((amenity: AmenitieKey) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={`amenity-${amenity}`}
                  checked={localFilters.amenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked)}
                />
                <Label htmlFor={`amenity-${amenity}`} className="text-sm cursor-pointer">{amenity}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Disponibilidad */}
        <div className="space-y-3">
          <Label className="text-base font-medium mb-3 block">Disponibilidad</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="onlyAvailable"
                checked={localFilters.onlyAvailable}
                onCheckedChange={handleAvailabilityChange}
              />
              <Label htmlFor="onlyAvailable" className="cursor-pointer">Solo canchas disponibles</Label>
            </div>
          </div>
        </div>

        {/* Botón Aplicar Filtros */}
        <div className="pt-4">
          <Button onClick={handleApplyFilters} className="w-full">
            Aplicar filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}