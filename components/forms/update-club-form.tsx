"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SportKey, SportValues } from "@/types/enumerates";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditableClubSchema, ClubData } from "@/types/club";
import { FormMessage, FormMessageType } from "@/components/ui/form-messages";
import { Volver } from "@/components/ui/dashboard-buttons";
import { updateClub } from "@/lib/actions-CRUD";

interface UpdateClubFormProps {
  actualClub: ClubData;
  clubId: string;
}

export default function UpdateClubForm({actualClub, clubId} : UpdateClubFormProps) {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    control,
    reset,
    setFocus,
    formState: { errors, isLoading } } =
    useForm({
      resolver: zodResolver(EditableClubSchema),
      defaultValues: actualClub,
      mode: "onBlur"
    });

  async function onSubmit(data: ClubData) {
    try {
      const result = await updateClub(data, clubId)

      if (result) {
        setSubmitStatus("success")

        // Limpiar formulario y mensaje después de 3 segundos
        setTimeout(() => {
          setSubmitStatus("idle")
          setFocus("name") // Focus en el primer campo después de reset
        }, 3000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    }
  }

  function onClear() {
    reset()
    setSubmitStatus("idle")
    setFocus("name") // Focus en el primer campo después de reset
  }

  // Focus en el primer campo con error después de submit
  useEffect(() => {
    const firstErrorField = Object.keys(errors)[0] as keyof ClubData
    if (firstErrorField) {
      setFocus(firstErrorField)
    }
  }, [errors, setFocus])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl + Enter para enviar
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault()
        handleSubmit(onSubmit)()
      }
      // Escape para limpiar
      if (event.key === "Escape") {
        event.preventDefault()
        onClear()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleSubmit])


  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="self-start">
            <Volver volverHref="/dashboard/clubes"/>
          </div>
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold">Editar un Club</CardTitle>
            <CardTitle className="text-xl font-thin">
              Editá los campos modificar la información de un club deportivo.
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Club *</Label>
                <Input {...register("name")} id="name" name="name"  aria-describedby={errors.name ? "name-error" : undefined}
                       aria-invalid={!!errors.name}
                       className={errors.name ? "border-red-500 focus:border-red-500" : ""}
                       placeholder="Ej: Club Deportivo Central" />
                <div id="name-error" aria-live="polite" aria-atomic="true" role="alert">
                  {errors.name && <FormMessage type={FormMessageType.error}>{errors.name.message}</FormMessage>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input {...register("phone")} id="phone" name="phone" type="tel"
                       placeholder="Ej: +54 291 111-1111"
                       aria-describedby={errors.phone ? "phone-error" : undefined}
                       aria-invalid={!!errors.phone}
                       className={errors.phone ? "border-red-500 focus:border-red-500" : ""}/>
                <div id="phone-error" aria-live="polite" aria-atomic="true" role="alert">
                  {errors.phone && <FormMessage type={FormMessageType.error}>{errors.phone.message}</FormMessage>}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                {...register("description")}
                id="description"
                name="description"
                className={`min-h-[100px] ${errors.description ? "border-red-500 focus:border-red-500" : ""}`}
                aria-describedby={errors.description ? "description-error" : undefined}
                aria-invalid={!!errors.description}
                placeholder="Describe el club, sus instalaciones y servicios..."
              />
              <div id="description-error" aria-live="polite" aria-atomic="true" role="alert">
                {errors.description && <FormMessage type={FormMessageType.error}>{errors.description.message}</FormMessage>}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Ubicación *</Label>
                <Input {...register("location")} id="location" name="location"   aria-describedby={errors.location ? "location-error" : undefined}
                       aria-invalid={!!errors.location}
                       className={errors.location ? "border-red-500 focus:border-red-500" : ""}
                       placeholder="Ej: Madrid, España" />
                <div id="location-error" aria-live="polite" aria-atomic="true" role="alert">
                  {errors.location && <FormMessage type={FormMessageType.error}>{errors.location.message}</FormMessage>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección *</Label>
                <Input {...register("address")} id="address" name="address" aria-describedby={errors.address ? "address-error" : undefined}
                       aria-invalid={!!errors.address}
                       className={errors.address ? "border-red-500 focus:border-red-500" : ""}
                       placeholder="Ej: Calle Principal 123" />
                <div id="address-error" aria-live="polite" aria-atomic="true" role="alert">
                  {errors.address && <FormMessage type={FormMessageType.error}>{errors.address.message}</FormMessage>}
                </div>
              </div>
            </div>

            <fieldset className="space-y-4">
              <legend className="text-base font-medium">
                Deportes Disponibles
              </legend>
              <div
                className="grid gap-3 md:grid-cols-2"
                role="group"
                aria-describedby={errors.sports ? "sports-error" : "sports-help"}
                aria-invalid={!!errors.sports}
              >
                <div id="sports-help" className="sr-only">
                  Selecciona al menos un deporte que estará disponible en el club
                </div>
                {SportValues.map((sport: SportKey) => (
                  <div key={sport} className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="sports"
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Checkbox
                            id={`sport-${sport}`}
                            onCheckedChange={(checked) => {
                              const updatedSports = checked ? [...value, sport] : value.filter((s) => s !== sport)
                              onChange(updatedSports)
                            }}
                            checked={value?.includes(sport)}
                            aria-describedby={errors.sports ? "sports-error" : undefined}
                          />
                          <Label htmlFor={`sport-${sport}`} className="text-sm font-normal cursor-pointer">
                            {sport}
                          </Label>
                        </>
                      )}
                    />
                  </div>
                ))}
              </div>
              {errors.sports && (
                <div id="sports-error" role="alert" aria-live="polite">
                  <FormMessage type={FormMessageType.error}>{errors.sports.message}</FormMessage>
                </div>
              )}
            </fieldset>

            {/* Solo mostrar mensajes después de obtener el resultado de la action */}
            {submitStatus != "idle" && (
              <div role="status" aria-live="polite" className="space-y-4">
                { submitStatus == "success"? (
                  <FormMessage type={FormMessageType.success}>El club fue editado exitosamente</FormMessage>
                ) : (
                  <FormMessage type={FormMessageType.error}>
                    Ocurrió un error editando el club, por favor intente nuevamente
                  </FormMessage>
                )}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={onClear}
                title="Deshacer cambios del formulario (Esc)"
              >
                Deshacer cambios
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading} title="Crear club (Enter)">
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Editando el Club...
                  </>
                ) : (
                  "Editar Club"
                )}
              </Button>
            </div>

            {/* Ayuda de teclado */}
            <div className="text-bold text-gray-500 text-center space-y-1">
              <p>
                💡 <strong>Atajos de teclado:</strong>
              </p>
              <p>Ctrl + Enter: Enviar formulario | Escape: Deshacer cambios del formulario</p>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );

}