import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourtsTable } from "@/components/courts-table";
import { ReservationsTable } from "@/components/reservations-table";
import { ClubsTable } from "@/components/clubs-table";

export function AdminTabs() {
  return (
    <Tabs defaultValue="canchas" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="canchas">Canchas</TabsTrigger>
        <TabsTrigger value="reservas">Reservas</TabsTrigger>
        <TabsTrigger value="clubes">Clubes</TabsTrigger>
      </TabsList>
      <TabsContent value="canchas">
        <CourtsTable />
      </TabsContent>
      <TabsContent value="reservas">
        <ReservationsTable />
      </TabsContent>
      <TabsContent value="clubes">
        <ClubsTable />
      </TabsContent>
    </Tabs>
  );
}
