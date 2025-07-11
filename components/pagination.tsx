"use client"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { generatePagination } from "@/lib/utils"
import clsx from "clsx"

export default function PaginationWithText({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1
  const allPages = generatePagination(currentPage, totalPages)
  const pathname = usePathname()

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <>
      <div className="flex items-center justify-center space-x-2">
        <PaginationArrowWithText
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
          text="Anterior"
        />

        <div className="flex space-x-1">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined
            if (index === 0) position = "first"
            if (index === allPages.length - 1) position = "last"
            if (allPages.length === 1) position = "single"
            if (page === "...") position = "middle"

            return (
              <PaginationNumber
                key={`${page}-${index}`}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            )
          })}
        </div>

        <PaginationArrowWithText
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
          text="Siguiente"
        />
      </div>
    </>
  )
}

function PaginationNumber({
                            page,
                            href,
                            isActive,
                            position,
                          }: {
  page: number | string
  href: string
  position?: "first" | "last" | "middle" | "single"
  isActive: boolean
}) {
  // Estilos base del Button component
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  // Tamaño pequeño del Button component
  const sizeClasses = "h-8 px-3 text-sm"

  const className = clsx(baseClasses, sizeClasses, {
    // Activo - usando estilos del Button variant "default"
    "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600": isActive,
    // No activo - usando estilos del Button variant "outline"
    "border border-gray-300 bg-transparent hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800":
      !isActive && position !== "middle",
    // Puntos suspensivos - usando estilos del Button variant "ghost"
    "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 cursor-default": position === "middle",
  })

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  )
}

function PaginationArrowWithText({
                                   href,
                                   direction,
                                   isDisabled,
                                   text,
                                 }: {
  href: string
  direction: "left" | "right"
  isDisabled?: boolean
  text: string
}) {
  // Estilos base del Button component
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  // Tamaño pequeño del Button component
  const sizeClasses = "h-8 px-3 text-sm"

  const className = clsx(baseClasses, sizeClasses, {
    // Deshabilitado - usando opacity del Button component
    "opacity-50 pointer-events-none border border-gray-300 bg-transparent": isDisabled,
    // Habilitado - usando estilos del Button variant "outline"
    "border border-gray-300 bg-transparent hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800": !isDisabled,
  })

  const content =
    direction === "left" ? (
      <>
        <ArrowLeftIcon className="w-4 h-4 mr-1" />
        {text}
      </>
    ) : (
      <>
        {text}
        <ArrowRightIcon className="w-4 h-4 ml-1" />
      </>
    )

  return isDisabled ? (
    <div className={className}>{content}</div>
  ) : (
    <Link className={className} href={href}>
      {content}
    </Link>
  )
}
