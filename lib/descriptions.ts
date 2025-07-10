"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { Court } from "@/types/court";

export async function generateCourtDescription(court: Court): Promise<string> {
  const { text } = await generateText({
    model: google("gemini-1.5-flash"),
    prompt: `Genera una descripción atractiva y detallada para una cancha deportiva con las siguientes características:
      
      Nombre: ${court.name}
      Deporte: ${court.sport}
      Ubicación: ${court.address}
      Precio: $${court.price} por hora
      Rating: ${court.rating}/5
      Servicios: ${court.amenities.join(", ")}

      La descripción debe ser:
      - Profesional y atractiva
      - Entre 80-120 palabras
      - Destacar las características únicas de la cancha
      - Mencionar la calidad de las instalaciones
      - Incluir aspectos que justifiquen el precio
      - Ser persuasiva para potenciales usuarios
      - En español

      No incluyas el nombre de la cancha al inicio, comienza directamente con la descripción.`,
    system: `Eres un experto en marketing deportivo y redacción de contenido para instalaciones deportivas. Tu objetivo es 
    crear descripciones que atraigan clientes.`,
  });
  return text;
}