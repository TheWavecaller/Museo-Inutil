"use client"

import { SlidingNumber } from "@/components/animate-ui/primitives/texts/sliding-number"

// Número que se desliza al cambiar (contadores, totales). Los rodillos de
// dígitos son decorativos: el lector de pantalla lee el número normal.
export function Cifra({
  valor,
  ceros = false,
}: {
  valor: number
  // Rellena con ceros a la izquierda (01, 02…)
  ceros?: boolean
}) {
  return (
    <>
      <span className="sr-only">{valor}</span>
      {/* El padStart de SlidingNumber no rellena desde el primer render */}
      {ceros && valor < 10 && <span aria-hidden="true">0</span>}
      <SlidingNumber
        number={valor}
        initiallyStable
        aria-hidden="true"
        transition={{ stiffness: 220, damping: 24, mass: 0.6 }}
      />
    </>
  )
}
