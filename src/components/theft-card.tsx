import type { TheftCase } from "../types/theft"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Calendar, MapPin } from "lucide-react"

interface TheftCardProps {
  theft: TheftCase
}

export function TheftCard({ theft }: TheftCardProps) {
  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return "N/A"
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors">
      <div className="grid md:grid-cols-[200px_1fr] gap-4">
        <div className="bg-muted w-full h-48 md:h-full overflow-hidden">
          {theft.large_img || theft.thumb ? (
            <img src={theft.large_img || theft.thumb || ""} alt={theft.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <img
                src="/classic-bicycle.jpg"
                alt="No image available"
                className="w-full h-full object-cover opacity-50"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col p-4 md:p-6">
          <CardHeader className="p-0 mb-3">
            <CardTitle className="text-xl font-semibold leading-tight text-balance">{theft.title}</CardTitle>
          </CardHeader>

          <CardContent className="p-0 space-y-3 flex-1">
            {theft.description && (
              <p className="text-sm text-muted-foreground line-clamp-3 text-pretty">{theft.description}</p>
            )}

            <div className="flex flex-col gap-2 text-sm">
              {theft.date_stolen && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Date stolen: {formatDate(theft.date_stolen)}</span>
                </div>
              )}
            </div>

            {theft.stolen_location && (
              <div className="flex items-start gap-1.5 pt-1">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{theft.stolen_location}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{theft.manufacturer_name}</Badge>
              {theft.year && <Badge variant="outline">{theft.year}</Badge>}
              <Badge variant="outline" className="font-mono text-xs">
                #{theft.id}
              </Badge>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}
