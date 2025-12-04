"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  Target,
  DollarSign,
  Activity,
  Warehouse,
  ArrowRightLeft,
  ShoppingCart,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  ReferenceLine,
} from "recharts"

// Datos de movimientos de inventario
const movimientosData = [
  { mes: "Ene", entradas: 2400, salidas: 1800, stock: 4200 },
  { mes: "Feb", entradas: 1800, salidas: 2200, stock: 3800 },
  { mes: "Mar", entradas: 2800, salidas: 2100, stock: 4500 },
  { mes: "Abr", entradas: 3200, salidas: 2800, stock: 4900 },
  { mes: "May", entradas: 2600, salidas: 3100, stock: 4400 },
  { mes: "Jun", entradas: 3400, salidas: 2900, stock: 4900 },
]

// Datos punto de equilibrio
const puntoEquilibrioData = [
  { unidades: 0, costosFijos: 50000, costosTotales: 50000, ingresos: 0 },
  { unidades: 200, costosFijos: 50000, costosTotales: 70000, ingresos: 30000 },
  { unidades: 400, costosFijos: 50000, costosTotales: 90000, ingresos: 60000 },
  { unidades: 500, costosFijos: 50000, costosTotales: 100000, ingresos: 75000 },
  { unidades: 667, costosFijos: 50000, costosTotales: 116700, ingresos: 100000 },
  { unidades: 800, costosFijos: 50000, costosTotales: 130000, ingresos: 120000 },
  { unidades: 1000, costosFijos: 50000, costosTotales: 150000, ingresos: 150000 },
  { unidades: 1200, costosFijos: 50000, costosTotales: 170000, ingresos: 180000 },
]

// Productos con bajo stock
const productosAlerta = [
  { nombre: "Laptop Pro 15", sku: "LP-001", stock: 5, minimo: 20, estado: "critico" },
  { nombre: "Mouse Inalámbrico", sku: "MI-045", stock: 12, minimo: 25, estado: "bajo" },
  { nombre: "Teclado Mecánico", sku: "TM-012", stock: 8, minimo: 15, estado: "bajo" },
  { nombre: 'Monitor 27"', sku: "MN-027", stock: 3, minimo: 10, estado: "critico" },
]

// Movimientos recientes
const movimientosRecientes = [
  { tipo: "entrada", producto: "Laptop Pro 15", cantidad: 50, fecha: "Hace 2 min", proveedor: "TechCorp" },
  { tipo: "salida", producto: "Mouse Inalámbrico", cantidad: 25, fecha: "Hace 15 min", cliente: "Empresa ABC" },
  { tipo: "entrada", producto: "Teclado Mecánico", cantidad: 100, fecha: "Hace 1 hora", proveedor: "KeyMaster" },
  { tipo: "salida", producto: 'Monitor 27"', cantidad: 10, fecha: "Hace 2 horas", cliente: "StartupXYZ" },
  { tipo: "devolucion", producto: "Auriculares BT", cantidad: 5, fecha: "Hace 3 horas", motivo: "Defecto" },
]

// Distribución por categoría
const categoriaData = [
  { name: "Electrónicos", value: 35, color: "#6366f1" },
  { name: "Accesorios", value: 25, color: "#22c55e" },
  { name: "Periféricos", value: 20, color: "#f59e0b" },
  { name: "Componentes", value: 12, color: "#ec4899" },
  { name: "Otros", value: 8, color: "#64748b" },
]

// Top productos por rotación
const topRotacion = [
  { nombre: "Mouse Inalámbrico", rotacion: 4.2, ventas: 1250, tendencia: "up" },
  { nombre: "Cable USB-C", rotacion: 3.8, ventas: 980, tendencia: "up" },
  { nombre: "Auriculares BT", rotacion: 3.5, ventas: 850, tendencia: "down" },
  { nombre: "Webcam HD", rotacion: 3.2, ventas: 720, tendencia: "up" },
  { nombre: "Hub USB", rotacion: 2.9, ventas: 650, tendencia: "stable" },
]

export default function AlmacenPage() {
  const [isLive, setIsLive] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Almacén e Inventario</h1>
                <p className="mt-1 text-muted-foreground">Control de stock, movimientos y punto de equilibrio</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm font-medium text-emerald-500">Sincronizado en tiempo real</span>
              </div>
            </div>

            {/* KPIs principales */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Warehouse className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-1 text-emerald-500">
                      <ArrowUpRight className="h-4 w-4" />
                      <span className="text-sm font-semibold">+12%</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground">Valor Total Stock</p>
                    <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">$2.4M</p>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">14,520 unidades en almacén</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                      <ArrowUpRight className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div className="flex items-center gap-1 text-emerald-500">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-semibold">+8%</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground">Entradas (Mes)</p>
                    <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">3,420</p>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">+$485K en inventario</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                      <ArrowDownRight className="h-6 w-6 text-amber-500" />
                    </div>
                    <div className="flex items-center gap-1 text-emerald-500">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-semibold">+15%</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground">Salidas (Mes)</p>
                    <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">2,890</p>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">$612K en ventas</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10">
                      <AlertTriangle className="h-6 w-6 text-rose-500" />
                    </div>
                    <span className="rounded-full bg-rose-500/10 px-2 py-1 text-xs font-semibold text-rose-500">
                      Atención
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground">Stock Bajo</p>
                    <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">12</p>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Productos bajo mínimo</p>
                </div>
              </div>
            </div>

            {/* Gráfico de movimientos y alertas */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Entradas vs Salidas */}
              <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Movimientos de Inventario</h3>
                    <p className="text-sm text-muted-foreground">Entradas, salidas y nivel de stock</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-emerald-500" />
                      <span className="text-muted-foreground">Entradas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500" />
                      <span className="text-muted-foreground">Salidas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span className="text-muted-foreground">Stock</span>
                    </div>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={movimientosData}>
                      <defs>
                        <linearGradient id="entradas" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="salidas" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                      <YAxis
                        yAxisId="left"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "12px",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Bar yAxisId="left" dataKey="entradas" fill="#22c55e" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="left" dataKey="salidas" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="stock"
                        stroke="#6366f1"
                        strokeWidth={3}
                        dot={{ fill: "#6366f1", strokeWidth: 2, r: 4 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Alertas de Stock */}
              <div className="rounded-2xl border border-border/50 bg-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Alertas de Stock</h3>
                  <span className="flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-1 text-xs font-semibold text-rose-500">
                    <AlertTriangle className="h-3 w-3" />
                    {productosAlerta.length} alertas
                  </span>
                </div>
                <div className="space-y-4">
                  {productosAlerta.map((producto, i) => (
                    <div
                      key={i}
                      className={`rounded-xl p-4 ${
                        producto.estado === "critico"
                          ? "bg-rose-500/10 border border-rose-500/20"
                          : "bg-amber-500/10 border border-amber-500/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">{producto.nombre}</p>
                          <p className="text-xs text-muted-foreground">SKU: {producto.sku}</p>
                        </div>
                        <div
                          className={`text-right ${producto.estado === "critico" ? "text-rose-500" : "text-amber-500"}`}
                        >
                          <p className="text-xl font-bold">{producto.stock}</p>
                          <p className="text-xs">Mín: {producto.minimo}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="h-2 rounded-full bg-background overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              producto.estado === "critico" ? "bg-rose-500" : "bg-amber-500"
                            }`}
                            style={{ width: `${(producto.stock / producto.minimo) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Punto de Equilibrio */}
            <div className="rounded-2xl border border-border/50 bg-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Análisis de Punto de Equilibrio</h3>
                  <p className="text-sm text-muted-foreground">
                    Visualización de costos, ingresos y punto de equilibrio
                  </p>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-rose-500" />
                    <span className="text-muted-foreground">Costos Totales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="text-muted-foreground">Ingresos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-6 border-t-2 border-dashed border-primary" />
                    <span className="text-muted-foreground">Punto de Equilibrio</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                <div className="lg:col-span-3 h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={puntoEquilibrioData}>
                      <defs>
                        <linearGradient id="ingresosGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="unidades"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                        label={{ value: "Unidades vendidas", position: "bottom", fill: "#64748b", fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                        tickFormatter={(value) => `$${value / 1000}K`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "12px",
                        }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                      />
                      <ReferenceLine
                        x={1000}
                        stroke="#6366f1"
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        label={{ value: "PE", position: "top", fill: "#6366f1" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="costosTotales"
                        stroke="#ef4444"
                        strokeWidth={3}
                        dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                        name="Costos Totales"
                      />
                      <Line
                        type="monotone"
                        dataKey="ingresos"
                        stroke="#22c55e"
                        strokeWidth={3}
                        dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                        name="Ingresos"
                      />
                      <Line
                        type="monotone"
                        dataKey="costosFijos"
                        stroke="#64748b"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        name="Costos Fijos"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Resumen Punto de Equilibrio */}
                <div className="space-y-4">
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">Punto de Equilibrio</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">1,000 uds</p>
                    <p className="text-sm text-primary">$150,000 en ventas</p>
                  </div>

                  <div className="rounded-xl border border-border/50 bg-card p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Costos Fijos</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">$50,000</p>
                    <p className="text-xs text-muted-foreground">Mensual</p>
                  </div>

                  <div className="rounded-xl border border-border/50 bg-card p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Margen Contribución</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">33%</p>
                    <p className="text-xs text-muted-foreground">$50 por unidad</p>
                  </div>

                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <span className="text-sm font-medium text-muted-foreground">Estado Actual</span>
                    </div>
                    <p className="text-lg font-bold text-emerald-500">Sobre PE +20%</p>
                    <p className="text-xs text-muted-foreground">1,200 uds vendidas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Movimientos recientes y distribución */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Movimientos recientes */}
              <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Movimientos Recientes</h3>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-xs text-muted-foreground">En vivo</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {movimientosRecientes.map((mov, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl border border-border/50 bg-background/50 p-4 transition-colors hover:bg-background"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                            mov.tipo === "entrada"
                              ? "bg-emerald-500/10"
                              : mov.tipo === "salida"
                                ? "bg-amber-500/10"
                                : "bg-rose-500/10"
                          }`}
                        >
                          {mov.tipo === "entrada" ? (
                            <Truck className="h-5 w-5 text-emerald-500" />
                          ) : mov.tipo === "salida" ? (
                            <ShoppingCart className="h-5 w-5 text-amber-500" />
                          ) : (
                            <RotateCcw className="h-5 w-5 text-rose-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{mov.producto}</p>
                          <p className="text-sm text-muted-foreground">
                            {mov.tipo === "entrada"
                              ? `Proveedor: ${mov.proveedor}`
                              : mov.tipo === "salida"
                                ? `Cliente: ${mov.cliente}`
                                : `Motivo: ${mov.motivo}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${
                            mov.tipo === "entrada"
                              ? "text-emerald-500"
                              : mov.tipo === "salida"
                                ? "text-amber-500"
                                : "text-rose-500"
                          }`}
                        >
                          {mov.tipo === "entrada" ? "+" : "-"}
                          {mov.cantidad}
                        </p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {mov.fecha}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distribución y Top Rotación */}
              <div className="space-y-6">
                {/* Distribución por categoría */}
                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Distribución por Categoría</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoriaData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {categoriaData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => [`${value}%`, ""]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {categoriaData.map((cat, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span className="text-muted-foreground">{cat.name}</span>
                        <span className="ml-auto font-medium text-foreground">{cat.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Rotación */}
                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Top Rotación</h3>
                  <div className="space-y-3">
                    {topRotacion.map((prod, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {i + 1}
                          </span>
                          <span className="text-sm font-medium text-foreground">{prod.nombre}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground">{prod.rotacion}x</span>
                          {prod.tendencia === "up" && <TrendingUp className="h-4 w-4 text-emerald-500" />}
                          {prod.tendencia === "down" && <TrendingDown className="h-4 w-4 text-rose-500" />}
                          {prod.tendencia === "stable" && <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
