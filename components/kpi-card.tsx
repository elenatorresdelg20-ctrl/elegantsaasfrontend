"use client"

import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
}

export function KpiCard({ title, value, change, changeLabel, icon: Icon, trend = "up" }: KpiCardProps) {
  const glowColorClass = trend === "up" ? "bg-success" : trend === "down" ? "bg-destructive" : "bg-muted-foreground"

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
      )}
    >
      {/* Glow effect */}
      <div
        className={cn(
          "absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40",
          glowColorClass,
        )}
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">{title}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/20">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>

        <div className="mt-6">
          <p className="text-4xl font-bold tracking-tight text-foreground">{value}</p>

          <div className="mt-3 flex items-center gap-2">
            <span
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                trend === "up" && "bg-success/15 text-success",
                trend === "down" && "bg-destructive/15 text-destructive",
                trend === "neutral" && "bg-muted text-muted-foreground",
              )}
            >
              {trend === "up" && <ArrowUpRight className="h-3 w-3" />}
              {trend === "down" && <ArrowDownRight className="h-3 w-3" />}
              {trend === "neutral" && <Minus className="h-3 w-3" />}
              {change > 0 ? "+" : ""}
              {change}%
            </span>
            <span className="text-xs text-muted-foreground">{changeLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
