"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReservationData, EditableReservationSchema } from "@/types/reservation";
import { FormMessage, FormMessageType } from "@/components/ui/form-messages";
import { Volver } from "@/components/ui/dashboard-buttons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UsersEmailId } from "@/types/users-email-id";
import { CourtNameId } from "@/types/court";
import { getAllCourtsNamesAndIds, getAllUsersEmailsAndIds } from "@/lib/actions-client";
import {
  ReservationStateKey,
  ReservationStateValues, TimeSlotKey,
  TimeSlotValues
} from "@/types/enumerates";
import { formatTimeSlotToString } from "@/lib/utils";
import { updateReservation } from "@/lib/actions-CRUD";

interface ReservationFormProps {
  actualReservation: ReservationData;
  reservationId: string;
}

export default function UpdateReservationForm({actualReservation, reservationId}: ReservationFormProps) {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [courts, setCourts] = useState<CourtNameId[]>([]);
  const [users, setUsers] = useState<UsersEmailId[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setFocus,
    formState: { errors, isLoading }
  } =
    useForm({
      resolver: zodResolver(EditableReservationSchema),
      defaultValues: actualReservation,
      mode: "onBlur"
    });

// Cargar canchas y usuarios al iniciar el formulario
  useEffect(() => {
    const fetchCourts = async (): Promise<CourtNameId[]> => {
      try {
        return await getAllCourtsNamesAndIds();
      } catch (error) {
        console.error("Error fetching courts:", error);
        return [];
      }
    };

    const fetchUsers = async (): Promise<UsersEmailId[]> => {
      try {
        return await getAllUsersEmailsAndIds();
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
    };

    Promise.all([fetchCourts(), fetchUsers()]).then(([courts, users]) => {
      setCourts(courts);
      setUsers(users);
    });
  }, []);

  async function onSubmit(data: ReservationData) {
    try {
      const result = await updateReservation(data, reservationId);

      if (result) {
        setSubmitStatus("success");

        // Limpiar formulario y mensaje después de 3 segundos
        setTimeout(() => {
          setSubmitStatus("idle");
          setFocus("userId"); // Focus en el primer campo después de reset
        }, 3000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    }
  }

  // Función para obtener el nombre de cancha por ID
  const getCourtNameById = (id: string): string => {
    const court = courts.find((c) => c.id === id);
    return court ? court.name : "";
  };

  // Función para obtener el email del usuario por ID
  const getUserNameById = (id: string): string => {
    const user = users.find((u) => u.id === id);
    return user ? user.email : "";
  };

  function onClear() {
    reset();
    setSubmitStatus("idle");
    setFocus("userId"); // Focus en el primer campo después de reset
  }

  // Focus en el primer campo al cargar el componente
  useEffect(() => {
    setFocus("userId");
  }, [setFocus]);

  // Focus en el primer campo con error después de submit
  useEffect(() => {
    const firstErrorField = Object.keys(errors)[0] as keyof ReservationData;
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
            <Volver volverHref="/dashboard/reservas" />
          </div>
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold">Editar Reserva</CardTitle>
            <CardTitle className="text-xl font-thin">
              Editá los campos para modificar la información de una reserva.
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="user">
                  Usuario *
                </Label>
                <Controller
                  control={control}
                  name="userId"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger
                        aria-describedby={errors.userId ? "user-error" : undefined}
                        aria-invalid={!!errors.userId}
                        className={errors.userId ? "border-red-500 focus:border-red-500" : ""}
                      >
                        <SelectValue placeholder="Seleccionar usuario" convertSelectedValue={getUserNameById}></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user: UsersEmailId) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.userId && (
                  <div id="user-error" role="alert" aria-live="polite">
                    <FormMessage type={FormMessageType.error}>{errors.userId.message}</FormMessage>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="court">
                  Cancha *
                </Label>
                <Controller
                  control={control}
                  name="courtId"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger
                        aria-describedby={errors.courtId ? "court-error" : undefined}
                        aria-invalid={!!errors.courtId}
                        className={errors.courtId ? "border-red-500 focus:border-red-500" : ""}
                      >
                        <SelectValue placeholder="Seleccionar cancha"
                                     convertSelectedValue={getCourtNameById}></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {courts.map((court: CourtNameId) => (
                          <SelectItem key={court.id} value={court.id}>
                            {court.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.courtId && (
                  <div id="court-error" role="alert" aria-live="polite">
                    <FormMessage type={FormMessageType.error}>{errors.courtId.message}</FormMessage>
                  </div>
                )}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha *</Label>
                <Input
                  type="date"
                  {...register("date")}
                  aria-describedby={errors.date ? "date-error" : undefined}
                  aria-invalid={!!errors.date}
                  placeholder="YYYY/MM/DD"
                  className={errors.date ? "border-red-500 focus:border-red-500" : ""}
                />
                {errors.date && (
                  <div id="date-error" role="alert" aria-live="polite">
                    <FormMessage type={FormMessageType.error}>{errors.date.message}</FormMessage>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">
                  Precio (pesos) *
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

              <div className="space-y-2">
                <Label htmlFor="state">
                  Estado *
                </Label>
                <Controller
                  control={control}
                  name="state"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        aria-describedby={errors.state ? "state-error" : undefined}
                        aria-invalid={!!errors.state}
                        className={errors.state ? "border-red-500 focus:border-red-500" : ""}
                      >
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {ReservationStateValues.map((state: ReservationStateKey) => (
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

            <fieldset className="space-y-4">
              <legend className="text-base font-medium">
                Horarios Disponibles
              </legend>
              <div
                className="grid gap-2 md:grid-cols-5"
                role="group"
                aria-describedby={errors.timeSlot ? "times-error" : "times-help"}
                aria-invalid={!!errors.timeSlot}
              >
                <div id="times-help" className="sr-only">
                  Selecciona al menos un horario para reservas de la cancha
                </div>
                {TimeSlotValues.map((time: TimeSlotKey) => (
                  <div key={time} className="flex items-center space-x-1">
                    <Controller
                      control={control}
                      name="timeSlot"
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Input
                            type="radio"
                            id={`time-${time}`}
                            value={time}
                            checked={value === time}
                            onChange={onChange}
                            aria-describedby={errors.timeSlot ? "times-error" : undefined}
                            className={`h-4 w-4 border-gray-300 cursor-pointer transition-colors ${errors.timeSlot ? "border-red-500 focus:ring-red-500" : ""} `}
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
              {errors.timeSlot && (
                <div id="times-error" role="alert" aria-live="polite">
                  <FormMessage type={FormMessageType.error}>{errors.timeSlot.message}</FormMessage>
                </div>
              )}
            </fieldset>

            {/* Solo mostrar mensajes después de obtener el resultado de la action */}
            {submitStatus != "idle" && (
              <div role="status" aria-live="polite" className="space-y-4">
                {submitStatus == "success" ? (
                  <FormMessage type={FormMessageType.success}>La reserva fue editada exitosamente</FormMessage>
                ) : (
                  <FormMessage type={FormMessageType.error}>
                    Ocurrió un error editando la reserva, por favor intente nuevamente
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
              <Button type="submit" className="flex-1" disabled={isLoading} title="Editar reserva(Enter)">
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Editando Reserva...
                  </>
                ) : (
                  "Editar Reserva"
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