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

export const variants: Record<BadgeVariant, string> = {
  [BadgeVariant.default]: "bg-green-600 text-white hover:bg-green-700",
  [BadgeVariant.secondary]: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100",
  [BadgeVariant.outline]: "border border-gray-300 bg-transparent dark:border-gray-600",
  [BadgeVariant.destructive]: "bg-red-600 text-white hover:bg-red-700",
  [BadgeVariant.confirmada]: "bg-emerald-600 text-white hover:bg-emerald-700",
  [BadgeVariant.pendiente]: "bg-purple-600 text-white hover:bg-purple-700",
  [BadgeVariant.cancelada]: "bg-red-600 text-white hover:bg-red-700",
  [BadgeVariant.mantenimiento]: "bg-blue-600 text-white hover:bg-blue-700",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = BadgeVariant.default, className = "" }: BadgeProps) {


  return (
    <div
      className={`bg- inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
