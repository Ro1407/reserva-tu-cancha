"use client";

import type React from "react";

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
import { FormMessage } from "@/components/ui/form-messages";
import { Volver } from "@/components/ui/dashboard-buttons";

interface ClubFormProps{
  onSubmitAction: (data: ClubData) => void;
  initialState: ClubData;
  submitSuccessfulMessage: string;
  loadingMessage: string;
  submitButtonMessage: string;
}

export default function ClubForm({onSubmitAction, initialState, submitSuccessfulMessage, loadingMessage, submitButtonMessage}: ClubFormProps) {

  const { register, handleSubmit, control, reset, formState: { errors, isLoading, isSubmitSuccessful } } =
    useForm({
      resolver: zodResolver(EditableClubSchema),
      defaultValues: initialState
    });

  const onSubmit = async (data: ClubData) => {
    try {
      onSubmitAction(data)
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="self-start">
            <Volver volverHref="/dashboard/clubes"/>
          </div>
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold">Crear Nuevo Club</CardTitle>
            <CardTitle className="text-xl font-thin">
              Completa los campos para crear un nuevo club deportivo.
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Club *</Label>
                <Input {...register("name")} id="name" name="name" aria-describedby={"name-error"}
                       placeholder="Ej: Club Deportivo Central" />
                <div id="name-error" aria-live="polite" aria-atomic="true">
                  {errors.name && <FormMessage type={"error"}>{errors.name.message}</FormMessage>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input {...register("phone")} id="phone" name="phone" type="tel" aria-describedby={"phone-error"}
                       placeholder="Ej: +54 291 111-1111" />
                <div id="phone-error" aria-live="polite" aria-atomic="true">
                  {errors.phone && <FormMessage type={"error"}>{errors.phone.message}</FormMessage>}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                {...register("description")}
                id="description"
                name="description"
                aria-describedby={"description-error"}
                placeholder="Describe el club, sus instalaciones y servicios..."
                className="min-h-[100px]"
              />
              <div id="description-error" aria-live="polite" aria-atomic="true">
                {errors.description && <FormMessage type={"error"}>{errors.description.message}</FormMessage>}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Ubicación *</Label>
                <Input {...register("location")} id="location" name="location" aria-describedby={"location-error"}
                       placeholder="Ej: Madrid, España" />
                <div id="location-error" aria-live="polite" aria-atomic="true">
                  {errors.location && <FormMessage type={"error"}>{errors.location.message}</FormMessage>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección *</Label>
                <Input {...register("address")} id="address" name="address" aria-describedby={"address-error"}
                       placeholder="Ej: Calle Principal 123" />
                <div id="address-error" aria-live="polite" aria-atomic="true">
                  {errors.address && <FormMessage type={"error"}>{errors.address.message}</FormMessage>}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Deportes Disponibles *</Label>
              <div className="grid gap-3 md:grid-cols-2">
                {SportValues.map((sport: SportKey) => (
                  <div key={sport} className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="sports"
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Checkbox
                            id={sport}
                            onCheckedChange={(checked) => {
                              const updatedSports = checked
                                ? [...value, sport]
                                : value.filter((s) => s !== sport);
                              onChange(updatedSports);
                            }}
                            checked={value?.includes(sport)}
                          />
                          <Label htmlFor={sport} className="text-sm font-normal cursor-pointer"
                                 aria-describedby={"sport-error"}>
                            {sport}
                          </Label>
                        </>
                      )}
                    />
                  </div>
                ))}
              </div>
              <div id="sport-error" aria-live="polite" aria-atomic="true">
                {errors.sports && <FormMessage type={"error"}>{errors.sports.message}</FormMessage>}
              </div>
            </div>
            <div className="space-y-4">
              {isSubmitSuccessful && <FormMessage type={"success"}>{submitSuccessfulMessage}</FormMessage>}
            </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => reset()}
                >
                  Limpiar
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? loadingMessage : submitButtonMessage}
                </Button>
              </div>
          </form>
        </CardContent>
      </Card>
    </div>
);
}