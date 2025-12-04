import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { CorrelationMatrix } from "@/components/correlation-matrix"
import { ScatterPlot } from "@/components/scatter-plot"
import { AiChat } from "@/components/ai-chat"
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle,
  Sparkles,
} from "lucide-react"

const correlaciones = [
  {
    metrica1: "NPS",
    metrica2: "Ventas",
    valor: 0.87,
    tipo: "positiva",
    explicacion: "Cuando los clientes están más satisfechos, compran más",
    impacto: "+12% en ventas por cada 10 pts de NPS",
    accion: "Invertir en mejorar experiencia del cliente",
  },
  {
    metrica1: "Tiempo de Respuesta",
    metrica2: "CSAT",
    valor: -0.72,
    tipo: "negativa",
    explicacion: "Respuestas más lentas = clientes menos satisfechos",
    impacto: "-8% CSAT por cada hora adicional",
    accion: "Reducir tiempo de respuesta a menos de 2 horas",
  },
  {
    metrica1: "Email Marketing",
    metrica2: "Conversión",
    valor: 0.65,
    tipo: "positiva",
    explicacion: "Emails personalizados generan más conversiones",
    impacto: "+23% conversión con segmentación",
    accion: "Implementar campañas de email segmentadas",
  },
  {
    metrica1: "CAC",
    metrica2: "Retención",
    valor: -0.58,
    tipo: "negativa",
    explicacion: "Clientes más caros de adquirir tienden a irse antes",
    impacto: "-15% retención en clientes de alto CAC",
    accion: "Optimizar canales de adquisición orgánica",
  },
]

const flujoNegocio = [
  {
    etapa: "Atracción",
    departamento: "Marketing",
    metrica: "2,890",
    label: "Leads",
    cambio: "+18%",
    positivo: true,
    color: "from-amber-500 to-orange-500",
  },
  {
    etapa: "Conversión",
    departamento: "Ventas",
    metrica: "156",
    label: "Clientes nuevos",
    cambio: "+24%",
    positivo: true,
    color: "from-blue-500 to-indigo-500",
  },
  {
    etapa: "Experiencia",
    departamento: "CX",
    metrica: "92%",
    label: "Satisfacción",
    cambio: "+5%",
    positivo: true,
    color: "from-emerald-500 to-teal-500",
  },
  {
    etapa: "Fidelización",
    departamento: "Retención",
    metrica: "87%",
    label: "Clientes activos",
    cambio: "-3%",
    positivo: false,
    color: "from-purple-500 to-pink-500",
  },
]

export default function CorrelacionTotalPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Correlación Total" subtitle="Entiende cómo se conectan tus métricas" />

        <main className="flex-1 overflow-y-auto">
          {/* Resumen Ejecutivo */}
          <div className="border-b border-border bg-card/50 px-8 py-8">
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-semibold text-foreground">Resumen Ejecutivo</h2>
              <p className="text-muted-foreground">Lo más importante que debes saber hoy</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Insight Positivo */}
              <div className="rounded-2xl border border-success/30 bg-success/5 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/20">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  </div>
                  <span className="text-sm font-medium text-success">Lo que funciona</span>
                </div>
                <p className="mb-3 text-lg font-semibold text-foreground">
                  La satisfacción del cliente impulsa las ventas
                </p>
                <p className="text-sm text-muted-foreground">
                  Por cada 10 puntos que sube el NPS, las ventas aumentan un 12%. Sigue invirtiendo en CX.
                </p>
              </div>

              {/* Insight de Atención */}
              <div className="rounded-2xl border border-warning/30 bg-warning/5 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/20">
                    <AlertCircle className="h-5 w-5 text-warning" />
                  </div>
                  <span className="text-sm font-medium text-warning">Requiere atención</span>
                </div>
                <p className="mb-3 text-lg font-semibold text-foreground">La retención está bajando</p>
                <p className="text-sm text-muted-foreground">
                  3% menos clientes activos este mes. Revisa el onboarding y los primeros 30 días.
                </p>
              </div>

              {/* Oportunidad */}
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-primary">Oportunidad</span>
                </div>
                <p className="mb-3 text-lg font-semibold text-foreground">Emails pueden crecer 23%</p>
                <p className="text-sm text-muted-foreground">
                  La segmentación de emails tiene alta correlación con conversión. Implementa campañas personalizadas.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Flujo del Negocio */}
            <section className="mb-12">
              <div className="mb-6">
                <h2 className="mb-2 text-lg font-semibold text-foreground">Flujo del Negocio</h2>
                <p className="text-sm text-muted-foreground">Cómo se conectan los departamentos de principio a fin</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0">
                  {flujoNegocio.map((item, index) => (
                    <div key={item.etapa} className="flex flex-1 items-center">
                      <div className="w-full rounded-2xl bg-secondary/50 p-6 text-center">
                        <div
                          className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color}`}
                        >
                          <span className="text-xl font-bold text-white">{index + 1}</span>
                        </div>
                        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {item.departamento}
                        </p>
                        <p className="mb-3 text-sm font-medium text-foreground">{item.etapa}</p>
                        <p className="mb-1 text-3xl font-bold text-foreground">{item.metrica}</p>
                        <p className="mb-3 text-xs text-muted-foreground">{item.label}</p>
                        <div
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                            item.positivo ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {item.positivo ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                          {item.cambio}
                        </div>
                      </div>
                      {index < flujoNegocio.length - 1 && (
                        <div className="hidden h-1 w-8 shrink-0 bg-gradient-to-r from-border to-transparent lg:block" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Correlaciones Explicadas */}
            <section className="mb-12">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="mb-2 text-lg font-semibold text-foreground">Correlaciones Clave</h2>
                  <p className="text-sm text-muted-foreground">
                    Qué métricas se afectan entre sí y qué puedes hacer al respecto
                  </p>
                </div>
                <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary">
                  <HelpCircle className="h-4 w-4" />
                  ¿Cómo leer esto?
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {correlaciones.map((corr) => (
                  <div
                    key={`${corr.metrica1}-${corr.metrica2}`}
                    className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30"
                  >
                    {/* Header con métricas */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-secondary px-3 py-2">
                          <span className="text-sm font-medium text-foreground">{corr.metrica1}</span>
                        </div>
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            corr.tipo === "positiva" ? "bg-success/20" : "bg-destructive/20"
                          }`}
                        >
                          {corr.tipo === "positiva" ? (
                            <TrendingUp className="h-4 w-4 text-success" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                        <div className="rounded-xl bg-secondary px-3 py-2">
                          <span className="text-sm font-medium text-foreground">{corr.metrica2}</span>
                        </div>
                      </div>
                      <div
                        className={`rounded-full px-3 py-1 text-sm font-bold ${
                          corr.tipo === "positiva" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {corr.valor > 0 ? "+" : ""}
                        {(corr.valor * 100).toFixed(0)}%
                      </div>
                    </div>

                    {/* Explicación */}
                    <p className="mb-4 text-base text-foreground">{corr.explicacion}</p>

                    {/* Impacto y Acción */}
                    <div className="space-y-3 rounded-xl bg-secondary/50 p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                          <ArrowRight className="h-3 w-3 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Impacto</p>
                          <p className="text-sm text-foreground">{corr.impacto}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/20">
                          <Sparkles className="h-3 w-3 text-success" />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Acción recomendada
                          </p>
                          <p className="text-sm text-foreground">{corr.accion}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Visualización Detallada */}
            <section className="mb-12">
              <div className="mb-6">
                <h2 className="mb-2 text-lg font-semibold text-foreground">Análisis Visual</h2>
                <p className="text-sm text-muted-foreground">
                  Explora las correlaciones en detalle con gráficos interactivos
                </p>
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-6">
                    <h3 className="mb-1 text-base font-semibold text-foreground">Matriz de Correlación</h3>
                    <p className="text-sm text-muted-foreground">
                      Verde = se mueven juntos | Rojo = se mueven en direcciones opuestas
                    </p>
                  </div>
                  <CorrelationMatrix />
                </div>

                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-6">
                    <h3 className="mb-1 text-base font-semibold text-foreground">NPS vs Ventas</h3>
                    <p className="text-sm text-muted-foreground">
                      Cada punto es un mes. Más arriba y a la derecha = mejor
                    </p>
                  </div>
                  <ScatterPlot xLabel="NPS Score" yLabel="Ventas ($K)" correlation={0.87} />
                </div>
              </div>
            </section>

            {/* Asistente IA */}
            <section>
              <div className="mb-6">
                <h2 className="mb-2 text-lg font-semibold text-foreground">Pregunta al Asistente</h2>
                <p className="text-sm text-muted-foreground">Haz preguntas sobre tus datos en lenguaje natural</p>
              </div>

              <div className="h-[400px] rounded-2xl border border-border bg-card">
                <AiChat />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
