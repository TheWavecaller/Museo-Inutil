import Image from "next/image"

import { Revelar } from "@/components/revelar"
import { Pegatina } from "@/components/garabatos"
import { buttonVariants } from "@/components/ui/button"
import { coleccion, numeroPieza } from "@/lib/coleccion"
import { enLetras, expo } from "@/lib/expo"
import { cn } from "@/lib/utils"
import { EnlaceAnimado } from "@/components/animado"
import { ArrowRightIcon } from "@/components/icons/arrow-right"

// Cierre de la página: misma sala a oscuras que el Manifiesto, para que
// ambos funcionen como apertura y cierre.
export function CtaFinal() {
  return (
    <section
      aria-labelledby="cta-title"
      className="dark overflow-hidden bg-background text-foreground"
    >
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-14 text-center sm:px-6 lg:pt-32 lg:pb-20">
        <Revelar>
          <p className="mx-auto etiqueta">
            Últimas semanas desde el primer día
          </p>
          <Pegatina className="mt-6 rotate-3 text-2xl">¡Corre! (o no)</Pegatina>
          <h2
            id="cta-title"
            className="mx-auto mt-6 max-w-5xl font-heading text-5xl leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-8xl"
          >
            Cuatro semanas. {enLetras(expo.objectCount, { mayuscula: true })}{" "}
            objetos. <em className="text-primary">Cero utilidad.</em>
          </h2>
        </Revelar>
        <p className="mx-auto mt-8 max-w-xl text-lg text-pretty text-muted-foreground">
          Del {expo.dates.label} en {expo.venue} {expo.city}. Cuando cierre,
          estas piezas volverán a su sitio, que tampoco es muy útil.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <EnlaceAnimado
            href="#entradas"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-14 px-8 text-base sm:text-lg"
            )}
            icono={ArrowRightIcon}
          >
            Comprar entrada anticipada · {expo.tickets.early} €
          </EnlaceAnimado>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          En taquilla, {expo.tickets.general} €. Ya lo sabías, pero por si
          acaso.
        </p>
      </div>

      {/* Cinta de piezas: decorativa, se repite dos veces para el bucle */}
      <div
        aria-hidden="true"
        className="border-y [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <ul className="flex w-max animate-marquee motion-reduce:animate-none">
          {[...coleccion, ...coleccion].map((p, i) => (
            <li
              key={`${p.slug}-${i}`}
              className="relative w-40 shrink-0 border-r bg-background sm:w-52"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={p.imagen}
                  alt=""
                  fill
                  sizes="13rem"
                  loading="eager"
                  className="object-cover opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                  style={{ objectPosition: p.encuadre }}
                />
              </div>
              <p className="flex justify-between gap-3 px-3 py-2 font-label text-[0.6875rem] text-muted-foreground uppercase">
                <span className="shrink-0">Nº {numeroPieza(p.slug)}</span>
                <span className="min-w-0 truncate">{p.nombre}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
