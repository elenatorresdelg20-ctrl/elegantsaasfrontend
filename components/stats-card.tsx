import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

interface StatItem {
  label: string
  value: string
  color?: string
}

interface StatsCardProps {
  title: string
  stats: StatItem[]
}

export function StatsCard({ title, stats }: StatsCardProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base font-medium text-foreground">{title}</CardTitle>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              {stat.color && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: stat.color }} />}
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <span className="text-sm font-medium text-foreground">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
