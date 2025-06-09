import { CourtDetails } from "@/components/court-details";
import { BookingForm } from "@/components/booking-form";
import { WeatherWidget } from "@/components/weather-widget";
import { Court } from "@/lib/definitions";
import { courts } from "@/lib/data";

export default async function CourtDetailPage(props: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await props.params;
  const court: Court = courts[Number(id)];
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CourtDetails court={court} />
          <div className="mt-8">
            <WeatherWidget />
          </div>
        </div>
        <div className="lg:col-span-1">
          <BookingForm court={court} />
        </div>
      </div>
    </div>
  );
}
