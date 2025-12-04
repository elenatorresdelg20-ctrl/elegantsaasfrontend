"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, CheckCircle2, Clock, AlertCircle, RefreshCw, Trash2 } from "lucide-react"

export default function DataSourcesPage() {
  const dataSources = [
    {
      id: 1,
      name: "Salesforce CRM",
      type: "CRM",
      status: "active",
      lastSync: "Hace 3 minutos",
      records: "45,230",
      tables: ["Cuentas", "Contactos", "Oportunidades", "Leads"],
    },
    {
      id: 2,
      name: "SAP ERP",
      type: "ERP",
      status: "active",
      lastSync: "Hace 8 minutos",
      records: "128,450",
      tables: ["Inventario", "Ventas", "Compras", "Finanzas"],
    },
    {
      id: 3,
      name: "Google Analytics",
      type: "Analytics",
      status: "active",
      lastSync: "Hace 5 minutos",
      records: "892,100",
      tables: ["Sesiones", "Eventos", "Conversiones"],
    },
    {
      id: 4,
      name: "Stripe Payments",
      type: "Pagos",
      status: "active",
      lastSync: "Hace 2 minutos",
      records: "23,890",
      tables: ["Transacciones", "Clientes", "Suscripciones"],
    },
    {
      id: 5,
      name: "Mailchimp",
      type: "Marketing",
      status: "syncing",
      lastSync: "Sincronizando...",
      records: "67,340",
      tables: ["Campañas", "Contactos", "Aperturas", "Clicks"],
    },
    {
      id: 6,
      name: "Base de Datos Local",
      type: "MySQL",
      status: "error",
      lastSync: "Error hace 1 hora",
      records: "0",
      tables: [],
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-success/15 text-success hover:bg-success/20">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Activo
          </Badge>
        )
      case "syncing":
        return (
          <Badge className="bg-primary/15 text-primary hover:bg-primary/20">
            <Clock className="mr-1 h-3 w-3 animate-spin" />
            Sincronizando
          </Badge>
        )
      case "error":
        return (
          <Badge className="bg-destructive/15 text-destructive hover:bg-destructive/20">
            <AlertCircle className="mr-1 h-3 w-3" />
            Error
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Fuentes de Datos" />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Fuentes de Datos Conectadas</h2>
              <p className="text-muted-foreground">
                {dataSources.filter((d) => d.status === "active").length} fuentes activas
              </p>
            </div>
            <Button>
              <Database className="mr-2 h-4 w-4" />
              Agregar Fuente
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dataSources.map((source) => (
              <Card key={source.id} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Database className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{source.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {source.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    {getStatusBadge(source.status)}
                    <span className="text-xs text-muted-foreground">{source.lastSync}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Registros:</span>
                      <span className="font-semibold text-foreground">{source.records}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Tablas sincronizadas:</span>
                      <div className="flex flex-wrap gap-1">
                        {source.tables.length > 0 ? (
                          source.tables.map((table, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {table}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs text-destructive">Sin datos</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      disabled={source.status === "syncing"}
                    >
                      <RefreshCw className="mr-2 h-3 w-3" />
                      Sincronizar
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
