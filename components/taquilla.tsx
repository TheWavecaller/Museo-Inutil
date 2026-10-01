"use client"

import { useEffect, useRef, useState } from "react"
import { MinusIcon, PlusIcon } from "lucide-react"

import type { IconoHandle } from "@/components/animado"
import { CheckIcon } from "@/components/icons/check"
import { Button } from "@/components/ui/button"
import { diasDeApertura, expo } from "@/lib/expo"

const tipos = [
  { id: "anticipada", nombre: "Anticipada", precio: expo.tickets.early },
  { id: "reducida", nombre: "Reducida", precio: expo.tickets.reduced },
  { id: "menores", nombre: "Menores de 12", precio: 0 },
] as const

type Tipo = (typeof tipos)[number]["id"]

const MAX = 10
const dias = diasDeApertura()

export function Taquilla() {
  const [dia, setDia] = useState(dias[0].valor)
  const [cantidades, setCantidades] = useState<Record<Tipo, number>>({
    anticipada: 1,
    reducida: 0,
    menores: 0,
  })
  const [comprado, setComprado] = useState(false)

  const total = tipos.reduce((s, t) => s + t.precio * cantidades[t.id], 0)
  const entradas = tipos.reduce((s, t) => s + cantidades[t.id], 0)
  // Lo que costarían en taquilla las entradas anticipadas
  const ahorro =
    (expo.tickets.general - expo.tickets.early) * cantidades.anticipada
  const etiquetaDia = dias.find((d) => d.valor === dia)?.etiqueta

  function cambiar(id: Tipo, delta: number) {
    setCantidades((c) => ({
      ...c,
      [id]: Math.min(MAX, Math.max(0, c[id] + delta)),
    }))
  }

  if (comprado) {
    return (
      <div className="flex flex-col items-start gap-4 p-6 sm:p-8" role="status">
        <span className="flex size-10 items-center justify-center bg-primary text-primary-foreground">
          <CheckQueSeDibuja />
        </span>
        <p className="font-heading text-3xl leading-tight">¡Listo! O casi.</p>
        <p className="text-sm text-pretty text-muted-foreground">
          Has elegido {entradas} {entradas === 1 ? "entrada" : "entradas"} para
          el {etiquetaDia} por {total} €. Esta web es un proyecto académico: no
          se ha realizado ningún cobro y tus entradas son, como el resto de la
          exposición, perfectamente inútiles.
        </p>
        <Button
          variant="outline"
          size="lg"
          className="mt-2 h-11 px-5"
          onClick={() => setComprado(false)}
        >
          Volver a la taquilla
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (entradas > 0) setComprado(true)
      }}
    >
      <div className="border-b p-6 sm:p-8">
        <label
          htmlFor="dia-visita"
          className="font-mono text-[0.6875rem] tracking-[0.15em] text-muted-foreground uppercase"
        >
          Día de la visita
        </label>
        <select
          id="dia-visita"
          value={dia}
          onChange={(e) => setDia(e.target.value)}
          className="mt-2 h-11 w-full rounded-[var(--radius)] border-2 border-foreground bg-background px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {dias.map((d) => (
            <option key={d.valor} value={d.valor}>
              {d.etiqueta} · {expo.hours.time}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="border-b p-6 sm:p-8">
        <legend className="sr-only">Número de entradas</legend>
        <ul className="flex flex-col gap-4">
          {tipos.map((t) => (
            <li key={t.id} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">{t.nombre}</p>
                <p className="font-mono text-sm text-muted-foreground">
                  {t.precio === 0 ? "Gratis" : `${t.precio} €`}
                </p>
              </div>
              <div className="flex items-center overflow-hidden rounded-full border-2 border-foreground">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-lg"
                  onClick={() => cambiar(t.id, -1)}
                  disabled={cantidades[t.id] === 0}
                  aria-label={`Quitar una entrada ${t.nombre}`}
                >
                  <MinusIcon />
                </Button>
                <output
                  aria-live="polite"
                  aria-label={`Entradas ${t.nombre}`}
                  className="w-8 text-center font-mono tabular-nums"
                >
                  {cantidades[t.id]}
                </output>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-lg"
                  onClick={() => cambiar(t.id, 1)}
                  disabled={cantidades[t.id] === MAX}
                  aria-label={`Añadir una entrada ${t.nombre}`}
                >
                  <PlusIcon />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="p-6 sm:p-8">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[0.6875rem] tracking-[0.15em] text-muted-foreground uppercase">
            Total
          </span>
          <span className="font-heading text-5xl leading-none tabular-nums">
            {total} €
          </span>
        </div>
        <p className="mt-2 h-5 text-right text-sm text-primary">
          {ahorro > 0 && `Te ahorras ${ahorro} € respecto a taquilla`}
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={entradas === 0}
          className="mt-6 h-12 w-full text-base"
        >
          {entradas === 0
            ? "Elige al menos una entrada"
            : `Comprar ${entradas} ${entradas === 1 ? "entrada" : "entradas"}`}
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Entradas en el móvil · Cancelación gratuita hasta 24 h antes
        </p>
      </div>
    </form>
  )
}

// El check de la compra se dibuja solo al aparecer
function CheckQueSeDibuja() {
  const ref = useRef<IconoHandle>(null)

  useEffect(() => {
    ref.current?.startAnimation()
  }, [])

  return <CheckIcon ref={ref} size={20} aria-hidden="true" />
}
