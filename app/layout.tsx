import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { FloatingParrot } from "@/components/floating-parrot"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Analytio - Plataforma de Analytics Empresarial",
  description:
    "Plataforma de inteligencia de negocios y reportes en tiempo real para empresas modernas. Con Parrot, tu asistente de IA.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} ${jetbrainsMono.variable} antialiased`}>
        {children}
        <FloatingParrot />
        <Analytics />
      </body>
    </html>
  )
}
