import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {CanchasTable} from "@/components/canchas-table"
import {ReservasTable} from "@/components/reservas-table"
import {ClubesTable} from "@/components/clubes-table"

export function AdminTabs() {
  return (
    <Tabs defaultValue="canchas" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="canchas">Canchas</TabsTrigger>
        <TabsTrigger value="reservas">Reservas</TabsTrigger>
        <TabsTrigger value="clubes">Clubes</TabsTrigger>
      </TabsList>
      <TabsContent value="canchas">
        <CanchasTable/>
      </TabsContent>
      <TabsContent value="reservas">
        <ReservasTable/>
      </TabsContent>
      <TabsContent value="clubes">
        <ClubesTable/>
      </TabsContent>
    </Tabs>
  )
}
