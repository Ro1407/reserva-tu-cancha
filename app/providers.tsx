import React from "react";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/context/cart-context";

import { auth } from "@/auth";
import { Session } from "next-auth";

export async function Providers({ children }: { children: React.ReactNode }) {
  const session: Session | null = await auth();
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </CartProvider>
    </SessionProvider>
  );
}
