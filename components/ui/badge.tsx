import type React from "react";

export enum BadgeVariant {
  "default",
  "secondary",
  "outline",
  "destructive",
  "confirmada",
  "pendiente",
  "cancelada",
  "mantenimiento"
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = BadgeVariant.default, className = "" }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    [BadgeVariant.default]: "bg-green-600 text-white hover:bg-green-700",
    [BadgeVariant.secondary]: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100",
    [BadgeVariant.outline]: "border border-gray-300 bg-transparent dark:border-gray-600",
    [BadgeVariant.destructive]: "bg-red-600 text-white hover:bg-red-700",
    [BadgeVariant.confirmada]: "bg-[#ACE19F] text-white hover:bg-[#9CD18F]",
    [BadgeVariant.pendiente]: "bg-[#C2AEEE] text-white hover:bg-[#B29EDC]",
    [BadgeVariant.cancelada]: "bg-[#E19F9F] text-white hover:bg-[#D18F8F]",
    [BadgeVariant.mantenimiento]: "bg-[#9FCDE1] text-white hover:bg-[#8FBFD3]",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
