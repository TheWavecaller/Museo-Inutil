import type { Metadata } from "next"
import { Bricolage_Grotesque, Caveat } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { expo } from "@/lib/expo"
import { cn } from "@/lib/utils"

// Una grotesca con carácter para todo el texto. El eje opsz la adapta a
// titulares y a texto pequeño, y el eje wdth da la versión estrecha de las
// etiquetas (utilidad font-label)
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-sans",
})

// Letra manuscrita para las anotaciones del comisario
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-hand",
})

const titulo = `${expo.name} · ${expo.venue} ${expo.city}`
const descripcion = `${expo.claim} Exposición temporal de objetos cotidianos rediseñados para no funcionar. ${expo.dates.label} en ${expo.venue} ${expo.city}. Entradas anticipadas a ${expo.tickets.early} €.`

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  // Cómo se ve el enlace al compartirlo (WhatsApp, redes, Slack…)
  openGraph: {
    title: titulo,
    description: descripcion,
    siteName: expo.name,
    locale: "es_ES",
    type: "website",
  },
  twitter: { card: "summary", title: titulo, description: descripcion },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn(
        "scroll-smooth antialiased",
        bricolage.variable,
        caveat.variable,
        "font-sans"
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
