import { cn } from "@/lib/utils"

// Pegatina amarilla con el conjunto vacío (∅) trazado a mano: la utilidad
// de cada pieza de la colección. Se endereza al pasar el ratón por el logo.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      aria-hidden="true"
      className={cn(
        "size-10 shrink-0 -rotate-6 transition-transform duration-300 group-hover/logo:rotate-6",
        className
      )}
    >
      {/* Sombra dura */}
      <rect x="5" y="5" width="37" height="37" rx="10" fill="currentColor" />
      <rect
        x="2"
        y="2"
        width="37"
        height="37"
        rx="10"
        fill="var(--pop)"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      {/* Círculo hecho a mano: no cierra del todo */}
      <path
        d="M27.5 12.5 C 23 9.5, 13.5 10.5, 12 18.5 C 10.5 26.5, 17 30.5, 22 29.5 C 28 28.5, 30.5 22, 28.6 16.4"
        fill="none"
        stroke="var(--pop-foreground)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M11 31 L 30.5 9.5"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn("group/logo inline-flex items-center gap-3", className)}
    >
      <LogoMark />
      <span className="flex flex-col">
        <span className="font-mono text-[0.625rem] leading-none tracking-[0.2em] text-muted-foreground uppercase">
          Museo de
        </span>
        <span
          aria-hidden="true"
          className="mt-0.5 font-heading text-xl leading-none whitespace-nowrap"
        >
          Objetos Inú
          {/* La "t" se ha caído: ni el logo funciona del todo */}
          <span className="-ml-[0.1em] mr-[0.1em] inline-block origin-bottom-left rotate-[22deg] text-primary transition-transform duration-300 group-hover/logo:rotate-0">
            t
          </span>
          iles
        </span>
        <span className="sr-only">Objetos Inútiles</span>
      </span>
    </span>
  )
}
