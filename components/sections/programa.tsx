import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { EnlaceAnimado } from "@/components/animado"
import { ArrowRightIcon } from "@/components/icons/arrow-right"

type Actividad = {
  dia: string
  diaSemana: string
  hora: string
  titulo: string
  texto: string
  etiqueta: string
}

type Semana = {
  numero: number
  fechas: string
  tema: string
  actividades: Actividad[]
  final?: boolean
}

const semanas: Semana[] = [
  {
    numero: 1,
    fechas: "5 — 11 oct",
    tema: "Inauguración",
    actividades: [
      {
        dia: "5",
        diaSemana: "Lun",
        hora: "19:00",
        titulo: "Apertura oficial",
        texto: "Corte de cinta con unas tijeras de la casa. Puede tardar.",
        etiqueta: "Entrada libre",
      },
      {
        dia: "10",
        diaSemana: "Sáb",
        hora: "11:00",
        titulo: "Visita guiada por el colectivo",
        texto:
          "Los comisarios explican cada pieza con una seriedad absolutamente injustificada.",
        etiqueta: "Plazas limitadas",
      },
    ],
  },
  {
    numero: 2,
    fechas: "12 — 18 oct",
    tema: "Manos a la obra",
    actividades: [
      {
        dia: "15",
        diaSemana: "Jue",
        hora: "19:00",
        titulo: "Charla: ¿por qué funcionan las cosas?",
        texto:
          "Ergonomía, affordances y el día en que alguien decidió que las tazas tienen asa.",
        etiqueta: "Plazas limitadas",
      },
      {
        dia: "17",
        diaSemana: "Sáb",
        hora: "11:00",
        titulo: "Taller familiar: rediseña tu cuchara",
        texto:
          "Para peques de 6 a 12 años y adultos con poco sentido práctico.",
        etiqueta: "Familias",
      },
    ],
  },
  {
    numero: 3,
    fechas: "19 — 25 oct",
    tema: "De noche",
    actividades: [
      {
        dia: "22",
        diaSemana: "Jue",
        hora: "19:00",
        titulo: "Mesa redonda: fracasar con estilo",
        texto:
          "Diseñadores del colectivo comparten los proyectos que nunca debieron salir del cajón.",
        etiqueta: "Plazas limitadas",
      },
      {
        dia: "23",
        diaSemana: "Vie",
        hora: "20:30",
        titulo: "Noche inútil",
        texto:
          "Visita nocturna con linternas que alumbran hacia atrás. Música en directo, igual de innecesaria.",
        etiqueta: "Solo anticipada",
      },
    ],
  },
  {
    numero: 4,
    fechas: "26 oct — 1 nov",
    tema: "Gran final",
    final: true,
    actividades: [
      {
        dia: "26",
        diaSemana: "Lun",
        hora: "Toda la semana",
        titulo: "El muro del desastre",
        texto:
          "Los mejores inventos del Taller del desastre pasan a formar parte de la exposición.",
        etiqueta: "Incluido",
      },
      {
        dia: "1",
        diaSemana: "Dom",
        hora: "18:00",
        titulo: "Clausura y Premios Para Nada",
        texto:
          "Entregamos un trofeo, cuidadosamente diseñado para no poder sostenerse en pie.",
        etiqueta: "Plazas limitadas",
      },
    ],
  },
]

export function Programa() {
  return (
    <section
      id="programa"
      aria-labelledby="programa-title"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="etiqueta">Programa · 4 semanas</p>
          <h2
            id="programa-title"
            className="mt-4 font-heading text-5xl leading-none tracking-tight text-balance sm:text-6xl"
          >
            Cuatro semanas, <em className="text-primary">ninguna igual</em> de
            inútil.
          </h2>
        </div>
        <p className="self-end text-pretty text-muted-foreground lg:col-span-5">
          Charlas, talleres, una visita nocturna y una clausura con premios.
          Todas las actividades están incluidas con tu entrada, pero las plazas
          son limitadas: se reservan al comprarla.
        </p>
      </div>

      <ol className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius)] border-2 border-foreground bg-border md:grid-cols-2 lg:grid-cols-4">
        {semanas.map((semana) => (
          <li
            key={semana.numero}
            className={cn(
              "flex flex-col bg-card",
              semana.final && "bg-primary text-primary-foreground"
            )}
          >
            <header className="border-b border-current/15 p-6">
              <p
                className={cn(
                  "flex justify-between font-mono text-[0.6875rem] tracking-[0.15em] uppercase",
                  semana.final ? "opacity-80" : "text-muted-foreground"
                )}
              >
                <span>Semana {semana.numero}</span>
                <span>{semana.fechas}</span>
              </p>
              <h3 className="mt-3 font-heading text-3xl leading-tight">
                {semana.tema}
              </h3>
            </header>

            <ul className="flex flex-1 flex-col">
              {semana.actividades.map((a) => (
                <li
                  key={a.titulo}
                  className="flex gap-4 border-b border-current/15 p-6 last:border-b-0"
                >
                  <div className="w-10 shrink-0 text-center">
                    <p className="font-heading text-4xl leading-none">
                      {a.dia}
                    </p>
                    <p
                      className={cn(
                        "mt-1 font-mono text-[0.625rem] tracking-[0.15em] uppercase",
                        semana.final ? "opacity-80" : "text-muted-foreground"
                      )}
                    >
                      {a.diaSemana}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "font-mono text-[0.6875rem] tracking-[0.1em]",
                        semana.final ? "opacity-80" : "text-primary"
                      )}
                    >
                      {a.hora}
                    </p>
                    <h4 className="mt-1 leading-snug font-medium">
                      {a.titulo}
                    </h4>
                    <p
                      className={cn(
                        "mt-1 text-sm text-pretty",
                        semana.final ? "opacity-90" : "text-muted-foreground"
                      )}
                    >
                      {a.texto}
                    </p>
                    <p className="mt-3 inline-block rounded-full border border-current/40 px-2.5 py-0.5 font-mono text-[0.625rem] tracking-[0.15em] uppercase">
                      {a.etiqueta}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          La Noche inútil es exclusiva para quienes compran la entrada
          anticipada.
        </p>
        <EnlaceAnimado
          href="#entradas"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-12 shrink-0 px-6 text-base"
          )}
          icono={ArrowRightIcon}
        >
          Ver entradas
        </EnlaceAnimado>
      </div>
    </section>
  )
}
