"use client"

import type React from "react"
import { useState, useCallback, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Download,
  X,
  Filter,
  UserCircle,
  Users,
  Store,
  CalendarDays,
  Sun,
  Moon,
  RotateCcw,
  ChevronDown,
} from "lucide-react"
import { ParrotMascot } from "@/components/parrot-mascot"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface ColumnInfo {
  name: string
  type: "date" | "number" | "text"
  sample: any
}

interface GeneratedChart {
  id: string
  type: "line" | "bar" | "pie" | "area"
  title: string
  data: any[]
  xKey: string
  yKey: string
  description: string
}

interface KPI {
  label: string
  value: string
  change?: number
  icon: React.ReactNode
}

interface ProcessedData {
  columns: ColumnInfo[]
  charts: GeneratedChart[]
  kpis: KPI[]
  rawData: any[]
  rowCount: number
  vendedores: string[]
  clientes: string[]
  tiendas: string[]
  vendedorField?: string
  clienteField?: string
  tiendaField?: string
  dateField?: string
  valueCounts: {
    vendedores: Record<string, number>
    clientes: Record<string, number>
    tiendas: Record<string, number>
  }
  relationships: {
    vendedorClientes: Record<string, string[]>
    clienteTiendas: Record<string, string[]>
  }
}

const CHART_COLORS = ["#2563eb", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899", "#84cc16"]

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "processing" | "success" | "error">("idle")
  const [processedData, setProcessedData] = useState<ProcessedData | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [selectedVendedores, setSelectedVendedores] = useState<string[]>([])
  const [selectedClientes, setSelectedClientes] = useState<string[]>([])
  const [selectedTiendas, setSelectedTiendas] = useState<string[]>([])
  const [fechaInicio, setFechaInicio] = useState<Date | undefined>(undefined)
  const [fechaFin, setFechaFin] = useState<Date | undefined>(undefined)
  const [searchVendedor, setSearchVendedor] = useState("")
  const [searchCliente, setSearchCliente] = useState("")
  const [searchTienda, setSearchTienda] = useState("")

  const [filtersOpen, setFiltersOpen] = useState(false)
  const [fechaInicioOpen, setFechaInicioOpen] = useState(false)
  const [fechaFinOpen, setFechaFinOpen] = useState(false)

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }, [theme])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const detectColumnType = (values: any[]): "date" | "number" | "text" => {
    const sample = values.filter((v) => v !== null && v !== undefined && v !== "").slice(0, 10)
    if (sample.length === 0) return "text"

    const datePatterns = [/^\d{4}-\d{2}-\d{2}/, /^\d{2}\/\d{2}\/\d{4}/, /^\d{2}-\d{2}-\d{4}/]
    const isDate = sample.every((v) => {
      const str = String(v)
      return datePatterns.some((p) => p.test(str)) || !isNaN(Date.parse(str))
    })
    if (isDate) return "date"

    const isNumber = sample.every((v) => !isNaN(Number(v)) && typeof v !== "boolean")
    if (isNumber) return "number"

    return "text"
  }

  const generateChartsAndKpis = (data: any[], columns: ColumnInfo[]) => {
    const charts: GeneratedChart[] = []
    const kpis: KPI[] = []

    const dateCol = columns.find((c) => c.type === "date")
    const numericCols = columns.filter((c) => c.type === "number")
    const textCols = columns.filter((c) => c.type === "text")

    if (data.length === 0) {
      return { charts, kpis }
    }

    if (dateCol && numericCols.length > 0) {
      const numCol = numericCols[0]
      const aggregatedData = data.reduce((acc: any, row: any) => {
        const dateKey = String(row[dateCol.name]).split("T")[0]
        if (!acc[dateKey]) acc[dateKey] = { date: dateKey, value: 0, count: 0 }
        acc[dateKey].value += Number(row[numCol.name]) || 0
        acc[dateKey].count++
        return acc
      }, {})

      const chartData = Object.values(aggregatedData)
        .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(-30)

      charts.push({
        id: `trend-line-${dateCol.name}`,
        type: "line",
        title: `Tendencia de ${numCol.name}`,
        data: chartData,
        xKey: "date",
        yKey: "value",
        description: "Evolución temporal de los datos",
      })

      charts.push({
        id: `trend-area-${dateCol.name}`,
        type: "area",
        title: `Área de ${numCol.name}`,
        data: chartData,
        xKey: "date",
        yKey: "value",
        description: "Visualización de área acumulada",
      })
    }

    if (textCols.length > 0 && numericCols.length > 0) {
      const textCol = textCols[0]
      const numCol = numericCols[0]

      const aggregated = data.reduce((acc: any, row: any) => {
        const key = String(row[textCol.name] || "Sin categoría")
        if (!acc[key]) acc[key] = { category: key, value: 0 }
        acc[key].value += Number(row[numCol.name]) || 0
        return acc
      }, {})

      const barData = Object.values(aggregated)
        .sort((a: any, b: any) => b.value - a.value)
        .slice(0, 10)

      charts.push({
        id: `category-bar-${textCol.name}`,
        type: "bar",
        title: `${numCol.name} por ${textCol.name}`,
        data: barData,
        xKey: "category",
        yKey: "value",
        description: "Distribución por categoría",
      })

      charts.push({
        id: `category-pie-${textCol.name}`,
        type: "pie",
        title: `Distribución de ${textCol.name}`,
        data: barData.slice(0, 6),
        xKey: "category",
        yKey: "value",
        description: "Participación porcentual",
      })
    }

    numericCols.slice(0, 4).forEach((col) => {
      const values = data.map((row: any) => Number(row[col.name]) || 0)
      const total = values.reduce((a, b) => a + b, 0)
      const avg = total / (values.length || 1)

      kpis.push({
        label: `Total ${col.name}`,
        value: total.toLocaleString("es-MX", { maximumFractionDigits: 0 }),
        change: (avg ? (values[values.length - 1] - avg) / avg : 0) * 100,
        icon: <TrendingUp className="h-5 w-5" />,
      })
    })

    if (kpis.length === 0) {
      kpis.push({
        label: "Total Registros",
        value: data.length.toLocaleString(),
        icon: <FileSpreadsheet className="h-5 w-5" />,
      })
    }

    return { charts, kpis }
  }

  const processExcelFile = async (file: File) => {
    setUploadStatus("processing")

    try {
      const XLSX = await import("xlsx")
      const arrayBuffer = await file.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer, { type: "array" })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet)

      if (jsonData.length === 0) {
        setUploadStatus("error")
        return
      }

      const columnNames = Object.keys(jsonData[0] as object)
      const columns: ColumnInfo[] = columnNames.map((name) => {
        const values = jsonData.map((row: any) => row[name])
        const type = detectColumnType(values)
        return { name, type, sample: values[0] }
      })

      const vendedorCol = columnNames.find((c) => c.toLowerCase().includes("vendedor"))
      const clienteCol = columnNames.find((c) => c.toLowerCase().includes("cliente"))
      const tiendaCol = columnNames.find(
        (c) => c.toLowerCase().includes("tienda") || c.toLowerCase().includes("sucursal"),
      )
      const dateCol = columns.find((c) => c.type === "date")

      const vendedores = vendedorCol
        ? ([...new Set(jsonData.map((row: any) => row[vendedorCol]).filter(Boolean))] as string[])
        : []
      const clientes = clienteCol
        ? ([...new Set(jsonData.map((row: any) => row[clienteCol]).filter(Boolean))] as string[])
        : []
      const tiendas = tiendaCol
        ? ([...new Set(jsonData.map((row: any) => row[tiendaCol]).filter(Boolean))] as string[])
        : []

      const valueCounts = {
        vendedores: vendedores.reduce((acc, v) => {
          acc[v] = jsonData.filter((row: any) => row[vendedorCol as string] === v).length
          return acc
        }, {} as Record<string, number>),
        clientes: clientes.reduce((acc, c) => {
          acc[c] = jsonData.filter((row: any) => row[clienteCol as string] === c).length
          return acc
        }, {} as Record<string, number>),
        tiendas: tiendas.reduce((acc, t) => {
          acc[t] = jsonData.filter((row: any) => row[tiendaCol as string] === t).length
          return acc
        }, {} as Record<string, number>),
      }

      const vendedorClientes: Record<string, Set<string>> = {}
      const clienteTiendas: Record<string, Set<string>> = {}

      jsonData.forEach((row: any) => {
        if (vendedorCol && clienteCol && row[vendedorCol] && row[clienteCol]) {
          if (!vendedorClientes[row[vendedorCol]]) vendedorClientes[row[vendedorCol]] = new Set<string>()
          vendedorClientes[row[vendedorCol]].add(row[clienteCol])
        }

        if (clienteCol && tiendaCol && row[clienteCol] && row[tiendaCol]) {
          if (!clienteTiendas[row[clienteCol]]) clienteTiendas[row[clienteCol]] = new Set<string>()
          clienteTiendas[row[clienteCol]].add(row[tiendaCol])
        }
      })

      const { charts, kpis } = generateChartsAndKpis(jsonData, columns)

      setProcessedData({
        columns,
        charts,
        kpis,
        rawData: jsonData,
        rowCount: jsonData.length,
        vendedores,
        clientes,
        tiendas,
        vendedorField: vendedorCol,
        clienteField: clienteCol,
        tiendaField: tiendaCol,
        dateField: dateCol?.name,
        valueCounts,
        relationships: {
          vendedorClientes: Object.fromEntries(
            Object.entries(vendedorClientes).map(([key, value]) => [key, Array.from(value)]),
          ),
          clienteTiendas: Object.fromEntries(
            Object.entries(clienteTiendas).map(([key, value]) => [key, Array.from(value)]),
          ),
        },
      })
      setUploadStatus("success")
    } catch (error) {
      console.error("Error processing file:", error)
      setUploadStatus("error")
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (
        droppedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        droppedFile.type === "application/vnd.ms-excel" ||
        droppedFile.name.endsWith(".xlsx") ||
        droppedFile.name.endsWith(".xls")
      ) {
        setFile(droppedFile)
        processExcelFile(droppedFile)
      }
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      processExcelFile(selectedFile)
    }
  }

  const resetUpload = () => {
    setFile(null)
    setUploadStatus("idle")
    setProcessedData(null)
    setSelectedVendedores([])
    setSelectedClientes([])
    setSelectedTiendas([])
    setFechaInicio(undefined)
    setFechaFin(undefined)
    setSearchVendedor("")
    setSearchCliente("")
    setSearchTienda("")
  }

  const totalFilters =
    selectedVendedores.length +
    selectedClientes.length +
    selectedTiendas.length +
    (fechaInicio ? 1 : 0) +
    (fechaFin ? 1 : 0)

  const clearAllFilters = () => {
    setSelectedVendedores([])
    setSelectedClientes([])
    setSelectedTiendas([])
    setFechaInicio(undefined)
    setFechaFin(undefined)
    setSearchVendedor("")
    setSearchCliente("")
    setSearchTienda("")
    setFiltersOpen(false)
  }

  const filteredRows = useMemo(() => {
    if (!processedData) return []

    return processedData.rawData.filter((row) => {
      const matchesVendedor =
        selectedVendedores.length === 0 ||
        (processedData.vendedorField && selectedVendedores.includes(row[processedData.vendedorField]))

      const matchesCliente =
        selectedClientes.length === 0 ||
        (processedData.clienteField && selectedClientes.includes(row[processedData.clienteField]))

      const matchesTienda =
        selectedTiendas.length === 0 ||
        (processedData.tiendaField && selectedTiendas.includes(row[processedData.tiendaField]))

      const matchesFechaInicio =
        !fechaInicio ||
        (processedData.dateField && row[processedData.dateField]
          ? new Date(row[processedData.dateField]).getTime() >= fechaInicio.getTime()
          : true)

      const matchesFechaFin =
        !fechaFin ||
        (processedData.dateField && row[processedData.dateField]
          ? new Date(row[processedData.dateField]).getTime() <= fechaFin.getTime()
          : true)

      return matchesVendedor && matchesCliente && matchesTienda && matchesFechaInicio && matchesFechaFin
    })
  }, [
    processedData,
    selectedVendedores,
    selectedClientes,
    selectedTiendas,
    fechaInicio,
    fechaFin,
  ])

  const { charts: filteredCharts, kpis: filteredKpis } = useMemo(() => {
    if (!processedData) return { charts: [], kpis: [] }
    return generateChartsAndKpis(filteredRows, processedData.columns)
  }, [filteredRows, processedData])

  const coveragePercent = useMemo(() => {
    if (!processedData || processedData.rowCount === 0) return 0
    return Math.round((filteredRows.length / processedData.rowCount) * 100)
  }, [filteredRows, processedData])

  const filteredVendedores = useMemo(
    () =>
      processedData?.vendedores.filter((v) => v.toLowerCase().includes(searchVendedor.toLowerCase())) ?? [],
    [processedData?.vendedores, searchVendedor],
  )

  const filteredClientes = useMemo(
    () => processedData?.clientes.filter((c) => c.toLowerCase().includes(searchCliente.toLowerCase())) ?? [],
    [processedData?.clientes, searchCliente],
  )

  const filteredTiendas = useMemo(
    () => processedData?.tiendas.filter((t) => t.toLowerCase().includes(searchTienda.toLowerCase())) ?? [],
    [processedData?.tiendas, searchTienda],
  )

  const toggleAllVendedores = useCallback(() => {
    if (!processedData) return
    const allVisible = filteredVendedores
    const allSelected = allVisible.length > 0 && allVisible.every((v) => selectedVendedores.includes(v))
    setSelectedVendedores(allSelected ? [] : allVisible)
  }, [filteredVendedores, processedData, selectedVendedores])

  const toggleAllClientes = useCallback(() => {
    if (!processedData) return
    const allVisible = filteredClientes
    const allSelected = allVisible.length > 0 && allVisible.every((c) => selectedClientes.includes(c))
    setSelectedClientes(allSelected ? [] : allVisible)
  }, [filteredClientes, processedData, selectedClientes])

  const toggleAllTiendas = useCallback(() => {
    if (!processedData) return
    const allVisible = filteredTiendas
    const allSelected = allVisible.length > 0 && allVisible.every((t) => selectedTiendas.includes(t))
    setSelectedTiendas(allSelected ? [] : allVisible)
  }, [filteredTiendas, processedData, selectedTiendas])

  const vendorSubfilterClientes = useMemo(() => {
    if (!processedData) return []
    const map = processedData.relationships.vendedorClientes
    const clientes = new Set<string>()
    selectedVendedores.forEach((v) => {
      map[v]?.forEach((c) => clientes.add(c))
    })
    return Array.from(clientes)
      .filter((c) => c.toLowerCase().includes(searchCliente.toLowerCase()))
      .sort()
  }, [processedData, searchCliente, selectedVendedores])

  const clienteSubfilterTiendas = useMemo(() => {
    if (!processedData) return []
    const map = processedData.relationships.clienteTiendas
    const tiendas = new Set<string>()
    selectedClientes.forEach((c) => {
      map[c]?.forEach((t) => tiendas.add(t))
    })
    return Array.from(tiendas)
      .filter((t) => t.toLowerCase().includes(searchTienda.toLowerCase()))
      .sort()
  }, [processedData, searchTienda, selectedClientes])

  const renderChart = (chart: GeneratedChart) => {
    const commonProps = {
      data: chart.data,
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
    }

    switch (chart.type) {
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey={chart.xKey} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey={chart.yKey} stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        )
      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey={chart.xKey} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Area type="monotone" dataKey={chart.yKey} stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
          </AreaChart>
        )
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey={chart.xKey} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey={chart.yKey} fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        )
      case "pie":
        return (
          <RechartsPie>
            <Pie
              data={chart.data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey={chart.yKey}
              nameKey={chart.xKey}
            >
              {chart.data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </RechartsPie>
        )
      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-gray-50" : "bg-background"}`}>
      {/* Filter Bar */}
      {uploadStatus === "success" && processedData && (
        <div
          className={`sticky top-0 z-40 border-b px-6 py-3 ${theme === "light" ? "bg-white border-gray-200" : "bg-card border-border"}`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Filters Dropdown */}
              <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Filter className="h-4 w-4" />
                    Filtros
                    {totalFilters > 0 && (
                      <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                        {totalFilters}
                      </Badge>
                    )}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="start">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3 rounded-md bg-muted/40 p-3 text-sm">
                      <div className="space-y-1">
                        <p className="font-semibold">Vista activa</p>
                        <p className="text-xs text-muted-foreground">
                          {filteredRows.length.toLocaleString()} de {processedData.rowCount.toLocaleString()} registros
                        </p>
                      </div>
                      {totalFilters > 0 && (
                        <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 px-3">
                          <RotateCcw className="mr-2 h-3 w-3" />
                          Limpiar
                        </Button>
                      )}
                    </div>

                    {/* Vendedor Filter */}
                    {processedData.vendedores.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <UserCircle className="h-4 w-4 text-blue-500" />
                            <span className="font-medium text-sm">Vendedor</span>
                          </div>
                          <Input
                            placeholder="Buscar"
                            value={searchVendedor}
                            onChange={(e) => setSearchVendedor(e.target.value)}
                            className="h-8 w-36 text-sm"
                          />
                        </div>
                        <div className="flex items-center justify-between text-[12px] text-muted-foreground">
                          <span>Coincidencias ({filteredVendedores.length})</span>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-[12px]" onClick={toggleAllVendedores}>
                            {filteredVendedores.length > 0 && filteredVendedores.every((v) => selectedVendedores.includes(v))
                              ? "Quitar todos"
                              : "Seleccionar todos"}
                          </Button>
                        </div>
                        <ScrollArea className="h-32">
                          <div className="space-y-2">
                            {filteredVendedores.map((v) => (
                              <label key={v} className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                  checked={selectedVendedores.includes(v)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedVendedores([...selectedVendedores, v])
                                    } else {
                                      setSelectedVendedores(selectedVendedores.filter((x) => x !== v))
                                    }
                                  }}
                                />
                                <div className="flex items-center justify-between w-full">
                                  <span className="text-sm">{v}</span>
                                  <Badge variant="outline" className="text-[10px] font-semibold">
                                    {processedData.valueCounts.vendedores[v] ?? 0}
                                  </Badge>
                                </div>
                              </label>
                            ))}
                            {filteredVendedores.length === 0 && (
                              <p className="text-xs text-muted-foreground">Sin coincidencias</p>
                            )}
                          </div>
                        </ScrollArea>

                        {vendorSubfilterClientes.length > 0 && (
                          <div className="rounded-md border border-border/60 bg-muted/30 p-2">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                Subfiltros por cliente
                              </p>
                              <Badge variant="secondary" className="h-5 text-[10px]">
                                vinculados
                              </Badge>
                            </div>
                            <p className="mt-1 text-[12px] text-muted-foreground">
                              Clientes asociados a los vendedores seleccionados.
                            </p>
                            <ScrollArea className="mt-2 h-24">
                              <div className="space-y-2">
                                {vendorSubfilterClientes.map((c) => (
                                  <label key={c} className="flex items-center gap-2 cursor-pointer">
                                    <Checkbox
                                      checked={selectedClientes.includes(c)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setSelectedClientes([...selectedClientes, c])
                                        } else {
                                          setSelectedClientes(selectedClientes.filter((x) => x !== c))
                                        }
                                      }}
                                    />
                                    <div className="flex items-center justify-between w-full">
                                      <span className="text-sm">{c}</span>
                                      <Badge variant="outline" className="text-[10px] font-semibold">
                                        {processedData.valueCounts.clientes[c] ?? 0}
                                      </Badge>
                                    </div>
                                  </label>
                                ))}
                              </div>
                            </ScrollArea>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Cliente Filter */}
                    {processedData.clientes.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-green-500" />
                            <span className="font-medium text-sm">Cliente</span>
                          </div>
                          <Input
                            placeholder="Buscar"
                            value={searchCliente}
                            onChange={(e) => setSearchCliente(e.target.value)}
                            className="h-8 w-36 text-sm"
                          />
                        </div>
                        <div className="flex items-center justify-between text-[12px] text-muted-foreground">
                          <span>Coincidencias ({filteredClientes.length})</span>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-[12px]" onClick={toggleAllClientes}>
                            {filteredClientes.length > 0 && filteredClientes.every((c) => selectedClientes.includes(c))
                              ? "Quitar todos"
                              : "Seleccionar todos"}
                          </Button>
                        </div>
                        <ScrollArea className="h-32">
                          <div className="space-y-2">
                            {filteredClientes.map((c) => (
                              <label key={c} className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                  checked={selectedClientes.includes(c)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedClientes([...selectedClientes, c])
                                    } else {
                                      setSelectedClientes(selectedClientes.filter((x) => x !== c))
                                    }
                                  }}
                                />
                                <div className="flex items-center justify-between w-full">
                                  <span className="text-sm">{c}</span>
                                  <Badge variant="outline" className="text-[10px] font-semibold">
                                    {processedData.valueCounts.clientes[c] ?? 0}
                                  </Badge>
                                </div>
                              </label>
                            ))}
                            {filteredClientes.length === 0 && (
                              <p className="text-xs text-muted-foreground">Sin coincidencias</p>
                            )}
                          </div>
                        </ScrollArea>

                        {clienteSubfilterTiendas.length > 0 && (
                          <div className="rounded-md border border-border/60 bg-muted/30 p-2">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                Subfiltros por tienda
                              </p>
                              <Badge variant="secondary" className="h-5 text-[10px]">
                                asociados
                              </Badge>
                            </div>
                            <p className="mt-1 text-[12px] text-muted-foreground">
                              Tiendas vinculadas a los clientes seleccionados.
                            </p>
                            <ScrollArea className="mt-2 h-24">
                              <div className="space-y-2">
                                {clienteSubfilterTiendas.map((t) => (
                                  <label key={t} className="flex items-center gap-2 cursor-pointer">
                                    <Checkbox
                                      checked={selectedTiendas.includes(t)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setSelectedTiendas([...selectedTiendas, t])
                                        } else {
                                          setSelectedTiendas(selectedTiendas.filter((x) => x !== t))
                                        }
                                      }}
                                    />
                                    <div className="flex items-center justify-between w-full">
                                      <span className="text-sm">{t}</span>
                                      <Badge variant="outline" className="text-[10px] font-semibold">
                                        {processedData.valueCounts.tiendas[t] ?? 0}
                                      </Badge>
                                    </div>
                                  </label>
                                ))}
                              </div>
                            </ScrollArea>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tienda Filter */}
                    {processedData.tiendas.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Store className="h-4 w-4 text-amber-500" />
                            <span className="font-medium text-sm">Tienda</span>
                          </div>
                          <Input
                            placeholder="Buscar"
                            value={searchTienda}
                            onChange={(e) => setSearchTienda(e.target.value)}
                            className="h-8 w-36 text-sm"
                          />
                        </div>
                        <div className="flex items-center justify-between text-[12px] text-muted-foreground">
                          <span>Coincidencias ({filteredTiendas.length})</span>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-[12px]" onClick={toggleAllTiendas}>
                            {filteredTiendas.length > 0 && filteredTiendas.every((t) => selectedTiendas.includes(t))
                              ? "Quitar todos"
                              : "Seleccionar todos"}
                          </Button>
                        </div>
                        <ScrollArea className="h-32">
                          <div className="space-y-2">
                            {filteredTiendas.map((t) => (
                              <label key={t} className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                  checked={selectedTiendas.includes(t)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedTiendas([...selectedTiendas, t])
                                    } else {
                                      setSelectedTiendas(selectedTiendas.filter((x) => x !== t))
                                    }
                                  }}
                                />
                                <div className="flex items-center justify-between w-full">
                                  <span className="text-sm">{t}</span>
                                  <Badge variant="outline" className="text-[10px] font-semibold">
                                    {processedData.valueCounts.tiendas[t] ?? 0}
                                  </Badge>
                                </div>
                              </label>
                            ))}
                            {filteredTiendas.length === 0 && (
                              <p className="text-xs text-muted-foreground">Sin coincidencias</p>
                            )}
                          </div>
                        </ScrollArea>
                      </div>
                    )}

                    {totalFilters > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearAllFilters} className="w-full">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Limpiar filtros
                      </Button>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Date Start */}
              <Popover open={fechaInicioOpen} onOpenChange={setFechaInicioOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <CalendarDays className="h-4 w-4" />
                    {fechaInicio ? format(fechaInicio, "dd/MM/yyyy", { locale: es }) : "Fecha inicio"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fechaInicio}
                    onSelect={(date) => {
                      setFechaInicio(date)
                      setFechaInicioOpen(false)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Date End */}
              <Popover open={fechaFinOpen} onOpenChange={setFechaFinOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <CalendarDays className="h-4 w-4" />
                    {fechaFin ? format(fechaFin, "dd/MM/yyyy", { locale: es }) : "Fecha fin"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fechaFin}
                    onSelect={(date) => {
                      setFechaFin(date)
                      setFechaFinOpen(false)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {filteredRows.length.toLocaleString()} registros filtrados
              </span>

              <div className="flex items-center gap-2 rounded-md border border-border/60 bg-muted/50 px-3 py-2 text-sm">
                <TrendingUp className="h-4 w-4 text-primary" />
                <div className="leading-tight">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Cobertura</p>
                  <p className="font-semibold">{coveragePercent}%</p>
                </div>
              </div>

              <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              <Button variant="outline" size="sm" onClick={resetUpload}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Nueva carga
              </Button>
            </div>
          </div>

          {/* Active Filters Chips */}
          {totalFilters > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedVendedores.map((v) => (
                <Badge key={v} variant="secondary" className="gap-1 bg-blue-500/20 text-blue-400">
                  {v}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedVendedores(selectedVendedores.filter((x) => x !== v))}
                  />
                </Badge>
              ))}
              {selectedClientes.map((c) => (
                <Badge key={c} variant="secondary" className="gap-1 bg-green-500/20 text-green-400">
                  {c}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedClientes(selectedClientes.filter((x) => x !== c))}
                  />
                </Badge>
              ))}
              {selectedTiendas.map((t) => (
                <Badge key={t} variant="secondary" className="gap-1 bg-amber-500/20 text-amber-400">
                  {t}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedTiendas(selectedTiendas.filter((x) => x !== t))}
                  />
                </Badge>
              ))}
              {fechaInicio && (
                <Badge variant="secondary" className="gap-1 bg-purple-500/20 text-purple-400">
                  Desde: {format(fechaInicio, "dd/MM/yyyy")}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setFechaInicio(undefined)} />
                </Badge>
              )}
              {fechaFin && (
                <Badge variant="secondary" className="gap-1 bg-purple-500/20 text-purple-400">
                  Hasta: {format(fechaFin, "dd/MM/yyyy")}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setFechaFin(undefined)} />
                </Badge>
              )}
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {/* Upload Area */}
        {uploadStatus === "idle" && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <ParrotMascot size="lg" mood="happy" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Carga Mágica de Excel</h1>
              <p className="text-muted-foreground">
                Sube tu archivo Excel y Parrot generará dashboards automáticamente
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div
                  className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                    dragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-lg mb-1">Arrastra tu archivo Excel aquí</p>
                      <p className="text-sm text-muted-foreground">o haz clic para seleccionar (.xlsx, .xls)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Processing State */}
        {uploadStatus === "processing" && (
          <div className="max-w-md mx-auto text-center">
            <div className="flex justify-center mb-6">
              <ParrotMascot size="lg" mood="thinking" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Procesando archivo...</h2>
            <Progress value={66} className="mb-4" />
            <p className="text-muted-foreground">Parrot está analizando tus datos</p>
          </div>
        )}

        {/* Error State */}
        {uploadStatus === "error" && (
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Error al procesar</h2>
            <p className="text-muted-foreground mb-6">No pudimos procesar el archivo. Verifica el formato.</p>
            <Button onClick={resetUpload}>Intentar de nuevo</Button>
          </div>
        )}

        {/* Success State - Dashboard */}
        {uploadStatus === "success" && processedData && (
          <div className="space-y-6">
            {/* Success Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{file?.name}</h2>
                <p className="text-muted-foreground">{processedData.columns.length} columnas detectadas</p>
              </div>
            </div>

            {filteredRows.length === 0 && (
              <div className="mb-6 flex items-start justify-between gap-4 rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">No hay datos con estos filtros</p>
                  <p className="text-muted-foreground">
                    Ajusta los filtros o límpialos para recuperar el tablero completo.
                  </p>
                </div>
                <Button variant="secondary" size="sm" onClick={clearAllFilters}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Limpiar filtros
                </Button>
              </div>
            )}

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredKpis.map((kpi, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                        <p className="text-2xl font-bold">{kpi.value}</p>
                        {kpi.change !== undefined && (
                          <p className={`text-sm ${kpi.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {kpi.change >= 0 ? "+" : ""}
                            {kpi.change.toFixed(1)}%
                          </p>
                        )}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {kpi.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCharts.map((chart) => (
                <Card key={chart.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{chart.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{chart.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        {renderChart(chart)}
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Export Button */}
            <div className="flex justify-end">
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Exportar Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
