import type { Metadata } from "next"
import { Bricolage_Grotesque, Caveat, Space_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { expo } from "@/lib/expo"
import { cn } from "@/lib/utils"

// Una grotesca con carácter para todo el texto (el eje opsz la adapta
// sola a titulares y a texto pequeño)
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

const fontMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
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
        fontMono.variable,
        "font-sans"
      )}
    >
      <body>
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      </body>
    </html>
  )
}
