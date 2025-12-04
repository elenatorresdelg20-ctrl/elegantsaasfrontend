"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Globe, Mail, Shield, Palette, Users } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Configuración" />
        <main className="flex-1 overflow-y-auto p-8">
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full max-w-xl grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="team">Equipo</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
              <TabsTrigger value="appearance">Apariencia</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-primary" />
                    <CardTitle>Información de la Empresa</CardTitle>
                  </div>
                  <CardDescription>Actualiza los detalles de tu organización</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Nombre de la Empresa</Label>
                      <Input id="company-name" placeholder="Acme Corp" defaultValue="Acme Corp" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industria</Label>
                      <Select defaultValue="saas">
                        <SelectTrigger id="industry">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saas">SaaS</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="fintech">Fintech</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Educación</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Sitio Web</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input id="website" placeholder="https://acmecorp.com" className="pl-9" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email de Contacto</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input id="contact-email" type="email" placeholder="contacto@acmecorp.com" className="pl-9" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Zona Horaria</Label>
                      <Select defaultValue="america-mx">
                        <SelectTrigger id="timezone">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america-mx">América/Ciudad de México</SelectItem>
                          <SelectItem value="america-ny">América/Nueva York</SelectItem>
                          <SelectItem value="europe-madrid">Europa/Madrid</SelectItem>
                          <SelectItem value="asia-tokyo">Asia/Tokio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Idioma</Label>
                      <Select defaultValue="es">
                        <SelectTrigger id="language">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="pt">Português</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button>Guardar Cambios</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preferencias de Dashboard</CardTitle>
                  <CardDescription>Configura cómo quieres ver tu información</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Actualización Automática</Label>
                      <p className="text-sm text-muted-foreground">Actualizar datos automáticamente cada 5 minutos</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Modo Compacto</Label>
                      <p className="text-sm text-muted-foreground">Mostrar más información en menos espacio</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Animaciones</Label>
                      <p className="text-sm text-muted-foreground">Habilitar animaciones y transiciones</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Team Settings */}
            <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <CardTitle>Gestión de Equipo</CardTitle>
                  </div>
                  <CardDescription>Administra los miembros y roles de tu equipo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Tamaño del Equipo</Label>
                    <Select defaultValue="10-50">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 empleados</SelectItem>
                        <SelectItem value="10-50">10-50 empleados</SelectItem>
                        <SelectItem value="50-200">50-200 empleados</SelectItem>
                        <SelectItem value="200+">200+ empleados</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label>Permisos de Invitación</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">Administradores pueden invitar</p>
                          <p className="text-sm text-muted-foreground">Permitir que admins inviten nuevos miembros</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">Miembros pueden invitar</p>
                          <p className="text-sm text-muted-foreground">Permitir que miembros inviten otros usuarios</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <Button>Guardar Configuración</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <CardTitle>Seguridad y Privacidad</CardTitle>
                  </div>
                  <CardDescription>Configura las opciones de seguridad de tu cuenta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Autenticación de Dos Factores (2FA)</Label>
                      <p className="text-sm text-muted-foreground">Añade una capa extra de seguridad</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sesiones Múltiples</Label>
                      <p className="text-sm text-muted-foreground">Permitir inicio de sesión en varios dispositivos</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label>Tiempo de Inactividad</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutos</SelectItem>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="60">1 hora</SelectItem>
                        <SelectItem value="never">Nunca</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Cerrar sesión automáticamente después de inactividad
                    </p>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Ver Dispositivos Activos
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-destructive bg-transparent">
                      Cerrar Todas las Sesiones
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Palette className="h-5 w-5 text-primary" />
                    <CardTitle>Apariencia</CardTitle>
                  </div>
                  <CardDescription>Personaliza el aspecto de tu dashboard</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Tema</Label>
                    <Select defaultValue="dark">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Oscuro</SelectItem>
                        <SelectItem value="system">Automático (Sistema)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Color de Acento</Label>
                    <div className="grid grid-cols-6 gap-3">
                      {[
                        { name: "Azul", color: "oklch(0.7 0.18 260)" },
                        { name: "Verde", color: "oklch(0.7 0.18 145)" },
                        { name: "Púrpura", color: "oklch(0.7 0.18 300)" },
                        { name: "Rosa", color: "oklch(0.7 0.18 340)" },
                        { name: "Naranja", color: "oklch(0.7 0.18 40)" },
                        { name: "Cian", color: "oklch(0.7 0.18 200)" },
                      ].map((color) => (
                        <button
                          key={color.name}
                          className="group h-12 w-12 rounded-lg border-2 border-border transition-all hover:scale-110 hover:border-primary"
                          style={{ backgroundColor: color.color }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Densidad de Contenido</Label>
                    <Select defaultValue="comfortable">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compacta</SelectItem>
                        <SelectItem value="comfortable">Cómoda</SelectItem>
                        <SelectItem value="spacious">Espaciosa</SelectItem>
                      </SelectContent>
                    </Select>
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
