import type { BikeIndexResponse, TheftCase } from "../types/theft"

const BIKE_INDEX_API = "https://bikeindex.org/api/v3"
const MUNICH_LOCATION = "Munich"
const PER_PAGE = 10

export async function fetchTheftCases(
  page = 1,
  query?: string,
  startDate?: string,
  endDate?: string,
): Promise<BikeIndexResponse & { filteredBikes: TheftCase[]; totalFiltered: number }> {
  const params = new URLSearchParams({
    location: MUNICH_LOCATION,
    distance: "100",
    stolenness: "proximity",
    per_page: "100", // Fetch more to allow client-side filtering
    page: "1",
  })

  if (query) {
    params.append("query", query)
  }

  const response = await fetch(`${BIKE_INDEX_API}/search?${params.toString()}`)

  if (!response.ok) {
    throw new Error("Failed to fetch theft cases")
  }

  const data: BikeIndexResponse = await response.json()

  let filteredBikes = data.bikes

  if (startDate) {
    const startTimestamp = new Date(startDate).getTime() / 1000
    filteredBikes = filteredBikes.filter((bike) => bike.date_stolen && bike.date_stolen >= startTimestamp)
  }

  if (endDate) {
    const endTimestamp = new Date(endDate).getTime() / 1000
    filteredBikes = filteredBikes.filter((bike) => bike.date_stolen && bike.date_stolen <= endTimestamp)
  }

  const totalFiltered = filteredBikes.length
  const startIndex = (page - 1) * PER_PAGE
  const paginatedBikes = filteredBikes.slice(startIndex, startIndex + PER_PAGE)

  return {
    bikes: paginatedBikes,
    filteredBikes,
    totalFiltered,
  }
}

export async function getTheftCount(query?: string, startDate?: string, endDate?: string): Promise<number> {
  const data = await fetchTheftCases(1, query, startDate, endDate)
  return data.totalFiltered
}
