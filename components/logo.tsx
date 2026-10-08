import { cn } from "@/lib/utils"

// Acuamarinos fijos: dentro de la pegatina el fondo siempre es amarillo, así
// que no siguen a --primary (que se aclara en las secciones oscuras).
const AGUA = "oklch(0.52 0.095 195)"
const AGUA_CLARO = "oklch(0.85 0.06 185)"
const REGADERA = "M144 152 C 188 138, 190 52, 152 36 C 134 29, 120 34, 113 44"

// Pegatina amarilla con la Regadera (pieza Nº 002), que se riega a sí misma.
// El borde y la sombra siguen a currentColor; se endereza al pasar el ratón.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className={cn(
        "size-10 shrink-0 -rotate-6 transition-transform duration-300 group-hover/logo:rotate-6",
        className
      )}
    >
      {/* Sombra dura */}
      <rect
        x="22"
        y="22"
        width="166"
        height="166"
        rx="40"
        fill="currentColor"
      />
      <rect
        x="10"
        y="10"
        width="166"
        height="166"
        rx="40"
        fill="var(--pop)"
        stroke="currentColor"
        strokeWidth="11"
      />
      <g
        transform="translate(93 95) scale(.76) translate(-106 -104)"
        fill="none"
        stroke="var(--pop-foreground)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Pitorro: un tubo que da la vuelta hasta su propia boca */}
        <path d={REGADERA} strokeWidth="21" />
        <path d={REGADERA} stroke={AGUA_CLARO} strokeWidth="8" />
        {/* Relleno descolocado, como en una risografía */}
        <path
          d="M56 94 C 54 126, 56 152, 60 172 L 144 174 C 149 150, 150 124, 148 94 Z"
          fill={AGUA_CLARO}
          stroke="none"
          transform="translate(8 6)"
        />
        <path d="M54 94 C 52 126, 54 152, 58 172 L 142 174 C 147 150, 149 124, 148 94" />
        <path
          d="M52 95 C 76 85, 124 85, 150 94 C 124 103, 76 103, 52 95 Z"
          fill={AGUA}
        />
        <path d="M56 110 C 26 108, 26 156, 58 154" />
        {/* Alcachofa y gotas que caen dentro */}
        <ellipse
          cx="104"
          cy="52"
          rx="19"
          ry="10"
          transform="rotate(-32 104 52)"
          fill="#fff"
        />
        <g fill={AGUA_CLARO} strokeWidth="3">
          <path d="M90 66 q-6 10 0 13 q6 -3 0 -13z" />
          <path d="M103 72 q-6 10 0 13 q6 -3 0 -13z" />
          <path d="M116 68 q-6 10 0 13 q6 -3 0 -13z" />
        </g>
        {/* Cara: ojos cerrados de felicidad */}
        <path d="M80 128 q6 -7 12 0 M108 128 q6 -7 12 0" />
        <path d="M90 146 q10 10 20 0" />
      </g>
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
        <span className="font-label text-[0.6875rem] leading-none text-muted-foreground uppercase">
          Museo de
        </span>
        <span
          aria-hidden="true"
          className="mt-0.5 font-heading text-xl leading-none whitespace-nowrap"
        >
          Objetos Inú
          {/* La "t" se ha caído: ni el logo funciona del todo */}
          <span className="mr-[0.1em] -ml-[0.1em] inline-block origin-bottom-left rotate-[22deg] text-primary transition-transform duration-300 group-hover/logo:rotate-0">
            t
          </span>
          iles
        </span>
        <span className="sr-only">Objetos Inútiles</span>
      </span>
    </span>
  )
}
