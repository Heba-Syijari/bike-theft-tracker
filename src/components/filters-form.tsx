"use client"

import { useFormik } from "formik"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Search, X } from "lucide-react"
import type { TheftFilters } from "../types/theft"

interface FiltersFormProps {
  onFilterChange: (filters: Partial<TheftFilters>) => void
  initialValues: Partial<TheftFilters>
}

export function FiltersForm({ onFilterChange, initialValues }: FiltersFormProps) {
  const formik = useFormik({
    initialValues: {
      query: initialValues.query || "",
      startDate: initialValues.startDate || "",
      endDate: initialValues.endDate || "",
    },
    onSubmit: (values) => {
      onFilterChange({
        query: values.query,
        startDate: values.startDate,
        endDate: values.endDate,
        page: 1,
      })
    },
  })

  const handleReset = () => {
    formik.resetForm()
    onFilterChange({
      query: "",
      startDate: "",
      endDate: "",
      page: 1,
    })
  }

  const hasFilters = formik.values.query || formik.values.startDate || formik.values.endDate

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_auto_auto]">
        <div className="space-y-2">
          <Label htmlFor="query" className="text-sm font-medium">
            Search by title
          </Label>
          <Input
            id="query"
            name="query"
            placeholder="Enter bike model or description..."
            value={formik.values.query}
            onChange={formik.handleChange}
            className="bg-card border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate" className="text-sm font-medium">
            From date
          </Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            className="bg-card border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate" className="text-sm font-medium">
            To date
          </Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            className="bg-card border-border"
          />
        </div>

        <div className="flex gap-2 items-end">
          <Button type="submit" className="w-full md:w-auto">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          {hasFilters && (
            <Button type="button" variant="outline" onClick={handleReset} className="w-full md:w-auto bg-transparent">
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}
