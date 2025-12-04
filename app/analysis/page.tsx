"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { TopNavTabs } from "@/components/top-nav-tabs"
import { IshikawaDiagram } from "@/components/ishikawa-diagram"
import { ActionTree } from "@/components/action-tree"
import { AiChat } from "@/components/ai-chat"
import { Button } from "@/components/ui/button"
import { Download, Plus, RefreshCw } from "lucide-react"
import { AnalysisOverview, fetchAnalysisOverview } from "@/lib/api"

export default function AnalysisPage() {
  const [data, setData] = useState<AnalysisOverview | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchAnalysisOverview()
        setData(response)
      } catch (err) {
        console.error(err)
        const message = err instanceof Error ? err.message : "No se pudieron cargar los datos"
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

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
                <div className="p-4">
                  {isLoading ? (
                    <p className="text-sm text-muted-foreground">Cargando causas raíz...</p>
                  ) : error ? (
                    <p className="text-sm text-destructive">{error}</p>
                  ) : (
                    <IshikawaDiagram problem={data?.ishikawa.problem} branches={data?.ishikawa.branches} />
                  )}
                </div>
              </div>

              {/* Action Tree */}
              <div className="rounded-lg border border-border bg-card p-4">
                {isLoading ? (
                  <p className="text-sm text-muted-foreground">Cargando plan de acción...</p>
                ) : error ? (
                  <p className="text-sm text-destructive">{error}</p>
                ) : (
                  <ActionTree data={data?.actions ?? []} title="Árbol de Acciones Correctivas" />
                )}
              </div>
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
