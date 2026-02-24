import { CourtDetails } from "@/components/court-details";
import { BookingForm } from "@/components/forms/booking-form";
import { WeatherWidget } from "@/components/weather-widget";
import { CalendarProvider } from "@/context/calendar";
import { getCourtById, getClubLocationByCourtId } from "@/lib/actions";
import { notFound } from "next/navigation";
import {getClubById} from "@/lib/actions"
import {Club} from "@/types/club"

export default async function CourtDetailPage(props: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await props.params;
  const [court, location] = await Promise.all([
      getCourtById(id),
      getClubLocationByCourtId(id)],
      )
  const club: Club | null = await getClubById(court?.clubId || null)

  if (!court || !club) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CalendarProvider>
          <div className="lg:col-span-2">
            <CourtDetails court={court} club={club}/>
            { location &&
            <div className="mt-8">
              <WeatherWidget city={location.split(",")[1].trim()} />
            </div>
            }
          </div>
          <div className="lg:col-span-1">
            <BookingForm court={court} />
          </div>
        </CalendarProvider>
      </div>
    </div>
  );
}
