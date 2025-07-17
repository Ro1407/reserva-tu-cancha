import { PushNotificationForm } from "@/components/forms/push-notification-form";
import { AdminTabs } from "@/components/admin-tabs";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between px-2">
        <div className="mb-5">
          <div className="mb-5">
            <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-gray-600 dark:text-gray-400">Gestiona canchas, reservas y clubes desde un solo lugar</p>
          </div>
          <PushNotificationForm />
        </div>
        <Button onClick={logout}>Cerrar Sesión</Button>
      </div>
      <AdminTabs>{children}</AdminTabs>
    </div>
  );
}