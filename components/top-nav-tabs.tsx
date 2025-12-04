"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface Tab {
  name: string
  href: string
}

const tabs: Tab[] = [
  { name: "Vista General", href: "/" },
  { name: "Presentaciones", href: "/presentaciones" },
  { name: "Analytics", href: "/correlacion-total" },
  { name: "Fuentes de Datos", href: "/data-sources" },
  { name: "Integraciones", href: "/integrations" },
  { name: "Configuración", href: "/settings" },
]

export function TopNavTabs() {
  const pathname = usePathname()

  return (
    <div className="border-b border-border bg-background">
      <nav className="flex gap-1 px-6">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "relative px-3 py-3 text-sm font-medium transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.name}
              {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
