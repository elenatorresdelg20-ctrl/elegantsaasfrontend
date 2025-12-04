"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { KpiCard } from "@/components/kpi-card"
import { useState } from "react"
import {
  Users,
  MousePointerClick,
  DollarSign,
  TrendingUp,
  Target,
  Megaphone,
  BarChart3,
  Zap,
  Globe,
  Mail,
  Share2,
  Search,
  Play,
  Pause,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  RefreshCw,
  Layers,
  PieChart,
  Activity,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

// Datos de adquisición mensual
const acquisitionData = [
  { name: "Ene", organic: 1200, paid: 890, social: 650, email: 420, direct: 380 },
  { name: "Feb", organic: 1450, paid: 1100, social: 780, email: 510, direct: 420 },
  { name: "Mar", organic: 1380, paid: 980, social: 720, email: 480, direct: 390 },
  { name: "Abr", organic: 1620, paid: 1250, social: 890, email: 620, direct: 510 },
  { name: "May", organic: 1890, paid: 1420, social: 1050, email: 780, direct: 620 },
  { name: "Jun", organic: 2100, paid: 1680, social: 1200, email: 890, direct: 720 },
  { name: "Jul", organic: 1980, paid: 1550, social: 1120, email: 820, direct: 680 },
  { name: "Ago", organic: 2250, paid: 1820, social: 1350, email: 950, direct: 780 },
  { name: "Sep", organic: 2480, paid: 2050, social: 1520, email: 1080, direct: 890 },
  { name: "Oct", organic: 2320, paid: 1920, social: 1420, email: 1020, direct: 820 },
  { name: "Nov", organic: 2650, paid: 2180, social: 1680, email: 1180, direct: 950 },
  { name: "Dic", organic: 2890, paid: 2400, social: 1850, email: 1320, direct: 1080 },
]

// Datos del embudo
const funnelStages = [
  { name: "Visitantes", value: 125000, percent: 100 },
  { name: "Leads", value: 28900, percent: 23.1 },
  { name: "MQL", value: 12400, percent: 9.9 },
  { name: "SQL", value: 5200, percent: 4.2 },
  { name: "Oportunidades", value: 2100, percent: 1.7 },
  { name: "Clientes", value: 890, percent: 0.71 },
]

// Datos de distribución por canal
const channelDistribution = [
  { name: "Orgánico", value: 35, leads: 10115, color: "oklch(0.68 0.16 145)" },
  { name: "Paid Ads", value: 28, leads: 8092, color: "oklch(0.68 0.16 250)" },
  { name: "Social", value: 22, leads: 6358, color: "oklch(0.65 0.16 280)" },
  { name: "Email", value: 15, leads: 4335, color: "oklch(0.78 0.16 75)" },
]

// Campañas activas
const campaigns = [
  {
    id: 1,
    nombre: "Black Friday 2024",
    canal: "Email",
    icon: Mail,
    estado: "activa",
    presupuesto: 15000,
    gastado: 12450,
    impresiones: 245000,
    clicks: 18500,
    conversiones: 2450,
    leads: 1820,
    ctr: 7.55,
    cpc: 0.67,
    cpl: 6.84,
    roi: 320,
    tendencia: 12,
  },
  {
    id: 2,
    nombre: "Webinar Q4 Growth",
    canal: "LinkedIn",
    icon: Share2,
    estado: "activa",
    presupuesto: 5000,
    gastado: 3200,
    impresiones: 89000,
    clicks: 4450,
    conversiones: 890,
    leads: 650,
    ctr: 5.0,
    cpc: 0.72,
    cpl: 4.92,
    roi: 280,
    tendencia: 8,
  },
  {
    id: 3,
    nombre: "Google Ads Brand",
    canal: "Google",
    icon: Search,
    estado: "activa",
    presupuesto: 8000,
    gastado: 6800,
    impresiones: 320000,
    clicks: 12800,
    conversiones: 1120,
    leads: 890,
    ctr: 4.0,
    cpc: 0.53,
    cpl: 7.64,
    roi: 195,
    tendencia: -3,
  },
  {
    id: 4,
    nombre: "Retargeting Facebook",
    canal: "Facebook",
    icon: Globe,
    estado: "pausada",
    presupuesto: 3500,
    gastado: 2100,
    impresiones: 156000,
    clicks: 5460,
    conversiones: 650,
    leads: 480,
    ctr: 3.5,
    cpc: 0.38,
    cpl: 4.38,
    roi: 245,
    tendencia: 0,
  },
  {
    id: 5,
    nombre: "Content SEO Strategy",
    canal: "Orgánico",
    icon: BarChart3,
    estado: "activa",
    presupuesto: 2000,
    gastado: 2000,
    impresiones: 580000,
    clicks: 34800,
    conversiones: 1890,
    leads: 1420,
    ctr: 6.0,
    cpc: 0.06,
    cpl: 1.41,
    roi: 450,
    tendencia: 22,
  },
]

// Canales de adquisición detallados
const acquisitionChannels = [
  {
    channel: "Búsqueda Orgánica",
    icon: Search,
    sessions: 45200,
    leads: 2890,
    mql: 1245,
    sql: 520,
    conversion: 6.4,
    trend: 12,
    cpl: 0,
    color: "oklch(0.68 0.16 145)",
  },
  {
    channel: "Google Ads",
    icon: Target,
    sessions: 32100,
    leads: 1920,
    mql: 824,
    sql: 345,
    conversion: 5.98,
    trend: 8,
    cpl: 12.45,
    color: "oklch(0.68 0.16 250)",
  },
  {
    channel: "Redes Sociales",
    icon: Share2,
    sessions: 28400,
    leads: 1420,
    mql: 610,
    sql: 255,
    conversion: 5.0,
    trend: -3,
    cpl: 8.92,
    color: "oklch(0.65 0.16 280)",
  },
  {
    channel: "Email Marketing",
    icon: Mail,
    sessions: 18900,
    leads: 1510,
    mql: 649,
    sql: 272,
    conversion: 7.99,
    trend: 15,
    cpl: 2.35,
    color: "oklch(0.78 0.16 75)",
  },
  {
    channel: "Referidos",
    icon: Users,
    sessions: 12300,
    leads: 980,
    mql: 421,
    sql: 176,
    conversion: 7.97,
    trend: 22,
    cpl: 0,
    color: "oklch(0.72 0.14 170)",
  },
]

// Métricas de rendimiento por semana
const weeklyPerformance = [
  { week: "S1", leads: 680, mql: 290, sql: 122, cost: 4200 },
  { week: "S2", leads: 720, mql: 310, sql: 130, cost: 4500 },
  { week: "S3", leads: 810, mql: 348, sql: 146, cost: 4800 },
  { week: "S4", leads: 890, mql: 382, sql: 160, cost: 5100 },
]

// Attribution Model Data
const attributionData = [
  { name: "Primer Toque", organic: 42, paid: 28, social: 18, email: 12 },
  { name: "Último Toque", organic: 35, paid: 32, social: 20, email: 13 },
  { name: "Lineal", organic: 38, paid: 30, social: 19, email: 13 },
  { name: "Tiempo Decay", organic: 36, paid: 31, social: 19, email: 14 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-sm">
        <p className="mb-2 text-sm font-semibold text-foreground">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-foreground">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function MarketingDashboard() {
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<"campañas" | "adquisicion" | "atribucion">("campañas")

  const totalLeads = campaigns.reduce((acc, c) => acc + c.leads, 0)
  const totalSpent = campaigns.reduce((acc, c) => acc + c.gastado, 0)
  const avgROI = Math.round(campaigns.reduce((acc, c) => acc + c.roi, 0) / campaigns.length)
  const avgCPL = (totalSpent / totalLeads).toFixed(2)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Marketing" subtitle="Campañas, adquisición y atribución" />
        <main className="flex-1 overflow-y-auto">
          {/* KPI Cards */}
          <div className="border-b border-border bg-card/30 px-8 py-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <KpiCard
                title="Leads Totales"
                value={totalLeads.toLocaleString()}
                change={15.2}
                changeLabel="vs mes anterior"
                icon={Users}
                trend="up"
              />
              <KpiCard
                title="MQL Generados"
                value="12,400"
                change={18.5}
                changeLabel="vs mes anterior"
                icon={Target}
                trend="up"
              />
              <KpiCard
                title="CPL Promedio"
                value={`$${avgCPL}`}
                change={-8.3}
                changeLabel="vs mes anterior"
                icon={DollarSign}
                trend="up"
              />
              <KpiCard
                title="Tasa Conversión"
                value="4.6%"
                change={0.8}
                changeLabel="vs mes anterior"
                icon={MousePointerClick}
                trend="up"
              />
              <KpiCard
                title="ROI Promedio"
                value={`${avgROI}%`}
                change={12}
                changeLabel="vs mes anterior"
                icon={TrendingUp}
                trend="up"
              />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-border px-8">
            <div className="flex gap-1">
              {[
                { id: "campañas", label: "Campañas", icon: Megaphone },
                { id: "adquisicion", label: "Adquisición", icon: Layers },
                { id: "atribucion", label: "Atribución", icon: PieChart },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 border-b-2 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {/* CAMPAÑAS TAB */}
            {activeTab === "campañas" && (
              <div className="space-y-8">
                {/* Header Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Gestión de Campañas</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {campaigns.filter((c) => c.estado === "activa").length} campañas activas de {campaigns.length}{" "}
                      totales
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                      <Filter className="h-4 w-4" />
                      Filtrar
                    </button>
                    <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                      <Download className="h-4 w-4" />
                      Exportar
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                      <Zap className="h-4 w-4" />
                      Nueva Campaña
                    </button>
                  </div>
                </div>

                {/* Campaigns Grid */}
                <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                  {campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      onClick={() => setSelectedCampaign(selectedCampaign === campaign.id ? null : campaign.id)}
                      className={`group cursor-pointer rounded-2xl border bg-card p-6 transition-all hover:shadow-lg ${
                        selectedCampaign === campaign.id
                          ? "border-primary shadow-lg shadow-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {/* Header */}
                      <div className="mb-5 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                              campaign.estado === "activa" ? "bg-success/15" : "bg-muted"
                            }`}
                          >
                            <campaign.icon
                              className={`h-5 w-5 ${
                                campaign.estado === "activa" ? "text-success" : "text-muted-foreground"
                              }`}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{campaign.nombre}</h3>
                            <p className="text-xs text-muted-foreground">{campaign.canal}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {campaign.tendencia !== 0 && (
                            <span
                              className={`flex items-center gap-1 text-xs font-medium ${
                                campaign.tendencia > 0 ? "text-success" : "text-destructive"
                              }`}
                            >
                              {campaign.tendencia > 0 ? (
                                <ArrowUpRight className="h-3 w-3" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3" />
                              )}
                              {Math.abs(campaign.tendencia)}%
                            </span>
                          )}
                          <span
                            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                              campaign.estado === "activa" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
                            }`}
                          >
                            {campaign.estado === "activa" ? (
                              <Play className="h-3 w-3" />
                            ) : (
                              <Pause className="h-3 w-3" />
                            )}
                            {campaign.estado === "activa" ? "Activa" : "Pausada"}
                          </span>
                        </div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="mb-5 grid grid-cols-3 gap-4">
                        <div className="rounded-xl bg-muted/50 p-3 text-center">
                          <p className="text-lg font-bold text-foreground">{(campaign.leads / 1000).toFixed(1)}K</p>
                          <p className="text-xs text-muted-foreground">Leads</p>
                        </div>
                        <div className="rounded-xl bg-muted/50 p-3 text-center">
                          <p className="text-lg font-bold text-foreground">${campaign.cpl}</p>
                          <p className="text-xs text-muted-foreground">CPL</p>
                        </div>
                        <div className="rounded-xl bg-success/10 p-3 text-center">
                          <p className="text-lg font-bold text-success">{campaign.roi}%</p>
                          <p className="text-xs text-success/80">ROI</p>
                        </div>
                      </div>

                      {/* Budget Progress */}
                      <div>
                        <div className="mb-2 flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Presupuesto utilizado</span>
                          <span className="font-medium text-foreground">
                            ${campaign.gastado.toLocaleString()} / ${campaign.presupuesto.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full transition-all ${
                              campaign.gastado / campaign.presupuesto > 0.9
                                ? "bg-warning"
                                : "bg-gradient-to-r from-primary to-accent"
                            }`}
                            style={{ width: `${(campaign.gastado / campaign.presupuesto) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {selectedCampaign === campaign.id && (
                        <div className="mt-5 border-t border-border pt-5">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Impresiones</span>
                              <span className="font-medium text-foreground">
                                {(campaign.impresiones / 1000).toFixed(0)}K
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Clicks</span>
                              <span className="font-medium text-foreground">
                                {(campaign.clicks / 1000).toFixed(1)}K
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">CTR</span>
                              <span className="font-medium text-foreground">{campaign.ctr}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">CPC</span>
                              <span className="font-medium text-foreground">${campaign.cpc}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Conversiones</span>
                              <span className="font-medium text-foreground">
                                {campaign.conversiones.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Weekly Performance Chart */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Rendimiento Semanal</h3>
                      <p className="text-sm text-muted-foreground">Leads, MQL y SQL por semana</p>
                    </div>
                    <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                      <RefreshCw className="h-4 w-4" />
                      Actualizar
                    </button>
                  </div>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={weeklyPerformance} barGap={8}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.20 0.01 260)" vertical={false} />
                      <XAxis dataKey="week" stroke="oklch(0.65 0 0)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="oklch(0.65 0 0)" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="leads" fill="oklch(0.68 0.16 250)" radius={[6, 6, 0, 0]} name="Leads" />
                      <Bar dataKey="mql" fill="oklch(0.72 0.14 170)" radius={[6, 6, 0, 0]} name="MQL" />
                      <Bar dataKey="sql" fill="oklch(0.78 0.16 75)" radius={[6, 6, 0, 0]} name="SQL" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* ADQUISICIÓN TAB */}
            {activeTab === "adquisicion" && (
              <div className="space-y-8">
                {/* Funnel Visual */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground">Embudo de Conversión</h3>
                    <p className="text-sm text-muted-foreground">De visitante a cliente</p>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    {funnelStages.map((stage, index) => (
                      <div key={stage.name} className="flex flex-1 flex-col items-center">
                        <div
                          className="relative flex w-full items-center justify-center rounded-xl py-8 transition-all hover:scale-105"
                          style={{
                            background: `linear-gradient(135deg, oklch(0.68 0.16 ${250 - index * 20} / 0.2), oklch(0.68 0.16 ${250 - index * 20} / 0.05))`,
                            borderLeft: `3px solid oklch(0.68 0.16 ${250 - index * 20})`,
                          }}
                        >
                          <div className="text-center">
                            <p className="text-2xl font-bold text-foreground">{stage.value.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">{stage.percent}%</p>
                          </div>
                        </div>
                        <p className="mt-3 text-center text-sm font-medium text-foreground">{stage.name}</p>
                        {index < funnelStages.length - 1 && (
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground">→</div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-8 rounded-xl bg-muted/30 p-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Tasa de conversión total</p>
                      <p className="text-3xl font-bold text-success">0.71%</p>
                    </div>
                    <div className="h-12 w-px bg-border" />
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">CAC promedio</p>
                      <p className="text-3xl font-bold text-foreground">$45.30</p>
                    </div>
                    <div className="h-12 w-px bg-border" />
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">LTV:CAC ratio</p>
                      <p className="text-3xl font-bold text-primary">4.2x</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Channel Distribution */}
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="mb-6 text-lg font-semibold text-foreground">Distribución por Canal</h3>
                    <div className="flex items-center gap-8">
                      <ResponsiveContainer width="50%" height={200}>
                        <RePieChart>
                          <Pie
                            data={channelDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={85}
                            dataKey="value"
                            stroke="none"
                          >
                            {channelDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </RePieChart>
                      </ResponsiveContainer>
                      <div className="flex-1 space-y-3">
                        {channelDistribution.map((channel) => (
                          <div key={channel.name} className="flex items-center gap-3">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: channel.color }} />
                            <span className="flex-1 text-sm text-foreground">{channel.name}</span>
                            <span className="text-sm font-semibold text-foreground">{channel.value}%</span>
                            <span className="text-xs text-muted-foreground">({channel.leads.toLocaleString()})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Acquisition Trend */}
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="mb-6 text-lg font-semibold text-foreground">Tendencia de Adquisición</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={acquisitionData}>
                        <defs>
                          <linearGradient id="colorOrg" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="oklch(0.68 0.16 145)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="oklch(0.68 0.16 145)" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorPd" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="oklch(0.68 0.16 250)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="oklch(0.68 0.16 250)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.20 0.01 260)" vertical={false} />
                        <XAxis
                          dataKey="name"
                          stroke="oklch(0.65 0 0)"
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis stroke="oklch(0.65 0 0)" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="organic"
                          stroke="oklch(0.68 0.16 145)"
                          fill="url(#colorOrg)"
                          strokeWidth={2}
                          name="Orgánico"
                        />
                        <Area
                          type="monotone"
                          dataKey="paid"
                          stroke="oklch(0.68 0.16 250)"
                          fill="url(#colorPd)"
                          strokeWidth={2}
                          name="Paid"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Channels Table */}
                <div className="rounded-2xl border border-border bg-card">
                  <div className="border-b border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground">Rendimiento por Canal</h3>
                    <p className="text-sm text-muted-foreground">Análisis detallado de cada fuente de tráfico</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Canal
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Sesiones
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Leads
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            MQL
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            SQL
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Conversión
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            CPL
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Tendencia
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {acquisitionChannels.map((channel) => (
                          <tr key={channel.channel} className="transition-colors hover:bg-muted/30">
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                                  style={{ backgroundColor: `${channel.color}20` }}
                                >
                                  <channel.icon className="h-4 w-4" style={{ color: channel.color }} />
                                </div>
                                <span className="font-medium text-foreground">{channel.channel}</span>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right font-mono text-sm text-foreground">
                              {channel.sessions.toLocaleString()}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right font-mono text-sm text-foreground">
                              {channel.leads.toLocaleString()}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right font-mono text-sm text-foreground">
                              {channel.mql.toLocaleString()}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right font-mono text-sm text-foreground">
                              {channel.sql.toLocaleString()}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right font-mono text-sm font-semibold text-primary">
                              {channel.conversion}%
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right font-mono text-sm text-foreground">
                              {channel.cpl > 0 ? `$${channel.cpl}` : "—"}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                                  channel.trend >= 0
                                    ? "bg-success/15 text-success"
                                    : "bg-destructive/15 text-destructive"
                                }`}
                              >
                                {channel.trend >= 0 ? (
                                  <ArrowUpRight className="h-3 w-3" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3" />
                                )}
                                {Math.abs(channel.trend)}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ATRIBUCIÓN TAB */}
            {activeTab === "atribucion" && (
              <div className="space-y-8">
                {/* Attribution Info */}
                <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Modelos de Atribución</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Compara diferentes modelos para entender qué canales contribuyen más a las conversiones. Cada
                        modelo asigna el crédito de forma diferente según los puntos de contacto del customer journey.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Attribution Models Comparison */}
                <div className="grid gap-6 lg:grid-cols-4">
                  {[
                    {
                      name: "Primer Toque",
                      desc: "100% al primer contacto",
                      icon: Eye,
                      winner: "Orgánico",
                      value: 42,
                    },
                    {
                      name: "Último Toque",
                      desc: "100% al último contacto",
                      icon: Target,
                      winner: "Orgánico",
                      value: 35,
                    },
                    { name: "Lineal", desc: "Crédito equitativo", icon: Activity, winner: "Orgánico", value: 38 },
                    {
                      name: "Tiempo Decay",
                      desc: "Más peso a recientes",
                      icon: Clock,
                      winner: "Orgánico",
                      value: 36,
                    },
                  ].map((model) => (
                    <div key={model.name} className="rounded-2xl border border-border bg-card p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
                          <model.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{model.name}</h4>
                          <p className="text-xs text-muted-foreground">{model.desc}</p>
                        </div>
                      </div>
                      <div className="rounded-xl bg-muted/50 p-4 text-center">
                        <p className="text-sm text-muted-foreground">Canal ganador</p>
                        <p className="mt-1 text-xl font-bold text-foreground">{model.winner}</p>
                        <p className="text-2xl font-bold text-success">{model.value}%</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Attribution Chart */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-6 text-lg font-semibold text-foreground">Comparativa de Modelos</h3>
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={attributionData} layout="vertical" barGap={4}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.20 0.01 260)" horizontal={false} />
                      <XAxis type="number" stroke="oklch(0.65 0 0)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis
                        type="category"
                        dataKey="name"
                        stroke="oklch(0.65 0 0)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        width={100}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="organic" fill="oklch(0.68 0.16 145)" radius={[0, 4, 4, 0]} name="Orgánico" />
                      <Bar dataKey="paid" fill="oklch(0.68 0.16 250)" radius={[0, 4, 4, 0]} name="Paid" />
                      <Bar dataKey="social" fill="oklch(0.65 0.16 280)" radius={[0, 4, 4, 0]} name="Social" />
                      <Bar dataKey="email" fill="oklch(0.78 0.16 75)" radius={[0, 4, 4, 0]} name="Email" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Insights */}
                <div className="grid gap-4 lg:grid-cols-3">
                  <div className="flex items-start gap-4 rounded-2xl border border-success/30 bg-success/5 p-5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-success" />
                    <div>
                      <h4 className="font-semibold text-foreground">Canal más consistente</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        <span className="font-medium text-success">Orgánico</span> lidera en todos los modelos de
                        atribución, mostrando un impacto sólido en cada etapa del funnel.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5">
                    <Activity className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold text-foreground">Mayor variabilidad</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        <span className="font-medium text-primary">Paid Ads</span> muestra mayor diferencia entre
                        modelos: +4% en último toque vs primer toque.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-2xl border border-warning/30 bg-warning/5 p-5">
                    <AlertCircle className="mt-0.5 h-5 w-5 text-warning" />
                    <div>
                      <h4 className="font-semibold text-foreground">Oportunidad</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        <span className="font-medium text-warning">Email</span> tiene mejor rendimiento en modelos
                        recientes. Considera aumentar frecuencia de nurturing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
