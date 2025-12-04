"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Cause {
  id: string
  text: string
  subCauses?: string[]
}

interface IshikawaBranch {
  category: string
  color: string
  causes: Cause[]
}

interface IshikawaDiagramProps {
  problem?: string
  branches?: IshikawaBranch[]
}

const defaultBranches: IshikawaBranch[] = [
  {
    category: "CX",
    color: "#22c55e",
    causes: [
      { id: "cx1", text: "Tiempo de respuesta alto", subCauses: ["Falta de personal", "Procesos lentos"] },
      { id: "cx2", text: "NPS bajo", subCauses: ["Expectativas no cumplidas"] },
    ],
  },
  {
    category: "Marketing",
    color: "#a855f7",
    causes: [
      { id: "mk1", text: "CAC elevado", subCauses: ["Canales no optimizados", "Segmentación incorrecta"] },
      { id: "mk2", text: "Baja conversión", subCauses: ["Landing pages lentas"] },
    ],
  },
  {
    category: "Ventas",
    color: "#3b82f6",
    causes: [
      { id: "vt1", text: "Ciclo de venta largo", subCauses: ["Proceso de aprobación", "Falta de demos"] },
      { id: "vt2", text: "Tasa de cierre baja", subCauses: ["Objeciones no resueltas"] },
    ],
  },
  {
    category: "Producto",
    color: "#f59e0b",
    causes: [
      { id: "pr1", text: "Funcionalidades faltantes", subCauses: ["Roadmap desalineado"] },
      { id: "pr2", text: "Bugs frecuentes", subCauses: ["Falta de QA"] },
    ],
  },
  {
    category: "Tecnología",
    color: "#ec4899",
    causes: [
      { id: "tc1", text: "Integraciones limitadas", subCauses: ["APIs obsoletas"] },
      { id: "tc2", text: "Rendimiento lento", subCauses: ["Infraestructura antigua"] },
    ],
  },
  {
    category: "Procesos",
    color: "#06b6d4",
    causes: [
      { id: "pc1", text: "Falta de automatización", subCauses: ["Tareas manuales repetitivas"] },
      { id: "pc2", text: "Comunicación deficiente", subCauses: ["Silos entre equipos"] },
    ],
  },
]

export function IshikawaDiagram({
  problem = "Bajo Crecimiento de Revenue",
  branches = defaultBranches,
}: IshikawaDiagramProps) {
  const [selectedCause, setSelectedCause] = useState<string | null>(null)

  const topBranches = branches.slice(0, 3)
  const bottomBranches = branches.slice(3, 6)

  return (
    <div className="relative w-full overflow-x-auto">
      <div className="min-w-[900px] p-8">
        {/* Top branches */}
        <div className="mb-2 flex justify-around px-20">
          {topBranches.map((branch, idx) => (
            <div key={branch.category} className="flex flex-col items-center">
              <div
                className="mb-2 rounded-lg px-4 py-2 text-sm font-semibold text-foreground"
                style={{ backgroundColor: `${branch.color}30`, borderColor: branch.color, borderWidth: 1 }}
              >
                {branch.category}
              </div>
              <div className="space-y-1">
                {branch.causes.map((cause) => (
                  <button
                    key={cause.id}
                    onClick={() => setSelectedCause(selectedCause === cause.id ? null : cause.id)}
                    className={cn(
                      "block w-full rounded px-3 py-1.5 text-left text-xs transition-all hover:bg-secondary",
                      selectedCause === cause.id ? "bg-primary/20 text-primary" : "text-muted-foreground",
                    )}
                  >
                    {cause.text}
                    {cause.subCauses && selectedCause === cause.id && (
                      <div className="mt-1 space-y-0.5 border-l-2 border-primary/30 pl-2">
                        {cause.subCauses.map((sub, i) => (
                          <div key={i} className="text-[10px] text-muted-foreground">
                            {sub}
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {/* Diagonal line to spine */}
              <svg className="h-12 w-24" viewBox="0 0 96 48">
                <line
                  x1="48"
                  y1="0"
                  x2={idx === 0 ? "80" : idx === 2 ? "16" : "48"}
                  y2="48"
                  stroke={branch.color}
                  strokeWidth="2"
                  strokeOpacity="0.6"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* Main spine with effect */}
        <div className="relative flex items-center">
          <div className="h-1 flex-1 bg-gradient-to-r from-muted via-primary to-primary" />
          <div className="flex items-center gap-2 rounded-lg border-2 border-primary bg-primary/20 px-6 py-3">
            <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l2 2" />
            </svg>
            <span className="text-sm font-bold text-foreground">{problem}</span>
          </div>
          <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 5l7 7-7 7V5z" />
          </svg>
        </div>

        {/* Bottom branches */}
        <div className="mt-2 flex justify-around px-20">
          {bottomBranches.map((branch, idx) => (
            <div key={branch.category} className="flex flex-col items-center">
              {/* Diagonal line from spine */}
              <svg className="h-12 w-24" viewBox="0 0 96 48">
                <line
                  x1={idx === 0 ? "80" : idx === 2 ? "16" : "48"}
                  y1="0"
                  x2="48"
                  y2="48"
                  stroke={branch.color}
                  strokeWidth="2"
                  strokeOpacity="0.6"
                />
              </svg>
              <div className="space-y-1">
                {branch.causes.map((cause) => (
                  <button
                    key={cause.id}
                    onClick={() => setSelectedCause(selectedCause === cause.id ? null : cause.id)}
                    className={cn(
                      "block w-full rounded px-3 py-1.5 text-left text-xs transition-all hover:bg-secondary",
                      selectedCause === cause.id ? "bg-primary/20 text-primary" : "text-muted-foreground",
                    )}
                  >
                    {cause.text}
                    {cause.subCauses && selectedCause === cause.id && (
                      <div className="mt-1 space-y-0.5 border-l-2 border-primary/30 pl-2">
                        {cause.subCauses.map((sub, i) => (
                          <div key={i} className="text-[10px] text-muted-foreground">
                            {sub}
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div
                className="mt-2 rounded-lg px-4 py-2 text-sm font-semibold text-foreground"
                style={{ backgroundColor: `${branch.color}30`, borderColor: branch.color, borderWidth: 1 }}
              >
                {branch.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
