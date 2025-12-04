"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Mail, MessageSquare, TrendingUp, AlertTriangle, CheckCircle2, Clock } from "lucide-react"

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Stock Bajo Detectado",
      message: "El producto 'Laptop HP' tiene solo 5 unidades en stock",
      time: "Hace 10 minutos",
      read: false,
      icon: AlertTriangle,
      color: "text-amber-500",
    },
    {
      id: 2,
      type: "success",
      title: "Meta de Ventas Alcanzada",
      message: "¡Felicidades! Has superado tu meta mensual en un 15%",
      time: "Hace 1 hora",
      read: false,
      icon: CheckCircle2,
      color: "text-success",
    },
    {
      id: 3,
      type: "info",
      title: "Nuevo Lead Calificado",
      message: "Un nuevo MQL ha sido agregado a tu pipeline desde la campaña de LinkedIn",
      time: "Hace 3 horas",
      read: true,
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      id: 4,
      type: "alert",
      title: "CSAT por Debajo del Objetivo",
      message: "La satisfacción del cliente bajó a 78% (objetivo: 85%)",
      time: "Hace 5 horas",
      read: true,
      icon: AlertTriangle,
      color: "text-destructive",
    },
    {
      id: 5,
      type: "success",
      title: "Integración Exitosa",
      message: "Salesforce se ha conectado correctamente y comenzó la sincronización",
      time: "Ayer",
      read: true,
      icon: CheckCircle2,
      color: "text-success",
    },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Notificaciones" />
        <main className="flex-1 overflow-y-auto p-8">
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">
                Todas
                <Badge variant="secondary" className="ml-2">
                  {notifications.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="unread">
                No Leídas
                <Badge variant="secondary" className="ml-2">
                  {notifications.filter((n) => !n.read).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="settings">Configuración</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`cursor-pointer transition-all hover:border-primary/50 ${!notification.read ? "border-primary/30 bg-primary/5" : ""}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-secondary ${notification.color}`}
                        >
                          <notification.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-foreground">{notification.title}</h3>
                                {!notification.read && <div className="h-2 w-2 rounded-full bg-primary" />}
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {notification.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="unread" className="space-y-4">
              <div className="space-y-3">
                {notifications
                  .filter((n) => !n.read)
                  .map((notification) => (
                    <Card
                      key={notification.id}
                      className="cursor-pointer border-primary/30 bg-primary/5 transition-all hover:border-primary/50"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-secondary ${notification.color}`}
                          >
                            <notification.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-foreground">{notification.title}</h3>
                                  <div className="h-2 w-2 rounded-full bg-primary" />
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {notification.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-primary" />
                    <CardTitle>Preferencias de Notificaciones</CardTitle>
                  </div>
                  <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Alertas de Negocio</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Stock Bajo</Label>
                          <p className="text-sm text-muted-foreground">Cuando un producto esté por debajo del mínimo</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Metas Alcanzadas</Label>
                          <p className="text-sm text-muted-foreground">Cuando cumplas tus objetivos de ventas</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Caída de Métricas</Label>
                          <p className="text-sm text-muted-foreground">Cuando KPIs bajen por debajo del umbral</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">CX y Clientes</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Feedback Negativo</Label>
                          <p className="text-sm text-muted-foreground">Cuando recibas un CSAT menor a 3 estrellas</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>NPS Responses</Label>
                          <p className="text-sm text-muted-foreground">Resumen diario de respuestas NPS</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Marketing y Ventas</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Nuevos Leads</Label>
                          <p className="text-sm text-muted-foreground">Cuando lleguen MQLs desde campañas</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Cambios en Pipeline</Label>
                          <p className="text-sm text-muted-foreground">Deals ganados, perdidos o movidos</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <CardTitle>Canales de Notificación</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-muted-foreground" />
                      <div className="space-y-0.5">
                        <Label>Notificaciones Push</Label>
                        <p className="text-sm text-muted-foreground">En la aplicación</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div className="space-y-0.5">
                        <Label>Email</Label>
                        <p className="text-sm text-muted-foreground">Resumen diario por correo</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-muted-foreground" />
                      <div className="space-y-0.5">
                        <Label>Slack</Label>
                        <p className="text-sm text-muted-foreground">Notificaciones en tu canal</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
