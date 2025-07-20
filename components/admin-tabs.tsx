"use client"

import type React from "react"
import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const links = [
  { name: "Canchas", href: '/dashboard'},
  { name: "Clubes", href: '/dashboard/clubes'},
  { name: "Reservas", href: '/dashboard/reservas' },
  { name: "Notificaciones", href: '/dashboard/notificaciones' },
];

export function AdminTabs({ children }: { children: React.ReactNode }) {
  const activePath = usePathname();

  return (
    <Tabs className="space-y-6">
      <TabsList>
        {links.map((link) => (
          <TabsTrigger
            key={link.name}
            tabKey={link.name}
            tabHref={link.href}
            isActive={activePath === link.href}>
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
}
