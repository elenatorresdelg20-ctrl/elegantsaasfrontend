"use client";

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Settings,
  Users,
  Database,
  TrendingUp,
  Bell,
  HelpCircle,
  ChevronDown,
  Building2,
  Layers,
  Activity,
  GitCompareArrows,
  Network,
  HeartHandshake,
  Megaphone,
  DollarSign,
  LogOut,
  Warehouse,
  Package,
  Plug,
  Upload,
  Presentation,
} from "lucide-react"
import { ParrotMascot } from "@/components/parrot-mascot"

const mainNavigation = [
  { name: "Vista General", href: "/", icon: LayoutDashboard },
  { name: "Correlación Total", href: "/correlacion-total", icon: GitCompareArrows },
]

const cxSection = [
  { name: "Dashboard CX", href: "/cx", icon: HeartHandshake },
  { name: "Satisfacción", href: "/cx/satisfaccion", icon: Activity },
  { name: "NPS & CSAT", href: "/cx/nps", icon: TrendingUp },
]

const marketingSection = [
  { name: "Dashboard Marketing", href: "/marketing", icon: Megaphone },
  { name: "Campañas", href: "/marketing/campanas", icon: Layers },
  { name: "Adquisición", href: "/marketing/adquisicion", icon: Users },
]

const ventasSection = [
  { name: "Dashboard Ventas", href: "/ventas", icon: DollarSign },
  { name: "Pipeline", href: "/ventas/pipeline", icon: BarChart3 },
  { name: "Revenue", href: "/ventas/revenue", icon: TrendingUp },
]

const almacenSection = [
  { name: "Dashboard Almacén", href: "/almacen", icon: Warehouse },
  { name: "Inventario", href: "/almacen/inventario", icon: Package },
  { name: "Movimientos", href: "/almacen/movimientos", icon: Activity },
]

const toolsSection = [
  { name: "Análisis Causal", href: "/analysis", icon: Network },
  { name: "Reportes", href: "/reports", icon: FileText },
  { name: "Presentaciones", href: "/presentaciones", icon: Presentation },
]

const settingsSection = [
  { name: "Fuentes de Datos", href: "/data-sources", icon: Database },
  { name: "Integraciones", href: "/integrations", icon: Plug },
  { name: "Cargar Datos", href: "/upload", icon: Upload },
  { name: "Equipo", href: "/team", icon: Users },
  { name: "Notificaciones", href: "/notifications", icon: Bell },
  { name: "Configuración", href: "/settings", icon: Settings },
  { name: "Ayuda", href: "/help", icon: HelpCircle },
]

export function Sidebar() {
  const currentWorkspace = "Acme Corp"
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
        <Image src="/logo-analytio.png" alt="Analytio Logo" width={36} height={36} className="rounded-lg" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-sidebar-foreground">Analytio</p>
            <p className="text-xs text-muted-foreground">Enterprise</p>
          </div>
        </div>
      </div>

      {/* Workspace selector */}
      <button className="mx-3 mt-4 flex items-center justify-between rounded-lg bg-sidebar-accent px-3 py-2 text-left transition-colors hover:bg-sidebar-accent/80">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-sidebar-foreground">{currentWorkspace}</span>
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>

      {/* Navigation */}
      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {/* Main */}
        <div className="space-y-1">
          {mainNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </div>

        <div>
          <Link
            href="/ai-assistant"
            className={cn(
              "group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all",
              pathname === "/ai-assistant"
                ? "bg-gradient-to-r from-blue-500/20 to-green-500/20 text-foreground"
                : "text-muted-foreground hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-green-500/10 hover:text-foreground",
            )}
          >
            <ParrotMascot size="xs" mood={pathname === "/ai-assistant" ? "happy" : "idle"} interactive={false} />
            <span>Parrot Assistant</span>
            <span className="ml-auto rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
              IA
            </span>
          </Link>
        </div>

        {/* CX Section */}
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-primary">Experiencia Cliente</p>
          <div className="space-y-1">
            {cxSection.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Marketing Section */}
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-accent">Marketing</p>
          <div className="space-y-1">
            {marketingSection.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Ventas Section */}
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-success">Ventas</p>
          <div className="space-y-1">
            {ventasSection.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "bg-success/10 text-success"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-warning">Almacén</p>
          <div className="space-y-1">
            {almacenSection.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "bg-warning/10 text-warning"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Herramientas</p>
          <div className="space-y-1">
            {toolsSection.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-sidebar-accent text-sidebar-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Settings Section */}
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Configuración
          </p>
          <div className="space-y-1">
            {settingsSection.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-sidebar-accent text-sidebar-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* User section */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
            JD
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-sidebar-foreground">Juan Pérez</p>
            <p className="text-xs text-muted-foreground">Administrador</p>
          </div>
          <Link href="/login" className="text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  )
}
