import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { KpiCard } from "@/components/kpi-card"
import { ChartCard } from "@/components/chart-card"
import { DataTable } from "@/components/data-table"
import { ActivityFeed } from "@/components/activity-feed"
import { HeartHandshake, Megaphone, DollarSign, TrendingUp } from "lucide-react"

const revenueData = [
  { name: "Ene", value: 1200000 },
  { name: "Feb", value: 1350000 },
  { name: "Mar", value: 1180000 },
  { name: "Abr", value: 1420000 },
  { name: "May", value: 1580000 },
  { name: "Jun", value: 1720000 },
  { name: "Jul", value: 1650000 },
  { name: "Ago", value: 1890000 },
  { name: "Sep", value: 2100000 },
  { name: "Oct", value: 1980000 },
  { name: "Nov", value: 2250000 },
  { name: "Dic", value: 2400000 },
]

const satisfactionData = [
  { name: "Ene", value: 78 },
  { name: "Feb", value: 82 },
  { name: "Mar", value: 79 },
  { name: "Abr", value: 85 },
  { name: "May", value: 88 },
  { name: "Jun", value: 91 },
  { name: "Jul", value: 89 },
  { name: "Ago", value: 92 },
  { name: "Sep", value: 94 },
  { name: "Oct", value: 93 },
  { name: "Nov", value: 95 },
  { name: "Dic", value: 96 },
]

const tableData = [
  { departamento: "CX", metrica: "NPS", valor: "72", cambio: "+5.2%", estado: "positivo" },
  { departamento: "Marketing", metrica: "CAC", valor: "$45.30", cambio: "-12.3%", estado: "positivo" },
  { departamento: "Ventas", metrica: "Conversión", valor: "3.8%", cambio: "+0.4%", estado: "positivo" },
  { departamento: "CX", metrica: "CSAT", valor: "4.6/5", cambio: "+0.2", estado: "positivo" },
  { departamento: "Marketing", metrica: "ROI Campañas", valor: "285%", cambio: "+18%", estado: "positivo" },
  { departamento: "Ventas", metrica: "Ticket Promedio", valor: "$1,250", cambio: "-3.1%", estado: "negativo" },
]

const columns = [
  { key: "departamento", label: "Departamento" },
  { key: "metrica", label: "Métrica" },
  { key: "valor", label: "Valor Actual" },
  {
    key: "cambio",
    label: "Cambio",
    render: (value: string, row: Record<string, string>) => (
      <span className={row.estado === "positivo" ? "text-success" : "text-destructive"}>{value}</span>
    ),
  },
  {
    key: "estado",
    label: "Estado",
    render: (value: string) => (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
          value === "positivo" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${value === "positivo" ? "bg-success" : "bg-destructive"}`} />
        {value === "positivo" ? "Mejorando" : "Atención"}
      </span>
    ),
  },
]

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Vista General" subtitle="Resumen ejecutivo de todas las áreas" />
        <main className="flex-1 overflow-y-auto p-6">
          {/* KPI Cards por área */}
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Satisfacción CX"
              value="96%"
              change={4.2}
              changeLabel="vs mes anterior"
              icon={HeartHandshake}
              trend="up"
            />
            <KpiCard
              title="ROI Marketing"
              value="285%"
              change={18}
              changeLabel="vs mes anterior"
              icon={Megaphone}
              trend="up"
            />
            <KpiCard
              title="Ingresos Ventas"
              value="$2.4M"
              change={12.5}
              changeLabel="vs mes anterior"
              icon={DollarSign}
              trend="up"
            />
            <KpiCard
              title="Crecimiento Total"
              value="24.8%"
              change={5.7}
              changeLabel="vs trimestre anterior"
              icon={TrendingUp}
              trend="up"
            />
          </div>

          {/* Charts Grid */}
          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <ChartCard
              title="Evolución de Ingresos"
              data={revenueData}
              showLegend
              legendItems={[{ label: "Ingresos Mensuales", color: "oklch(0.7 0.18 145)", value: "$2.4M" }]}
            />
            <ChartCard
              title="Índice de Satisfacción"
              data={satisfactionData}
              showLegend
              legendItems={[{ label: "CSAT Score", color: "oklch(0.7 0.18 260)", value: "96%" }]}
            />
          </div>

          {/* Resumen por departamento */}
          <div className="mb-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <HeartHandshake className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-primary">Experiencia Cliente</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">NPS</span>
                    <span className="font-medium text-foreground">72</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CSAT</span>
                    <span className="font-medium text-foreground">4.6/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tiempo Respuesta</span>
                    <span className="font-medium text-foreground">2.3 hrs</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold text-accent">Marketing</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CAC</span>
                    <span className="font-medium text-foreground">$45.30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Leads Generados</span>
                    <span className="font-medium text-foreground">1,284</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tasa Conversión</span>
                    <span className="font-medium text-foreground">3.8%</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-success/30 bg-success/5 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-success" />
                  <h3 className="font-semibold text-success">Ventas</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-medium text-foreground">$2.4M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deals Cerrados</span>
                    <span className="font-medium text-foreground">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ticket Promedio</span>
                    <span className="font-medium text-foreground">$1,250</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table and Activity Feed */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <DataTable title="Métricas Clave por Departamento" columns={columns} data={tableData} />
            </div>
            <div>
              <ActivityFeed />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
