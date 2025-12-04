"use client"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { KpiCard } from "@/components/kpi-card"
import { ChartCard } from "@/components/chart-card"
import { DataTable } from "@/components/data-table"
import {
  ThumbsUp,
  HeartHandshake,
  Clock,
  MessageSquare,
  Smile,
  Meh,
  Frown,
  Search,
  ShoppingCart,
  CreditCard,
  Package,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Eye,
} from "lucide-react"

const satisfactionTrend = [
  { name: "Ene", value: 78, value2: 72 },
  { name: "Feb", value: 82, value2: 75 },
  { name: "Mar", value: 79, value2: 71 },
  { name: "Abr", value: 85, value2: 78 },
  { name: "May", value: 88, value2: 82 },
  { name: "Jun", value: 91, value2: 85 },
  { name: "Jul", value: 89, value2: 84 },
  { name: "Ago", value: 92, value2: 87 },
  { name: "Sep", value: 94, value2: 89 },
  { name: "Oct", value: 93, value2: 88 },
  { name: "Nov", value: 95, value2: 91 },
  { name: "Dic", value: 96, value2: 92 },
]

const responseTimeData = [
  { name: "Lun", value: 2.1 },
  { name: "Mar", value: 2.4 },
  { name: "Mié", value: 1.9 },
  { name: "Jue", value: 2.8 },
  { name: "Vie", value: 3.2 },
  { name: "Sáb", value: 1.5 },
  { name: "Dom", value: 1.2 },
]

const ticketsData = [
  {
    id: "TK-001",
    cliente: "María García",
    asunto: "Problema con facturación",
    prioridad: "Alta",
    estado: "Abierto",
    tiempo: "2h",
  },
  {
    id: "TK-002",
    cliente: "Carlos López",
    asunto: "Consulta sobre envío",
    prioridad: "Media",
    estado: "En proceso",
    tiempo: "4h",
  },
  {
    id: "TK-003",
    cliente: "Ana Martínez",
    asunto: "Devolución de producto",
    prioridad: "Alta",
    estado: "Resuelto",
    tiempo: "1h",
  },
  {
    id: "TK-004",
    cliente: "Pedro Sánchez",
    asunto: "Cambio de dirección",
    prioridad: "Baja",
    estado: "Abierto",
    tiempo: "6h",
  },
  {
    id: "TK-005",
    cliente: "Laura Torres",
    asunto: "Problema técnico app",
    prioridad: "Alta",
    estado: "En proceso",
    tiempo: "3h",
  },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "cliente", label: "Cliente" },
  { key: "asunto", label: "Asunto" },
  {
    key: "prioridad",
    label: "Prioridad",
    render: (value: string) => (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
          value === "Alta"
            ? "bg-destructive/15 text-destructive"
            : value === "Media"
              ? "bg-warning/15 text-warning"
              : "bg-muted text-muted-foreground"
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: "estado",
    label: "Estado",
    render: (value: string) => (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
          value === "Resuelto"
            ? "bg-success/15 text-success"
            : value === "En proceso"
              ? "bg-primary/15 text-primary"
              : "bg-accent/15 text-accent"
        }`}
      >
        {value}
      </span>
    ),
  },
  { key: "tiempo", label: "Tiempo" },
]

const sentimentData = [
  { label: "Positivo", value: 68, color: "#22c55e", icon: Smile },
  { label: "Neutral", value: 22, color: "#eab308", icon: Meh },
  { label: "Negativo", value: 10, color: "#ef4444", icon: Frown },
]

const sentimentByChannel = [
  { channel: "Chat en vivo", positivo: 75, neutral: 18, negativo: 7 },
  { channel: "Email", positivo: 62, neutral: 25, negativo: 13 },
  { channel: "Teléfono", positivo: 70, neutral: 20, negativo: 10 },
  { channel: "Redes Sociales", positivo: 58, neutral: 27, negativo: 15 },
]

const recentFeedback = [
  {
    id: 1,
    customer: "María G.",
    message: "Excelente servicio, muy rápidos en la entrega",
    sentiment: "positivo",
    time: "Hace 5 min",
  },
  {
    id: 2,
    customer: "Carlos L.",
    message: "El producto llegó bien, aunque el empaque podría mejorar",
    sentiment: "neutral",
    time: "Hace 12 min",
  },
  {
    id: 3,
    customer: "Ana M.",
    message: "Tuve problemas con el pago pero lo resolvieron rápido",
    sentiment: "positivo",
    time: "Hace 25 min",
  },
  {
    id: 4,
    customer: "Pedro S.",
    message: "El tiempo de espera fue muy largo",
    sentiment: "negativo",
    time: "Hace 32 min",
  },
  {
    id: 5,
    customer: "Laura T.",
    message: "Muy satisfecha con la atención recibida",
    sentiment: "positivo",
    time: "Hace 45 min",
  },
]

const customerJourneyStages = [
  {
    id: 1,
    name: "Descubrimiento",
    icon: Eye,
    description: "Primer contacto",
    metrics: { conversion: 100, satisfaction: 85 },
    sentiment: "positivo",
  },
  {
    id: 2,
    name: "Consideración",
    icon: Search,
    description: "Evaluación",
    metrics: { conversion: 72, satisfaction: 78 },
    sentiment: "neutral",
  },
  {
    id: 3,
    name: "Decisión",
    icon: ShoppingCart,
    description: "Selección",
    metrics: { conversion: 58, satisfaction: 82 },
    sentiment: "positivo",
  },
  {
    id: 4,
    name: "Compra",
    icon: CreditCard,
    description: "Transacción",
    metrics: { conversion: 45, satisfaction: 88 },
    sentiment: "positivo",
  },
  {
    id: 5,
    name: "Entrega",
    icon: Package,
    description: "Recepción",
    metrics: { conversion: 40, satisfaction: 72 },
    sentiment: "neutral",
  },
  {
    id: 6,
    name: "Retención",
    icon: RefreshCw,
    description: "Fidelización",
    metrics: { conversion: 32, satisfaction: 90 },
    sentiment: "positivo",
  },
]

const painPoints = [
  { stage: "Consideración", issue: "Información de precios poco clara", impact: "Alto" },
  { stage: "Entrega", issue: "Tiempos de entrega variables", impact: "Medio" },
]

const successMoments = [
  { stage: "Compra", achievement: "Proceso de pago simplificado", improvement: "+15% conversión" },
  { stage: "Retención", achievement: "Programa de fidelidad efectivo", improvement: "+22% recompra" },
]

export default function CXDashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Experiencia del Cliente" subtitle="Métricas de satisfacción y atención al cliente" />
        <main className="flex-1 overflow-y-auto p-8">
          {/* KPI Cards */}
          <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="CSAT Score"
              value="4.6/5"
              change={8.2}
              changeLabel="vs mes anterior"
              icon={ThumbsUp}
              trend="up"
            />
            <KpiCard
              title="NPS"
              value="72"
              change={5.0}
              changeLabel="vs mes anterior"
              icon={HeartHandshake}
              trend="up"
            />
            <KpiCard
              title="Tiempo Respuesta"
              value="2.3 hrs"
              change={-15.2}
              changeLabel="vs mes anterior"
              icon={Clock}
              trend="up"
            />
            <KpiCard
              title="Tickets Resueltos"
              value="1,284"
              change={12.5}
              changeLabel="vs mes anterior"
              icon={MessageSquare}
              trend="up"
            />
          </div>

          {/* Análisis de Sentimiento - Rediseñado */}
          <div className="mb-10">
            <h2 className="mb-6 text-xl font-semibold text-foreground">Análisis de Sentimiento</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Distribución General */}
              <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 p-6">
                <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Distribución General
                </h3>
                <div className="flex flex-col gap-6">
                  {sentimentData.map((item) => {
                    const IconComponent = item.icon
                    return (
                      <div key={item.label} className="flex items-center gap-4">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-2xl"
                          style={{ backgroundColor: `${item.color}20` }}
                        >
                          <IconComponent className="h-7 w-7" style={{ color: item.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">{item.label}</span>
                            <span className="text-lg font-bold" style={{ color: item.color }}>
                              {item.value}%
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${item.value}%`, backgroundColor: item.color }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Por Canal */}
              <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 p-6">
                <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Por Canal</h3>
                <div className="flex flex-col gap-5">
                  {sentimentByChannel.map((channel) => (
                    <div key={channel.channel}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{channel.channel}</span>
                        <span className="text-xs text-muted-foreground">{channel.positivo}% positivo</span>
                      </div>
                      <div className="flex h-3 w-full overflow-hidden rounded-full bg-secondary">
                        <div className="h-full bg-[#22c55e]" style={{ width: `${channel.positivo}%` }} />
                        <div className="h-full bg-[#eab308]" style={{ width: `${channel.neutral}%` }} />
                        <div className="h-full bg-[#ef4444]" style={{ width: `${channel.negativo}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-center gap-6 border-t border-border/50 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#22c55e]" />
                    <span className="text-xs text-muted-foreground">Positivo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#eab308]" />
                    <span className="text-xs text-muted-foreground">Neutral</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#ef4444]" />
                    <span className="text-xs text-muted-foreground">Negativo</span>
                  </div>
                </div>
              </div>

              {/* Feedback Reciente */}
              <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 p-6">
                <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Feedback Reciente
                </h3>
                <div className="flex flex-col gap-4">
                  {recentFeedback.slice(0, 4).map((feedback) => {
                    const sentimentColor =
                      feedback.sentiment === "positivo"
                        ? "#22c55e"
                        : feedback.sentiment === "neutral"
                          ? "#eab308"
                          : "#ef4444"
                    const SentimentIcon =
                      feedback.sentiment === "positivo" ? Smile : feedback.sentiment === "neutral" ? Meh : Frown
                    return (
                      <div key={feedback.id} className="flex gap-3 rounded-xl bg-secondary/30 p-3">
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${sentimentColor}20` }}
                        >
                          <SentimentIcon className="h-5 w-5" style={{ color: sentimentColor }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">{feedback.customer}</span>
                            <span className="text-xs text-muted-foreground">{feedback.time}</span>
                          </div>
                          <p className="truncate text-xs text-muted-foreground">{feedback.message}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Customer Journey - Completamente Rediseñado */}
          <div className="mb-10">
            <h2 className="mb-6 text-xl font-semibold text-foreground">Customer Journey</h2>

            {/* Timeline Principal */}
            <div className="mb-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 p-8">
              <div className="relative">
                {/* Línea conectora base */}
                <div className="absolute left-0 right-0 top-[60px] h-1 bg-gradient-to-r from-[#22c55e] via-[#eab308] to-[#22c55e] opacity-30" />

                {/* Etapas */}
                <div className="relative grid grid-cols-6 gap-4">
                  {customerJourneyStages.map((stage, index) => {
                    const sentimentColor =
                      stage.sentiment === "positivo" ? "#22c55e" : stage.sentiment === "neutral" ? "#eab308" : "#ef4444"
                    const SentimentIcon =
                      stage.sentiment === "positivo" ? Smile : stage.sentiment === "neutral" ? Meh : Frown
                    const StageIcon = stage.icon

                    return (
                      <div key={stage.id} className="flex flex-col items-center text-center">
                        {/* Número de etapa */}
                        <div className="mb-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                          {stage.id}
                        </div>

                        {/* Icono principal con glow */}
                        <div className="relative mb-4">
                          <div
                            className="absolute inset-0 rounded-2xl blur-xl opacity-30"
                            style={{ backgroundColor: sentimentColor }}
                          />
                          <div
                            className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 bg-card"
                            style={{ borderColor: sentimentColor }}
                          >
                            <StageIcon className="h-7 w-7" style={{ color: sentimentColor }} />
                          </div>
                        </div>

                        {/* Nombre y descripción */}
                        <h4 className="mb-1 text-sm font-semibold text-foreground">{stage.name}</h4>
                        <p className="mb-3 text-xs text-muted-foreground">{stage.description}</p>

                        {/* Carita de sentimiento */}
                        <SentimentIcon className="mb-3 h-5 w-5" style={{ color: sentimentColor }} />

                        {/* Métricas */}
                        <div className="w-full space-y-2 rounded-xl bg-secondary/30 p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Conversión</span>
                            <span className="text-sm font-bold text-foreground">{stage.metrics.conversion}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Satisfacción</span>
                            <span className="text-sm font-bold" style={{ color: sentimentColor }}>
                              {stage.metrics.satisfaction}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Embudo + Insights */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Embudo de Conversión */}
              <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 p-6">
                <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Embudo de Conversión
                </h3>
                <div className="space-y-3">
                  {customerJourneyStages.map((stage) => {
                    const width = stage.metrics.conversion
                    return (
                      <div key={stage.id} className="flex items-center gap-4">
                        <span className="w-24 truncate text-xs text-muted-foreground">{stage.name}</span>
                        <div className="flex-1">
                          <div className="flex h-8 items-center rounded-lg bg-secondary/30">
                            <div
                              className="flex h-full items-center justify-end rounded-lg bg-gradient-to-r from-primary/80 to-primary px-3 transition-all duration-500"
                              style={{ width: `${width}%` }}
                            >
                              <span className="text-xs font-bold text-primary-foreground">{width}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Pain Points */}
              <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 p-6">
                <div className="mb-6 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Pain Points</h3>
                </div>
                <div className="space-y-4">
                  {painPoints.map((point, index) => (
                    <div key={index} className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="rounded-full bg-destructive/20 px-2.5 py-1 text-xs font-medium text-destructive">
                          {point.stage}
                        </span>
                        <span
                          className={`text-xs font-medium ${point.impact === "Alto" ? "text-destructive" : "text-warning"}`}
                        >
                          Impacto {point.impact}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{point.issue}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Momentos de Éxito */}
              <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 p-6">
                <div className="mb-6 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Momentos de Éxito
                  </h3>
                </div>
                <div className="space-y-4">
                  {successMoments.map((moment, index) => (
                    <div key={index} className="rounded-xl border border-success/20 bg-success/5 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="rounded-full bg-success/20 px-2.5 py-1 text-xs font-medium text-success">
                          {moment.stage}
                        </span>
                        <span className="text-xs font-bold text-success">{moment.improvement}</span>
                      </div>
                      <p className="text-sm text-foreground">{moment.achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="mb-10 grid gap-6 lg:grid-cols-2">
            <ChartCard
              title="Tendencia de Satisfacción"
              description="CSAT y NPS mensual"
              data={satisfactionTrend}
              type="area"
              dataKeys={["value", "value2"]}
              colors={["#8b5cf6", "#06b6d4"]}
              showLegend
              legendItems={[
                { label: "CSAT", color: "#8b5cf6" },
                { label: "NPS", color: "#06b6d4" },
              ]}
            />
            <ChartCard
              title="Tiempo de Respuesta"
              description="Promedio diario (horas)"
              data={responseTimeData}
              type="bar"
              dataKeys={["value"]}
              colors={["#8b5cf6"]}
            />
          </div>

          {/* Tickets Table */}
          <DataTable title="Tickets Recientes" data={ticketsData} columns={columns} />
        </main>
      </div>
    </div>
  )
}
