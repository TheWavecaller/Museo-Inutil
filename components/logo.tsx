import { cn } from "@/lib/utils"

// El símbolo del conjunto vacío (∅) dentro de una vitrina:
// la utilidad de cada pieza de la colección.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-8", className)}
    >
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="16"
        cy="16"
        r="7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <line
        x1="9"
        y1="23"
        x2="23"
        y2="9"
        stroke="var(--primary)"
        strokeWidth="1.75"
      />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-xl tracking-tight">
          Museo de Objetos Inútiles
        </span>
        <span className="mt-1 font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
          Exposición temporal
        </span>
      </span>
    </span>
  )
}
