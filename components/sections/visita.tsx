import {
  BusFrontIcon,
  CarIcon,
  TrainFrontIcon,
  type LucideIcon,
} from "lucide-react"

import { Revelar } from "@/components/revelar"
import { buttonVariants } from "@/components/ui/button"
import { expo } from "@/lib/expo"
import {
  BloqueAnimado,
  EnlaceAnimado,
  type IconoAnimado,
} from "@/components/animado"
import { AccessibilityIcon } from "@/components/icons/accessibility"
import { ClockIcon } from "@/components/icons/clock"
import { MapPinIcon } from "@/components/icons/map-pin"
import { ArrowUpRightIcon } from "@/components/icons/arrow-up-right"
import { cn } from "@/lib/utils"

// Embed de Google Maps sin API key. La búsqueda por nombre coloca el pin
// sobre la ficha del museo (la variante ?output=embed redirige y no carga).
const lugar = `${expo.venue} ${expo.city}`.replaceAll(" ", "+")
const mapaEmbed = `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${lugar}!6i16`
const mapaEnlace = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${expo.venue}, ${expo.address}`)}`

const transporte = [
  {
    icono: TrainFrontIcon,
    medio: "Tren",
    detalle: "FGC L7, estación Av. Tibidabo (10 min a pie)",
  },
  { icono: BusFrontIcon, medio: "Bus", detalle: "Líneas V15 y 196" },
  {
    icono: CarIcon,
    medio: "Coche",
    detalle: "Parking propio del museo, con acceso por la calle Isaac Newton",
  },
]

export function Visita() {
  return (
    <section
      id="visita"
      aria-labelledby="visita-title"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Revelar>
            <p className="etiqueta">
              Visita · {expo.venue} {expo.city}
            </p>
            <h2
              id="visita-title"
              className="mt-4 font-heading text-5xl leading-none tracking-tight text-balance sm:text-6xl"
            >
              Fácil de encontrar.{" "}
              <em className="text-primary">Difícil de explicar.</em>
            </h2>
          </Revelar>
        </div>
        <p className="self-end text-pretty text-muted-foreground lg:col-span-5">
          La exposición ocupa una sala temporal de {expo.venue}, el Museo de la
          Ciencia de {expo.city}. Con tu entrada solo puedes visitar la
          exposición; el resto del museo se paga aparte.
        </p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-8">
        <dl className="flex flex-col border-t lg:col-span-5">
          <Dato icono={MapPinIcon} titulo="Dirección">
            <p>{expo.venue}</p>
            <p className="text-muted-foreground">{expo.address}</p>
          </Dato>

          <Dato icono={ClockIcon} titulo="Horario">
            <p>
              {expo.hours.days}, {expo.hours.time}
            </p>
            <p className="text-muted-foreground">
              Del {expo.dates.label}. Última entrada a las 19:15.
            </p>
          </Dato>

          <Dato icono={TrainFrontIcon} titulo="Cómo llegar">
            <ul className="flex flex-col gap-2">
              {transporte.map(({ icono: Icono, medio, detalle }) => (
                <li key={medio} className="flex gap-3">
                  <Icono
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                  />
                  <span>
                    <span className="sr-only">{medio}: </span>
                    {detalle}
                  </span>
                </li>
              ))}
            </ul>
          </Dato>

          <Dato icono={AccessibilityIcon} titulo="Accesibilidad">
            <p className="text-pretty">
              Recorrido sin escalones y apto para sillas de ruedas. Fichas de
              las piezas en braille y lectura fácil. Se admiten perros guía.
            </p>
          </Dato>
        </dl>

        <figure className="lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] border-2 border-foreground bg-muted shadow-[6px_6px_0_0_var(--foreground)] lg:aspect-auto lg:h-full lg:min-h-[28rem]">
            <iframe
              src={mapaEmbed}
              title={`Mapa de la ubicación de ${expo.venue} en ${expo.city}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0"
            />
          </div>
          <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-4 font-label text-xs text-muted-foreground uppercase">
            <span>Fig. 2 · Cómo llegar</span>
            <EnlaceAnimado
              href={mapaEnlace}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-10 px-4 font-sans text-sm tracking-normal normal-case"
              )}
              icono={ArrowUpRightIcon}
            >
              Abrir en Google Maps
            </EnlaceAnimado>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

function Dato({
  icono,
  titulo,
  children,
}: {
  // Un icono animado (se anima al pasar por la fila) o uno estático de lucide
  icono: IconoAnimado | LucideIcon
  titulo: string
  children: React.ReactNode
}) {
  const clases = "grid grid-cols-[auto_1fr] gap-x-4 border-b py-6"
  const contenido = (
    <div>
      <dt className="font-label text-xs text-muted-foreground uppercase">
        {titulo}
      </dt>
      <dd className="mt-2 flex flex-col gap-0.5">{children}</dd>
    </div>
  )

  // Los iconos de lucide son funciones normales y no pueden pasar a un
  // componente de cliente: se pintan aquí, en el servidor
  if (icono === TrainFrontIcon) {
    const Icono = icono as LucideIcon
    return (
      <div className={clases}>
        <Icono aria-hidden className="mt-0.5 size-5 text-primary" />
        {contenido}
      </div>
    )
  }

  return (
    <BloqueAnimado
      icono={icono as IconoAnimado}
      iconoClassName="mt-0.5 text-primary"
      className={clases}
    >
      {contenido}
    </BloqueAnimado>
  )
}
