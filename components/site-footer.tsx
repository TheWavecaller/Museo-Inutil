import { ArrowUpIcon } from "lucide-react"

import { Logo } from "@/components/logo"
import { autora } from "@/lib/coleccion"
import { expo, nav } from "@/lib/expo"

export function SiteFooter() {
  return (
    <footer className="dark border-t bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-xs font-heading text-2xl leading-snug text-pretty">
              {expo.claim}
            </p>
          </div>

          <nav aria-label="Pie de página" className="lg:col-span-2">
            <h2 className="font-mono text-[0.6875rem] tracking-[0.15em] text-muted-foreground uppercase">
              Índice
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#entradas"
                  className="text-primary transition-colors hover:text-foreground"
                >
                  Entradas
                </a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-mono text-[0.6875rem] tracking-[0.15em] text-muted-foreground uppercase">
              Visita
            </h2>
            <address className="mt-4 flex flex-col gap-1 text-sm text-muted-foreground not-italic">
              <span className="text-foreground">{expo.venue}</span>
              <span>{expo.address}</span>
              <span className="mt-3 text-foreground">{expo.dates.label}</span>
              <span>
                {expo.hours.days}, {expo.hours.time}
              </span>
            </address>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-mono text-[0.6875rem] tracking-[0.15em] text-muted-foreground uppercase">
              Créditos
            </h2>
            <p className="mt-4 text-sm text-pretty text-muted-foreground">
              Obras e imágenes de la colección ©{" "}
              <a
                href={autora.url}
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline underline-offset-4 hover:text-primary"
              >
                {autora.nombre} · {autora.proyecto}
              </a>
              . Se reproducen con fines educativos.
            </p>
          </div>
        </div>

        <div className="mt-14 border border-dashed p-5 text-sm text-pretty text-muted-foreground sm:p-6">
          <p>
            <span className="font-mono text-[0.6875rem] tracking-[0.15em] text-foreground uppercase">
              Aviso ·{" "}
            </span>
            Proyecto académico sin fines comerciales, realizado como ejercicio
            de diseño y desarrollo de una landing page. La exposición, sus
            fechas, actividades y precios son ficticios. No está afiliado a{" "}
            {expo.venue} ni a la Fundación “la Caixa”, y no se vende ninguna
            entrada real.
          </p>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-4 border-t pt-6 font-mono text-[0.6875rem] tracking-[0.15em] text-muted-foreground uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {expo.name}</p>
          <a
            href="#"
            className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
          >
            Volver arriba
            <ArrowUpIcon className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
