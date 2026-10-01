"use client"

import { useEffect, useState } from "react"

import { useIconoAnimado } from "@/components/animado"
import { MenuIcon } from "@/components/icons/menu"
import { Logo } from "@/components/logo"
import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { expo, nav } from "@/lib/expo"
import { cn } from "@/lib/utils"

// Devuelve el id de la sección que cruza la franja central de la pantalla
function useSeccionActiva(ids: string[]) {
  const [activa, setActiva] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiva(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  return activa
}

const ids = [...nav.map((item) => item.href.slice(1)), "entradas"]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const activa = useSeccionActiva(ids)
  const [iconoMenu, disparadoresMenu] = useIconoAnimado()

  return (
    <header className="sticky top-0 z-40">
      <div className="border-b-2 border-foreground bg-pop text-pop-foreground">
        <p className="mx-auto flex max-w-7xl items-baseline justify-center gap-x-2 px-4 py-1.5 text-sm font-semibold sm:px-6">
          <span>
            {expo.dates.label} · {expo.venue} {expo.city}
          </span>
          <span className="hidden sm:inline">
            · Anticipada {expo.tickets.early} €
          </span>
          <span className="hidden font-hand text-lg leading-none font-bold md:inline">
            (y nada de esto sirve)
          </span>
        </p>
      </div>

      <div className="border-b-2 border-foreground bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:h-20 sm:px-6">
          <a href="#" aria-label={`${expo.name}, inicio`}>
            <Logo />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 rounded-full border-2 border-foreground bg-card p-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={
                      activa === item.href.slice(1) ? "location" : undefined
                    }
                    className="block rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground aria-[current]:bg-foreground aria-[current]:text-background xl:px-4"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#entradas"
              className={cn(
                buttonVariants({ size: "lg" }),
                "hidden px-4 sm:inline-flex",
                activa === "entradas" && "bg-pop text-pop-foreground"
              )}
            >
              Comprar entradas
            </a>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon-lg" }),
                  "size-11 lg:hidden"
                )}
                aria-label="Abrir menú"
                {...disparadoresMenu}
              >
                <MenuIcon ref={iconoMenu} size={20} aria-hidden="true" />
              </SheetTrigger>
              <SheetContent side="right" className="gap-0">
                <SheetHeader className="border-b-2 border-foreground bg-pop p-6 text-pop-foreground">
                  <SheetTitle className="font-heading text-3xl text-pop-foreground">
                    Menú
                  </SheetTitle>
                  <SheetDescription className="text-pop-foreground/80">
                    {expo.dates.label} · {expo.venue}
                  </SheetDescription>
                </SheetHeader>
                <nav aria-label="Móvil" className="p-6">
                  <ul className="flex flex-col">
                    {nav.map((item, i) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={
                            activa === item.href.slice(1)
                              ? "location"
                              : undefined
                          }
                          className="flex items-baseline gap-4 border-b py-4 font-heading text-3xl transition-transform hover:translate-x-1 aria-[current]:text-primary"
                        >
                          <span className="font-mono text-xs text-muted-foreground">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-auto p-6">
                  <a
                    href="#entradas"
                    onClick={() => setOpen(false)}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "h-12 w-full text-base"
                    )}
                  >
                    Comprar entradas · desde {expo.tickets.early} €
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
