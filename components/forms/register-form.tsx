"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerUser, existsUserByEmail } from "@/lib/actions";
import { UserForm, UserFormSchema } from "@/types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormMessage, FormMessageType } from "@/components/ui/form-messages";

export function RegisterForm() {
  const { replace } = useRouter();
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emptyUserForm: UserForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    acceptMarketing: false,
  };

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    getValues,
    setValue,
    formState: { errors, isLoading, isValidating } } =
    useForm({
      resolver: zodResolver(UserFormSchema),
      defaultValues: emptyUserForm,
      mode: "onBlur"
    });

  async function onSubmit(data: UserForm) {

    if (getValues("password") !== getValues("confirmPassword")) {
      setValidationError("Las contraseñas no coinciden");
      setSubmitStatus("error");
      return;
    }

    if (!getValues("acceptTerms")) {
      setValidationError("Debes aceptar los términos y condiciones");
      setSubmitStatus("error");
      return;
    }

    if (await existsUserByEmail(getValues("email"))) {
      setValidationError("Ya existe un usuario registrado con ese email");
      setSubmitStatus("error");
      return;
    }

    try {
      await registerUser({
        name: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      setSubmitStatus("success");
    } catch (error) {
      console.error("Error en el registro:", error);
      setValidationError("Error al crear la cuenta. Por favor, intenta nuevamente más tarde.");
      setSubmitStatus("error");
    } finally {
      replace("/");
    }
  };


  function onClear() {
    reset()
    setSubmitStatus("idle")
    setFocus("firstName") // Focus en el primer campo después de reset
  }

  // Focus en el primer campo al cargar el componente
  useEffect(() => {
    setFocus("firstName")
  }, [setFocus])

  // Focus en el primer campo con error después de submit
  useEffect(() => {
    const firstErrorField = Object.keys(errors)[0] as keyof UserForm
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
    <Card className="shadow-lg">
      <CardHeader className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-lg bg-green-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">RC</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Crear cuenta</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Únete a ReserváTuCancha y comienza a reservar</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* first and lastname */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre *</Label>
              <Input
                {...register("firstName")}
                id="firstName"
                name="firstName"
                type="text"
                aria-describedby={errors.firstName ? "name-error" : undefined}
                aria-invalid={!!errors.firstName}
                placeholder="Juan"
                className={errors.firstName ? "border-red-500 focus:border-red-500" : ""}
              />
              <div id="name-error" aria-live="polite" aria-atomic="true" role="alert">
                {errors.firstName && <FormMessage type={FormMessageType.error}>{errors.firstName.message}</FormMessage>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido *</Label>
              <Input
                {...register("lastName")}
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Pérez"
                aria-describedby={errors.lastName ? "lastname-error" : undefined}
                aria-invalid={!!errors.lastName}
                className={errors.lastName ? "border-red-500 focus:border-red-500" : ""}
              />
              <div id="lastname-error" aria-live="polite" aria-atomic="true" role="alert">
                {errors.lastName && <FormMessage type={FormMessageType.error}>{errors.lastName.message}</FormMessage>}
              </div>
            </div>
          </div>
          {/* email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              {...register("email")}
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={!!errors.email}
              className={errors.email ? "border-red-500 focus:border-red-500" : ""}
            />
            <div id="email-error" aria-live="polite" aria-atomic="true" role="alert">
              {errors.email && <FormMessage type={FormMessageType.error}>{errors.email.message}</FormMessage>}
            </div>
          </div>
          {/* phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              {...register("phone")}
              id="phone"
              name="phone"
              type="tel"
              placeholder="+54 11 1234-5678"
              aria-describedby={errors.phone ? "phone-error" : undefined}
              aria-invalid={!!errors.phone}
              className={errors.phone ? "border-red-500 focus:border-red-500" : ""}
            />
            <div id="phone-error" aria-live="polite" aria-atomic="true" role="alert">
              {errors.phone && <FormMessage type={FormMessageType.error}>{errors.phone.message}</FormMessage>}
            </div>
          </div>
          {/* password */}
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña *</Label>
            <div className="relative">
              <Input
                {...register("password")}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                aria-describedby={errors.password ? "password-error" : undefined}
                aria-invalid={!!errors.password}
                className={errors.password ? "border-red-500 focus:border-red-500" : ""}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={(): void => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <div id="password-error" aria-live="polite" aria-atomic="true" role="alert">
              {errors.password && <FormMessage type={FormMessageType.error}>{errors.password.message}</FormMessage>}
            </div>
          </div>
          {/* confirm password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar contraseña *</Label>
            <div className="relative">
              <Input
                {...register("confirmPassword")}
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
                aria-invalid={!!errors.confirmPassword}
                className={errors.confirmPassword ? "border-red-500 focus:border-red-500" : ""}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={(): void => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <div id="confirm-error" aria-live="polite" aria-atomic="true" role="alert">
              {errors.confirmPassword && <FormMessage type={FormMessageType.error}>{errors.confirmPassword.message}</FormMessage>}
            </div>
          </div>
          {/* terms and conditions */}
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox
                {...register("acceptTerms")}
                id="acceptTerms"
                checked={getValues("acceptTerms")}
                onCheckedChange={(checked) => setValue("acceptTerms", checked, { shouldValidate: true })}
              />
              <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                Acepto los{" "}
                <Link href="/terminos" className="text-green-600 hover:underline">
                  términos y condiciones
                </Link>{" "}
                y la{" "}
                <Link href="/privacidad" className="text-green-600 hover:underline">
                  política de privacidad
                </Link>{" "}
                *
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox
                id="acceptMarketing"
                {...register("acceptMarketing")}
                checked={getValues("acceptMarketing")}
                onCheckedChange={(checked) => setValue("acceptMarketing", checked, { shouldValidate: true })}
              />
              <Label htmlFor="acceptMarketing" className="text-sm leading-relaxed">
                Quiero recibir ofertas especiales y novedades por email
              </Label>
            </div>
          </div>
          {/* Solo mostrar mensajes después de obtener el resultado de la action */}
          {submitStatus != "idle" && (
            <div role="status" aria-live="polite" className="space-y-4">
              {submitStatus == "success" ? (
                <FormMessage type={FormMessageType.success}>El usuario ha sido creado con éxito</FormMessage>
              ) : (
                <FormMessage type={FormMessageType.error}>
                  {validationError || "Ha ocurrido un error al crear la cuenta. Por favor, intenta nuevamente más tarde."}
                </FormMessage>
              )}
            </div>
          )}
          <Button type="submit" className="w-full" size="lg" disabled={!getValues("acceptTerms") || isLoading || isValidating}>
            {isLoading ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
          {/* Ayuda de teclado */}
          <div className="text-bold text-gray-500 text-center space-y-1">
            <p>
              💡 <strong>Atajos de teclado:</strong>
            </p>
            <p>Ctrl + Enter: Enviar formulario | Escape: Limpiar formulario</p>
          </div>
        </form>
        {/* login */}
        <div className="text-center pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-green-600 hover:underline font-medium">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
