"use client"

import { useRef } from "react"

// Interfaz común de los iconos de lucide-animated (components/icons)
export type IconoHandle = {
  startAnimation: () => void
  stopAnimation: () => void
}

export type IconoAnimado = React.ForwardRefExoticComponent<
  {
    size?: number
    className?: string
  } & React.HTMLAttributes<HTMLSpanElement> &
    React.RefAttributes<IconoHandle>
>

// Los iconos animados solo reaccionan cuando el ratón pasa por encima del
// propio icono. Este hook traslada el disparo al elemento que lo contiene
// (todo el botón o enlace) y lo añade también al foco del teclado.
export function useIconoAnimado() {
  const ref = useRef<IconoHandle>(null)

  // Si el icono es estático (lucide normal) la ref no tiene estos métodos
  const iniciar = () => ref.current?.startAnimation?.()
  const parar = () => ref.current?.stopAnimation?.()

  return [
    ref,
    {
      onMouseEnter: iniciar,
      onMouseLeave: parar,
      onFocus: iniciar,
      onBlur: parar,
    },
  ] as const
}

// Enlace con un icono animado al final (o al principio)
export function EnlaceAnimado({
  icono: Icono,
  iconoDelante = false,
  tamano = 16,
  children,
  ...props
}: React.ComponentProps<"a"> & {
  icono: IconoAnimado
  iconoDelante?: boolean
  tamano?: number
}) {
  const [ref, disparadores] = useIconoAnimado()
  const icono = (
    <Icono
      ref={ref}
      size={tamano}
      aria-hidden="true"
      data-icon={iconoDelante ? "inline-start" : "inline-end"}
    />
  )

  return (
    <a {...props} {...disparadores}>
      {iconoDelante && icono}
      {children}
      {!iconoDelante && icono}
    </a>
  )
}

// Bloque cuyo icono se anima al pasar el ratón por todo el bloque
export function BloqueAnimado({
  icono,
  iconoClassName,
  tamano = 20,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  icono: IconoAnimado
  iconoClassName?: string
  tamano?: number
}) {
  const [ref, disparadores] = useIconoAnimado()
  const Icono = icono

  return (
    <div
      {...props}
      onMouseEnter={disparadores.onMouseEnter}
      onMouseLeave={disparadores.onMouseLeave}
    >
      <Icono
        ref={ref}
        size={tamano}
        aria-hidden="true"
        className={iconoClassName}
      />
      {children}
    </div>
  )
}
