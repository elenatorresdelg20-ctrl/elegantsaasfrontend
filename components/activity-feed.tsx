"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BarChart3, Database, Users, Bell, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

const activities = [
  {
    icon: FileText,
    title: "Reporte de Ventas Q4 generado",
    description: "El reporte mensual de ventas fue generado automáticamente",
    time: "hace 2 min",
    color: "bg-primary/20 text-primary",
    isNew: true,
  },
  {
    icon: BarChart3,
    title: "Dashboard actualizado",
    description: "Métricas del dashboard de Marketing actualizadas",
    time: "hace 15 min",
    color: "bg-accent/20 text-accent",
    isNew: true,
  },
  {
    icon: Database,
    title: "Nueva fuente de datos conectada",
    description: "Base de datos PostgreSQL vinculada exitosamente",
    time: "hace 1 hora",
    color: "bg-success/20 text-success",
    isNew: false,
  },
  {
    icon: Users,
    title: "Nuevo miembro del equipo",
    description: "María García se unió al equipo de Analítica",
    time: "hace 3 horas",
    color: "bg-warning/20 text-warning",
    isNew: false,
  },
  {
    icon: Bell,
    title: "Alerta activada",
    description: "Los ingresos cayeron por debajo del umbral establecido",
    time: "hace 5 horas",
    color: "bg-destructive/20 text-destructive",
    isNew: false,
  },
]

export function ActivityFeed() {
  const [pulse, setPulse] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true)
      setLastUpdate(new Date())
      setTimeout(() => setPulse(false), 1000)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className={cn("border-border bg-card transition-all duration-300", pulse && "ring-1 ring-success/20")}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-base font-medium text-foreground">Actividad Reciente</CardTitle>
            <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1">
              <div className={cn("h-1.5 w-1.5 rounded-full bg-success", pulse && "animate-ping")} />
              <Activity className={cn("h-3 w-3 text-success", pulse && "animate-pulse")} />
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground/60 font-mono">
            {lastUpdate.toLocaleTimeString("es-ES")}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-3 rounded-lg p-2 -mx-2 transition-all duration-300",
              pulse && activity.isNew && "bg-success/5",
              activity.isNew && "relative",
            )}
          >
            {activity.isNew && (
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-success animate-pulse" />
            )}
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
              <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
              {activity.isNew && (
                <span className="text-[9px] font-semibold text-success uppercase tracking-wide">Nuevo</span>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
