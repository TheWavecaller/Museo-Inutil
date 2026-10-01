"use client"

import { useState } from "react"

import { Effect } from "@/components/animate-ui/primitives/effects/effect"

// Aparición suave al entrar en pantalla (una sola vez): sube un poco y
// gana opacidad. Se usa solo en los titulares de sección, para que la
// página no baile entera. Al empezar marca data-visto="true", que hace que
// el trazo de rotulador de los <em> se dibuje (ver globals.css).
export function Revelar({
  children,
  className,
  retraso = 0,
}: {
  children: React.ReactNode
  className?: string
  retraso?: number
}) {
  const [visto, setVisto] = useState(false)

  return (
    <Effect
      inView
      inViewMargin="-80px"
      fade
      slide={{ direction: "up", offset: 24 }}
      delay={retraso}
      transition={{ type: "spring", stiffness: 140, damping: 22 }}
      onAnimationStart={(definicion) => {
        if (definicion === "visible") setVisto(true)
      }}
      data-visto={visto}
      className={className}
    >
      {children}
    </Effect>
  )
}
