"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

import { useIconoAnimado, type IconoAnimado } from "@/components/animado"
import { Pegatina } from "@/components/garabatos"
import { ChevronLeftIcon } from "@/components/icons/chevron-left"
import { ChevronRightIcon } from "@/components/icons/chevron-right"
import { PauseIcon } from "@/components/icons/pause"
import { PlayIcon } from "@/components/icons/play"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import {
  autora,
  coleccion,
  formatoUtilidad,
  numeroPieza,
} from "@/lib/coleccion"

// Distancia entre dos posiciones de un carrusel en bucle
function distancia(a: number, b: number, total: number) {
  const d = Math.abs(a - b)
  return Math.min(d, total - d)
}

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [actual, setActual] = useState(0)
  const [enMarcha, setEnMarcha] = useState(true)
  const [autoplay] = useState(() =>
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })
  )

  useEffect(() => {
    if (!api) return
    const onSelect = () => setActual(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  // Sin movimiento automático para quien lo ha desactivado en su sistema
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      autoplay.stop()
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEnMarcha(false)
    }
  }, [autoplay])

  function alternar() {
    if (enMarcha) autoplay.stop()
    else autoplay.play()
    setEnMarcha(!enMarcha)
  }

  const pieza = coleccion[actual]

  return (
    <figure className="relative mx-auto w-full max-w-md">
      <Pegatina className="absolute -top-4 -right-3 z-20 rotate-6 text-2xl sm:-right-6">
        ¡No funciona!
      </Pegatina>
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[autoplay]}
        aria-label="Piezas de la colección"
        className="overflow-hidden rounded-[var(--radius)] border-2 border-foreground bg-white"
      >
        <CarouselContent className="ml-0">
          {coleccion.map((p, i) => (
            <CarouselItem
              key={p.slug}
              className="pl-0"
              aria-label={`${i + 1} de ${coleccion.length}`}
            >
              <div className="relative aspect-square">
                <Image
                  src={p.imagen}
                  alt={`${p.nombre}, de ${autora.nombre}: ${p.descripcion}`}
                  fill
                  priority={i === 0}
                  // Precarga la pieza actual y sus vecinas para que no
                  // aparezcan huecos en blanco al avanzar
                  loading={
                    i === 0
                      ? undefined
                      : distancia(i, actual, coleccion.length) <= 2
                        ? "eager"
                        : "lazy"
                  }
                  sizes="(min-width: 1024px) 28rem, 100vw"
                  className="object-cover"
                  style={{ objectPosition: p.encuadre }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <figcaption className="relative z-10 mt-4 overflow-hidden rounded-[var(--radius)] border-2 border-foreground bg-card shadow-[4px_4px_0_0_var(--foreground)] sm:-mt-8 sm:mr-8 sm:-ml-8">
        <div className="flex items-end justify-between gap-4 px-5 pt-4 pb-3">
          <div className="min-w-0">
            <p className="font-label text-xs text-muted-foreground uppercase">
              Pieza Nº {numeroPieza(pieza.slug)} · {pieza.tipo}
            </p>
            <p className="mt-1 truncate font-heading text-2xl leading-tight">
              {pieza.nombre}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {autora.nombre}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-label text-xs text-muted-foreground uppercase">
              Utilidad
            </p>
            <p className="mt-1 font-label text-lg text-primary">
              {formatoUtilidad(pieza.utilidad)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t px-2 py-1">
          <div className="flex items-center">
            <BotonIcono
              icono={ChevronLeftIcon}
              onClick={() => api?.scrollPrev()}
              aria-label="Pieza anterior"
            />
            <span className="px-1 font-label text-xs text-muted-foreground tabular-nums">
              {String(actual + 1).padStart(2, "0")} /{" "}
              {String(coleccion.length).padStart(2, "0")}
            </span>
            <BotonIcono
              icono={ChevronRightIcon}
              onClick={() => api?.scrollNext()}
              aria-label="Pieza siguiente"
            />
          </div>
          <BotonIcono
            key={enMarcha ? "pausa" : "play"}
            icono={enMarcha ? PauseIcon : PlayIcon}
            onClick={alternar}
            aria-label={enMarcha ? "Pausar carrusel" : "Reanudar carrusel"}
          />
        </div>

        <div className="h-0.5 bg-muted" aria-hidden="true">
          <div
            className="h-full bg-primary transition-[width] duration-500"
            style={{ width: `${((actual + 1) / coleccion.length) * 100}%` }}
          />
        </div>
      </figcaption>
    </figure>
  )
}

// Botón de control con un icono animado al pasar el ratón o con el foco
function BotonIcono({
  icono: Icono,
  ...props
}: React.ComponentProps<typeof Button> & { icono: IconoAnimado }) {
  const [ref, disparadores] = useIconoAnimado()

  return (
    <Button variant="ghost" size="icon" {...props} {...disparadores}>
      <Icono ref={ref} size={16} aria-hidden="true" />
    </Button>
  )
}
