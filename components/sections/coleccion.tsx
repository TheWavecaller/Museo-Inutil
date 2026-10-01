import { ColeccionGrid } from "@/components/coleccion-grid"
import { autora } from "@/lib/coleccion"
import { enLetras, expo } from "@/lib/expo"

export function Coleccion() {
  return (
    <section
      id="coleccion"
      aria-labelledby="coleccion-title"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Sala 01 · La colección
          </p>
          <h2
            id="coleccion-title"
            className="mt-4 font-heading text-5xl leading-none tracking-tight text-balance sm:text-6xl"
          >
            {enLetras(expo.objectCount, { mayuscula: true })} objetos diseñados
            para <em className="text-primary">fallar</em>.
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-4 text-pretty text-muted-foreground lg:col-span-5">
          <p>
            La arquitecta {autora.nombre} lleva años tomando objetos de uso
            diario y cambiándoles un solo detalle, el justo para que dejen de
            funcionar. El resultado es <em>{autora.proyecto}</em>: una colección
            que hace reír y, de paso, enseña cuánto diseño invisible hay en una
            simple taza.
          </p>
          <p className="text-sm">
            Obras e imágenes ©{" "}
            <a
              href={autora.url}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              {autora.nombre} · {autora.proyecto}
            </a>
            .
          </p>
        </div>
      </div>

      <ColeccionGrid />
    </section>
  )
}
