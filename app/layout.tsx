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

export const metadata: Metadata = {
  title: `${expo.name} · ${expo.venue} ${expo.city}`,
  description: `${expo.claim} Exposición temporal de inventos absurdos y fracasos comerciales. ${expo.dates.label} en ${expo.venue} ${expo.city}. Entradas anticipadas a ${expo.tickets.early} €.`,
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
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      </body>
    </html>
  )
}
