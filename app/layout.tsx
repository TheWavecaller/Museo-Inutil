import type { Metadata } from "next"
import { Geist_Mono, Instrument_Serif, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { expo } from "@/lib/expo"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
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
        inter.variable,
        instrumentSerif.variable,
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
