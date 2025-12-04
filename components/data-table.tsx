"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronLeft, ChevronRight, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

interface Column {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  title?: string
  isRealtime?: boolean
}

export function DataTable({ columns, data, title, isRealtime = true }: DataTableProps) {
  const [pulse, setPulse] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    if (!isRealtime) return
    const interval = setInterval(() => {
      setPulse(true)
      setLastUpdate(new Date())
      setTimeout(() => setPulse(false), 1000)
    }, 5000)
    return () => clearInterval(interval)
  }, [isRealtime])

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card transition-all duration-300",
        pulse && "ring-1 ring-success/20",
      )}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-medium text-foreground">{title}</h3>
            {isRealtime && (
              <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1">
                <div className={cn("h-1.5 w-1.5 rounded-full bg-success", pulse && "animate-ping")} />
                <span className="text-[10px] font-semibold text-success uppercase tracking-wide">En vivo</span>
                <Activity className={cn("h-3 w-3 text-success", pulse && "animate-pulse")} />
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            {isRealtime && (
              <span className="text-[10px] text-muted-foreground/60 font-mono">
                {lastUpdate.toLocaleTimeString("es-ES")}
              </span>
            )}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar..." className="w-64 bg-secondary pl-9 text-sm" />
            </div>
          </div>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={cn(
                "border-border hover:bg-secondary/50 transition-all duration-300",
                pulse && rowIndex === 0 && "bg-success/5",
              )}
            >
              {columns.map((column) => (
                <TableCell key={column.key} className="text-sm text-foreground">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t border-border px-6 py-4">
        <p className="text-sm text-muted-foreground">
          Mostrando 1 a {data.length} de {data.length} resultados
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
