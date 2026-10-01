import { Coleccion } from "@/components/sections/coleccion"
import { CtaFinal } from "@/components/sections/cta-final"
import { Entradas } from "@/components/sections/entradas"
import { Faq } from "@/components/sections/faq"
import { Hero } from "@/components/sections/hero"
import { Manifiesto } from "@/components/sections/manifiesto"
import { Programa } from "@/components/sections/programa"
import { Recorrido } from "@/components/sections/recorrido"
import { Visita } from "@/components/sections/visita"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Manifiesto />
        <Coleccion />
        <Recorrido />
        <Programa />
        <Entradas />
        <Visita />
        <Faq />
        <CtaFinal />
      </main>
      <SiteFooter />
    </>
  )
}
