import Image from "next/image"

import { Nota } from "@/components/garabatos"
import { expo } from "@/lib/expo"

const principios = [
  {
    numero: "I",
    titulo: "Diseño",
    texto:
      "Cada pieza cambia un único detalle de un objeto que usas a diario. Ese detalle es la lección: de repente ves todo el diseño que nunca habías notado.",
  },
  {
    numero: "II",
    titulo: "Humor",
    texto:
      "Te vas a reír, y no es un efecto secundario: es el método. La sorpresa es la forma más rápida de que algo se quede en la memoria.",
  },
  {
    numero: "III",
    titulo: "Cultura tecnológica",
    texto: `En un museo de la ciencia, ver fallar la tecnología más sencilla es la manera más honesta de entenderla. Una regadera también es ingeniería.`,
  },
]

// La paleta oscura (.dark) se aplica solo a esta sección:
// la sala con las luces apagadas.
export function Manifiesto() {
  return (
    <section
      id="manifiesto"
      aria-labelledby="manifiesto-title"
      className="dark bg-background text-foreground"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="etiqueta">Texto de sala · Por qué esta exposición</p>

            <h2
              id="manifiesto-title"
              className="mt-8 font-heading text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl xl:text-6xl"
            >
              Solo te das cuenta de lo bien diseñada que está una taza cuando
              alguien <em className="text-primary">le cambia el asa</em>.
            </h2>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
              Esta no es una exposición sobre objetos que no funcionan. Es una
              exposición sobre todo lo que hace que el resto sí funcione.
              Durante cuatro semanas, {expo.venue} cede una sala a lo inútil
              para que salgas mirando tu cocina con otros ojos.
            </p>
          </div>

          <figure className="lg:col-span-5">
            <Nota flecha="abajo" className="mb-1 ml-6 rotate-2">
              aquí es (el de cristal)
            </Nota>
            <div className="relative aspect-[6/7] overflow-hidden rounded-[var(--radius)] border-2 border-foreground">
              <Image
                src="/multimedia/cosmocaixa.webp"
                alt={`Vista aérea del edificio de ${expo.venue} y su plaza, en ${expo.city}`}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t pt-3 font-label text-xs text-muted-foreground uppercase">
              <span className="shrink-0">Fig. 1 · La sede</span>
              <span className="text-right">
                {expo.venue}, Museo de la Ciencia · {expo.city}
              </span>
            </figcaption>
          </figure>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius)] border-2 border-foreground bg-border md:grid-cols-3 lg:mt-24">
          {principios.map((p) => (
            <li
              key={p.numero}
              className="flex flex-col bg-background p-6 sm:p-8"
            >
              <span
                aria-hidden="true"
                className="font-hand text-7xl leading-none font-bold text-primary"
              >
                {p.numero}
              </span>
              <h3 className="mt-8 font-label text-xs uppercase">{p.titulo}</h3>
              <p className="mt-3 text-pretty text-muted-foreground">
                {p.texto}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
