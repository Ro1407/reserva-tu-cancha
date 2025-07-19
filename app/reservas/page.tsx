"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, Clock, User, Plus } from "lucide-react";

interface Reserva {
  id: string;
  courtName: string;
  clubName: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  sport: string;
  status: "confirmada" | "pendiente" | "cancelada" | "completada";
  image: string;
}

export default function ReservasPage() {
  const { data: session, status } = useSession();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  const mockReservas: Reserva[] = [
    {
      id: "1",
      courtName: "Cancha de Fútbol 5 - Central",
      clubName: "Club Deportivo Central",
      date: "2024-01-20",
      time: "18:00",
      duration: 1,
      price: 8000,
      sport: "Fútbol",
      status: "confirmada",
      image: "/courts/football.jpg",
    },
    {
      id: "2",
      courtName: "Cancha de Tenis - Norte",
      clubName: "Complejo Atlético Norte",
      date: "2024-01-18",
      time: "10:00",
      duration: 1,
      price: 6000,
      sport: "Tenis",
      status: "completada",
      image: "/courts/tennis.jpg",
    },
    {
      id: "3",
      courtName: "Cancha de Pádel - Sur",
      clubName: "Centro Deportivo Sur",
      date: "2024-01-25",
      time: "20:00",
      duration: 1,
      price: 7000,
      sport: "Pádel",
      status: "pendiente",
      image: "/courts/paddle.jpg",
    },
  ];

  useEffect((): void => {
    if (status === "authenticated") {
      setTimeout((): void => {
        setReservas(mockReservas);
        setLoading(false);
      }, 1000);
    }
  }, [status]);

  const getStatusBadge = (status: Reserva["status"]) => {
    const config = {
      confirmada: { variant: BadgeVariant.confirmada, label: "Confirmada" },
      pendiente: { variant: BadgeVariant.pendiente, label: "Pendiente" },
      cancelada: { variant: BadgeVariant.cancelada, label: "Cancelada" },
      completada: { variant: BadgeVariant.outline, label: "Completada" },
    };
    return <Badge variant={config[status].variant}>{config[status].label}</Badge>;
  };

  const formatDate: (dateString: string) => string = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  console.log(status)

  if (status === "unauthenticated") {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">Acceso requerido</h2>
            <p className="text-gray-600 mb-6 dark:text-gray-400">Necesitas iniciar sesión para ver tus reservas</p>
            <Link href="/login">
              <Button>Iniciar Sesión</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64 dark:bg-gray-800"></div>
          {[...Array(3)].map((_, i: number) => (
            <div key={i} className="h-48 bg-gray-200 rounded dark:bg-gray-800"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mis Reservas</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tienes {reservas.length} reserva{reservas.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/canchas">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Reserva
          </Button>
        </Link>
      </div>
      {/* Lista de reservas */}
      {reservas.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No tienes reservas</h3>
            <p className="text-gray-600 mb-4 dark:text-gray-400">¡Haz tu primera reserva!</p>
            <Link href="/canchas">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Buscar Canchas
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {reservas.map((reserva: Reserva) => (
            <Card key={reserva.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row">
                {/* Imagen */}
                <div className="w-full md:w-48 h-48 md:h-auto bg-gray-100 dark:bg-gray-800">
                  <img
                    src={reserva.image || "/placeholder.svg"}
                    alt={reserva.courtName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Contenido */}
                <div className="flex-1 p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{reserva.courtName}</h3>
                        {getStatusBadge(reserva.status)}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">{reserva.clubName}</p>
                      <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-full dark:bg-gray-800 dark:text-gray-200">
                        {reserva.sport}
                      </span>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <div className="text-2xl font-bold text-green-600">${reserva.price.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {reserva.duration} hora{reserva.duration > 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar className="w-5 h-5 mr-3" />
                      <span className="font-medium">{formatDate(reserva.date)}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Clock className="w-5 h-5 mr-3" />
                      <span>
                        {reserva.time} - {reserva.duration}h
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
