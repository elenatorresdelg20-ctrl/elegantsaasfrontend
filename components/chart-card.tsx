"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { cn } from "@/lib/utils"

interface ChartCardProps {
  title: string
  description?: string
  data: Array<{ name: string; value: number; value2?: number }>
  type?: "area" | "bar"
  dataKeys?: string[]
  colors?: string[]
  showLegend?: boolean
  legendItems?: Array<{ label: string; color: string; value?: string }>
  height?: number
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border/50 bg-card/95 p-4 shadow-2xl backdrop-blur-xl">
        <p className="mb-2 text-sm font-semibold text-foreground">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-sm text-muted-foreground">{entry.name}:</span>
              <span className="text-sm font-semibold text-foreground">{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export function ChartCard({
  title,
  description,
  data,
  type = "area",
  dataKeys = ["value", "value2"],
  colors = ["oklch(0.7 0.18 260)", "oklch(0.75 0.15 170)"],
  showLegend = false,
  legendItems = [],
  height = 280,
}: ChartCardProps) {
  const gridColor = "oklch(0.25 0.01 260)"
  const tickColor = "oklch(0.5 0 0)"

  return (
    <Card
      className={cn(
        "overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm transition-all duration-300",
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-1 text-sm text-muted-foreground">{description}</CardDescription>
            )}
          </div>
          {showLegend && legendItems.length > 0 && (
            <div className="flex items-center gap-4">
              {legendItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  {item.value && <span className="text-xs font-semibold text-foreground">{item.value}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <ResponsiveContainer width="100%" height={height}>
          {type === "area" ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                {colors.map((color, index) => (
                  <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: tickColor, fontSize: 11 }}
                dy={10}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: tickColor, fontSize: 11 }} dx={-10} />
              <Tooltip content={<CustomTooltip />} />
              {dataKeys.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  name={key === "value" ? "Valor 1" : "Valor 2"}
                  stroke={colors[index] || colors[0]}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill={`url(#gradient-${index})`}
                />
              ))}
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: tickColor, fontSize: 11 }}
                dy={10}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: tickColor, fontSize: 11 }} dx={-10} />
              <Tooltip content={<CustomTooltip />} />
              {dataKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  name={key === "value" ? "Valor" : `Valor ${index + 1}`}
                  fill={colors[index] || colors[0]}
                  radius={[6, 6, 0, 0]}
                />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
