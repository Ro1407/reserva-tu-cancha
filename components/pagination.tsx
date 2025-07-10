"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

export function Pagination({ totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname: string = usePathname();
  const { replace } = useRouter();
  const pages: number[] = Array.from({ length: totalPages - 1 });
  const currentPage: number = Number(searchParams?.get("page")) || 1;

  const onPageChange: (page: number) => void = (page: number): void => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage == 1}
        onClick={(): void => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Anterior
      </Button>
      <div className="flex space-x-1">
        {pages.map((_: number, page: number) => (
          <Button
            key={page + 1}
            variant="outline"
            size="sm"
            disabled={page + 1 == currentPage}
            onClick={(): void => onPageChange(page + 1)}
          >
            {page + 1}
          </Button>
        ))}
        <span className="px-2 py-1 text-gray-600 dark:text-gray-400">...</span>
        <Button
          key={totalPages}
          variant="outline"
          size="sm"
          disabled={currentPage == totalPages}
          onClick={(): void => onPageChange(totalPages)}
        >
          {totalPages}
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage == totalPages}
          onClick={(): void => onPageChange(currentPage + 1)}
        >
          Siguiente
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
