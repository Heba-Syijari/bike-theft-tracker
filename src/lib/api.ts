import type { BikeIndexResponse, TheftCase } from "../types/theft"

const BIKE_INDEX_API = import.meta.env.VITE_BIKE_INDEX_API || "https://bikeindex.org/api/v3"
const MUNICH_LOCATION = "Munich"
const PER_PAGE = 10
const MAX_PER_PAGE = 100 // Maximum allowed by the API

/**
 * Fetch all stolen bikes from Munich without any filters
 * Fetches all pages until all data is retrieved
 */
export async function fetchAllTheftCases(): Promise<TheftCase[]> {
  const allBikes: TheftCase[] = []
  let currentPage = 1
  let hasMorePages = true

  while (hasMorePages) {
    const params = new URLSearchParams({
      location: MUNICH_LOCATION,
      distance: "100",
      stolenness: "proximity",
      per_page: MAX_PER_PAGE.toString(),
      page: currentPage.toString(),
    })

    const response = await fetch(`${BIKE_INDEX_API}/search?${params.toString()}`)

    if (!response.ok) {
      throw new Error("Failed to fetch theft cases")
    }

    const data: BikeIndexResponse = await response.json()

    if (data.bikes && data.bikes.length > 0) {
      allBikes.push(...data.bikes)
      // If results are less than MAX_PER_PAGE, we've reached the last page
      hasMorePages = data.bikes.length === MAX_PER_PAGE
      currentPage++
    } else {
      hasMorePages = false
    }
  }

  return allBikes
}

/**
 * Fetch theft cases with optional filters and pagination
 * First fetches all bikes, then applies filters, then paginates
 */
export async function fetchTheftCases(
  page = 1,
  query?: string,
  startDate?: string,
  endDate?: string,
): Promise<BikeIndexResponse & { filteredBikes: TheftCase[]; totalFiltered: number }> {
  // Step 1: Fetch all bikes without filters
  let allBikes = await fetchAllTheftCases()

  // Step 2: Apply search query filter if provided
  if (query && query.trim()) {
    const searchQuery = query.toLowerCase().trim()
    allBikes = allBikes.filter(
      (bike) =>
        bike.title?.toLowerCase().includes(searchQuery) ||
        bike.manufacturer_name?.toLowerCase().includes(searchQuery) ||
        bike.frame_model?.toLowerCase().includes(searchQuery) ||
        bike.serial?.toLowerCase().includes(searchQuery) ||
        bike.description?.toLowerCase().includes(searchQuery)
    )
  }

  // Step 3: Apply start date filter
  if (startDate) {
    const startTimestamp = new Date(startDate).getTime() / 1000
    allBikes = allBikes.filter((bike) => bike.date_stolen && bike.date_stolen >= startTimestamp)
  }

  // Step 4: Apply end date filter
  if (endDate) {
    const endTimestamp = new Date(endDate).getTime() / 1000
    allBikes = allBikes.filter((bike) => bike.date_stolen && bike.date_stolen <= endTimestamp)
  }

  const totalFiltered = allBikes.length

  // Step 5: Apply pagination
  const startIndex = (page - 1) * PER_PAGE
  const paginatedBikes = allBikes.slice(startIndex, startIndex + PER_PAGE)

  return {
    bikes: paginatedBikes,
    filteredBikes: allBikes,
    totalFiltered,
  }
}

export async function getTheftCount(query?: string, startDate?: string, endDate?: string): Promise<number> {
  const data = await fetchTheftCases(1, query, startDate, endDate)
  return data.totalFiltered
}
