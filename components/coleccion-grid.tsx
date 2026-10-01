"use client"

import { useState } from "react"
import Image from "next/image"

import { useIconoAnimado } from "@/components/animado"
import { ArrowRightIcon } from "@/components/icons/arrow-right"
import { ChevronUpIcon } from "@/components/icons/chevron-up"
import { PlusIcon } from "@/components/icons/plus"

import { Pegatina } from "@/components/garabatos"
import { Button } from "@/components/ui/button"
import {
  coleccion,
  formatoUtilidad,
  numeroPieza,
  type Pieza,
} from "@/lib/coleccion"
import { expo } from "@/lib/expo"
import { cn } from "@/lib/utils"

// Piezas visibles antes de pulsar "Ver más". Con la destacada (2×2) y la
// tarjeta de la entrada, 11 piezas completan filas exactas de 3 y de 2.
const VISIBLES = 11

export function ColeccionGrid() {
  const [abierta, setAbierta] = useState(false)
  const [icono, disparadores] = useIconoAnimado()
  const piezas = abierta ? coleccion : coleccion.slice(0, VISIBLES)
  const ocultas = coleccion.length - VISIBLES

  function alternar() {
    if (abierta) {
      // Al plegar, vuelve al inicio de la sección para no quedarse a mitad
      document.getElementById("coleccion")?.scrollIntoView()
    }
    setAbierta(!abierta)
  }

  return (
    <>
      <ul
        id="coleccion-piezas"
        className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius)] border-2 border-foreground bg-border md:grid-cols-2 lg:grid-cols-3"
      >
        {piezas.map((pieza, i) => (
          <li
            key={pieza.slug}
            className={cn(
              i === 0 && "md:col-span-2 md:row-span-2",
              i >= VISIBLES && "animate-in duration-500 fade-in"
            )}
          >
            <Ficha pieza={pieza} destacada={i === 0} />
          </li>
        ))}
        <li
          className={cn(
            "md:col-span-2",
            abierta ? "lg:col-span-3" : "lg:col-span-1"
          )}
        >
          <TarjetaEntrada horizontal={abierta} />
        </li>
      </ul>

      <div className="mt-8 flex flex-col items-center gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={alternar}
          aria-expanded={abierta}
          aria-controls="coleccion-piezas"
          {...disparadores}
          className="h-12 px-6 text-base"
        >
          {abierta ? (
            <>
              Ver menos
              <ChevronUpIcon ref={icono} size={16} data-icon="inline-end" />
            </>
          ) : (
            <>
              Ver las {coleccion.length} piezas
              <PlusIcon ref={icono} size={16} data-icon="inline-end" />
            </>
          )}
        </Button>
        {!abierta && (
          <p className="font-label text-xs text-muted-foreground uppercase">
            {ocultas} objetos inútiles más en el almacén
          </p>
        )}
      </div>
    </>
  )
}

function TarjetaEntrada({ horizontal }: { horizontal: boolean }) {
  const [icono, disparadores] = useIconoAnimado()

  return (
    <a
      href="#entradas"
      {...disparadores}
      className={cn(
        "group flex h-full min-h-72 flex-col justify-between gap-6 bg-primary p-6 text-primary-foreground",
        horizontal &&
          "lg:min-h-0 lg:flex-row lg:items-end lg:p-8 [&>div]:lg:max-w-xl"
      )}
    >
      <p className="font-label text-xs uppercase opacity-80">
        Pieza Nº {String(coleccion.length + 1).padStart(3, "0")} · Papel
      </p>
      <div>
        <p className="font-heading text-4xl leading-tight">Tu entrada</p>
        <p className="mt-2 opacity-90">
          La única pieza útil de toda la exposición. Desde {expo.tickets.early}{" "}
          €.
        </p>
        <span className="mt-6 inline-flex items-center gap-2 font-medium">
          Comprar entrada anticipada
          <ArrowRightIcon ref={icono} size={16} />
        </span>
      </div>
    </a>
  )
}

function Ficha({ pieza, destacada }: { pieza: Pieza; destacada: boolean }) {
  return (
    <article className="flex h-full flex-col bg-card">
      <div
        className={cn(
          "relative aspect-square overflow-hidden bg-white",
          destacada && "md:aspect-auto md:min-h-96 md:flex-1"
        )}
      >
        <Image
          src={pieza.imagen}
          alt={`${pieza.nombre}: ${pieza.descripcion}`}
          fill
          sizes={
            destacada
              ? "(min-width: 1024px) 66vw, (min-width: 768px) 100vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-500 hover:scale-[1.03]"
          style={{ objectPosition: pieza.encuadre }}
        />
        {destacada && (
          <Pegatina className="absolute top-5 left-5 text-2xl">
            ¡Pieza estrella!
          </Pegatina>
        )}
      </div>
      <div className="flex flex-col gap-2 border-t p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-4 font-label text-xs text-muted-foreground uppercase">
          <span>Nº {numeroPieza(pieza.slug)}</span>
          <span>{pieza.tipo}</span>
        </div>
        <h3
          className={cn(
            "font-heading leading-tight",
            destacada ? "text-4xl" : "text-2xl"
          )}
        >
          {pieza.nombre}
        </h3>
        <p className="text-sm text-pretty text-muted-foreground">
          {pieza.descripcion}
        </p>
        <p className="mt-auto flex items-baseline justify-between border-t border-dashed pt-3 text-sm">
          <span className="text-muted-foreground">Utilidad</span>
          <span className="font-label text-primary">
            {formatoUtilidad(pieza.utilidad)}
          </span>
        </p>
      </div>
    </article>
  )
}
