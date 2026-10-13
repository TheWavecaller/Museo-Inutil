"use client"

import { useEffect, useRef } from "react"

// Cada clic salpica unas gotas, como si la Regadera del logo anduviera
// suelta por la página. Adaptado de ClickSpark, de React Bits
// (https://reactbits.dev, MIT + Commons Clause): un único lienzo fijo del
// tamaño de la pantalla que solo se anima mientras hay gotas en el aire.

type Gota = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  nacida: number
  relleno: string
  borde: string
}

const VIDA = 650 // ms
const GRAVEDAD = 0.32 // px por fotograma²

export function Salpicadura() {
  const lienzoRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const lienzo = lienzoRef.current
    const ctx = lienzo?.getContext("2d")
    if (!lienzo || !ctx) return

    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)")
    let gotas: Gota[] = []
    let fotograma = 0
    let anterior = 0

    function ajustar() {
      if (!lienzo || !ctx) return
      const dpr = window.devicePixelRatio || 1
      lienzo.width = window.innerWidth * dpr
      lienzo.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Lágrima con la punta hacia atrás, orientada según su velocidad
    function pintar(g: Gota, ahora: number) {
      if (!ctx) return
      const vida = (ahora - g.nacida) / VIDA
      ctx.save()
      ctx.globalAlpha = 1 - vida * vida
      ctx.translate(g.x, g.y)
      ctx.rotate(Math.atan2(g.vy, g.vx))
      ctx.beginPath()
      ctx.moveTo(-g.r * 2.4, 0)
      ctx.arc(0, 0, g.r, -Math.PI / 2, Math.PI / 2)
      ctx.closePath()
      ctx.fillStyle = g.relleno
      ctx.fill()
      ctx.lineWidth = 1.5
      ctx.strokeStyle = g.borde
      ctx.stroke()
      ctx.restore()
    }

    function animar(ahora: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      // Fotogramas de 60 Hz transcurridos: las gotas caen igual de rápido
      // en pantallas de 60 y de 120 Hz
      const f = anterior ? Math.min((ahora - anterior) / (1000 / 60), 3) : 1
      anterior = ahora
      gotas = gotas.filter((g) => ahora - g.nacida < VIDA)
      for (const g of gotas) {
        g.vy += GRAVEDAD * f
        g.x += g.vx * f
        g.y += g.vy * f
        pintar(g, ahora)
      }
      if (gotas.length) fotograma = requestAnimationFrame(animar)
      else fotograma = anterior = 0
    }

    function salpicar(e: PointerEvent) {
      if (reducir.matches || e.button !== 0) return
      // Los colores salen del elemento pulsado: en las secciones oscuras
      // (.dark) el acuamarino es más claro y la tinta, blanca
      const estilo = getComputedStyle(
        e.target instanceof Element ? e.target : document.body
      )
      const relleno = estilo.getPropertyValue("--primary").trim() || "#0f7a7c"
      const borde = estilo.getPropertyValue("--foreground").trim() || "#1d1915"
      const ahora = performance.now()
      const cuantas = 7
      for (let i = 0; i < cuantas; i++) {
        // Abanico hacia arriba, con algo de azar para que no parezca un reloj
        const angulo =
          -Math.PI +
          (Math.PI * (i + 0.5)) / cuantas +
          (Math.random() - 0.5) * 0.4
        const fuerza = 3 + Math.random() * 3
        gotas.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angulo) * fuerza,
          vy: Math.sin(angulo) * fuerza - 1.5,
          r: 2.5 + Math.random() * 2,
          nacida: ahora,
          relleno,
          borde,
        })
      }
      if (!fotograma) fotograma = requestAnimationFrame(animar)
    }

    ajustar()
    window.addEventListener("resize", ajustar)
    window.addEventListener("pointerdown", salpicar)
    return () => {
      cancelAnimationFrame(fotograma)
      window.removeEventListener("resize", ajustar)
      window.removeEventListener("pointerdown", salpicar)
    }
  }, [])

  return (
    <canvas
      ref={lienzoRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] size-full"
    />
  )
}
