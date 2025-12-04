import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { TopNavTabs } from "@/components/top-nav-tabs"
import { IshikawaDiagram } from "@/components/ishikawa-diagram"
import { ActionTree } from "@/components/action-tree"
import { AiChat } from "@/components/ai-chat"
import { Button } from "@/components/ui/button"
import { Download, Plus, RefreshCw } from "lucide-react"

const ishikawaData = {
  problem: "Baja retención de clientes",
  branches: [
    {
      category: "Personal",
      color: "#8b5cf6",
      causes: [
        { id: "p1", text: "Falta de capacitación", subCauses: ["Onboarding deficiente", "Sin actualización continua"] },
        { id: "p2", text: "Alta rotación", subCauses: ["Burnout", "Salarios no competitivos"] },
        { id: "p3", text: "Comunicación deficiente" },
      ],
    },
    {
      category: "Proceso",
      color: "#06b6d4",
      causes: [
        { id: "pr1", text: "Tiempos de respuesta largos", subCauses: ["Colas de soporte", "Escalaciones lentas"] },
        { id: "pr2", text: "Procesos manuales" },
        { id: "pr3", text: "Falta de seguimiento" },
      ],
    },
    {
      category: "Tecnología",
      color: "#10b981",
      causes: [
        { id: "t1", text: "Sistema CRM obsoleto", subCauses: ["Sin integraciones", "UX deficiente"] },
        { id: "t2", text: "Falta de automatización" },
        { id: "t3", text: "Datos no centralizados" },
      ],
    },
    {
      category: "Producto",
      color: "#f59e0b",
      causes: [
        { id: "pd1", text: "Features faltantes", subCauses: ["Competencia adelantada", "Feedback ignorado"] },
        { id: "pd2", text: "Bugs frecuentes" },
        { id: "pd3", text: "Precio no competitivo" },
      ],
    },
    {
      category: "Marketing",
      color: "#ef4444",
      causes: [
        { id: "m1", text: "Expectativas incorrectas", subCauses: ["Promesas exageradas", "Targeting erróneo"] },
        { id: "m2", text: "Falta de educación" },
        { id: "m3", text: "Sin programa de lealtad" },
      ],
    },
    {
      category: "Métricas",
      color: "#ec4899",
      causes: [
        { id: "me1", text: "KPIs incorrectos", subCauses: ["Vanity metrics", "Sin baseline"] },
        { id: "me2", text: "Sin alertas tempranas" },
        { id: "me3", text: "Análisis reactivo" },
      ],
    },
  ],
}

const actionTreeData = [
  {
    id: "a1",
    title: "Mejorar tiempo de respuesta de soporte",
    description: "Reducir el tiempo promedio de primera respuesta a < 2 horas",
    status: "in-progress" as const,
    owner: "Maria García",
    dueDate: "15 Dic 2024",
    impact: "high" as const,
    children: [
      {
        id: "a1-1",
        title: "Implementar chatbot con IA",
        description: "Automatizar respuestas a preguntas frecuentes",
        status: "completed" as const,
        owner: "Dev Team",
        impact: "high" as const,
      },
      {
        id: "a1-2",
        title: "Contratar 2 agentes adicionales",
        status: "in-progress" as const,
        owner: "RRHH",
        dueDate: "10 Dic 2024",
        impact: "medium" as const,
      },
      {
        id: "a1-3",
        title: "Crear base de conocimiento",
        status: "pending" as const,
        owner: "Content Team",
        impact: "medium" as const,
        children: [
          {
            id: "a1-3-1",
            title: "Documentar FAQs",
            status: "completed" as const,
          },
          {
            id: "a1-3-2",
            title: "Grabar video tutoriales",
            status: "pending" as const,
          },
        ],
      },
    ],
  },
  {
    id: "a2",
    title: "Actualizar sistema CRM",
    description: "Migrar a plataforma moderna con integraciones",
    status: "blocked" as const,
    owner: "Carlos López",
    dueDate: "30 Ene 2025",
    impact: "high" as const,
    children: [
      {
        id: "a2-1",
        title: "Evaluar opciones de CRM",
        status: "completed" as const,
        owner: "Carlos López",
      },
      {
        id: "a2-2",
        title: "Aprobar presupuesto",
        status: "blocked" as const,
        owner: "Finance",
        children: [
          {
            id: "a2-2-1",
            title: "Presentar ROI a dirección",
            status: "in-progress" as const,
          },
        ],
      },
      {
        id: "a2-3",
        title: "Plan de migración de datos",
        status: "pending" as const,
      },
    ],
  },
  {
    id: "a3",
    title: "Programa de retención proactiva",
    description: "Identificar y contactar clientes en riesgo",
    status: "pending" as const,
    owner: "Success Team",
    dueDate: "1 Feb 2025",
    impact: "high" as const,
    children: [
      {
        id: "a3-1",
        title: "Definir scoring de riesgo",
        status: "completed" as const,
      },
      {
        id: "a3-2",
        title: "Configurar alertas automáticas",
        status: "pending" as const,
      },
      {
        id: "a3-3",
        title: "Crear playbook de retención",
        status: "pending" as const,
      },
    ],
  },
]

export default function AnalysisPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavTabs />
        <Header title="Análisis de Causa Raíz" subtitle="Diagrama Ishikawa y Árboles de Acción" />
        <main className="flex-1 overflow-y-auto p-6">
          {/* Actions Bar */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                Nuevo Análisis
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <RefreshCw className="h-4 w-4" />
                Actualizar
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Exportar PDF
              </Button>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <div className="space-y-6 xl:col-span-2">
              {/* Ishikawa Diagram */}
              <div className="rounded-lg border border-border bg-card">
                <div className="border-b border-border p-4">
                  <h2 className="text-lg font-semibold text-foreground">Diagrama de Ishikawa</h2>
                  <p className="text-sm text-muted-foreground">
                    Análisis de causa y efecto - Click en las causas para ver detalles
                  </p>
                </div>
                <IshikawaDiagram problem={ishikawaData.problem} branches={ishikawaData.branches} />
              </div>

              {/* Action Tree */}
              <ActionTree data={actionTreeData} title="Árbol de Acciones Correctivas" />
            </div>

            {/* AI Assistant Panel */}
            <div className="h-[calc(100vh-220px)] xl:sticky xl:top-6">
              <AiChat />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
