"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CartIcon } from "@/components/cart-icon";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">RC</span>
            </div>
            <span className="font-bold text-xl">ReserváTuCancha</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:text-gray-100"
            >
              Inicio
            </Link>
            <Link
              href="/canchas"
              className="text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:text-gray-100"
            >
              Canchas
            </Link>
            <Link
              href="/clubes"
              className="text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:text-gray-100"
            >
              Clubes
            </Link>
            <ThemeToggle />
            <CartIcon />
            <Link href="/login">
              <Button>Iniciar Sesión</Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <CartIcon />
            <Button variant="ghost" size="icon" onClick={(): void => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              href="/"
              className="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Inicio
            </Link>
            <Link
              href="/canchas"
              className="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Canchas
            </Link>
            <Link
              href="/clubes"
              className="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Clubes
            </Link>
            <Link href="/login">
              <Button className="w-full mt-4">Iniciar Sesión</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
