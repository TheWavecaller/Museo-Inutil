import { Revelar } from "@/components/revelar"
import { Nota } from "@/components/garabatos"
import { HeroCarousel } from "@/components/hero-carousel"
import { buttonVariants } from "@/components/ui/button"
import { enLetras, expo } from "@/lib/expo"
import { EnlaceAnimado } from "@/components/animado"
import { ArrowDownIcon } from "@/components/icons/arrow-down"
import { ArrowRightIcon } from "@/components/icons/arrow-right"
import { cn } from "@/lib/utils"

const facts = [
  { label: "Fechas", value: expo.dates.label },
  { label: "Horario", value: `${expo.hours.days}, ${expo.hours.time}` },
  {
    label: "Colección",
    value: `${enLetras(expo.objectCount, { mayuscula: true })} objetos inútiles`,
  },
  { label: "Entrada anticipada", value: `${expo.tickets.early} €` },
]

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-24">
        <div className="flex flex-col justify-center lg:col-span-7">
          <Revelar>
            <p className="etiqueta">
              Exposición temporal · {expo.venue} {expo.city}
            </p>

            <h1
              id="hero-title"
              className="mt-6 font-heading text-6xl leading-[0.95] tracking-tight text-balance sm:text-7xl xl:text-8xl"
            >
              Una colección que no sirve{" "}
              <em className="text-primary">para&nbsp;nada.</em>
            </h1>
          </Revelar>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
            Objetos cotidianos rediseñados con un único propósito: que no
            funcionen. Regaderas que se riegan a sí mismas, tenedores
            encadenados y copas con las que no hay forma de brindar. Solo
            durante cuatro semanas. Como casi todo lo que exponemos, no volverá.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <EnlaceAnimado
              href="#entradas"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 px-6 text-base"
              )}
              icono={ArrowRightIcon}
            >
              Comprar entrada anticipada · {expo.tickets.early} €
            </EnlaceAnimado>
            <EnlaceAnimado
              href="#coleccion"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 px-6 text-base"
              )}
              icono={ArrowDownIcon}
            >
              Ver la colección
            </EnlaceAnimado>
          </div>

          <Nota className="mt-4 mb-2 ml-6 -rotate-3">
            lo único que funciona aquí
          </Nota>

          <p className="mt-4 text-sm text-muted-foreground">
            En taquilla costará {expo.tickets.general} €. Lo cual tampoco
            tendría ningún sentido.
          </p>
        </div>

        <div className="lg:col-span-5">
          <HeroCarousel />
        </div>
      </div>

      <div className="border-y-2 border-foreground bg-muted/50">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4">
          {facts.map((fact, i) => (
            <div
              key={fact.label}
              className={cn(
                "py-6 pr-4",
                i % 2 === 1 && "border-l pl-4 lg:pl-6",
                i === 2 && "border-t lg:border-t-0 lg:border-l lg:pl-6",
                i === 3 && "border-t lg:border-t-0"
              )}
            >
              <dt className="font-label text-xs text-muted-foreground uppercase">
                {fact.label}
              </dt>
              <dd className="mt-2 font-heading text-lg leading-snug sm:text-xl">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
