"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Role } from "@/prisma/generated/browser";
import { Loader2 } from "lucide-react";
import { getUserByEmail } from "@/lib/actions";
import { AdminTabs } from "@/components/admin-tabs";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { data } = useSession();
  const { replace } = useRouter();

  useEffect((): void => {
    getUserByEmail(data?.user?.email || null).then((user: User | null): void => {
      setUser(user);
    });
  }, []);

  useEffect((): void => {
    if (user && user.role !== Role.ADMIN) replace("/unauthorized");
  }, [user]);

  if (!user || user.role !== Role.ADMIN) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  } else return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between px-2">
          <div className="mb-5">
            <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-gray-600 dark:text-gray-400">Gestiona canchas, reservas y clubes desde un solo lugar</p>
          </div>
          <Button onClick={(): Promise<void> => logout().then((): void => window.location.replace("/"))}>
            Cerrar Sesión
          </Button>
        </div>
        <div className="flex-1 gap-5">
          <AdminTabs>{children}</AdminTabs>
        </div>
      </div>
    );
}
