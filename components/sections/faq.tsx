import { buttonVariants } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { autora } from "@/lib/coleccion"
import { expo } from "@/lib/expo"
import { EnlaceAnimado } from "@/components/animado"
import { ArrowRightIcon } from "@/components/icons/arrow-right"
import { cn } from "@/lib/utils"

const preguntas = [
  {
    pregunta: "¿Hasta cuándo puedo comprar la entrada anticipada?",
    respuesta: `Online, hasta el día antes de tu visita. A partir de ese momento solo queda la entrada general en taquilla, a ${expo.tickets.general} € en lugar de ${expo.tickets.early} €.`,
  },
  {
    pregunta: "¿Puedo cambiar la fecha o cancelar mi entrada?",
    respuesta:
      "Sí, gratis hasta 24 horas antes del día elegido. Pasado ese plazo la entrada no se reembolsa, lo cual tiene bastante sentido para una exposición sobre cosas que no sirven.",
  },
  {
    pregunta: "¿Cómo accedo a la Noche inútil?",
    respuesta:
      "Es exclusiva para quienes compran la entrada anticipada. Tras la compra recibirás un correo para reservar plaza en la visita nocturna del viernes 23 de octubre. Las plazas son limitadas y se asignan por orden de reserva.",
  },
  {
    pregunta: "¿Se pueden tocar los objetos?",
    respuesta:
      "Los originales de la Sala 01, no: están en vitrina. Pero en la Sala 02, «Prohibido no tocar», hay réplicas a tamaño real para que compruebes en persona lo incómodas que son.",
  },
  {
    pregunta: "¿Es una exposición para ir con niños?",
    respuesta:
      "Sí, y suelen ser quienes más se ríen. Los menores de 12 años entran gratis acompañados de un adulto, y el sábado 17 de octubre hay un taller familiar para rediseñar cucharas.",
  },
  {
    pregunta: "¿La entrada incluye el resto de CosmoCaixa?",
    respuesta:
      "No, la entrada da acceso a la exposición temporal y a sus actividades. Si quieres visitar también el resto del museo, tendrás que comprar su entrada por separado.",
  },
  {
    pregunta: "¿Se pueden hacer fotos?",
    respuesta:
      "Sí, sin flash y sin trípode. Y si las subes a redes, avísanos: nos encanta ver una escoba que no barre en el feed de alguien.",
  },
  {
    pregunta: "¿Se pueden comprar los objetos?",
    respuesta: `No. Son obras de ${autora.nombre} y forman parte de su proyecto ${autora.proyecto}. Y, aunque pudieras, no te servirían de nada. En la tienda sí hay postales, que al menos sirven para escribir.`,
  },
]

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-t bg-muted/50"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="etiqueta">Preguntas frecuentes</p>
            <h2
              id="faq-title"
              className="mt-4 font-heading text-5xl leading-none tracking-tight text-balance sm:text-6xl"
            >
              Dudas <em className="text-primary">razonables</em>.
            </h2>
            <p className="mt-6 text-pretty text-muted-foreground">
              Sobre una exposición que no lo es. Si la tuya no está aquí,
              pregunta en el mostrador de información de {expo.venue}.
            </p>
            <EnlaceAnimado
              href="#entradas"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 h-12 px-6 text-base"
              )}
              icono={ArrowRightIcon}
            >
              Comprar entrada · {expo.tickets.early} €
            </EnlaceAnimado>
          </div>
        </div>

        <Accordion defaultValue={[0]} className="border-t lg:col-span-8">
          {preguntas.map((p, i) => (
            <AccordionItem key={p.pregunta} value={i} className="border-b">
              <AccordionTrigger className="items-center gap-6 rounded-none py-6 text-left font-heading text-2xl font-normal hover:no-underline sm:text-3xl [&_[data-slot=accordion-trigger-icon]]:size-5">
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {p.pregunta}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pl-9 text-base leading-relaxed text-pretty text-muted-foreground">
                <p className="max-w-2xl">{p.respuesta}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
