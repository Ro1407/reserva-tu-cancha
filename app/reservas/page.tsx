"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Plus } from "lucide-react";
import { formatDBPriceToCurrency, formatISODateToHumanReadable, formatTimeSlotToString } from "@/lib/utils";
import { logout } from "@/lib/auth";
import { getUserReservations } from "@/lib/actions-client";
import { ReservationResume } from "@/types/reservation";
import { getStateVariant } from "@/lib/utils";

export default function ReservasPage() {
  const { data, status } = useSession();
  const [reservas, setReservas] = useState<ReservationResume[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout: () => Promise<void> = async (): Promise<void> => {
    logout().then(async (): Promise<void> => {
      window.location.replace("/");
    });
  };

  useEffect((): void => {
    if (status === "authenticated") {
      getUserReservations(data?.user?.email || null)
        .then((reservations: ReservationResume[]): void => {
          setReservas(reservations);
        })
        .finally((): void => {
          setLoading(false);
        });
    }
  }, []);

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Acceso requerido</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Necesitas iniciar sesión para ver tus reservas
            </p>
            <Link href="/login" className="w-full">
              <Button className="w-full py-3">Iniciar Sesión</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="animate-pulse space-y-8">
          <div className="flex justify-between items-center">
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
            </div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i: number) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">{data?.user?.email?.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    ¡Hola {data?.user?.email?.split("@")[0]}!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">Bienvenido a tu panel de reservas</p>
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mis Reservas</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Tienes {reservas.length} reserva{reservas.length !== 1 ? "s" : ""} activa
                  {reservas.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/canchas">
                <Button size="lg" className="w-full sm:w-auto">
                  <Plus className="w-5 h-5 mr-2" />
                  Nueva Reserva
                </Button>
              </Link>
              <Button variant="outline" size="lg" onClick={handleLogout} className="w-full sm:w-auto bg-transparent">
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>

        {/* Lista de reservas */}
        {reservas.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">No tienes reservas</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                ¡Es hora de hacer tu primera reserva! Encuentra la cancha perfecta para tu próximo juego.
              </p>
              <Link href="/canchas">
                <Button size="lg" className="px-8">
                  <Plus className="w-5 h-5 mr-2" />
                  Buscar Canchas
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {reservas.map((reserva: ReservationResume) => (
              <Card
                key={reserva.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Imagen */}
                  <div className="w-full lg:w-80 h-64 lg:h-auto relative overflow-hidden">
                    <img
                      src={reserva.image || "/placeholder.svg?height=300&width=400&query=cancha deportiva"}
                      alt={reserva.courtName}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant={getStateVariant(reserva.state)}>{reserva.state}</Badge>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 p-6 lg:p-8">
                    <div className="flex flex-col h-full">
                      {/* Header de la reserva */}
                      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between mb-6">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{reserva.courtName}</h3>
                          <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">{reserva.clubName}</p>
                          <div className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                            {reserva.sport}
                          </div>
                        </div>
                        <div className="mt-4 xl:mt-0 text-right">
                          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                            {formatDBPriceToCurrency(reserva.price)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {reserva.duration} hora{reserva.duration > 1 ? "s" : ""}
                          </div>
                        </div>
                      </div>

                      {/* Información de fecha y hora */}
                      <div className="space-y-4 mt-auto">
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-4">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold">Fecha</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatISODateToHumanReadable(reserva.date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-4">
                            <Clock className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold">Horario</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatTimeSlotToString(reserva.time)} - {reserva.duration}h de duración
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
