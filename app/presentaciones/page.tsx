"use client"

import type React from "react"
import { useState } from "react"
import {
  FileDown,
  Presentation,
  Search,
  Star,
  Download,
  Eye,
  Clock,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  HeartHandshake,
  Megaphone,
  Warehouse,
  PieChart,
  Target,
  Briefcase,
  Palette,
  Building2,
  CheckCircle2,
  Sparkles,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ParrotMascot } from "@/components/parrot-mascot"

const currentCompany = {
  id: "empresa-demo",
  name: "Tu Empresa",
  primaryColor: "#2563eb", // Azul - se obtendría del perfil de empresa
  secondaryColor: "#16a34a", // Verde
  logoUrl: "/generic-company-logo.png",
}

interface PresentationTemplate {
  id: string
  title: string
  description: string
  category: string
  slides: number
  downloads: number
  rating: number
  thumbnail: string
  tags: string[]
  icon: React.ElementType
  lastUpdated: string
  fileSize: string
  isCustomized: boolean // Si ya fue personalizada para esta empresa
  designedBy: string // Analytio siempre
  availableFormats: string[]
}

const templates: PresentationTemplate[] = [
  {
    id: "1",
    title: "Reporte Ejecutivo Mensual",
    description:
      "Plantilla completa para presentar resultados mensuales a directivos con KPIs, gráficos y análisis. Personalizada con los colores de tu empresa.",
    category: "Ejecutivo",
    slides: 15,
    downloads: 2340,
    rating: 4.9,
    thumbnail: "/executive-monthly-report-presentation-with-company.jpg",
    tags: ["KPIs", "Ejecutivo", "Mensual"],
    icon: Briefcase,
    lastUpdated: "Hace 2 días",
    fileSize: "4.2 MB",
    isCustomized: true,
    designedBy: "Analytio",
    availableFormats: ["PPTX", "PDF", "Google Slides"],
  },
  {
    id: "2",
    title: "Dashboard de Ventas",
    description:
      "Presentación de métricas de ventas con pipeline, conversiones y proyecciones de revenue con tu identidad corporativa.",
    category: "Ventas",
    slides: 12,
    downloads: 1890,
    rating: 4.8,
    thumbnail: "/sales-dashboard-presentation-corporate-branding.jpg",
    tags: ["Ventas", "Pipeline", "Revenue"],
    icon: DollarSign,
    lastUpdated: "Hace 1 semana",
    fileSize: "3.8 MB",
    isCustomized: true,
    designedBy: "Analytio",
    availableFormats: ["PPTX", "PDF"],
  },
  {
    id: "3",
    title: "Análisis de Marketing",
    description:
      "Plantilla para campañas de marketing con ROI, adquisición y métricas de engagement. Diseño profesional adaptado a tu marca.",
    category: "Marketing",
    slides: 18,
    downloads: 1560,
    rating: 4.7,
    thumbnail: "/marketing-analysis-presentation-brand-colors.jpg",
    tags: ["Marketing", "Campañas", "ROI"],
    icon: Megaphone,
    lastUpdated: "Hace 3 días",
    fileSize: "5.1 MB",
    isCustomized: true,
    designedBy: "Analytio",
    availableFormats: ["PPTX", "PDF", "Google Slides"],
  },
  {
    id: "4",
    title: "Experiencia del Cliente (CX)",
    description:
      "Reporte de satisfacción del cliente con NPS, CSAT y análisis de feedback personalizado para tu empresa.",
    category: "CX",
    slides: 14,
    downloads: 1230,
    rating: 4.9,
    thumbnail: "/customer-experience-cx-presentation-corporate-styl.jpg",
    tags: ["NPS", "CSAT", "Satisfacción"],
    icon: HeartHandshake,
    lastUpdated: "Hace 5 días",
    fileSize: "3.5 MB",
    isCustomized: true,
    designedBy: "Analytio",
    availableFormats: ["PPTX", "PDF"],
  },
  {
    id: "5",
    title: "Inventario y Almacén",
    description:
      "Control de inventario con rotación, stock crítico y análisis de movimientos con los colores de tu organización.",
    category: "Almacén",
    slides: 10,
    downloads: 980,
    rating: 4.6,
    thumbnail: "/inventory-warehouse-presentation-professional.jpg",
    tags: ["Inventario", "Stock", "Logística"],
    icon: Warehouse,
    lastUpdated: "Hace 1 semana",
    fileSize: "2.9 MB",
    isCustomized: true,
    designedBy: "Analytio",
    availableFormats: ["PPTX", "PDF"],
  },
  {
    id: "6",
    title: "Análisis de Tendencias",
    description: "Plantilla para mostrar tendencias del mercado y predicciones con gráficos avanzados y tu branding.",
    category: "Análisis",
    slides: 16,
    downloads: 1450,
    rating: 4.8,
    thumbnail: "/trends-analysis-presentation-charts-corporate.jpg",
    tags: ["Tendencias", "Predicciones", "Análisis"],
    icon: TrendingUp,
    lastUpdated: "Hace 4 días",
    fileSize: "4.7 MB",
    isCustomized: true,
    designedBy: "Analytio",
    availableFormats: ["PPTX", "PDF", "Google Slides"],
  },
  {
    id: "7",
    title: "Métricas de Equipo",
    description:
      "Rendimiento del equipo con productividad, objetivos y comparativas departamentales adaptado a tu empresa.",
    category: "RRHH",
    slides: 11,
    downloads: 870,
    rating: 4.5,
    thumbnail: "/team-metrics-hr-presentation-company-branding.jpg",
    tags: ["Equipo", "Productividad", "RRHH"],
    icon: Users,
    lastUpdated: "Hace 2 semanas",
    fileSize: "3.2 MB",
    isCustomized: true,
    designedBy: "Analytio",
    availableFormats: ["PPTX", "PDF"],
  },
  {
    id: "8",
    title: "Distribución de Datos",
    description:
      "Plantilla con gráficos de torta, distribuciones y segmentaciones con la paleta de colores de tu marca.",
    category: "Análisis",
    slides: 8,
    downloads: 1120,
    rating: 4.7,
    thumbnail: "/data-distribution-pie-charts-presentation.jpg",
    tags: ["Distribución", "Segmentos", "Gráficos"],
    icon: PieChart,
    lastUpdated: "Hace 6 días",
    fileSize: "2.6 MB",
    isCustomized: true,
    designedBy: "Analytio",
    availableFormats: ["PPTX", "PDF"],
  },
  {
    id: "9",
    title: "OKRs y Objetivos",
    description:
      "Seguimiento de objetivos empresariales con OKRs, metas y progreso trimestral con identidad visual de tu organización.",
    category: "Ejecutivo",
    slides: 13,
    downloads: 1670,
    rating: 4.9,
    thumbnail: "/okr-objectives-goals-presentation-corporate.jpg",
    tags: ["OKRs", "Objetivos", "Metas"],
    icon: Target,
    lastUpdated: "Hace 3 días",
    fileSize: "3.9 MB",
    isCustomized: true,
    designedBy: "Analytio",
    availableFormats: ["PPTX", "PDF", "Google Slides"],
  },
  {
    id: "10",
    title: "Comparativa de KPIs",
    description: "Comparación de indicadores clave con benchmarks y análisis de desempeño en tu estilo corporativo.",
    category: "Análisis",
    slides: 14,
    downloads: 1340,
    rating: 4.6,
    thumbnail: "/kpi-comparison-benchmark-presentation-charts.jpg",
    tags: ["KPIs", "Benchmark", "Comparativa"],
    icon: BarChart3,
    lastUpdated: "Hace 1 semana",
    fileSize: "4.0 MB",
    isCustomized: true,
    designedBy: "Analytio",
    availableFormats: ["PPTX", "PDF"],
  },
]

const categories = ["Todas", "Ejecutivo", "Ventas", "Marketing", "CX", "Almacén", "Análisis", "RRHH"]

export default function PresentacionesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedFormat, setSelectedFormat] = useState<string>("PPTX")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "Todas" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDownload = (template: PresentationTemplate, format: string) => {
    // Simular descarga con formato seleccionado
    const extension = format.toLowerCase() === "google slides" ? "gslides" : format.toLowerCase()
    const link = document.createElement("a")
    link.href = `/templates/${template.id}_${currentCompany.id}.${extension}`
    link.download = `${template.title.replace(/\s+/g, "_")}_${currentCompany.name}.${extension}`
    link.click()
  }

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="container mx-auto p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
              <Presentation className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Presentaciones PowerPoint</h1>
              <p className="text-muted-foreground">
                Plantillas profesionales diseñadas por Analytio con los colores de tu empresa
              </p>
            </div>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden border-0 shadow-lg">
          <div
            className="h-2"
            style={{
              background: `linear-gradient(90deg, ${currentCompany.primaryColor}, ${currentCompany.secondaryColor})`,
            }}
          />
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/50 dark:to-green-900/50">
                  <Building2 className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground">Plantillas Personalizadas</h2>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Activo
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Todas las presentaciones incluyen tu logo y paleta de colores corporativa
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2">
                  <Palette className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Colores:</span>
                  <div
                    className="h-5 w-5 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: currentCompany.primaryColor }}
                  />
                  <div
                    className="h-5 w-5 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: currentCompany.secondaryColor }}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Palette className="mr-2 h-4 w-4" />
                  Cambiar colores
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parrot Tip Card */}
        <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 dark:border-blue-800">
          <CardContent className="flex items-center gap-4 p-4">
            <ParrotMascot size="sm" mood="happy" interactive={false} />
            <div>
              <p className="font-medium text-foreground">Parrot te informa</p>
              <p className="text-sm text-muted-foreground">
                El equipo de diseño de <span className="font-semibold text-blue-600">Analytio</span> ha creado estas
                plantillas especialmente para ti. Cada presentación ya incluye tu identidad visual y está lista para
                usar con tus datos.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-blue-500" />
          <span>Diseñado exclusivamente por el equipo de Analytio</span>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar presentaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="Todas" className="mb-8" onValueChange={setSelectedCategory}>
          <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-2 text-sm"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                <Presentation className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{templates.length}</p>
                <p className="text-xs text-muted-foreground">Plantillas</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{templates.filter((t) => t.isCustomized).length}</p>
                <p className="text-xs text-muted-foreground">Personalizadas</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900">
                <Star className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4.7</p>
                <p className="text-xs text-muted-foreground">Valoración</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">Semanal</p>
                <p className="text-xs text-muted-foreground">Actualizaciones</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Templates Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="group overflow-hidden transition-all hover:shadow-lg hover:border-primary/50"
            >
              <div
                className="h-1"
                style={{
                  background: `linear-gradient(90deg, ${currentCompany.primaryColor}, ${currentCompany.secondaryColor})`,
                }}
              />
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={template.thumbnail || "/placeholder.svg"}
                  alt={template.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-2 left-2 right-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="secondary" className="flex-1">
                        <Eye className="mr-1 h-3 w-3" />
                        Vista previa
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          {template.title}
                          {template.isCustomized && (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                              <Palette className="mr-1 h-3 w-3" />
                              Personalizada
                            </Badge>
                          )}
                        </DialogTitle>
                        <DialogDescription>{template.description}</DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        <div className="relative rounded-lg overflow-hidden">
                          <div
                            className="h-2"
                            style={{
                              background: `linear-gradient(90deg, ${currentCompany.primaryColor}, ${currentCompany.secondaryColor})`,
                            }}
                          />
                          <img src={template.thumbnail || "/placeholder.svg"} alt={template.title} className="w-full" />
                        </div>
                        <div className="mt-4 p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-medium">Diseñado por {template.designedBy}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-sm text-muted-foreground">{template.slides} diapositivas</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{template.fileSize}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{template.lastUpdated}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1">
                              <p className="text-xs text-muted-foreground mb-2">Formatos disponibles:</p>
                              <div className="flex gap-2">
                                {template.availableFormats.map((format) => (
                                  <Badge
                                    key={format}
                                    variant={selectedFormat === format ? "default" : "outline"}
                                    className="cursor-pointer"
                                    onClick={() => setSelectedFormat(format)}
                                  >
                                    {format}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button onClick={() => handleDownload(template, selectedFormat)} className="shrink-0">
                              <Download className="mr-2 h-4 w-4" />
                              Descargar {selectedFormat}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div
                  className="absolute left-2 top-2 rounded-md p-1.5"
                  style={{ backgroundColor: currentCompany.primaryColor }}
                >
                  <template.icon className="h-4 w-4 text-white" />
                </div>
                {template.isCustomized && (
                  <div className="absolute right-2 top-2">
                    <Badge className="bg-white/90 text-green-700 dark:bg-black/70 dark:text-green-400 text-[10px]">
                      <CheckCircle2 className="mr-1 h-2.5 w-2.5" />
                      Personalizada
                    </Badge>
                  </div>
                )}
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base leading-tight">{template.title}</CardTitle>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium">{template.rating}</span>
                  </div>
                </div>
                <CardDescription className="text-xs line-clamp-2">{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-blue-500" />
                  <span>Por {template.designedBy}</span>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t p-4 bg-muted/30">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Presentation className="h-3 w-3" />
                    {template.slides}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    {template.downloads.toLocaleString()}
                  </span>
                </div>
                <Button size="sm" onClick={() => handleDownload(template, "PPTX")}>
                  <FileDown className="mr-1 h-3 w-3" />
                  Descargar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ParrotMascot size="md" mood="thinking" />
            <h3 className="mt-4 text-lg font-medium text-foreground">No se encontraron presentaciones</h3>
            <p className="text-sm text-muted-foreground">Intenta con otros términos de búsqueda o categoría</p>
          </div>
        )}

        <Card className="mt-8 border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <Presentation className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">¿Necesitas una plantilla específica?</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              El equipo de diseño de Analytio puede crear presentaciones personalizadas adicionales según tus
              necesidades.
            </p>
            <Button>
              <Sparkles className="mr-2 h-4 w-4" />
              Solicitar Plantilla Personalizada
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
