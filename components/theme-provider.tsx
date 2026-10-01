"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { MotionConfig } from "motion/react"

// La web solo está diseñada en claro: se fuerza el tema claro (sin seguir
// al sistema ni atajo de teclado). Las secciones oscuras, como el Manifiesto
// o el CTA final, usan la clase .dark solo en su bloque.
function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      forcedTheme="light"
      disableTransitionOnChange
      {...props}
    >
      {/* Las animaciones se quedan quietas si el sistema pide reducir movimiento */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  )
}

export { ThemeProvider }
