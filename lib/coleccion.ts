// Piezas de "The Uncomfortable", de Katerina Kamprani
// (https://www.theuncomfortable.com). Imágenes © Katerina Kamprani.

export type Pieza = {
  slug: string
  nombre: string
  nombreOriginal: string
  tipo: "Render 3D" | "Prototipo"
  descripcion: string
  // Puntuación de 0 a 10. Ninguna pasa de 2.
  utilidad: number
  imagen: string
  // object-position para recortar la foto sin perder el objeto
  encuadre?: string
}

export const autora = {
  nombre: "Katerina Kamprani",
  proyecto: "The Uncomfortable",
  url: "https://www.theuncomfortable.com",
}

export const coleccion: Pieza[] = [
  {
    slug: "escoba",
    nombre: "Escoba",
    nombreOriginal: "The Uncomfortable Broom",
    tipo: "Render 3D",
    descripcion:
      "El cepillo, montado en paralelo al palo. Barre de maravilla el aire.",
    utilidad: 0.5,
    imagen: "/coleccion/escoba-3d.jpg",
  },
  {
    slug: "regadera",
    nombre: "Regadera",
    nombreOriginal: "The Uncomfortable Watering Can",
    tipo: "Render 3D",
    descripcion:
      "La alcachofa apunta hacia la propia regadera. Riega lo único que ya está mojado.",
    utilidad: 0.5,
    imagen: "/coleccion/regadera.jpg",
  },
  {
    slug: "cepillo",
    nombre: "Cepillo de dientes",
    nombreOriginal: "The Uncomfortable Toothbrush",
    tipo: "Render 3D",
    descripcion:
      "Cerdas giradas noventa grados. Llega a todas partes menos a la boca.",
    utilidad: 2,
    imagen: "/coleccion/cepillo.jpg",
  },
  {
    slug: "regla",
    nombre: "Regla",
    nombreOriginal: "The Uncomfortable Ruler",
    tipo: "Render 3D",
    descripcion: "Mide exactamente un centímetro. Ni uno más.",
    utilidad: 1,
    imagen: "/coleccion/regla.jpg",
  },
  {
    slug: "gafas",
    nombre: "Gafas búho",
    nombreOriginal: "Owl Glasses",
    tipo: "Render 3D",
    descripcion:
      "Un puente en forma de uve que se apoya justo donde no hay nariz.",
    utilidad: 0.5,
    imagen: "/coleccion/gafas.jpg",
  },
  {
    slug: "silla",
    nombre: "Silla aro",
    nombreOriginal: "Hoop Chair",
    tipo: "Render 3D",
    descripcion:
      "Reposabrazos en espiral. Sentarse es un ejercicio de contorsionismo; levantarse, de fe.",
    utilidad: 1.5,
    imagen: "/coleccion/silla.jpg",
  },
  {
    slug: "tenedor",
    nombre: "Tenedor con cadena",
    nombreOriginal: "Chain Fork",
    tipo: "Prototipo",
    descripcion:
      "Mango y púas unidos por una cadena. Ideal para no llevarse nada a la boca.",
    utilidad: 0,
    imagen: "/coleccion/tenedor.jpg",
    encuadre: "30% center",
  },
  {
    slug: "juego-te",
    nombre: "Juego de té",
    nombreOriginal: "The Uncomfortable Tea Set",
    tipo: "Prototipo",
    descripcion:
      "Tetera con pico de buzón y taza alargada. Servir sin derramar queda descartado.",
    utilidad: 1,
    imagen: "/coleccion/juego-te.jpg",
  },
  {
    slug: "copas",
    nombre: "Copas de champán",
    nombreOriginal: "The Uncomfortable Champagne Glasses",
    tipo: "Render 3D",
    descripcion:
      "Dos copas, un solo pie. Si uno bebe, el otro acaba con el champán encima.",
    utilidad: 0.5,
    imagen: "/coleccion/copas-3d.jpg",
  },
  {
    slug: "tazas",
    nombre: "Tazas de compromiso",
    nombreOriginal: "Engagement Mugs",
    tipo: "Render 3D",
    descripcion:
      "Dos tazas con las asas entrelazadas. Juntas para siempre; útiles, nunca.",
    utilidad: 1,
    imagen: "/coleccion/tazas-3d.jpg",
  },
  {
    slug: "botas",
    nombre: "Botas de agua",
    nombreOriginal: "The Uncomfortable Rain Boots",
    tipo: "Render 3D",
    descripcion:
      "Impermeables hasta la rodilla. A partir de los dedos de los pies, ya no.",
    utilidad: 1.5,
    imagen: "/coleccion/botas.jpg",
  },
  {
    slug: "llave",
    nombre: "Llave",
    nombreOriginal: "The Uncomfortable Key",
    tipo: "Render 3D",
    descripcion:
      "La cabeza es un disco perpendicular a la hoja. Para girarla hace falta muñeca de contorsionista.",
    utilidad: 1,
    imagen: "/coleccion/llave.jpg",
  },
  {
    slug: "taza",
    nombre: "Taza",
    nombreOriginal: "The Uncomfortable Mug",
    tipo: "Render 3D",
    descripcion:
      "El asa sale recta, como una rama. No hay manera de meter los dedos.",
    utilidad: 1,
    imagen: "/coleccion/taza.jpg",
  },
  {
    slug: "tetera",
    nombre: "Tetera",
    nombreOriginal: "The Uncomfortable Teapot",
    tipo: "Render 3D",
    descripcion:
      "Sirve el té por una ranura de buzón: en horizontal y por toda la mesa.",
    utilidad: 0.5,
    imagen: "/coleccion/tetera.jpg",
  },
  {
    slug: "taza-larga",
    nombre: "Taza larga",
    nombreOriginal: "Long Mug",
    tipo: "Render 3D",
    descripcion:
      "Tan alargada que, para apurar el café del otro extremo, hay que ponerla casi en vertical.",
    utilidad: 1,
    imagen: "/coleccion/taza-larga.jpg",
  },
  {
    slug: "paraguas",
    nombre: "Paraguas de hormigón",
    nombreOriginal: "Concrete Umbrella",
    tipo: "Render 3D",
    descripcion:
      "Protege de la lluvia, del granizo y de la posibilidad de levantarlo.",
    utilidad: 0.5,
    imagen: "/coleccion/paraguas.jpg",
  },
  {
    slug: "copa-vino",
    nombre: "Copa de vino",
    nombreOriginal: "The Uncomfortable Wine Glass",
    tipo: "Render 3D",
    descripcion:
      "La abertura está en un lateral. Brindar sin mancharse es un arte.",
    utilidad: 1,
    imagen: "/coleccion/copa-vino.jpg",
  },
  {
    slug: "remo",
    nombre: "Remo hinchable",
    nombreOriginal: "Inflatable Paddle",
    tipo: "Render 3D",
    descripcion:
      "La pala es un flotador. Flota de maravilla; remar ya es otra cosa.",
    utilidad: 0.5,
    imagen: "/coleccion/remo.jpg",
  },
  {
    slug: "cuchara",
    nombre: "Cuchara zapatilla",
    nombreOriginal: "Slipper Spoon",
    tipo: "Render 3D",
    descripcion:
      "La cazoleta lleva puntera, como una zapatilla. La sopa se queda fuera.",
    utilidad: 0.5,
    imagen: "/coleccion/cuchara.jpg",
  },
  {
    slug: "saleros",
    nombre: "Saleros reloj de arena",
    nombreOriginal: "Hourglass Salt & Pepper Shakers",
    tipo: "Render 3D",
    descripcion:
      "Antes de salir, la sal tiene que cruzar un cuello estrechísimo. Paciencia.",
    utilidad: 1.5,
    imagen: "/coleccion/saleros.jpg",
  },
  {
    slug: "silla-1",
    nombre: "Silla incómoda nº 1",
    nombreOriginal: "Uncomfortable Chair #1",
    tipo: "Render 3D",
    descripcion: "Una silla de aspecto impecable. Hasta que intentas sentarte.",
    utilidad: 1,
    imagen: "/coleccion/silla-1.jpg",
  },
  {
    slug: "silla-2",
    nombre: "Silla incómoda nº 2",
    nombreOriginal: "Uncomfortable Chair #2",
    tipo: "Render 3D",
    descripcion: "Las patas, torcidas hacia un lado. Sentarse es una apuesta.",
    utilidad: 1,
    imagen: "/coleccion/silla-2.jpg",
  },
  {
    slug: "silla-3",
    nombre: "Silla incómoda nº 3",
    nombreOriginal: "Uncomfortable Chair #3",
    tipo: "Render 3D",
    descripcion:
      "El asiento se hunde, como si alguien se hubiera sentado demasiado tiempo.",
    utilidad: 1.5,
    imagen: "/coleccion/silla-3.jpg",
  },
  {
    slug: "puerta",
    nombre: "Puerta triple",
    nombreOriginal: "Triple Door",
    tipo: "Render 3D",
    descripcion:
      "Una puerta partida en hojas, cada una con su manilla. Entrar exige paciencia.",
    utilidad: 1.5,
    imagen: "/coleccion/puerta.jpg",
  },
  {
    slug: "entrada",
    nombre: "La entrada",
    nombreOriginal: "The Uncomfortable Entrance",
    tipo: "Render 3D",
    descripcion: "La puerta está en alto y la escalera sube… justo al lado.",
    utilidad: 0.5,
    imagen: "/coleccion/entrada.jpg",
  },
  {
    slug: "pomo",
    nombre: "Manilla hinchable",
    nombreOriginal: "Inflatable Doorknob",
    tipo: "Render 3D",
    descripcion:
      "Blandita, agradable al tacto y totalmente incapaz de abrir nada.",
    utilidad: 0.5,
    imagen: "/coleccion/pomo.jpg",
  },
  {
    slug: "briki",
    nombre: "Briki",
    nombreOriginal: "The Uncomfortable Briki",
    tipo: "Render 3D",
    descripcion:
      "La cafetera griega de toda la vida, con un mango plano que no hay forma de sujetar.",
    utilidad: 1,
    imagen: "/coleccion/briki.jpg",
  },
  {
    slug: "olla",
    nombre: "Olla",
    nombreOriginal: "The Uncomfortable Pot",
    tipo: "Render 3D",
    descripcion:
      "Las dos asas, en el mismo lado. Llevarla al fuego es un ejercicio de equilibrio.",
    utilidad: 1,
    imagen: "/coleccion/olla.jpg",
  },
  {
    slug: "tenedor-grueso",
    nombre: "Tenedor grueso",
    nombreOriginal: "Thick Fork",
    tipo: "Render 3D",
    descripcion: "Púas tan gruesas que no pinchan. Ni la tortilla.",
    utilidad: 0.5,
    imagen: "/coleccion/tenedor-grueso.jpg",
  },
  {
    slug: "escalera",
    nombre: "Escalera estrecha",
    nombreOriginal: "Slim Staircase",
    tipo: "Render 3D",
    descripcion: "Peldaños de un palmo, pegados a la pared y sin barandilla.",
    utilidad: 0.5,
    imagen: "/coleccion/escalera.jpg",
  },
  {
    slug: "botones",
    nombre: "Botones gruesos",
    nombreOriginal: "Thick Button",
    tipo: "Prototipo",
    descripcion: "Tan gruesos que no hay ojal capaz de tragárselos.",
    utilidad: 1,
    imagen: "/coleccion/botones.jpg",
  },
  {
    slug: "cubiertos",
    nombre: "Juego de cubiertos",
    nombreOriginal: "Cutlery Set",
    tipo: "Prototipo",
    descripcion:
      "Mangos articulados, como la correa de un reloj. Se doblan justo cuando no deben.",
    utilidad: 0.5,
    imagen: "/coleccion/cubiertos.jpg",
  },
  {
    slug: "cubiertos-gruesos",
    nombre: "Cubiertos gruesos",
    nombreOriginal: "Thick Cutlery Set",
    tipo: "Prototipo",
    descripcion: "Mangos tan anchos que no hay mano que los abarque.",
    utilidad: 1.5,
    imagen: "/coleccion/cubiertos-gruesos.jpg",
  },
]

export function numeroPieza(slug: string) {
  const i = coleccion.findIndex((p) => p.slug === slug)
  return String(i + 1).padStart(3, "0")
}

export function formatoUtilidad(n: number) {
  return `${n.toFixed(1).replace(".", ",")} / 10`
}
