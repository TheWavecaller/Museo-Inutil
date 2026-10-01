# Memoria del proyecto · Museo de Objetos Inútiles

Documento vivo: se actualiza cada vez que se termina una sección o se toma una decisión.
Última actualización: 2026-10-01 (revisión general, optimización y subida a GitHub)

- **Repositorio:** https://github.com/TheWavecaller/Museo-Inutil (rama `main`)
- **Commits** firmados como TheWavecaller, con la identidad configurada solo en este repositorio.

---

## 1. Encargo

Proyecto de clase **"My First Professional Landing Page"**: trabajamos como un pequeño estudio digital para un cliente.

- **Brief:** un colectivo de diseñadores organiza una exposición temporal de inventos y productos absurdos: objetos que resuelven problemas que nunca existieron, fracasos comerciales e inventos históricos inútiles. Mezcla diseño, humor y cultura tecnológica. Tiene que despertar curiosidad durante las 4 semanas que está abierta.
- **Objetivo de conversión:** vender **entradas anticipadas**.
- **Requisitos del enunciado:**
  - **Mínimo 8 secciones + hero** (cumplido: 8 + hero).
  - Diseño responsive.
  - Stack: React + Next + TypeScript + GitHub + Vercel.
  - Es una landing, no una aplicación completa.

---

## 2. Identidad y estilo

### Marca
- **Nombre:** Museo de Objetos Inútiles (el del brief).
- **Claim:** *"Una colección que no sirve para nada."*
- **Concepto:** museo serio, contenido absurdo. La estructura es de museo (fichas, números de pieza, salas, texto de sala), pero el tono visual es **informal, gracioso y moderno**.
- **Tono:** irónico, con frases cortas. Ejemplo: *"En taquilla costará 12 €. Lo cual tampoco tendría ningún sentido."*
- **Logo** (`components/logo.tsx`): **pegatina amarilla** torcida, con borde y sombra dura, y dentro un ∅ trazado a mano con la diagonal acuamarina ("utilidad = nada"). Debajo de "MUSEO DE", en `font-label`, va "Objetos Inútiles" en Bricolage extragruesa con **la "t" volcada en acuamarino** (ni el logo funciona del todo). Al pasar el ratón se endereza todo. El icono de pestaña es `app/icon.svg`, la misma pegatina con los colores en hex.

### Historia del estilo (git)
- **Etiqueta `v1-catalogo`:** primera versión, estética de catálogo con Instrument Serif, Inter y Geist Mono, cursivas acuamarinas y esquinas rectas. **Descartada** por el cliente porque parecía "página IA genérica". Se conserva solo como referencia.
- **`main`:** estilo informal (el actual).

### Estilo actual
- **Fuentes** (`app/layout.tsx`): **solo Bricolage Grotesque** (con los ejes `opsz` y `wdth`) y **Caveat** (`font-hand`) para las anotaciones manuscritas. **No hay monoespaciada**; Space Mono se quitó porque desentonaba.
  - **Titulares** (`.font-heading`): peso 800 e interletraje -0,035em, en CSS sin capa en `globals.css`.
  - **Etiquetas, fichas y cifras:** utilidad **`font-label`**, Bricolage estrecha (`font-stretch: 85%`), seminegrita y con cifras de ancho fijo. Tamaños `text-xs` y `text-[0.6875rem]`, en mayúsculas. **No usar `font-mono`.**
- **Colores** (`app/globals.css`):
  - Fondo papel `oklch(0.975 0.008 85)` y tinta casi negra.
  - Acento **acuamarino** `--primary: oklch(0.52 0.095 195)`. Al principio era rojo; se cambió a petición del cliente.
  - **Amarillo "pop"** `--pop: oklch(0.89 0.17 98)`, el de las botas, para pegatinas, la franja del header y los puntos de las etiquetas.
  - `--marker`: el trazo de rotulador (acuamarino al 38 %).
  - `--radius: 0.625rem`.
- **Palabras destacadas** (`<em>` dentro de `h1` y `h2`): **trazo de rotulador fosforito**, sin cursiva, en CSS sin capa para imponerse a `text-primary`. En Entradas el trazo es oscuro (`[--marker:…]` en la sección).
- **Lenguaje de formas:** bordes de 2 px en `foreground`, esquinas `rounded-[var(--radius)]`, **sombras duras** desplazadas y **píldoras** (`rounded-full`) para botones, etiquetas, menú y selectores.
- **Botones** (`components/ui/button.tsx`, variantes `default` y `outline`): píldora con borde negro y sombra dura; se levanta al pasar el ratón y se hunde al pulsar.
- **Etiquetas de sección:** utilidad **`etiqueta`**, una píldora con borde y punto amarillo. Ocupa solo su texto, en su propia línea; en bloques centrados hay que añadir `mx-auto`.
- **Humor** (`components/garabatos.tsx`): `<Pegatina>` amarilla torcida y `<Nota>` manuscrita con flecha. Con mesura, como mucho una por sección. Las que hay:
  - Pegatinas: "¡No funciona!" (carrusel del hero), "¡Pieza estrella!" (escoba), "¡Recomendada!" (anticipada) y "¡Corre! (o no)" (CTA final).
  - Notas: "lo único que funciona aquí" (botón del hero) y "aquí es (el de cristal)" (foto de la sede).
- **Secciones oscuras:** el Manifiesto, el CTA final y el footer llevan la clase `dark` en su bloque, que aplica la paleta oscura solo ahí.
- **Tema:** **forzado a claro** (`forcedTheme="light"` en `components/theme-provider.tsx`). Se quitó el atajo de la plantilla que cambiaba todo a oscuro con la tecla "d", porque la página no está diseñada en oscuro.

### Movimiento (con mesura)
Todo funciona sobre `motion`. `MotionConfig reducedMotion="user"` (en `theme-provider.tsx`) respeta "reducir movimiento".

- **Iconos animados**, de [lucide-animated](https://lucide-animated.com) (MIT): 15 iconos en `components/icons/`, instalados con `npx shadcn add https://lucide-animated.com/r/<nombre>.json --path components/icons`.
  - **Están modificados** para envolverse en `<span>` en lugar de `<div>`, para que sean HTML válido dentro de botones. Al instalar uno nuevo hay que repetir el cambio.
  - `components/animado.tsx`: `useIconoAnimado()` anima el icono al pasar el ratón o el foco por **todo** el botón. También están `<EnlaceAnimado icono={…}>` para los enlaces-botón y `<BloqueAnimado>` para las filas de la Visita.
  - **Se usan en:** flechas de compra, "Ver la colección", "Abrir en Google Maps", "Volver arriba", controles del carrusel, "Ver más/menos", menú móvil, pin, reloj y accesibilidad de la Visita, y el ✓ de la compra.
  - **Siguen estáticos:** tren, bus y coche (no hay versión animada), los checks de las tarifas, los +/− de la taquilla y los chevrons del FAQ.
  - ⚠️ Un icono normal de `lucide-react` **no se puede pasar como prop** de un componente de servidor a uno de cliente ("Functions cannot be passed directly to Client Components"). Los de `components/icons` sí, porque son `"use client"`.
- **[animate-ui](https://animate-ui.com):** instalados con `npx shadcn add @animate-ui/<nombre>` en `components/animate-ui/` (más `hooks/use-is-in-view.tsx`). Esta carpeta está **excluida de ESLint**, porque es código de terceros que incumple reglas del React Compiler.
  - **`<Revelar>`** (`components/revelar.tsx`): la etiqueta y el titular de cada sección suben 24 px con un fundido al entrar en pantalla, una vez. **Solo en titulares.**
  - **El rotulador se dibuja:** `<Revelar>` marca `data-visto="true"` y el CSS anima el `background-size` de los `<em>`.
  - **Pegatinas:** "se pegan" con un rebote al entrar en pantalla.
  - **`<Cifra>`** (`components/cifra.tsx`, `SlidingNumber`): total, ahorro y cantidades de la taquilla, y contador del carrusel. Es accesible (número en `sr-only`, rodillos con `aria-hidden`). El "0" de "02" se pone a mano.
- **Cinta del CTA final:** animación CSS `marquee` en `globals.css`; se para si el sistema pide reducir movimiento.

---

## 3. Contenido

### Datos de la exposición (inventados y verosímiles)
Están centralizados en **`lib/expo.ts`**: si se cambian ahí, cambian en toda la web.
- **Sede:** CosmoCaixa, Museo de la Ciencia de Barcelona (C/ d'Isaac Newton, 26).
- **Fechas:** del 5 de octubre al 1 de noviembre de 2026 (4 semanas, de lunes a domingo).
- **Horario:** todos los días de 10:00 a 20:00; última entrada a las 19:15 (la visita dura 45 min).
- **Precios:**
  - **Anticipada: 9 €**, solo online y hasta el día antes. Ventaja exclusiva: la Noche inútil (vie 23 oct).
  - **General: 12 €**, solo en taquilla.
  - **Reducida: 7 €**: estudiantes, mayores de 65, personas en paro, familias numerosas y monoparentales.
  - **Menores de 12:** gratis acompañados de un adulto.
  - Cancelación gratuita hasta 24 h antes.
- `diasDeApertura()` genera los 28 días de la taquilla. Formatea a mano en UTC para que servidor y navegador den el mismo texto.
- `enLetras()` escribe las cifras en letra en los titulares ("Treinta y tres objetos").

### La colección
- **33 piezas de _The Uncomfortable_, de Katerina Kamprani** (https://www.theuncomfortable.com), todo su portfolio. La lista se sacó de `portfolio-sitemap.xml`, quitando las que salen dos veces como render 3D y como prototipo.
- Los datos están en `lib/coleccion.ts` y las imágenes en `public/coleccion/`.
- Cada ficha lleva nº, nombre en castellano, nombre original, tipo, descripción y **utilidad de 0 a 10** (siempre por debajo de 2).
- El número depende del orden en el array. La **escoba es la Nº 001** y las botas la Nº 011, a petición del cliente. Las 22 añadidas después van de la 012 a la 033.
- **Imágenes:** se usa el **render 3D cuadrado** siempre que existe. Solo hay foto de prototipo en el tenedor con cadena (`encuadre: "30% center"`), el juego de té, los botones gruesos y los dos juegos de cubiertos. El campo `encuadre` es el `object-position` para recortar fotos que no son cuadradas.
- Las imágenes se recomprimieron con sharp (mozjpeg, calidad 82) y pasaron de 8,8 a 4 MB, sin pérdida visible.
- ⚠️ Si se **sustituye** una imagen, hay que **cambiarle el nombre**: Next.js guarda en caché las imágenes optimizadas por URL. Por eso existen `escoba-3d.jpg`, `copas-3d.jpg` y `tazas-3d.jpg`.
- **Derechos:** su web dice "© All Rights Reserved". Hay crédito con enlace en la Colección y en el footer, las fotos llevan su marca de agua y hay un aviso de uso educativo. Lo ideal sería además **pedirle permiso**.

### Multimedia
- `public/multimedia/cosmocaixa.webp`: vista aérea de la sede, en el Manifiesto ("Fig. 1 · La sede").
- La carpeta es `multimedia`, **en minúsculas**: Vercel distingue mayúsculas y minúsculas.

---

## 4. Estructura de la landing

| # | Sección | Archivo |
|---|---|---|
| — | **Header**: franja amarilla ("(y nada de esto sirve)"), logo, menú en grupo de píldoras con la sección activa en negro (IntersectionObserver) y botón "Comprar entradas", que se pone amarillo en Entradas. Menú lateral por debajo de `lg` | `components/site-header.tsx` |
| 0 | **Hero**: etiqueta, "Una colección que no sirve para nada.", botones, nota manuscrita, carrusel de las 33 piezas (autoplay 3,5 s, pausa, flechas, contador animado y cartela horizontal) y barra de datos clave | `components/sections/hero.tsx`, `components/hero-carousel.tsx` |
| 1 | **Manifiesto** (oscuro): "Solo te das cuenta de lo bien diseñada que está una taza cuando alguien le cambia el asa.", foto de la sede y 3 principios con numerales manuscritos (Diseño, Humor y Cultura tecnológica) | `components/sections/manifiesto.tsx` |
| 2 | **La colección**: "Treinta y tres objetos diseñados para fallar". Cuadrícula con la escoba destacada. Plegada muestra **11 piezas (5 en móvil)**; "Ver las 33 piezas" despliega y "Ver menos" pliega y sube. Termina con la tarjeta "Pieza Nº 034 · Tu entrada" | `components/sections/coleccion.tsx`, `components/coleccion-grid.tsx` |
| 3 | **El recorrido**: "Cuarenta y cinco minutos sin hacer nada útil". Línea de tiempo: Entrada → Sala 01 Lo incómodo → Sala 02 Prohibido no tocar → Sala 03 El taller del desastre. Cierra con "salida por la tienda" y "Reservar mi visita" | `components/sections/recorrido.tsx` |
| 4 | **Programa**: "Cuatro semanas, ninguna igual de inútil". Una columna por semana: Inauguración · Manos a la obra · De noche (Noche inútil, solo con anticipada) · Gran final, en acuamarino (Muro del desastre y Premios Para Nada) | `components/sections/programa.tsx` |
| ~~—~~ | ~~Opiniones / prensa~~: **descartada por el cliente** | — |
| 5 | **Entradas** (conversión, **fondo acuamarino** a sangre): "La única pieza útil de la exposición es tu entrada". Tarifas como entradas troqueladas (la anticipada en negro, "¡Recomendada!") y **taquilla online** simulada (`components/taquilla.tsx`): día, cantidades, total y ahorro animados, y aviso de **proyecto académico, sin cobro** | `components/sections/entradas.tsx` |
| 6 | **Visita**: "Fácil de encontrar. Difícil de explicar." Dirección, horario, cómo llegar (FGC L7 Av. Tibidabo, bus V15 y 196, parking) y accesibilidad, más **Google Maps** con pin y "Abrir en Google Maps" | `components/sections/visita.tsx` |
| 7 | **FAQ**: "Dudas razonables". Título fijo con botón de compra y acordeón de 8 preguntas | `components/sections/faq.tsx` |
| 8 | **CTA final** (oscuro): "Cuatro semanas. Treinta y tres objetos. Cero utilidad.", pegatina, botón grande y cinta infinita de las piezas en blanco y negro | `components/sections/cta-final.tsx` |
| — | **Footer** (oscuro): logo, claim, índice, visita, créditos de Kamprani y **aviso de proyecto académico** (ficticio, sin afiliación con CosmoCaixa ni la Fundación "la Caixa", sin venta real) | `components/site-footer.tsx` |

**Anclas:** `#manifiesto`, `#coleccion`, `#recorrido`, `#programa`, `#entradas`, `#visita` y `#faq`. El menú se define en `nav` (`lib/expo.ts`).

---

## 5. Notas técnicas

- **Proyecto:** creado con `npx shadcn@latest init --preset b0 --template next`.
  - Next 16, React 19, TypeScript y Tailwind 4.
  - shadcn con el estilo `base-nova`, sobre **Base UI**: no hay `asChild`, así que para que un enlace parezca botón se usa `buttonVariants()` sobre un `<a>`.
- **shadcn:** `button`, `sheet`, `carousel` (Embla con `embla-carousel-autoplay`) y `accordion`. En `components/ui/carousel.tsx` hay un `eslint-disable` con comentario.
- **Google Maps:** `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sCosmoCaixa+Barcelona!6i16`, sin clave de API. La variante `maps?q=…&output=embed` está bloqueada para incrustarse.
- **Imágenes de carruseles:** la cinta del CTA usa `loading="eager"`; el carrusel del hero precarga solo la pieza actual y las dos vecinas.
- **Metadatos:** título, descripción, Open Graph y Twitter en `app/layout.tsx`. Falta una imagen de Open Graph.
- **Comandos:**
  - `npm run dev`: http://localhost:3000.
  - `npm run typecheck`, `npm run lint` y `npm run build`: **ejecutarlos antes de dar algo por terminado**.
  - `npx prettier --write` sobre lo tocado, sin reformatear `components/ui`, `components/icons` ni `components/animate-ui`.
- **Revisión visual** con capturas de Edge headless:
  - **Móvil:** dentro de un iframe de 390 px, porque headless impone un ancho mínimo.
  - **Animaciones de entrada:** dentro de un iframe se quedan a medias; para comprobarlas, capturar a nivel superior con una ventana muy alta.
  - **Google Maps:** a veces no pinta en headless.

---

## 6. Pendientes

- [ ] **Desplegar en Vercel** (conectar el repositorio de GitHub).
- [ ] **Verificar las líneas de bus (V15, 196)** en la web de CosmoCaixa.
- [ ] **Crédito de la foto de CosmoCaixa** (falta saber de dónde es).
- [ ] Imagen de Open Graph para compartir en redes.
- [ ] (Opcional) Pedir permiso a Katerina Kamprani para usar sus imágenes.
