"use client"

import { useState } from "react"
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type DateMode = "day" | "month" | "year"

interface DateRangePickerProps {
  onChange?: (range: { start: Date; end: Date; mode: DateMode }) => void
}

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

const shortMonths = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

export function DateRangePicker({ onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<DateMode>("month")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewDate, setViewDate] = useState(new Date())
  const [selectedRange, setSelectedRange] = useState<{ start: Date; end: Date } | null>(null)

  const currentYear = viewDate.getFullYear()
  const currentMonth = viewDate.getMonth()

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const handlePrevious = () => {
    if (mode === "day") {
      setViewDate(new Date(currentYear, currentMonth - 1, 1))
    } else if (mode === "month") {
      setViewDate(new Date(currentYear - 1, currentMonth, 1))
    } else {
      setViewDate(new Date(currentYear - 12, currentMonth, 1))
    }
  }

  const handleNext = () => {
    if (mode === "day") {
      setViewDate(new Date(currentYear, currentMonth + 1, 1))
    } else if (mode === "month") {
      setViewDate(new Date(currentYear + 1, currentMonth, 1))
    } else {
      setViewDate(new Date(currentYear + 12, currentMonth, 1))
    }
  }

  const selectDay = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day)
    setSelectedDate(newDate)
    const range = { start: newDate, end: newDate, mode }
    setSelectedRange(range)
    onChange?.(range)
    setIsOpen(false)
  }

  const selectMonth = (monthIndex: number) => {
    const start = new Date(currentYear, monthIndex, 1)
    const end = new Date(currentYear, monthIndex + 1, 0)
    setSelectedDate(start)
    const range = { start, end, mode }
    setSelectedRange(range)
    onChange?.(range)
    setIsOpen(false)
  }

  const selectYear = (year: number) => {
    const start = new Date(year, 0, 1)
    const end = new Date(year, 11, 31)
    setSelectedDate(start)
    const range = { start, end, mode }
    setSelectedRange(range)
    onChange?.(range)
    setIsOpen(false)
  }

  const getDisplayText = () => {
    if (!selectedRange) return "Seleccionar fecha"

    if (mode === "day") {
      return selectedRange.start.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    } else if (mode === "month") {
      return `${months[selectedRange.start.getMonth()]} ${selectedRange.start.getFullYear()}`
    } else {
      return selectedRange.start.getFullYear().toString()
    }
  }

  const renderDayPicker = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8" />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear
      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === currentMonth &&
        new Date().getFullYear() === currentYear

      days.push(
        <button
          key={day}
          onClick={() => selectDay(day)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors",
            isSelected
              ? "bg-primary text-primary-foreground"
              : isToday
                ? "bg-primary/20 text-primary"
                : "text-foreground hover:bg-secondary",
          )}
        >
          {day}
        </button>,
      )
    }

    return (
      <div>
        <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
          {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"].map((d) => (
            <div key={d} className="h-8 w-8 leading-8">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    )
  }

  const renderMonthPicker = () => {
    return (
      <div className="grid grid-cols-3 gap-2">
        {shortMonths.map((month, idx) => {
          const isSelected = selectedDate.getMonth() === idx && selectedDate.getFullYear() === currentYear
          const isCurrent = new Date().getMonth() === idx && new Date().getFullYear() === currentYear

          return (
            <button
              key={month}
              onClick={() => selectMonth(idx)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition-colors",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : isCurrent
                    ? "bg-primary/20 text-primary"
                    : "text-foreground hover:bg-secondary",
              )}
            >
              {month}
            </button>
          )
        })}
      </div>
    )
  }

  const renderYearPicker = () => {
    const startYear = Math.floor(currentYear / 12) * 12
    const years = Array.from({ length: 12 }, (_, i) => startYear + i)

    return (
      <div className="grid grid-cols-3 gap-2">
        {years.map((year) => {
          const isSelected = selectedDate.getFullYear() === year
          const isCurrent = new Date().getFullYear() === year

          return (
            <button
              key={year}
              onClick={() => selectYear(year)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition-colors",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : isCurrent
                    ? "bg-primary/20 text-primary"
                    : "text-foreground hover:bg-secondary",
              )}
            >
              {year}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Calendar className="h-4 w-4" />
          {getDisplayText()}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px] p-4">
        <div className="mb-4 flex rounded-lg bg-secondary p-1">
          {(["day", "month", "year"] as DateMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                mode === m ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {m === "day" ? "Día" : m === "month" ? "Mes" : "Año"}
            </button>
          ))}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <button onClick={handlePrevious} className="rounded-md p-1.5 transition-colors hover:bg-secondary">
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
          <span className="text-sm font-medium text-foreground">
            {mode === "day"
              ? `${months[currentMonth]} ${currentYear}`
              : mode === "month"
                ? currentYear
                : `${Math.floor(currentYear / 12) * 12} - ${Math.floor(currentYear / 12) * 12 + 11}`}
          </span>
          <button onClick={handleNext} className="rounded-md p-1.5 transition-colors hover:bg-secondary">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {mode === "day" && renderDayPicker()}
        {mode === "month" && renderMonthPicker()}
        {mode === "year" && renderYearPicker()}

        <DropdownMenuSeparator className="my-3" />

        <div className="space-y-1">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Accesos rápidos</p>
          <DropdownMenuItem
            onClick={() => {
              const today = new Date()
              setSelectedDate(today)
              setSelectedRange({ start: today, end: today })
              setMode("day")
              setIsOpen(false)
            }}
          >
            Hoy
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              const now = new Date()
              const start = new Date(now.getFullYear(), now.getMonth(), 1)
              const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
              setSelectedDate(start)
              setSelectedRange({ start, end })
              setMode("month")
              setIsOpen(false)
            }}
          >
            Este mes
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              const now = new Date()
              const start = new Date(now.getFullYear(), 0, 1)
              const end = new Date(now.getFullYear(), 11, 31)
              setSelectedDate(start)
              setSelectedRange({ start, end })
              setMode("year")
              setIsOpen(false)
            }}
          >
            Este año
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
