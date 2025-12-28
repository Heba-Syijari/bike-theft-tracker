"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchTheftCases } from "../lib/api"
import { TheftCard } from "../components/theft-card"
import { FiltersForm } from "../components/filters-form"
import { Pagination } from "../components/pagination"
import type { TheftFilters } from "../types/theft"
import { AlertCircle, Bike, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"

export function Dashboard() {
  const [filters, setFilters] = useState<TheftFilters>({
    query: "",
    startDate: "",
    endDate: "",
    page: 1,
  })

  const {
    data: theftData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["thefts", filters],
    queryFn: () => fetchTheftCases(filters.page, filters.query, filters.startDate, filters.endDate),
  })

  const handleFilterChange = (newFilters: Partial<TheftFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
  }

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const totalCount = theftData?.totalFiltered ?? 0

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Bike className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Munich Police Department</h1>
              <p className="text-sm text-muted-foreground">Bike Theft Cases Management System</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Filter Cases</h2>
            <FiltersForm onFilterChange={handleFilterChange} initialValues={filters} />
          </div>

          {!isLoading && totalCount > 0 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <span className="text-2xl font-bold text-foreground">{totalCount}</span> total cases found
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                <p className="text-muted-foreground">Loading theft cases...</p>
              </div>
            </div>
          )}

          {isError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error instanceof Error ? error.message : "Failed to load theft cases"}
              </AlertDescription>
            </Alert>
          )}

          {!isLoading && !isError && theftData && (
            <>
              {theftData.bikes.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-muted/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bike className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No cases found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {theftData.bikes.map((theft) => (
                      <TheftCard key={theft.id} theft={theft} />
                    ))}
                  </div>

                  {totalCount > 10 && (
                    <Pagination
                      currentPage={filters.page}
                      totalItems={totalCount}
                      itemsPerPage={10}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
