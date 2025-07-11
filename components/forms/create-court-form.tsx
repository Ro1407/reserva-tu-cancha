"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AmenitieKey, AmenitieValues,
  CourtStateKey,
  CourtStateValues,
  SportKey,
  SportValues,
  TimeSlotKey,
  TimeSlotValues
} from "@/types/enumerates";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormMessage, FormMessageType } from "@/components/ui/form-messages";
import { Volver } from "@/components/ui/dashboard-buttons";
import { createCourt } from "@/lib/actions-CRUD";
import { CourtData, EditableCourtSchema } from "@/types/court";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClubNameId } from "@/types/club";
import { getAllClubsNamesAndIds } from "@/lib/actions-client";
import { formatTimeSlotToString } from "@/lib/utils";


export default function CreateCourtForm() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [clubes, setClubes] = useState<ClubNameId[]>([]);

  const emptyCourt: CourtData = {
    name: "",
    address: "",
    clubId: "",
    sport: "Futbol" as SportKey,
    description: "",
    price: 0,
    amenities: [] as AmenitieKey[],
    state: "Activa" as CourtStateKey,
    timeSlots: [] as TimeSlotKey[]
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    setFocus,
    formState: { errors, isLoading }
  } =
    useForm({
      resolver: zodResolver(EditableCourtSchema),
      defaultValues: emptyCourt,
      mode: "onBlur"
    });

  // Cargar clubes al iniciar el formulario
  useEffect(() => {
    const fetchClubes = async (): Promise<ClubNameId[]> => {
      try {
        return await getAllClubsNamesAndIds();
      } catch (error) {
        console.error("Error fetching clubs:", error);
        return [];
      }
    };

    fetchClubes().then((clubes) => setClubes(clubes));
  }, []);

  async function onSubmit(data: CourtData) {
    try {
      const result = await createCourt(data);

      if (result) {
        setSubmitStatus("success")

        // Limpiar formulario y mensaje después de 3 segundos
        setTimeout(() => {
          setSubmitStatus("idle")
          reset()
          setFocus("name") // Focus en el primer campo después de reset
        }, 3000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    }
  }


// Función para obtener el nombre del club por ID
  const getClubNameById = (clubId: string): string => {
    const club = clubes.find((c) => c.id === clubId);
    return club ? club.name : "";
  };

  function onClear() {
    reset();
    setSubmitStatus("idle");
    setFocus("name"); // Focus en el primer campo después de reset
  }

  // Focus en el primer campo al cargar el componente
  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  // Focus en el primer campo con error después de submit
  useEffect(() => {
    const firstErrorField = Object.keys(errors)[0] as keyof CourtData;
    if (firstErrorField) {
      setFocus(firstErrorField);
    }
  }, [errors, setFocus]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl + Enter para enviar
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        handleSubmit(onSubmit)();
      }
      // Escape para limpiar
      if (event.key === "Escape") {
        event.preventDefault();
        onClear();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleSubmit]);

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="self-start">
            <Volver volverHref="/dashboard" />
          </div>
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold">Crear Nueva Cancha</CardTitle>
            <CardTitle className="text-xl font-thin">
              Completa los campos para crear una nueva cancha para un club deportivo.
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la Cancha *</Label>
                <Input {...register("name")} id="name" name="name"
                       aria-describedby={errors.name ? "name-error" : undefined}
                       aria-invalid={!!errors.name}
                       className={errors.name ? "border-red-500 focus:border-red-500" : ""}
                       placeholder="Ej: Cancha Tenis - Norte" />
                {errors.name &&
                  <div id="name-error" aria-live="polite" aria-atomic="true" role="alert">
                    <FormMessage type={FormMessageType.error}>{errors.name.message}</FormMessage>
                  </div>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección *</Label>
                <Input {...register("address")} id="address" name="address"
                       aria-describedby={errors.address ? "address-error" : undefined}
                       aria-invalid={!!errors.address}
                       className={errors.address ? "border-red-500 focus:border-red-500" : ""}
                       placeholder="Ej: Calle Principal 123" />
                {errors.address &&
                  <div id="address-error" aria-live="polite" aria-atomic="true" role="alert">
                    <FormMessage type={FormMessageType.error}>{errors.address.message}</FormMessage>
                  </div>}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="club">
                  Club *
                </Label>
                <Controller
                  control={control}
                  name="clubId"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger
                        aria-describedby={errors.clubId ? "club-error" : undefined}
                        aria-invalid={!!errors.clubId}
                        className={errors.clubId ? "border-red-500 focus:border-red-500" : ""}
                      >
                        <SelectValue placeholder="Seleccionar club"
                                     convertSelectedValue={getClubNameById}></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {clubes.map((club: ClubNameId) => (
                          <SelectItem key={club.id} value={club.id}>
                            {club.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.clubId && (
                  <div id="club-error" role="alert" aria-live="polite">
                    <FormMessage type={FormMessageType.error}>{errors.clubId.message}</FormMessage>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">
                  Precio por hora (pesos) *
                </Label>
                <Input
                  {...register("price", { valueAsNumber: true })}
                  id="price"
                  type="number"
                  className={`${errors.price ? "border-red-500 focus:border-red-500" : ""} [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]`}
                  aria-describedby={errors.price ? "price-error" : undefined}
                  aria-invalid={!!errors.price}
                  placeholder="Ej: 10000"
                />
                {errors.price && (
                  <div id="price-error" role="alert" aria-live="polite">
                    <FormMessage type={FormMessageType.error}>{errors.price.message}</FormMessage>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sport">
                  Deporte *
                </Label>
                <Controller
                  control={control}
                  name="sport"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value as SportKey}>
                      <SelectTrigger
                        aria-describedby={errors.sport ? "sport-error" : undefined}
                        aria-invalid={!!errors.sport}
                        className={errors.sport ? "border-red-500 focus:border-red-500" : ""}
                      >
                        <SelectValue placeholder="Seleccionar deporte" convertSelectedValue={(value) => (value)} />
                      </SelectTrigger>
                      <SelectContent>
                        {SportValues.map((sport: SportKey) => (
                          <SelectItem key={sport} value={sport}>
                            {sport}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.sport && (
                  <div id="sport-error" role="alert" aria-live="polite">
                    <FormMessage type={FormMessageType.error}>{errors.sport.message}</FormMessage>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">
                  Estado *
                </Label>
                <Controller
                  control={control}
                  name="state"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value as TimeSlotKey}>
                      <SelectTrigger
                        aria-describedby={errors.state ? "state-error" : undefined}
                        aria-invalid={!!errors.state}
                        className={errors.state ? "border-red-500 focus:border-red-500" : ""}
                      >
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {CourtStateValues.map((state: CourtStateKey) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.state && (
                  <div id="state-error" role="alert" aria-live="polite">
                    <FormMessage type={FormMessageType.error}>{errors.state.message}</FormMessage>
                  </div>
                )}
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
                placeholder="Describe la cancha, sus instalaciones y servicios..."
              />
              <div id="description-error" aria-live="polite" aria-atomic="true" role="alert">
                {errors.description &&
                  <FormMessage type={FormMessageType.error}>{errors.description.message}</FormMessage>}
              </div>
            </div>

            <fieldset className="space-y-4">
              <legend className="text-base font-medium">
                Servicios Disponibles
              </legend>
              <div
                className="grid gap-3 md:grid-cols-2"
                role="group"
                aria-describedby={errors.amenities ? "amenities-error" : "amenities-help"}
                aria-invalid={!!errors.amenities}
              >
                <div id="amenities-help" className="sr-only">
                  Selecciona al menos un servicio que caracteriza a la cancha
                </div>
                {AmenitieValues.map((amenitie: AmenitieKey) => (
                  <div key={amenitie} className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="amenities"
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Checkbox
                            id={`amenitie-${amenitie}`}
                            onCheckedChange={(checked) => {
                              const updatedAmenities = checked ? [...value, amenitie] : value.filter((a) => a !== amenitie);
                              onChange(updatedAmenities);
                            }}
                            checked={value?.includes(amenitie)}
                            aria-describedby={errors.amenities ? "amenities-error" : undefined}
                          />
                          <Label htmlFor={`amenitie-${amenitie}`} className="text-sm font-normal cursor-pointer">
                            {amenitie}
                          </Label>
                        </>
                      )}
                    />
                  </div>
                ))}
              </div>
              {errors.amenities && (
                <div id="amenities-error" role="alert" aria-live="polite">
                  <FormMessage type={FormMessageType.error}>{errors.amenities.message}</FormMessage>
                </div>
              )}
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-base font-medium">
                Horarios Disponibles
              </legend>
              <div
                className="grid gap-3 md:grid-cols-2"
                role="group"
                aria-describedby={errors.timeSlots ? "times-error" : "times-help"}
                aria-invalid={!!errors.timeSlots}
              >
                <div id="times-help" className="sr-only">
                  Selecciona al menos un horario para reservas de la cancha
                </div>
                {TimeSlotValues.map((time: TimeSlotKey) => (
                  <div key={time} className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="timeSlots"
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Checkbox
                            id={`time-${time}`}
                            onCheckedChange={(checked) => {
                              const updatedTimes = checked ? [...value, time] : value.filter((t) => t !== time);
                              onChange(updatedTimes);
                            }}
                            checked={value?.includes(time)}
                            aria-describedby={errors.timeSlots ? "times-error" : undefined}
                          />
                          <Label htmlFor={`time-${time}`} className="text-sm font-normal cursor-pointer">
                            {formatTimeSlotToString(time)}
                          </Label>
                        </>
                      )}
                    />
                  </div>
                ))}
              </div>
              {errors.timeSlots && (
                <div id="times-error" role="alert" aria-live="polite">
                  <FormMessage type={FormMessageType.error}>{errors.timeSlots.message}</FormMessage>
                </div>
              )}
            </fieldset>

            {/* Solo mostrar mensajes después de obtener el resultado de la action */}
            {submitStatus != "idle" && (
              <div role="status" aria-live="polite" className="space-y-4">
                {submitStatus == "success" ? (
                  <FormMessage type={FormMessageType.success}>La cancha fue creada exitosamente</FormMessage>
                ) : (
                  <FormMessage type={FormMessageType.error}>
                    Ocurrió un error creando la cancha, por favor intente nuevamente
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
                title="Limpiar formulario (Esc)"
              >
                Limpiar
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading} title="Crear cancha (Enter)">
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Creando Cancha...
                  </>
                ) : (
                  "Crear Cancha"
                )}
              </Button>
            </div>

            {/* Ayuda de teclado */}
            <div className="text-bold text-gray-500 text-center space-y-1">
              <p>
                💡 <strong>Atajos de teclado:</strong>
              </p>
              <p>Ctrl + Enter: Enviar formulario | Escape: Limpiar formulario</p>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
