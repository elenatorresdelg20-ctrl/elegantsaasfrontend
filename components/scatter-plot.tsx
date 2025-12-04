"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts"
import { cn } from "@/lib/utils"

interface ScatterPlotProps {
  data?: Array<{ x: number; y: number; z?: number; name?: string }>
  xLabel?: string
  yLabel?: string
  correlation?: number
}

const defaultData = [
  { x: 10, y: 30, z: 200 },
  { x: 20, y: 50, z: 300 },
  { x: 30, y: 45, z: 250 },
  { x: 40, y: 70, z: 350 },
  { x: 50, y: 65, z: 280 },
  { x: 60, y: 85, z: 400 },
  { x: 70, y: 80, z: 320 },
  { x: 80, y: 95, z: 450 },
]

export function ScatterPlot({
  data = defaultData,
  xLabel = "Variable X",
  yLabel = "Variable Y",
  correlation = 0.87,
}: ScatterPlotProps) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">{xLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-xs text-muted-foreground">{yLabel}</span>
          </div>
        </div>
        <div
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-bold",
            correlation >= 0.5
              ? "bg-success/20 text-success"
              : correlation >= 0
                ? "bg-warning/20 text-warning"
                : "bg-destructive/20 text-destructive",
          )}
        >
          r = {correlation.toFixed(2)}
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 30, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.01 260)" opacity={0.5} />
            <XAxis
              type="number"
              dataKey="x"
              name={xLabel}
              tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
              axisLine={{ stroke: "oklch(0.3 0.01 260)" }}
              tickLine={{ stroke: "oklch(0.3 0.01 260)" }}
              label={{
                value: xLabel,
                position: "bottom",
                fill: "oklch(0.6 0 0)",
                fontSize: 12,
                offset: 10,
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name={yLabel}
              tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
              axisLine={{ stroke: "oklch(0.3 0.01 260)" }}
              tickLine={{ stroke: "oklch(0.3 0.01 260)" }}
              label={{
                value: yLabel,
                angle: -90,
                position: "insideLeft",
                fill: "oklch(0.6 0 0)",
                fontSize: 12,
                offset: 10,
              }}
            />
            <ZAxis type="number" dataKey="z" range={[60, 300]} />
            <Tooltip
              cursor={{ strokeDasharray: "3 3", stroke: "oklch(0.65 0.2 260)" }}
              contentStyle={{
                backgroundColor: "oklch(0.16 0.01 260)",
                border: "1px solid oklch(0.3 0.01 260)",
                borderRadius: "12px",
                padding: "12px 16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
              itemStyle={{ color: "oklch(0.95 0 0)", fontSize: 12 }}
              labelStyle={{ color: "oklch(0.95 0 0)", fontWeight: 600, marginBottom: 4 }}
            />
            <Scatter name="Datos" data={data} fill="oklch(0.65 0.2 260)" fillOpacity={0.8} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
