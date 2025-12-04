"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface CorrelationMatrixProps {
  data?: {
    labels: string[]
    values: number[][]
  }
}

const defaultData = {
  labels: ["NPS", "CSAT", "Conversión", "CAC", "ROI", "Retención"],
  values: [
    [1.0, 0.85, 0.87, -0.32, 0.45, 0.78],
    [0.85, 1.0, 0.72, -0.28, 0.52, 0.81],
    [0.87, 0.72, 1.0, -0.41, 0.63, 0.69],
    [-0.32, -0.28, -0.41, 1.0, -0.55, -0.23],
    [0.45, 0.52, 0.63, -0.55, 1.0, 0.48],
    [0.78, 0.81, 0.69, -0.23, 0.48, 1.0],
  ],
}

export function CorrelationMatrix({ data = defaultData }: CorrelationMatrixProps) {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)

  const getCellStyle = (value: number, isSelected: boolean, isHighlighted: boolean) => {
    const absValue = Math.abs(value)
    let bgColor = ""
    let textColor = ""
    let icon = null

    if (value >= 0.6) {
      bgColor = "bg-emerald-500/80"
      textColor = "text-white"
      icon = <TrendingUp className="h-3 w-3" />
    } else if (value >= 0.3) {
      bgColor = "bg-emerald-500/40"
      textColor = "text-emerald-200"
      icon = <TrendingUp className="h-3 w-3" />
    } else if (value > -0.3) {
      bgColor = "bg-slate-600/50"
      textColor = "text-slate-300"
      icon = <Minus className="h-3 w-3" />
    } else if (value > -0.6) {
      bgColor = "bg-rose-500/40"
      textColor = "text-rose-200"
      icon = <TrendingDown className="h-3 w-3" />
    } else {
      bgColor = "bg-rose-500/80"
      textColor = "text-white"
      icon = <TrendingDown className="h-3 w-3" />
    }

    return { bgColor, textColor, icon }
  }

  const selectedValue = selectedCell ? data.values[selectedCell.row][selectedCell.col] : null
  const selectedLabels = selectedCell
    ? { row: data.labels[selectedCell.row], col: data.labels[selectedCell.col] }
    : null

  return (
    <div>
      {/* Explicación del valor seleccionado */}
      <div className="mb-6 h-16 rounded-xl bg-secondary/50 p-4">
        {selectedCell && selectedValue !== null ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{selectedLabels?.row}</span>
              <span className="text-muted-foreground">y</span>
              <span className="font-medium text-foreground">{selectedLabels?.col}</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <p className="text-sm text-muted-foreground">
              {selectedValue >= 0.6
                ? "Relación fuerte positiva: cuando una sube, la otra también sube"
                : selectedValue >= 0.3
                  ? "Relación moderada positiva: tienden a moverse en la misma dirección"
                  : selectedValue > -0.3
                    ? "Relación débil o nula: no hay conexión clara entre estas métricas"
                    : selectedValue > -0.6
                      ? "Relación moderada negativa: cuando una sube, la otra tiende a bajar"
                      : "Relación fuerte negativa: se mueven en direcciones opuestas"}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Haz clic en una celda para ver qué significa</p>
        )}
      </div>

      {/* Matriz */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Header */}
          <div className="mb-2 flex">
            <div className="w-24 shrink-0" />
            {data.labels.map((label) => (
              <div key={label} className="flex w-16 shrink-0 items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          {/* Rows */}
          {data.labels.map((rowLabel, rowIndex) => (
            <div key={rowLabel} className="mb-2 flex items-center">
              <div className="w-24 shrink-0 pr-3 text-right">
                <span className="text-xs font-medium text-muted-foreground">{rowLabel}</span>
              </div>
              {data.values[rowIndex].map((value, colIndex) => {
                const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                const isHighlighted = selectedCell?.row === rowIndex || selectedCell?.col === colIndex
                const { bgColor, textColor, icon } = getCellStyle(value, isSelected, isHighlighted)

                return (
                  <div key={colIndex} className="w-16 shrink-0 p-0.5">
                    <button
                      onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
                      className={cn(
                        "flex h-12 w-full flex-col items-center justify-center rounded-lg transition-all duration-200",
                        bgColor,
                        textColor,
                        isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-card scale-110 z-10" : "",
                        isHighlighted && !isSelected ? "opacity-100" : "",
                        !isHighlighted && selectedCell ? "opacity-40" : "",
                        "hover:scale-105 hover:opacity-100",
                      )}
                    >
                      <span className="text-xs font-bold">{value.toFixed(2)}</span>
                    </button>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Leyenda */}
      <div className="mt-6 flex items-center justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-rose-500/80">
            <TrendingDown className="h-3 w-3 text-white" />
          </div>
          <span className="text-xs text-muted-foreground">Negativa fuerte</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-600/50">
            <Minus className="h-3 w-3 text-slate-300" />
          </div>
          <span className="text-xs text-muted-foreground">Sin relación</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500/80">
            <TrendingUp className="h-3 w-3 text-white" />
          </div>
          <span className="text-xs text-muted-foreground">Positiva fuerte</span>
        </div>
      </div>
    </div>
  )
}
