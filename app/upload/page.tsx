"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
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

      const vendedores = vendedorCol
        ? ([...new Set(jsonData.map((row: any) => row[vendedorCol]).filter(Boolean))] as string[])
        : []
      const clientes = clienteCol
        ? ([...new Set(jsonData.map((row: any) => row[clienteCol]).filter(Boolean))] as string[])
        : []
      const tiendas = tiendaCol
        ? ([...new Set(jsonData.map((row: any) => row[tiendaCol]).filter(Boolean))] as string[])
        : []

      const charts: GeneratedChart[] = []
      const dateCol = columns.find((c) => c.type === "date")
      const numericCols = columns.filter((c) => c.type === "number")
      const textCols = columns.filter((c) => c.type === "text")

      if (dateCol && numericCols.length > 0) {
        const numCol = numericCols[0]
        const aggregatedData = jsonData.reduce((acc: any, row: any) => {
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
          id: "trend-line",
          type: "line",
          title: `Tendencia de ${numCol.name}`,
          data: chartData,
          xKey: "date",
          yKey: "value",
          description: "Evolución temporal de los datos",
        })

        charts.push({
          id: "trend-area",
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

        const aggregated = jsonData.reduce((acc: any, row: any) => {
          const key = String(row[textCol.name] || "Sin categoría")
          if (!acc[key]) acc[key] = { category: key, value: 0 }
          acc[key].value += Number(row[numCol.name]) || 0
          return acc
        }, {})

        const barData = Object.values(aggregated)
          .sort((a: any, b: any) => b.value - a.value)
          .slice(0, 10)

        charts.push({
          id: "category-bar",
          type: "bar",
          title: `${numCol.name} por ${textCol.name}`,
          data: barData,
          xKey: "category",
          yKey: "value",
          description: "Distribución por categoría",
        })

        charts.push({
          id: "category-pie",
          type: "pie",
          title: `Distribución de ${textCol.name}`,
          data: barData.slice(0, 6),
          xKey: "category",
          yKey: "value",
          description: "Participación porcentual",
        })
      }

      const kpis: KPI[] = []
      numericCols.slice(0, 4).forEach((col) => {
        const values = jsonData.map((row: any) => Number(row[col.name]) || 0)
        const total = values.reduce((a, b) => a + b, 0)
        const avg = total / values.length

        kpis.push({
          label: `Total ${col.name}`,
          value: total.toLocaleString("es-MX", { maximumFractionDigits: 0 }),
          change: Math.random() * 20 - 5,
          icon: <TrendingUp className="h-5 w-5" />,
        })
      })

      if (kpis.length === 0) {
        kpis.push({
          label: "Total Registros",
          value: jsonData.length.toLocaleString(),
          icon: <FileSpreadsheet className="h-5 w-5" />,
        })
      }

      setProcessedData({
        columns,
        charts,
        kpis,
        rawData: jsonData,
        rowCount: jsonData.length,
        vendedores,
        clientes,
        tiendas,
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
  }

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
                    {/* Vendedor Filter */}
                    {processedData.vendedores.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <UserCircle className="h-4 w-4 text-blue-500" />
                          <span className="font-medium text-sm">Vendedor</span>
                        </div>
                        <ScrollArea className="h-32">
                          <div className="space-y-2">
                            {processedData.vendedores.map((v) => (
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
                                <span className="text-sm">{v}</span>
                              </label>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    )}

                    {/* Cliente Filter */}
                    {processedData.clientes.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-green-500" />
                          <span className="font-medium text-sm">Cliente</span>
                        </div>
                        <ScrollArea className="h-32">
                          <div className="space-y-2">
                            {processedData.clientes.map((c) => (
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
                                <span className="text-sm">{c}</span>
                              </label>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    )}

                    {/* Tienda Filter */}
                    {processedData.tiendas.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Store className="h-4 w-4 text-amber-500" />
                          <span className="font-medium text-sm">Tienda</span>
                        </div>
                        <ScrollArea className="h-32">
                          <div className="space-y-2">
                            {processedData.tiendas.map((t) => (
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
                                <span className="text-sm">{t}</span>
                              </label>
                            ))}
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
              <span className="text-sm text-muted-foreground">{processedData.rowCount.toLocaleString()} registros</span>

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

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {processedData.kpis.map((kpi, idx) => (
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
              {processedData.charts.map((chart) => (
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
