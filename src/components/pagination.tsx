"use client"

import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 3 // Reduced from 5 to prevent overflow on small screens

    if (totalPages <= maxVisible) {
      // Show all pages if total is 3 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 2) {
        // Near the start: show first 2 pages, ellipsis, and last page
        for (let i = 1; i <= 2; i++) pages.push(i)
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 1) {
        // Near the end: show first page, ellipsis, and last 2 pages
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 1; i <= totalPages; i++) pages.push(i)
      } else {
        // In the middle: show first page, ellipsis, current-1, current, current+1, ellipsis, last page
        pages.push(1)
        pages.push("...")
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
        Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} cases
      </p>

      <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-9 flex items-center"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline ml-1">Previous</span>
        </Button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 sm:px-3 h-9 flex items-center justify-center text-muted-foreground text-xs sm:text-sm"
              >
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page as number)}
                className="min-w-[32px] sm:min-w-[40px] h-9 text-xs sm:text-sm flex items-center justify-center"
              >
                {page}
              </Button>
            ),
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-9 flex items-center"
        >
          <span className="hidden sm:inline mr-1">Next</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
