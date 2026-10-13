"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

// Titular que se desmorona al pasar el ratón (o al tocarlo en el móvil):
// las palabras caen con física y se pueden arrastrar. Adaptado de
// FallingText, de React Bits (https://reactbits.dev, MIT + Commons Clause).
// Cambios: las palabras se pintan con React (el <h2> sigue siendo texto
// real y legible), matter-js se carga solo al caer, no captura la rueda ni
// el scroll táctil, y hay un botón para recolocarlo.

export type Trozo = { texto: string; destacado?: boolean }

export function TitularQueSeCae({
  id,
  trozos,
  className,
}: {
  id?: string
  trozos: Trozo[]
  className?: string
}) {
  const [cayendo, setCayendo] = useState(false)
  // Cambiar la clave vuelve a montar las palabras en su sitio
  const [montaje, setMontaje] = useState(0)
  const titularRef = useRef<HTMLHeadingElement>(null)
  const trozosRef = useRef<(HTMLElement | null)[]>([])

  function caer() {
    if (cayendo) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setCayendo(true)
  }

  function recolocar() {
    setCayendo(false)
    setMontaje((m) => m + 1)
  }

  useEffect(() => {
    const titular = titularRef.current
    if (!cayendo || !titular) return

    let cancelado = false
    let fotograma = 0
    let limpiar = () => {}

    import("matter-js").then(({ default: Matter }) => {
      if (cancelado) return
      const { Engine, World, Bodies, Body, Mouse, MouseConstraint } = Matter

      const caja = titular.getBoundingClientRect()
      const { width: ancho, height: alto } = caja
      // Fija la altura antes de sacar las palabras del flujo
      titular.style.height = `${alto}px`

      const motor = Engine.create()
      motor.gravity.y = 1.1

      const pared = { isStatic: true }
      const limites = [
        Bodies.rectangle(ancho / 2, alto + 50, ancho * 2, 100, pared),
        Bodies.rectangle(-50, alto / 2, 100, alto * 4, pared),
        Bodies.rectangle(ancho + 50, alto / 2, 100, alto * 4, pared),
        Bodies.rectangle(ancho / 2, -alto - 50, ancho * 2, 100, pared),
      ]

      const piezas = trozosRef.current.flatMap((el) => {
        if (!el) return []
        const r = el.getBoundingClientRect()
        const cuerpo = Bodies.rectangle(
          r.left - caja.left + r.width / 2,
          r.top - caja.top + r.height / 2,
          r.width,
          r.height * 0.8,
          { restitution: 0.45, friction: 0.3, frictionAir: 0.012 }
        )
        // Un saltito antes de caer, para que se note que se desmorona
        Body.setVelocity(cuerpo, {
          x: (Math.random() - 0.5) * 6,
          y: -4 - Math.random() * 6,
        })
        Body.setAngularVelocity(cuerpo, (Math.random() - 0.5) * 0.15)
        return [{ el, cuerpo }]
      })

      const pintar = () => {
        for (const { el, cuerpo } of piezas) {
          const { x, y } = cuerpo.position
          el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${cuerpo.angle}rad)`
        }
      }

      for (const { el } of piezas) {
        el.style.position = "absolute"
        el.style.left = "0"
        el.style.top = "0"
        el.style.willChange = "transform"
      }
      // En su sitio desde ya, antes del primer fotograma de la física
      pintar()

      World.add(motor.world, [...limites, ...piezas.map((p) => p.cuerpo)])

      // Solo con ratón se pueden arrastrar las palabras. matter-js escucha
      // también la rueda y el táctil con preventDefault, lo que bloquearía
      // el scroll de la página: se quitan esos oyentes.
      let raton: Matter.Mouse | null = null
      if (window.matchMedia("(pointer: fine)").matches) {
        raton = Mouse.create(titular)
        const r = raton as Matter.Mouse & Record<string, EventListener>
        titular.removeEventListener("wheel", r.mousewheel)
        titular.removeEventListener("touchmove", r.mousemove)
        titular.removeEventListener("touchstart", r.mousedown)
        titular.removeEventListener("touchend", r.mouseup)
        World.add(
          motor.world,
          MouseConstraint.create(motor, {
            mouse: raton,
            constraint: { stiffness: 0.2, render: { visible: false } },
          })
        )
      }

      // Paso según el tiempo real, para que caiga igual de rápido en
      // pantallas de 60 y de 120 Hz. Con tope de 1/60 s, que es lo máximo
      // que matter-js admite sin perder estabilidad
      let anterior = 0
      const animar = (ahora: number) => {
        const paso = anterior
          ? Math.min(ahora - anterior, 1000 / 60)
          : 1000 / 60
        anterior = ahora
        Engine.update(motor, paso)
        pintar()
        fotograma = requestAnimationFrame(animar)
      }

      // La física solo corre mientras el titular está en pantalla
      const vigia = new IntersectionObserver(([entrada]) => {
        cancelAnimationFrame(fotograma)
        anterior = 0
        fotograma = entrada.isIntersecting ? requestAnimationFrame(animar) : 0
      })
      vigia.observe(titular)

      limpiar = () => {
        vigia.disconnect()
        if (raton) {
          const r = raton as Matter.Mouse & Record<string, EventListener>
          titular.removeEventListener("mousemove", r.mousemove)
          titular.removeEventListener("mousedown", r.mousedown)
          titular.removeEventListener("mouseup", r.mouseup)
        }
        World.clear(motor.world, false)
        Engine.clear(motor)
      }
    })

    // Si cambia el ancho, las paredes ya no cuadran: mejor recolocar. Solo
    // el ancho: en el móvil la altura cambia al esconderse la barra del
    // navegador durante el scroll
    const anchoInicial = window.innerWidth
    const alRedimensionar = () => {
      if (window.innerWidth !== anchoInicial) recolocar()
    }
    window.addEventListener("resize", alRedimensionar)

    return () => {
      cancelado = true
      cancelAnimationFrame(fotograma)
      window.removeEventListener("resize", alRedimensionar)
      limpiar()
      titular.style.height = ""
    }
  }, [cayendo])

  return (
    <div className="relative">
      <h2
        id={id}
        ref={titularRef}
        // pointermove y no pointerenter: que no se caiga solo porque el
        // titular pase por debajo del cursor al hacer scroll
        onPointerMove={(e) => e.pointerType === "mouse" && caer()}
        onClick={caer}
        className={cn(
          "relative",
          cayendo && "cursor-grab select-none",
          className
        )}
      >
        {/* La clave remonta las palabras al recolocar */}
        <span key={montaje}>
          {trozos.map((t, i) => {
            const Etiqueta = t.destacado ? "em" : "span"
            return (
              <span key={i}>
                <Etiqueta
                  ref={(el: HTMLElement | null) => {
                    trozosRef.current[i] = el
                  }}
                  className={cn(
                    "inline-block whitespace-nowrap",
                    t.destacado && "text-primary"
                  )}
                >
                  {t.texto}
                </Etiqueta>{" "}
              </span>
            )
          })}
        </span>
      </h2>
      {cayendo && (
        <button
          type="button"
          onClick={recolocar}
          className="absolute top-full left-1/2 mt-1 -translate-x-1/2 font-hand text-2xl leading-none font-bold whitespace-nowrap text-primary underline decoration-2 underline-offset-4"
        >
          Se ha roto. ¿Lo recoloco?
        </button>
      )}
    </div>
  )
}
