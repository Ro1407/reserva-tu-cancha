import { NextRequest, NextResponse } from "next/server";
import { Court } from "@/types/court";
import { generateCourtDescription } from "@/lib/descriptions"

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const court: Court = await request.json();

    if (!court || !court.name || !court.sport || !court.address || !court.price || !court.rating || !court.amenities) {
      return NextResponse.json({ error: "Se requiere Court data" }, { status: 400 });
    }

    const text = await generateCourtDescription(court);

    return NextResponse.json( {description: text}, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "No se pudo generar la descripción" } , { status: 500 });
  }
}
