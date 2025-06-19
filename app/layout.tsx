import type React from "react";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/app/providers";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { inter } from "@/app/fonts";
import "./globals.css";

export const metadata = {
  title: "ReserváTuCancha - Reserva canchas deportivas online",
  description: "La plataforma más fácil para reservar canchas deportivas en tu ciudad",
  generator: "v0.dev",
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/icons/icon-192x192.png' },
    { rel: 'icon', url: '/icons/icon-512x512.png' },
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
