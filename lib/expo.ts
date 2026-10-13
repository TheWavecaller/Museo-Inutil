// Datos únicos de la exposición: cualquier sección que muestre fechas,
// horarios o precios debe leerlos de aquí.

import { coleccion } from "@/lib/coleccion"

export const expo = {
  name: "Museo de Objetos Inútiles",
  claim: "Una colección que no sirve para nada.",
  venue: "CosmoCaixa",
  city: "Barcelona",
  address: "C/ d'Isaac Newton, 26 · 08022 Barcelona",
  dates: {
    start: "2026-10-05",
    end: "2026-11-01",
    label: "5 oct — 1 nov 2026",
  },
  hours: {
    days: "Todos los días",
    time: "10:00 — 20:00",
  },
  objectCount: coleccion.length,
  tickets: {
    early: 9,
    general: 12,
    reduced: 7,
  },
} as const

// En los titulares las cifras se escriben en letra ("Treinta y tres
// objetos"): se leen mejor y suenan menos a ficha técnica.
const UNIDADES = [
  "cero",
  "uno",
  "dos",
  "tres",
  "cuatro",
  "cinco",
  "seis",
  "siete",
  "ocho",
  "nueve",
  "diez",
  "once",
  "doce",
  "trece",
  "catorce",
  "quince",
  "dieciséis",
  "diecisiete",
  "dieciocho",
  "diecinueve",
  "veinte",
  "veintiuno",
  "veintidós",
  "veintitrés",
  "veinticuatro",
  "veinticinco",
  "veintiséis",
  "veintisiete",
  "veintiocho",
  "veintinueve",
]
const DECENAS = [
  "",
  "",
  "",
  "treinta",
  "cuarenta",
  "cincuenta",
  "sesenta",
  "setenta",
  "ochenta",
  "noventa",
]

export function enLetras(n: number, { mayuscula = false } = {}) {
  let texto = String(n)
  if (n >= 0 && n < 30) texto = UNIDADES[n]
  else if (n >= 30 && n < 100) {
    const [d, u] = [Math.floor(n / 10), n % 10]
    texto = u === 0 ? DECENAS[d] : `${DECENAS[d]} y ${UNIDADES[u]}`
  }
  return mayuscula ? texto[0].toUpperCase() + texto.slice(1) : texto
}

const DIAS_SEMANA = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const MESES = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
]

// Todos los días de apertura. Se formatean a mano (en UTC) para que el
// texto sea idéntico en servidor y navegador.
export function diasDeApertura() {
  const dias: { valor: string; etiqueta: string }[] = []
  const fin = new Date(`${expo.dates.end}T00:00:00Z`)
  for (
    let d = new Date(`${expo.dates.start}T00:00:00Z`);
    d <= fin;
    d.setUTCDate(d.getUTCDate() + 1)
  ) {
    dias.push({
      valor: d.toISOString().slice(0, 10),
      etiqueta: `${DIAS_SEMANA[d.getUTCDay()]} ${d.getUTCDate()} ${MESES[d.getUTCMonth()]}`,
    })
  }
  return dias
}

export const nav = [
  { label: "La exposición", href: "#manifiesto" },
  { label: "Colección", href: "#coleccion" },
  { label: "Recorrido", href: "#recorrido" },
  { label: "Programa", href: "#programa" },
  { label: "Visita", href: "#visita" },
  { label: "FAQ", href: "#faq" },
] as const
