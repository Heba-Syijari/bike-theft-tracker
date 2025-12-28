export interface TheftCase {
  id: number
  title: string
  description: string | null
  date_stolen: number | null
  frame_colors: string[]
  frame_model: string
  is_stock_img: boolean
  large_img: string | null
  manufacturer_name: string
  serial: string
  status: string
  stolen: boolean
  stolen_coordinates: [number, number] | null
  stolen_location: string | null
  thumb: string | null
  url: string
  year: number | null
}

export interface BikeIndexResponse {
  bikes: TheftCase[]
}

export interface TheftFilters {
  query: string
  startDate: string
  endDate: string
  page: number
}
