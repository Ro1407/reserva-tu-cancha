import { AdminTabs } from "@/components/admin-tabs"

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
        <p className="text-gray-600 dark:text-gray-400">Gestiona canchas, reservas y clubes desde un solo lugar</p>
      </div>
      <AdminTabs />
    </div>
  )
}
