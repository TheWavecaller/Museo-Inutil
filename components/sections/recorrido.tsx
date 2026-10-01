import { ArrowRightIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { autora, coleccion } from "@/lib/coleccion"
import { expo } from "@/lib/expo"
import { cn } from "@/lib/utils"

const paradas = [
  {
    minuto: "0′",
    lugar: "Entrada",
    titulo: "La consigna",
    texto:
      "Deja el abrigo, el paraguas y las expectativas. Te damos un plano de la exposición que, fiel al espíritu de la casa, está impreso del revés.",
    etiqueta: "Bienvenida",
  },
  {
    minuto: "5′",
    lugar: "Sala 01",
    titulo: "Lo incómodo",
    texto: `Las ${coleccion.length} piezas de ${autora.nombre} en vitrina, con su ficha técnica y su nota de utilidad. Prohibido usarlas. Tampoco podrías.`,
    etiqueta: "Visita libre",
  },
  {
    minuto: "20′",
    lugar: "Sala 02",
    titulo: "Prohibido no tocar",
    texto:
      "Réplicas a tamaño real para comprobarlo en persona: brinda con la copa doble, barre con la escoba, intenta medir algo con la regla de un centímetro.",
    etiqueta: "Interactiva",
  },
  {
    minuto: "35′",
    lugar: "Sala 03",
    titulo: "El taller del desastre",
    texto:
      "Elige un objeto cotidiano, cámbiale un solo detalle y cuelga tu invento en el muro de la exposición. Los peores (es decir, los mejores) se exponen la última semana.",
    etiqueta: "Participativa",
  },
]

export function Recorrido() {
  return (
    <section
      id="recorrido"
      aria-labelledby="recorrido-title"
      className="border-y bg-muted/50"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
              El recorrido · 45 minutos
            </p>
            <h2
              id="recorrido-title"
              className="mt-4 font-heading text-5xl leading-none tracking-tight text-balance sm:text-6xl"
            >
              Cuarenta y cinco minutos sin hacer{" "}
              <em className="text-primary">nada útil</em>.
            </h2>
          </div>
          <p className="self-end text-pretty text-muted-foreground lg:col-span-5">
            Tres salas y una consigna. Primero miras, luego tocas y al final
            fabricas tu propio desastre. Puedes ir a tu ritmo: nadie te va a
            pedir que saques nada en claro.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-10 border-l pl-8 lg:mt-20 lg:grid-cols-4 lg:gap-0 lg:border-t lg:border-l-0 lg:pl-0">
          {paradas.map((parada, i) => (
            <li key={parada.titulo} className="relative lg:pt-10 lg:pr-8">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-1 -left-[2.3125rem] size-3 border-2 border-foreground bg-background lg:top-[-0.4375rem] lg:left-0",
                  i === paradas.length - 1 && "bg-primary"
                )}
              />
              <div className="flex items-baseline gap-3 font-mono text-[0.6875rem] tracking-[0.15em] text-muted-foreground uppercase">
                <span className="text-primary">{parada.minuto}</span>
                <span>{parada.lugar}</span>
              </div>
              <h3 className="mt-3 font-heading text-3xl leading-tight">
                {parada.titulo}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
                {parada.texto}
              </p>
              <p className="mt-5 inline-block border px-2 py-1 font-mono text-[0.625rem] tracking-[0.15em] uppercase">
                {parada.etiqueta}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm text-pretty text-muted-foreground">
            <span className="text-foreground">Salida por la tienda</span>, como
            en todos los museos. Aquí, al menos, avisamos: nada de lo que
            vendemos sirve. Recorrido accesible y apto para todos los públicos.
          </p>
          <a
            href="#entradas"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 shrink-0 px-6 text-base"
            )}
          >
            Reservar mi visita · {expo.tickets.early} €
            <ArrowRightIcon data-icon="inline-end" />
          </a>
        </div>
      </div>
    </section>
  )
}
