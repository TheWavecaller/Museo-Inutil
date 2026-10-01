"use client"

import { useEffect, useState } from "react"
import { MenuIcon } from "lucide-react"

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

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-foreground text-background">
        <p className="mx-auto max-w-7xl px-4 py-2 text-center font-mono text-[0.6875rem] tracking-[0.15em] uppercase sm:px-6">
          {expo.dates.label} · {expo.venue} {expo.city}
          <span className="hidden sm:inline">
            {" "}
            · Entrada anticipada {expo.tickets.early} €
          </span>
        </p>
      </div>

      <div className="border-b bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:h-20 sm:px-6">
          <a href="#" aria-label={`${expo.name}, inicio`}>
            <Logo />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={
                      activa === item.href.slice(1) ? "location" : undefined
                    }
                    className="relative text-sm text-muted-foreground transition-colors after:absolute after:inset-x-0 after:-bottom-2 after:h-0.5 after:scale-x-0 after:bg-primary after:transition-transform hover:text-foreground aria-[current]:text-foreground aria-[current]:after:scale-x-100"
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
                activa === "entradas" &&
                  "ring-3 ring-primary/30 ring-offset-2 ring-offset-background"
              )}
            >
              Comprar entradas
            </a>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon-lg" }),
                  "lg:hidden"
                )}
                aria-label="Abrir menú"
              >
                <MenuIcon className="size-5" />
              </SheetTrigger>
              <SheetContent side="right" className="gap-0">
                <SheetHeader className="border-b p-6">
                  <SheetTitle className="font-heading text-2xl font-normal">
                    Menú
                  </SheetTitle>
                  <SheetDescription>
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
                          className="flex items-baseline gap-4 border-b py-4 font-heading text-3xl aria-[current]:text-primary"
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
