"use client"

import { useState, useRef, useEffect } from "react"
import { Send, User, BarChart3, TrendingUp, FileText, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ParrotMascot } from "@/components/parrot-mascot"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const suggestedQuestions = [
  { icon: BarChart3, text: "¿Cuáles son las tendencias clave en mis datos?" },
  { icon: TrendingUp, text: "Encuentra correlaciones entre marketing y ventas" },
  { icon: FileText, text: "Genera un resumen del rendimiento mensual" },
  { icon: Lightbulb, text: "Sugiere KPIs que debería monitorear" },
]

export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "¡Hola! Soy Parrot, tu asistente de análisis de Analytio. Puedo ayudarte a analizar datos, encontrar correlaciones, generar insights y crear reportes. ¿Qué te gustaría explorar hoy?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [parrotMood, setParrotMood] = useState<"idle" | "thinking" | "talking" | "happy" | "excited">("idle")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isLoading) {
      setParrotMood("thinking")
    }
  }, [isLoading])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      const responses = [
        "Según tus datos, identifiqué una correlación positiva fuerte (r=0.85) entre el gasto en marketing y la adquisición de clientes. Esto sugiere que aumentar el presupuesto de marketing podría generar un crecimiento significativo.",
        "Analizando las tendencias, tus ingresos crecieron 23% trimestre a trimestre. Los principales impulsores parecen ser el lanzamiento del producto en septiembre y el aumento de tráfico orgánico.",
        "He analizado tus KPIs y encontré que tu tasa de retención está por debajo del promedio de la industria. Recomiendo enfocarte en iniciativas de customer success para mejorar esta métrica.",
        "Tu análisis de correlación muestra que el tiempo de respuesta está negativamente correlacionado con la satisfacción del cliente (r=-0.72). Reducir el tiempo de respuesta podría mejorar significativamente los scores de satisfacción.",
      ]

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
      setParrotMood("excited")
      setTimeout(() => setParrotMood("happy"), 500)
      setTimeout(() => setParrotMood("idle"), 2500)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card">
      <div className="flex items-center gap-4 border-b border-border bg-gradient-to-r from-blue-500/5 to-green-500/5 px-6 py-4">
        <div className="relative">
          <ParrotMascot size="md" mood={parrotMood} interactive={false} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">Parrot - Analytio Assistant</h3>
          <p className="text-xs text-muted-foreground">Tu asistente inteligente de análisis</p>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-success/20 px-3 py-1 text-xs font-medium text-success">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
          En línea
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        {messages.map((message) => (
          <div key={message.id} className={cn("flex gap-4", message.role === "user" ? "flex-row-reverse" : "flex-row")}>
            {message.role === "user" ? (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                <User className="h-5 w-5 text-primary" />
              </div>
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                <ParrotMascot size="sm" mood="idle" interactive={false} />
              </div>
            )}
            <div
              className={cn(
                "max-w-[75%] rounded-2xl px-5 py-3",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground",
              )}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className="mt-2 text-[11px] opacity-50">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center">
              <ParrotMascot size="sm" mood="thinking" interactive={false} />
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-secondary px-5 py-4">
              <span className="text-sm text-muted-foreground">Parrot está analizando</span>
              <span className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="border-t border-border px-6 py-4">
          <p className="mb-3 text-xs font-medium text-muted-foreground">Preguntas sugeridas</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {suggestedQuestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion.text)}
                className="flex items-center gap-3 rounded-xl border border-border bg-secondary/50 px-4 py-3 text-left text-sm text-muted-foreground transition-all hover:border-primary/50 hover:bg-secondary hover:text-foreground"
              >
                <suggestion.icon className="h-4 w-4 shrink-0 text-primary" />
                <span className="line-clamp-1">{suggestion.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border p-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Pregunta a Parrot sobre tus datos..."
            className="flex-1 rounded-xl border border-border bg-input px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="lg"
            className="shrink-0 rounded-xl px-6"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
