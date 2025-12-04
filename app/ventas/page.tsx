"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { KpiCard } from "@/components/kpi-card"
import {
  DollarSign,
  Target,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Trophy,
  ShoppingCart,
  Package,
  Sparkles,
  Crown,
  Medal,
  Award,
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { SalesDashboardData, fetchSalesDashboard } from "@/lib/api"

const revenueData = [
  { name: "Ene", actual: 1200000, forecast: 1150000 },
  { name: "Feb", actual: 1350000, forecast: 1300000 },
  { name: "Mar", actual: 1180000, forecast: 1250000 },
  { name: "Abr", actual: 1420000, forecast: 1400000 },
  { name: "May", actual: 1580000, forecast: 1550000 },
  { name: "Jun", actual: 1720000, forecast: 1700000 },
  { name: "Jul", actual: 1650000, forecast: 1750000 },
  { name: "Ago", actual: 1890000, forecast: 1850000 },
  { name: "Sep", actual: 2100000, forecast: 2000000 },
  { name: "Oct", actual: 1980000, forecast: 2100000 },
  { name: "Nov", actual: 2250000, forecast: 2200000 },
  { name: "Dic", actual: null, forecast: 2500000 },
  { name: "Ene+", actual: null, forecast: 2650000 },
  { name: "Feb+", actual: null, forecast: 2800000 },
]

const topVendedores = [
  { nombre: "María García", ventas: "$420K", deals: 28, meta: 95, avatar: "MG", rank: 1 },
  { nombre: "Carlos Méndez", ventas: "$385K", deals: 24, meta: 88, avatar: "CM", rank: 2 },
  { nombre: "Ana López", ventas: "$312K", deals: 21, meta: 82, avatar: "AL", rank: 3 },
  { nombre: "Pedro Sánchez", ventas: "$278K", deals: 19, meta: 75, avatar: "PS", rank: 4 },
  { nombre: "Laura Torres", ventas: "$245K", deals: 17, meta: 68, avatar: "LT", rank: 5 },
]

const topCompradores = [
  { empresa: "Tech Solutions SA", compras: "$890K", pedidos: 45, frecuencia: "Semanal", crecimiento: 24 },
  { empresa: "Global Industries", compras: "$720K", pedidos: 38, frecuencia: "Quincenal", crecimiento: 18 },
  { empresa: "Enterprise Corp", compras: "$580K", pedidos: 32, frecuencia: "Mensual", crecimiento: 12 },
  { empresa: "Digital Agency", compras: "$420K", pedidos: 28, frecuencia: "Semanal", crecimiento: 32 },
  { empresa: "StartUp Inc", compras: "$350K", pedidos: 22, frecuencia: "Quincenal", crecimiento: -5 },
]

const topProductos = [
  { nombre: "Enterprise Suite", ventas: "$1.2M", unidades: 156, tendencia: "up", cambio: 28 },
  { nombre: "Analytics Pro", ventas: "$890K", unidades: 234, tendencia: "up", cambio: 15 },
  { nombre: "Cloud Basic", ventas: "$650K", unidades: 412, tendencia: "up", cambio: 8 },
  { nombre: "Support Premium", ventas: "$420K", unidades: 89, tendencia: "down", cambio: -12 },
  { nombre: "Integration API", ventas: "$380K", unidades: 67, tendencia: "up", cambio: 45 },
]

const forecastProductos = [
  { nombre: "Enterprise Suite", actual: 156, prediccion: 185, tendencia: "up" },
  { nombre: "Analytics Pro", actual: 234, prediccion: 280, tendencia: "up" },
  { nombre: "Cloud Basic", actual: 412, prediccion: 390, tendencia: "down" },
  { nombre: "Support Premium", actual: 89, prediccion: 65, tendencia: "down" },
  { nombre: "Integration API", actual: 67, prediccion: 120, tendencia: "up" },
]

const pipelineData = [
  { name: "Prospección", value: 45, color: "#8b5cf6" },
  { name: "Calificación", value: 32, color: "#a78bfa" },
  { name: "Propuesta", value: 24, color: "#06b6d4" },
  { name: "Negociación", value: 18, color: "#14b8a6" },
  { name: "Cierre", value: 12, color: "#22c55e" },
]

const defaultSalesData: SalesDashboardData = {
  kpis: {
    ingresosMes: { value: "$2.4M", change: 12.5 },
    pipeline: { value: "$536K", change: 8.2 },
    cierre: { value: "32%", change: 4.5 },
    nuevosClientes: { value: "156", change: 15.2 },
  },
  revenueData,
  topVendedores,
  topCompradores,
  topProductos,
  forecastProductos,
  pipelineData,
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
              <span className="text-sm font-semibold text-foreground">${(entry.value / 1000000).toFixed(2)}M</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export default function VentasDashboard() {
  const [data, setData] = useState<SalesDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchSalesDashboard()
        setData(response)
      } catch (err) {
        console.error(err)
        const message = err instanceof Error ? err.message : "No se pudieron cargar las métricas de ventas"
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const salesData = data ?? defaultSalesData

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Ventas" subtitle="Pipeline, rendimiento y pronósticos comerciales" />
        <main className="flex-1 overflow-y-auto p-8">
          {isLoading && <p className="mb-4 text-sm text-muted-foreground">Cargando datos de ventas...</p>}
          {error && !isLoading && <p className="mb-4 text-sm text-destructive">{error}</p>}

          {/* KPI Cards */}
          <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Ingresos del Mes"
              value={salesData.kpis.ingresosMes.value}
              change={salesData.kpis.ingresosMes.change}
              changeLabel="vs mes anterior"
              icon={DollarSign}
              trend="up"
            />
            <KpiCard
              title="Deals en Pipeline"
              value={salesData.kpis.pipeline.value}
              change={salesData.kpis.pipeline.change}
              changeLabel="vs mes anterior"
              icon={Target}
              trend="up"
            />
            <KpiCard
              title="Tasa de Cierre"
              value={salesData.kpis.cierre.value}
              change={salesData.kpis.cierre.change}
              changeLabel="vs mes anterior"
              icon={TrendingUp}
              trend="up"
            />
            <KpiCard
              title="Nuevos Clientes"
              value={salesData.kpis.nuevosClientes.value}
              change={salesData.kpis.nuevosClientes.change}
              changeLabel="vs mes anterior"
              icon={Users}
              trend="up"
            />
          </div>

          {/* Top Vendedores - Rediseñado */}
          <div className="mb-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/20">
                <Trophy className="h-5 w-5 text-yellow-500" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Top Vendedores</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-5">
              {salesData.topVendedores.map((vendedor, index) => {
                const RankIcon = index === 0 ? Crown : index === 1 ? Medal : index === 2 ? Award : null
                const rankColor =
                  index === 0 ? "#eab308" : index === 1 ? "#94a3b8" : index === 2 ? "#cd7c2f" : "#6b7280"

                return (
                  <div
                    key={vendedor.nombre}
                    className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                      index === 0
                        ? "border-yellow-500/30 from-yellow-500/10 to-transparent"
                        : index === 1
                          ? "border-slate-400/30 from-slate-400/10 to-transparent"
                          : index === 2
                            ? "border-orange-600/30 from-orange-600/10 to-transparent"
                            : "border-border/50 from-card to-card/80"
                    }`}
                  >
                    {/* Glow effect for top 3 */}
                    {index < 3 && (
                      <div
                        className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-20 blur-2xl"
                        style={{ backgroundColor: rankColor }}
                      />
                    )}

                    <div className="relative">
                      {/* Rank badge */}
                      <div className="mb-4 flex items-center justify-between">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                          style={{ backgroundColor: `${rankColor}20`, color: rankColor }}
                        >
                          {RankIcon ? <RankIcon className="h-4 w-4" /> : `#${index + 1}`}
                        </div>
                        <span className="text-xs text-muted-foreground">{vendedor.meta}% meta</span>
                      </div>

                      {/* Avatar */}
                      <div className="mb-4 flex justify-center">
                        <div
                          className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold"
                          style={{
                            background: `linear-gradient(135deg, ${rankColor}40, ${rankColor}10)`,
                            color: rankColor,
                          }}
                        >
                          {vendedor.avatar}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="text-center">
                        <h3 className="mb-1 font-semibold text-foreground">{vendedor.nombre}</h3>
                        <p className="mb-3 text-2xl font-bold text-foreground">{vendedor.ventas}</p>
                        <p className="text-sm text-muted-foreground">{vendedor.deals} deals cerrados</p>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-4">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${vendedor.meta}%`, backgroundColor: rankColor }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Top Compradores & Top Productos */}
          <div className="mb-10 grid gap-6 lg:grid-cols-2">
            {/* Top Compradores */}
            <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Top Compradores</h2>
              </div>
              <div className="space-y-4">
                {salesData.topCompradores.map((comprador, index) => (
                  <div
                    key={comprador.empresa}
                    className="flex items-center gap-4 rounded-xl bg-secondary/20 p-4 transition-colors hover:bg-secondary/40"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="truncate font-medium text-foreground">{comprador.empresa}</h3>
                        <span className="ml-2 text-lg font-bold text-foreground">{comprador.compras}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{comprador.pedidos} pedidos</span>
                        <span>{comprador.frecuencia}</span>
                        <span
                          className={`flex items-center gap-1 ${comprador.crecimiento >= 0 ? "text-success" : "text-destructive"}`}
                        >
                          {comprador.crecimiento >= 0 ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                          {comprador.crecimiento > 0 ? "+" : ""}
                          {comprador.crecimiento}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Productos */}
            <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
                  <Package className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Top Productos</h2>
              </div>
              <div className="space-y-4">
                {salesData.topProductos.map((producto, index) => (
                  <div
                    key={producto.nombre}
                    className="flex items-center gap-4 rounded-xl bg-secondary/20 p-4 transition-colors hover:bg-secondary/40"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="truncate font-medium text-foreground">{producto.nombre}</h3>
                        <span className="ml-2 text-lg font-bold text-foreground">{producto.ventas}</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
                        <span>{producto.unidades} unidades</span>
                        <span
                          className={`flex items-center gap-1 ${producto.tendencia === "up" ? "text-success" : "text-destructive"}`}
                        >
                          {producto.tendencia === "up" ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {producto.cambio > 0 ? "+" : ""}
                          {producto.cambio}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Forecast de Productos */}
          <div className="mb-10 rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/20">
                <Sparkles className="h-5 w-5 text-yellow-500" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Forecast de Productos</h2>
              <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-medium text-yellow-500">IA</span>
            </div>
            <div className="grid gap-4 md:grid-cols-5">
              {salesData.forecastProductos.map((producto) => (
                <div key={producto.nombre} className="rounded-xl border border-border/50 bg-secondary/20 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="truncate text-sm font-medium text-foreground">{producto.nombre}</h3>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        producto.tendencia === "up" ? "bg-success/20" : "bg-destructive/20"
                      }`}
                    >
                      {producto.tendencia === "up" ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Actual</p>
                      <p className="text-xl font-bold text-foreground">{producto.actual}</p>
                    </div>
                    <div className="h-px bg-border/50" />
                    <div>
                      <p className="text-xs text-muted-foreground">Predicción Q1</p>
                      <p
                        className={`text-xl font-bold ${producto.tendencia === "up" ? "text-success" : "text-destructive"}`}
                      >
                        {producto.prediccion}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 h-1.5 rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full transition-all ${producto.tendencia === "up" ? "bg-success" : "bg-destructive"}`}
                      style={{ width: `${Math.min((producto.prediccion / 300) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Forecast de Ingresos */}
          <div className="mb-10 rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Forecast de Ingresos</h2>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Actual</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-accent opacity-60" />
                  <span className="text-muted-foreground">Predicción</span>
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData.revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.01 260)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.5 0 0)", fontSize: 11 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.5 0 0)", fontSize: 11 }}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                    dx={-10}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    name="Actual"
                    stroke="#8b5cf6"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorActual)"
                  />
                  <Area
                    type="monotone"
                    dataKey="forecast"
                    name="Predicción"
                    stroke="#06b6d4"
                    strokeWidth={2.5}
                    strokeDasharray="5 5"
                    fillOpacity={1}
                    fill="url(#colorForecast)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pipeline */}
          <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Pipeline por Etapa</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-5">
              {salesData.pipelineData.map((item, index) => (
                <div
                  key={item.name}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-secondary/20 p-6 text-center transition-all hover:bg-secondary/40"
                >
                  <div className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: item.color }} />
                  <p className="mb-2 text-4xl font-bold text-foreground">{item.value}</p>
                  <p className="text-sm text-muted-foreground">{item.name}</p>
                  {index < salesData.pipelineData.length - 1 && (
                    <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-xl text-muted-foreground md:block">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
