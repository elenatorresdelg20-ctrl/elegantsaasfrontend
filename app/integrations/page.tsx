"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Circle, Settings, Search } from "lucide-react"

const integrations = [
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    description: "Sincroniza datos de clientes, oportunidades y contactos",
    icon: "🔷",
    status: "connected",
    lastSync: "Hace 5 minutos",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM",
    description: "Importa campañas de marketing y leads",
    icon: "🧡",
    status: "available",
  },
  {
    id: "sap",
    name: "SAP ERP",
    category: "ERP",
    description: "Conecta con módulos financieros y de inventario",
    icon: "💼",
    status: "connected",
    lastSync: "Hace 12 minutos",
  },
  {
    id: "oracle",
    name: "Oracle NetSuite",
    category: "ERP",
    description: "Integración completa de ERP y finanzas",
    icon: "🔴",
    status: "available",
  },
  {
    id: "dynamics",
    name: "Microsoft Dynamics",
    category: "ERP",
    description: "Datos de operaciones y finanzas empresariales",
    icon: "🔵",
    status: "available",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    category: "Marketing",
    description: "Métricas de email marketing y campañas",
    icon: "📧",
    status: "connected",
    lastSync: "Hace 8 minutos",
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    category: "Marketing",
    description: "Tráfico web y comportamiento de usuarios",
    icon: "📊",
    status: "connected",
    lastSync: "Hace 3 minutos",
  },
  {
    id: "shopify",
    name: "Shopify",
    category: "E-commerce",
    description: "Datos de ventas, productos y clientes",
    icon: "🛍️",
    status: "available",
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Pagos",
    description: "Transacciones y revenue de pagos online",
    icon: "💳",
    status: "connected",
    lastSync: "Hace 2 minutos",
  },
  {
    id: "zendesk",
    name: "Zendesk",
    category: "Soporte",
    description: "Tickets, CSAT y métricas de atención al cliente",
    icon: "💬",
    status: "available",
  },
]

export default function IntegrationsPage() {
  const connectedCount = integrations.filter((i) => i.status === "connected").length

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Integraciones" />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Conecta tus herramientas</h2>
                <p className="text-muted-foreground">
                  {connectedCount} de {integrations.length} integraciones activas
                </p>
              </div>
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar integraciones..." className="pl-9" />
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">Todas ({integrations.length})</TabsTrigger>
              <TabsTrigger value="connected">Conectadas ({connectedCount})</TabsTrigger>
              <TabsTrigger value="crm">CRM</TabsTrigger>
              <TabsTrigger value="erp">ERP</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {integrations.map((integration) => (
                  <Card key={integration.id} className="relative overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl">
                            {integration.icon}
                          </div>
                          <div>
                            <CardTitle className="text-base">{integration.name}</CardTitle>
                            <Badge variant="secondary" className="mt-1">
                              {integration.category}
                            </Badge>
                          </div>
                        </div>
                        {integration.status === "connected" ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription>{integration.description}</CardDescription>

                      {integration.status === "connected" ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Última sincronización:</span>
                            <span className="font-medium text-success">{integration.lastSync}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              <Settings className="mr-2 h-4 w-4" />
                              Configurar
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                              Desconectar
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button className="w-full">Conectar</Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="connected" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {integrations
                  .filter((i) => i.status === "connected")
                  .map((integration) => (
                    <Card key={integration.id} className="relative overflow-hidden">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl">
                              {integration.icon}
                            </div>
                            <div>
                              <CardTitle className="text-base">{integration.name}</CardTitle>
                              <Badge variant="secondary" className="mt-1">
                                {integration.category}
                              </Badge>
                            </div>
                          </div>
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <CardDescription>{integration.description}</CardDescription>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Última sincronización:</span>
                          <span className="font-medium text-success">{integration.lastSync}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Settings className="mr-2 h-4 w-4" />
                            Configurar
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                            Desconectar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
