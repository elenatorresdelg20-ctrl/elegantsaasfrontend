import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { TopNavTabs } from "@/components/top-nav-tabs"
import { AiChat } from "@/components/ai-chat"
import { BarChart3, TrendingUp, FileText, Database, Zap, Brain, LineChart, Sparkles } from "lucide-react"
import { ParrotMascot } from "@/components/parrot-mascot"

const capabilities = [
  {
    icon: BarChart3,
    title: "Análisis de Datos",
    description: "Analiza tendencias, patrones y anomalías en tus datos automáticamente",
  },
  {
    icon: TrendingUp,
    title: "Descubrimiento de Correlaciones",
    description: "Encuentra relaciones ocultas entre tus métricas y KPIs",
  },
  {
    icon: FileText,
    title: "Generación de Reportes",
    description: "Genera reportes completos con insights y recomendaciones",
  },
  {
    icon: Database,
    title: "Consultas de Datos",
    description: "Haz preguntas sobre tus datos en lenguaje natural",
  },
  {
    icon: Zap,
    title: "Insights Instantáneos",
    description: "Obtén respuestas inmediatas a preguntas complejas de negocio",
  },
  {
    icon: Brain,
    title: "Análisis Predictivo",
    description: "Pronostica tendencias y predice resultados futuros",
  },
]

const recentAnalyses = [
  { title: "Análisis de Ingresos Q4", date: "Hace 2 horas", status: "completed" },
  { title: "Predicción de Churn", date: "Hace 5 horas", status: "completed" },
  { title: "Reporte ROI Marketing", date: "Hace 1 día", status: "completed" },
  { title: "Optimización de Funnel", date: "Hace 2 días", status: "in-progress" },
]

export default function AiAssistantPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavTabs />
        <Header title="Asistente IA" subtitle="Conoce a Parrot, tu compañero inteligente de analytics" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Panel - Info */}
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-blue-500/10 via-card to-green-500/10 p-6">
                {/* Decorative elements */}
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl" />
                <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-green-500/10 blur-2xl" />

                <div className="relative">
                  <div className="mb-4 flex justify-center">
                    <ParrotMascot size="xl" mood="happy" showName />
                  </div>
                  <div className="mb-4 flex justify-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                      <Sparkles className="h-3 w-3" />
                      Asistente IA
                    </span>
                  </div>
                  <p className="text-center text-sm leading-relaxed text-muted-foreground">
                    Tu asistente de análisis inteligente. Puedo ayudarte a entender tus datos, descubrir insights y
                    tomar decisiones basadas en datos más rápido que nunca.
                  </p>
                  <div className="mt-4 flex justify-center gap-2">
                    <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400">
                      Análisis IA
                    </span>
                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                      24/7 Disponible
                    </span>
                  </div>
                </div>
              </div>

              {/* Capabilities - Updated title */}
              <div className="rounded-xl border border-border bg-card p-4">
                <h3 className="mb-4 text-sm font-semibold text-foreground">Capacidades de Parrot</h3>
                <div className="space-y-3">
                  {capabilities.map((capability, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-secondary/50"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <capability.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{capability.title}</p>
                        <p className="text-xs text-muted-foreground">{capability.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Analyses */}
              <div className="rounded-xl border border-border bg-card p-4">
                <h3 className="mb-4 text-sm font-semibold text-foreground">Análisis Recientes</h3>
                <div className="space-y-3">
                  {recentAnalyses.map((analysis, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2 transition-colors hover:bg-secondary"
                    >
                      <div className="flex items-center gap-3">
                        <LineChart className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{analysis.title}</p>
                          <p className="text-xs text-muted-foreground">{analysis.date}</p>
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          analysis.status === "completed" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                        }`}
                      >
                        {analysis.status === "completed" ? "Listo" : "En proceso"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Area - Takes 2 columns */}
            <div className="h-[calc(100vh-220px)] lg:col-span-2">
              <AiChat />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
