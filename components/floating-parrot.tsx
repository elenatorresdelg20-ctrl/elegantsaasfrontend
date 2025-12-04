"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { X, MessageCircle } from "lucide-react"
import { ParrotMascot } from "@/components/parrot-mascot"
import { cn } from "@/lib/utils"

const tips = [
  "¿Sabías que puedo analizar correlaciones entre tus métricas?",
  "Pregúntame sobre tendencias en tus datos de ventas",
  "Puedo ayudarte a crear reportes automáticos",
  "Analizo tu NPS y CSAT para encontrar áreas de mejora",
  "¿Necesitas predecir el churn de clientes? ¡Yo te ayudo!",
]

export function FloatingParrot() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [currentTip, setCurrentTip] = useState(0)
  const [showTip, setShowTip] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Don't show on login or ai-assistant pages
  const hiddenPages = ["/login", "/ai-assistant"]
  const shouldHide = hiddenPages.some((page) => pathname.startsWith(page))

  // Cycle through tips
  useEffect(() => {
    if (shouldHide || hasInteracted) return

    const showTipTimeout = setTimeout(() => {
      setShowTip(true)
    }, 5000)

    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 8000)

    return () => {
      clearTimeout(showTipTimeout)
      clearInterval(tipInterval)
    }
  }, [shouldHide, hasInteracted])

  if (shouldHide) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tip bubble */}
      {showTip && !isOpen && !hasInteracted && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-[280px] rounded-2xl border border-border bg-card p-4 shadow-lg">
          <button
            onClick={() => {
              setShowTip(false)
              setHasInteracted(true)
            }}
            className="absolute -right-2 -top-2 rounded-full bg-secondary p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
          <p className="text-sm text-foreground">{tips[currentTip]}</p>
          <Link
            href="/ai-assistant"
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            Hablar con Parrot
            <MessageCircle className="h-3 w-3" />
          </Link>
        </div>
      )}

      {/* Expanded chat preview */}
      {isOpen && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 w-80 rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-blue-500/10 to-green-500/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <ParrotMascot size="xs" mood="happy" interactive={false} />
              <span className="font-medium text-sm text-foreground">Parrot Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex gap-3">
              <ParrotMascot size="sm" mood="idle" interactive={false} />
              <div className="rounded-2xl bg-secondary px-4 py-2">
                <p className="text-sm text-foreground">
                  ¡Hola! Soy Parrot, tu asistente de análisis. ¿En qué puedo ayudarte hoy?
                </p>
              </div>
            </div>
            <Link
              href="/ai-assistant"
              className="block w-full rounded-xl bg-primary py-3 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Abrir chat completo
            </Link>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          setShowTip(false)
          setHasInteracted(true)
        }}
        className={cn(
          "group relative rounded-full p-1 shadow-lg transition-all duration-300 hover:scale-110",
          "bg-gradient-to-br from-blue-500/20 to-green-500/20 border border-border",
          "hover:shadow-xl hover:shadow-primary/20",
          isOpen && "rotate-0",
        )}
      >
        <ParrotMascot size="md" mood={isOpen ? "happy" : "idle"} interactive={false} />
        {/* Notification dot */}
        {!hasInteracted && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-primary" />
          </span>
        )}
      </button>
    </div>
  )
}
