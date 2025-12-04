"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BookOpen, MessageCircle, PlayCircle, Mail, Zap, Database, BarChart3, HelpCircle } from "lucide-react"
import { ParrotMascot } from "@/components/parrot-mascot"

export default function HelpPage() {
  const faqs = [
    {
      question: "¿Cómo conecto mis fuentes de datos?",
      answer:
        "Ve a la sección de Integraciones y selecciona la herramienta que deseas conectar (CRM, ERP, etc.). Sigue las instrucciones de autenticación y configura los datos que quieres sincronizar.",
    },
    {
      question: "¿Con qué frecuencia se actualizan los datos?",
      answer:
        "Los datos se actualizan automáticamente cada 5 minutos. Puedes configurar intervalos personalizados en Configuración o actualizar manualmente haciendo clic en el botón de refrescar.",
    },
    {
      question: "¿Puedo exportar mis reportes?",
      answer:
        "Sí, todos los dashboards y reportes pueden exportarse en formato PDF, Excel o CSV. Usa el botón de descarga en la esquina superior derecha de cualquier dashboard.",
    },
    {
      question: "¿Cómo funciona Parrot, el Asistente de IA?",
      answer:
        "Parrot analiza tus datos y responde preguntas en lenguaje natural. Puedes hacer preguntas como '¿Cuál es mi producto más vendido?' o 'Muéstrame el crecimiento de este mes'.",
    },
    {
      question: "¿Qué es el análisis de correlación?",
      answer:
        "El análisis de correlación muestra cómo diferentes métricas se relacionan entre sí. Por ejemplo, puedes ver si la satisfacción del cliente afecta las ventas o si las campañas de marketing impactan el CAC.",
    },
    {
      question: "¿Cómo agrego usuarios a mi equipo?",
      answer:
        "Ve a Configuración > Equipo y haz clic en 'Invitar Miembro'. Puedes asignar roles (Administrador, Editor, Visualizador) y controlar qué dashboards puede ver cada persona.",
    },
  ]

  const guides = [
    {
      title: "Guía de Inicio Rápido",
      description: "Aprende lo básico en 10 minutos",
      icon: Zap,
      duration: "10 min",
    },
    {
      title: "Conectar tus Datos",
      description: "Integra ERPs, CRMs y más",
      icon: Database,
      duration: "15 min",
    },
    {
      title: "Crear Dashboards Personalizados",
      description: "Diseña tus propias vistas",
      icon: BarChart3,
      duration: "20 min",
    },
    {
      title: "Análisis con Parrot IA",
      description: "Usa el asistente inteligente",
      icon: MessageCircle,
      duration: "12 min",
    },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Centro de Ayuda" />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8 space-y-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                <ParrotMascot size="lg" mood="waving" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">¿En qué podemos ayudarte?</h2>
              <p className="text-muted-foreground">Busca respuestas, tutoriales y contacta con soporte</p>
              <div className="relative mx-auto max-w-2xl">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar en la ayuda..." className="h-14 pl-12 text-base" />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-lg">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Documentación</CardTitle>
                  <CardDescription>Guías completas y referencia</CardDescription>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer transition-all hover:border-accent hover:shadow-lg">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <PlayCircle className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Video Tutoriales</CardTitle>
                  <CardDescription>Aprende viendo paso a paso</CardDescription>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer transition-all hover:border-success hover:shadow-lg">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                    <Mail className="h-6 w-6 text-success" />
                  </div>
                  <CardTitle>Contactar Soporte</CardTitle>
                  <CardDescription>Respuesta en menos de 24h</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="faq" className="space-y-6">
            <TabsList>
              <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
              <TabsTrigger value="guides">Guías</TabsTrigger>
              <TabsTrigger value="contact">Contacto</TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="space-y-4">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <HelpCircle className="mt-1 h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <CardTitle className="text-base">{faq.question}</CardTitle>
                          <CardDescription className="mt-2">{faq.answer}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="guides" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                {guides.map((guide, index) => (
                  <Card key={index} className="cursor-pointer transition-all hover:border-primary hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                          <guide.icon className="h-7 w-7 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{guide.title}</CardTitle>
                          <CardDescription>{guide.description}</CardDescription>
                          <p className="mt-2 text-xs text-muted-foreground">{guide.duration} de lectura</p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Enviar un Mensaje</CardTitle>
                  <CardDescription>Nuestro equipo responderá en menos de 24 horas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nombre</label>
                      <Input placeholder="Tu nombre completo" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="tu@empresa.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Asunto</label>
                    <Input placeholder="¿En qué podemos ayudarte?" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mensaje</label>
                    <textarea
                      className="min-h-[150px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      placeholder="Describe tu consulta o problema..."
                    />
                  </div>
                  <Button className="w-full">Enviar Mensaje</Button>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <Mail className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Email</CardTitle>
                    <CardDescription>soporte@analytio.com</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <MessageCircle className="h-8 w-8 text-accent mb-2" />
                    <CardTitle>Chat en Vivo</CardTitle>
                    <CardDescription>Lun - Vie, 9am - 6pm</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
