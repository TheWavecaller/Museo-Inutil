import { CheckIcon } from "lucide-react"

import { Pegatina } from "@/components/garabatos"
import { Taquilla } from "@/components/taquilla"
import { expo } from "@/lib/expo"
import { cn } from "@/lib/utils"

const tarifas = [
  {
    nombre: "Anticipada",
    precio: expo.tickets.early,
    donde: "Online, hasta el día antes de tu visita",
    ventajas: [
      "Acceso a la Noche inútil (vie 23 oct)",
      "Plaza reservada en charlas y talleres",
      "Sin colas en taquilla",
    ],
    destacada: true,
  },
  {
    nombre: "General",
    precio: expo.tickets.general,
    donde: "En taquilla, el mismo día",
    ventajas: ["Acceso a la exposición", "Actividades según disponibilidad"],
  },
  {
    nombre: "Reducida",
    precio: expo.tickets.reduced,
    donde: "Online o en taquilla, con acreditación",
    ventajas: [
      "Estudiantes, mayores de 65 y personas en paro",
      "Familias numerosas y monoparentales",
    ],
  },
]

// Sección de conversión: fondo acuamarino a sangre para que sea la más
// llamativa de la página. Las entradas son "papel" sobre el mostrador.
export function Entradas() {
  return (
    <section
      id="entradas"
      aria-labelledby="entradas-title"
      className="bg-primary text-primary-foreground [--marker:oklch(0.2_0.012_60/0.35)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="etiqueta">Entradas · {expo.dates.label}</p>
            <h2
              id="entradas-title"
              className="mt-4 font-heading text-5xl leading-none tracking-tight text-balance sm:text-6xl lg:text-7xl"
            >
              La única pieza útil de la exposición es <em>tu entrada</em>.
            </h2>
          </div>
          <p className="self-end text-lg text-pretty opacity-90 lg:col-span-5">
            Cómprala por adelantado: es más barata, te guarda sitio en las
            actividades y te abre la puerta de la Noche inútil. Menores de 12
            años, gratis acompañados de un adulto.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <ul className="flex flex-col gap-4 lg:col-span-7">
            {tarifas.map((t) => (
              <li key={t.nombre}>
                <Ticket {...t} />
              </li>
            ))}
          </ul>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[var(--radius)] border-2 border-foreground bg-card text-card-foreground shadow-[8px_8px_0_0_var(--foreground)] lg:sticky lg:top-32">
              <div className="flex items-center justify-between bg-foreground px-6 py-3 text-background sm:px-8">
                <p className="font-mono text-[0.6875rem] tracking-[0.15em] uppercase">
                  Taquilla online
                </p>
                <p className="font-mono text-[0.6875rem] tracking-[0.15em] uppercase">
                  {expo.venue}
                </p>
              </div>
              <Taquilla />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Entrada de papel: cuerpo con la información y una matriz troquelada
// con el precio. La destacada se imprime en negro.
function Ticket({
  nombre,
  precio,
  donde,
  ventajas,
  destacada,
}: (typeof tarifas)[number]) {
  return (
    <article
      className={cn(
        "relative grid grid-cols-[1fr_auto] rounded-[var(--radius)]",
        destacada
          ? "bg-foreground text-background"
          : "bg-card text-card-foreground"
      )}
    >
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-heading text-3xl leading-none">{nombre}</h3>
          {destacada && (
            <Pegatina className="-rotate-3 text-lg">¡Recomendada!</Pegatina>
          )}
        </div>
        <p
          className={cn(
            "mt-2 text-sm",
            destacada ? "opacity-75" : "text-muted-foreground"
          )}
        >
          {donde}
        </p>
        <ul className="mt-4 flex flex-col gap-1.5 text-sm">
          {ventajas.map((v) => (
            <li key={v} className="flex gap-2">
              <CheckIcon
                aria-hidden="true"
                className={cn(
                  "mt-0.5 size-4 shrink-0",
                  destacada ? "text-[oklch(0.8_0.11_185)]" : "text-primary"
                )}
              />
              {v}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative flex w-28 flex-col items-center justify-center border-l-2 border-dashed border-current/25 px-4 sm:w-36">
        {/* Muescas del troquel, del color del mostrador */}
        <span
          aria-hidden="true"
          className="absolute -top-px -left-[0.6875rem] h-2.5 w-5 rounded-b-full bg-primary"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-px -left-[0.6875rem] h-2.5 w-5 rounded-t-full bg-primary"
        />
        <p className="font-heading text-5xl leading-none sm:text-6xl">
          {precio}
          <span className="text-2xl sm:text-3xl"> €</span>
        </p>
        <p
          className={cn(
            "mt-2 font-mono text-[0.625rem] tracking-[0.15em] uppercase",
            destacada ? "opacity-70" : "text-muted-foreground"
          )}
        >
          Por persona
        </p>
      </div>
    </article>
  )
}
