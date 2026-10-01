"use client"

import { Effect } from "@/components/animate-ui/primitives/effects/effect"
import { cn } from "@/lib/utils"

// Pegatina amarilla, ligeramente torcida, como pegada a mano. Al entrar en
// pantalla "se pega" con un pequeño rebote.
export function Pegatina({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Effect
      asChild
      inView
      zoom={{ initialScale: 0.4 }}
      fade
      delay={250}
      transition={{ type: "spring", stiffness: 380, damping: 13 }}
    >
      <span
        className={cn(
          "inline-block -rotate-6 rounded-full border-2 border-foreground bg-pop px-3 py-1 font-hand text-xl leading-none font-bold whitespace-nowrap text-pop-foreground shadow-[2px_2px_0_0_var(--foreground)]",
          className
        )}
      >
        {children}
      </span>
    </Effect>
  )
}

// Anotación manuscrita del comisario, con una flecha dibujada a mano
export function Nota({
  children,
  flecha = "arriba",
  className,
}: {
  children: React.ReactNode
  flecha?: "arriba" | "abajo" | "izquierda"
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-hand text-2xl leading-none font-medium text-primary",
        flecha === "abajo" && "flex-col-reverse items-start",
        flecha === "arriba" && "flex-col items-start",
        className
      )}
    >
      <Flecha
        className={cn(
          "w-10 shrink-0",
          flecha === "abajo" && "-scale-x-100 rotate-180",
          flecha === "izquierda" && "-rotate-90"
        )}
      />
      <span>{children}</span>
    </span>
  )
}

function Flecha({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 30 C 6 20, 10 10, 20 4" />
      <path d="M12 4 L 20 4 L 18 12" />
    </svg>
  )
}
