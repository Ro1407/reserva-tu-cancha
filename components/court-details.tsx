"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { MapPin, Star, Phone, MapIcon, Sparkles, Zap } from "lucide-react";
import { Club } from "@/types/club";
import { Court } from "@/types/court";
import { generateCourtDescription } from "@/lib/descriptions";
import { getClubById } from "@/lib/actions";
import { formatDBPriceToCurrency } from "@/lib/utils";

interface CourtDetailsProps {
  court: Court;
}

export async function CourtDetails({ court }: CourtDetailsProps) {
  const club: Club | null = await getClubById(court.clubId);
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect((): void => {
    new Promise(async (): Promise<void> => {
      setIsLoading(true);
      try {
        setDescription(await generateCourtDescription(court));
      } catch (error) {
        setDescription(court.description || "Excelente cancha deportiva con instalaciones de primera calidad.");
      } finally {
        setIsLoading(false);
      }
    });
  }, [court]);

  return (
    <>
      {club ? (
        <div className="space-y-6">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
            <img src={court.image || "/placeholder.svg"} alt={court.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{court.name}</h1>
                <div className="flex items-center text-gray-600 mb-2 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mr-1" />
                  {club.location + ", " + court.address}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{court.rating}</span>
                  </div>
                  <Badge>{court.sport}</Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{formatDBPriceToCurrency(court.price)}</div>
                <div className="text-gray-600 dark:text-gray-400">por hora</div>
              </div>
            </div>
          </div>
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-500" />
                  Descripción
                </CardTitle>
                <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 dark:border-blue-800/50">
                  <Zap className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Powered by Gemini AI</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 relative">
              {isLoading ? (
                <div className="flex items-center gap-3 py-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Generando descripción inteligente...</span>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-gray-700 leading-relaxed dark:text-gray-300 text-base">{description}</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Descripción generada por inteligencia artificial
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Servicios</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {court.amenities.map((amenity: string) => (
                  <Badge key={amenity} variant={BadgeVariant.secondary} className="justify-center text-xl">
                    <span className="text-lg">{amenity}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-1">
              <CardTitle>Información del Club</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div>
                <h4 className="font-medium">{club.name}</h4>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                {club.phone}
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapIcon className="w-4 h-4 mr-2" />
                {club.address}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center p-6">
          <h2 className="text-2xl font-bold mb-4">Club no encontrado</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Lo sentimos, no pudimos encontrar el club asociado a esta cancha.
          </p>
        </div>
      )}
    </>
  );
}
