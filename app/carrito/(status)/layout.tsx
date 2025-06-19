import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CarritoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto pt-20">
      <div className="mx-auto text-center">
        {children}
        <Link href="/">
          <Button size="lg">Volver al inicio</Button>
        </Link>
      </div>
    </div>
  );
}
