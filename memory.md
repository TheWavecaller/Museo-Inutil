# Memoria del proyecto · Museo de Objetos Inútiles

Documento vivo: se actualiza cada vez que se termina una sección o se toma una decisión.
Última actualización: 2026-10-01 (fuera la monoespaciada: etiquetas en Bricolage estrecha)

---

## 1. Encargo

Proyecto de clase **"My First Professional Landing Page"**: trabajamos como un pequeño estudio digital para un cliente.

- **Brief:** un colectivo de diseñadores organiza una exposición temporal de inventos y productos absurdos: objetos que resuelven problemas que nunca existieron, fracasos comerciales e inventos históricos inútiles. Mezcla diseño, humor y cultura tecnológica. Tiene que despertar curiosidad durante las 4 semanas que está abierta.
- **Objetivo de conversión:** vender **entradas anticipadas**.
- **Requisitos del enunciado:**
  - **Mínimo 8 secciones + hero.**
  - Diseño responsive.
  - Stack: React + Next + TypeScript + GitHub + Vercel.
  - Es una landing, no una aplicación completa.

---

## 2. Decisiones tomadas

### Marca e identidad
- **Nombre:** Museo de Objetos Inútiles (el del brief).
- **Claim:** *"Una colección que no sirve para nada."*
- **Dirección artística:** **museo serio, contenido absurdo**. Estética de catálogo de museo: serif elegante, fichas técnicas, números de inventario, mucho aire. El humor sale del contraste entre la seriedad del formato y lo ridículo de los objetos.
- **Logo** (`components/logo.tsx`): **pegatina amarilla** torcida, con borde y sombra dura, y dentro un ∅ trazado a mano con la diagonal acuamarina ("utilidad = nada"). El nombre va en dos líneas, "MUSEO DE" en mono y "Objetos Inútiles" en Bricolage extragruesa, con **la "t" volcada en acuamarino** (ni el logo funciona del todo). Al pasar el ratón la pegatina se endereza y la "t" se levanta. El icono de pestaña es `app/icon.svg`, con la misma pegatina y los colores en hex; se borró el `favicon.ico` de la plantilla. La versión `v1-catalogo` tenía el ∅ en una vitrina de línea fina.
- **Tipografías:**
  - Instrument Serif para titulares (`font-heading`).
  - Inter para el texto.
  - Geist Mono para etiquetas e inventario.
- **Colores** (en `app/globals.css`):
  - Fondo color papel de catálogo, tinta casi negra.
  - Acento **acuamarino**: `oklch(0.52 0.095 195)` en claro y `oklch(0.8 0.11 185)` en oscuro. Antes era rojo; se cambió a petición del cliente.
  - Esquinas casi rectas (`--radius: 0.125rem`).
- **Tono:** irónico pero elegante, con frases cortas. Ejemplo: *"En taquilla costará 12 €. Lo cual tampoco tendría ningún sentido."*

### Estilo definitivo: informal (desde 2026-10-01)
La versión informal está fusionada en `main`. La de catálogo solo queda en la etiqueta `v1-catalogo` como referencia.
- **Fuentes:** **solo Bricolage Grotesque** (titulares en peso 800, con interletraje apretado) y Caveat (`font-hand`) para las anotaciones. **No hay monoespaciada:** Space Mono se quitó porque desentonaba.
  - Etiquetas, fichas y cifras usan la utilidad **`font-label`** (`globals.css`): Bricolage estrecha (`font-stretch: 85%`, eje `wdth`), seminegrita y con cifras de ancho fijo. Tamaños habituales: `text-xs` y `text-[0.6875rem]`, en mayúsculas.
  - No usar `font-mono` en componentes nuevos.
- **Palabras destacadas:** con trazo de rotulador fosforito (`--marker`), en CSS sin capa en `globals.css`. En Entradas el trazo es oscuro.
- **Humor** (`components/garabatos.tsx`): `<Pegatina>` amarilla torcida (`--pop`) y `<Nota>` manuscrita con flecha. Usarlas con mesura, como mucho una por sección.
- **Lenguaje de formas:** bordes de 2 px en `foreground`, esquinas `rounded-[var(--radius)]`, sombras duras desplazadas y píldoras (`rounded-full`) para botones, etiquetas y menú.
- **Botones** (`components/ui/button.tsx`): píldora con sombra dura; se levanta al pasar el ratón y se hunde al pulsar.
- **Etiquetas de sección:** utilidad `etiqueta` en `globals.css`, una píldora con borde y punto amarillo. Ocupa solo su texto, en su propia línea; en bloques centrados hay que añadir `mx-auto`.
- **Header:** franja superior **amarilla** con la coletilla manuscrita "(y nada de esto sirve)", menú en grupo de píldoras con la sección activa en píldora negra, bordes de 2 px y botón redondo para el menú móvil.
- **Iconos animados:** [lucide-animated](https://lucide-animated.com) (MIT, librería `motion`), 15 iconos en `components/icons/` instalados con `npx shadcn add https://lucide-animated.com/r/<nombre>.json --path components/icons`. **Modificados** para envolverse en `<span>` en lugar de `<div>`, para que sean válidos dentro de botones y enlaces. Al instalar uno nuevo hay que repetir ese cambio.
  - `components/animado.tsx`: el hook `useIconoAnimado()` dispara la animación al pasar el ratón o el foco por **todo** el botón o enlace, no solo por el icono. También están `<EnlaceAnimado icono={…}>` para los enlaces-botón y `<BloqueAnimado>` para las filas de la Visita.
  - Dónde se usan: flechas de todos los botones de compra, "Ver la colección", "Abrir en Google Maps", "Volver arriba", controles del carrusel, "Ver más/menos", menú móvil, iconos de la Visita (pin, reloj, accesibilidad) y el check de la compra, que se dibuja al aparecer.
  - **Siguen siendo estáticos:** tren, bus y coche (no tienen versión animada), los checks de las tarifas, los +/− de la taquilla y los chevrons del FAQ.
  - ⚠️ Un icono normal de lucide **no se puede pasar como prop** de un componente de servidor a uno de cliente: da "Functions cannot be passed directly to Client Components". Los de `components/icons` sí, porque son módulos `"use client"`.
  - `MotionConfig reducedMotion="user"` en `theme-provider.tsx`: las animaciones respetan "reducir movimiento".

### Datos de la exposición (inventados y verosímiles)
Están centralizados en `lib/expo.ts`. Si se cambian ahí, cambian en toda la web.

- **Sede:** CosmoCaixa, Museo de la Ciencia de Barcelona (C/ d'Isaac Newton, 26).
- **Fechas:** del 5 de octubre al 1 de noviembre de 2026 (4 semanas).
- **Horario:** todos los días de 10:00 a 20:00.
- **Precios:**
  - Anticipada: **9 €**. Ventaja exclusiva: acceso a la Noche inútil (vie 23 oct).
  - Taquilla: 12 €.
  - Reducida: 7 € (estudiantes, mayores de 65, personas en paro, familias numerosas y monoparentales).
  - Menores de 12: gratis acompañados de un adulto.
  - La general solo se vende en taquilla. Online solo se venden la anticipada, la reducida y la de menores.

### La colección
- Son las piezas de **_The Uncomfortable_, de Katerina Kamprani** (https://www.theuncomfortable.com): **33 objetos**, todo su portfolio. La lista se sacó de `portfolio-sitemap.xml`, quitando los que salen dos veces como render 3D y como prototipo.
- Los datos están en `lib/coleccion.ts` y las imágenes en `public/coleccion/`.
- Cada ficha lleva nº, nombre en castellano, nombre original, tipo (render 3D o prototipo), descripción y una nota de **utilidad de 0 a 10**, siempre por debajo de 2.
- El número de pieza depende del orden en el array. La escoba es la Nº 001 y las botas la Nº 011, a petición del cliente; las 22 nuevas van de la 012 a la 033.
- **Imágenes:** se usa el **render 3D cuadrado** siempre que existe, porque está centrado y no deja huecos. Solo hay prototipos fotografiados en el tenedor con cadena (`encuadre: "30% center"`), el juego de té, los botones gruesos, el juego de cubiertos y los cubiertos gruesos.
- ⚠️ Si se cambia una imagen, **hay que cambiarle el nombre de archivo**: Next.js guarda en caché las imágenes optimizadas por URL y seguiría sirviendo la antigua. Por eso existen `escoba-3d.jpg`, `copas-3d.jpg` y `tazas-3d.jpg`.
- El campo opcional `encuadre` (object-position) sirve para recortar bien las fotos que no son cuadradas.
- ⚠️ **Derechos:** su web indica "© All Rights Reserved". La web cita a la autora en la sección Colección, y las fotos llevan su marca de agua. **Pendiente:** añadir en el footer un aviso de proyecto académico sin fines comerciales y, a ser posible, pedirle permiso.

- `diasDeApertura()` en `lib/expo.ts` genera los 28 días de apertura. Los formatea a mano en UTC para que el texto sea idéntico en servidor y navegador y no haya errores de hidratación.

### Multimedia
- `public/multimedia/cosmocaixa.webp`: vista aérea de la sede. Se usa en el Manifiesto como "Fig. 1 · La sede".
- La carpeta es **`multimedia`, en minúsculas**. Vercel distingue mayúsculas y minúsculas.
- **Pendiente:** confirmar de dónde es la foto para añadir el crédito.

---

## 3. Estructura de la landing

| # | Sección | Archivo | Estado |
|---|---|---|---|
| — | Header: franja superior + menú con las 6 secciones (La exposición, Colección, Recorrido, Programa, Visita, FAQ) + botón "Comprar entradas". **Resalta la sección activa** al hacer scroll (IntersectionObserver), y el botón se marca cuando estás en Entradas. Menú lateral por debajo de `lg` | `components/site-header.tsx` | ✅ |
| 0 | **Hero**: claim, botones, carrusel automático de piezas con cartela horizontal, barra de datos clave | `components/sections/hero.tsx`, `components/hero-carousel.tsx` | ✅ |
| 1 | **Manifiesto**: sección oscura ("sala con la luz apagada"), titular sobre la taza, foto de CosmoCaixa, 3 principios (I Diseño · II Humor · III Cultura tecnológica) | `components/sections/manifiesto.tsx` | ✅ |
| 2 | **La colección**: "Sala 01", "Treinta y tres objetos diseñados para fallar". Cuadrícula de catálogo con la escoba destacada. Muestra 11 piezas y el botón **"Ver las 33 piezas"** despliega el resto; "Ver menos" pliega y vuelve arriba. Al final, la tarjeta "Pieza Nº 034 · Tu entrada", que pasa a ocupar la fila entera al desplegar | `components/sections/coleccion.tsx`, `components/coleccion-grid.tsx` | ✅ |
| 3 | **El recorrido**: "45 minutos sin hacer nada útil". Línea de tiempo (horizontal en escritorio, vertical en móvil): 0′ Entrada · La consigna → 5′ Sala 01 · Lo incómodo → 20′ Sala 02 · Prohibido no tocar (réplicas interactivas) → 35′ Sala 03 · El taller del desastre (el público diseña su objeto inútil; los mejores se exponen la última semana). Cierra con "salida por la tienda" y el botón "Reservar mi visita" | `components/sections/recorrido.tsx` | ✅ |
| 4 | **Programa**: "Cuatro semanas, ninguna igual de inútil". 4 columnas, una por semana, con 2 actividades cada una. S1 Inauguración (apertura lun 5 oct 19:00, visita guiada sáb 10) · S2 Manos a la obra (charla jue 15, taller familiar sáb 17) · S3 De noche (mesa redonda jue 22, **Noche inútil** vie 23 20:30, solo con entrada anticipada) · S4 Gran final, destacada en acuamarino (Muro del desastre toda la semana, clausura y Premios Para Nada dom 1 nov 18:00). Todo incluido con la entrada, con plazas limitadas | `components/sections/programa.tsx` | ✅ |
| ~~5~~ | ~~Opiniones / prensa~~: **descartada por el cliente** (2026-10-01) | — | ❌ |
| 6 | **Entradas** (conversión): "La única pieza útil de la exposición es tu entrada". **Fondo acuamarino a sangre** (más contraste, a petición del cliente: es la sección más llamativa de la página). A la izquierda, 3 tarifas con diseño de entrada física troquelada, en papel claro sobre el "mostrador" acuamarino: Anticipada 9 € (entrada **negra** destacada; Noche inútil, plaza en actividades, sin colas), General 12 € (taquilla) y Reducida 7 €. A la derecha, la **taquilla online** (`components/taquilla.tsx`): selector de día, cantidades (anticipada / reducida / menores de 12 gratis), total y ahorro frente a taquilla. Al comprar muestra un aviso de **proyecto académico, sin cobro** | `components/sections/entradas.tsx` | ✅ |
| 7 | **Visita**: "Fácil de encontrar. Difícil de explicar." A la izquierda, datos con icono (dirección, horario con última entrada a las 19:15, cómo llegar: FGC L7 Av. Tibidabo, bus V15 y 196, parking; accesibilidad). A la derecha, **Google Maps** incrustado con pin en CosmoCaixa ("Fig. 2 · Cómo llegar") y el botón "Abrir en Google Maps" | `components/sections/visita.tsx` | ✅ |
| 8 | **FAQ**: "Dudas razonables". A la izquierda, el título fijo al hacer scroll y el botón de compra. A la derecha, un acordeón (shadcn `accordion`) con 8 preguntas numeradas: plazo de la anticipada, cambios y cancelación (gratis hasta 24 h antes), Noche inútil (reserva por correo tras comprar la anticipada), tocar objetos (Sala 02 sí), niños, resto de CosmoCaixa (no incluido), fotos (sin flash) y comprar los objetos (no; postales en la tienda) | `components/sections/faq.tsx` | ✅ |
| 9 | **CTA final**: sección oscura, a juego con el Manifiesto (apertura y cierre). "Cuatro semanas. Once objetos. Cero utilidad.", botón grande de compra y una cinta infinita de las 11 piezas en blanco y negro (animación `marquee` en `globals.css`; se detiene si el sistema pide reducir movimiento) | `components/sections/cta-final.tsx` | ✅ |
| — | **Footer**: oscuro. Logo y claim, índice, datos de visita, créditos de Kamprani y un **aviso de proyecto académico** (ficticio, sin afiliación con CosmoCaixa ni la Fundación “la Caixa”, sin venta real) | `components/site-footer.tsx` | ✅ |

Anclas: `#manifiesto`, `#coleccion`, `#recorrido`, `#programa`, `#entradas`, `#visita` y `#faq`. Los enlaces del menú están en `nav`, en `lib/expo.ts`.

---

## 4. Notas técnicas

- **Proyecto:** creado con `npx shadcn@latest init --preset b0 --template next`.
  - Next 16.3, React 19, Tailwind v4.
  - shadcn con el estilo `base-nova`, sobre Base UI. No hay `asChild`: para que un enlace parezca botón se usa `buttonVariants()` sobre un `<a>`.
- **Componentes de shadcn instalados:** `button`, `sheet`, `carousel`, `accordion`. El carrusel usa Embla con `embla-carousel-autoplay`.
  - En `components/ui/carousel.tsx` se añadió una línea `eslint-disable` (con comentario), porque el código generado incumple la regla `react-hooks/set-state-in-effect`.
- **Carrusel del hero:**
  - Avanza solo cada 3,5 s y se pausa al pasar el ratón.
  - Tiene botón de pausa y flechas.
  - Respeta la opción de sistema `prefers-reduced-motion`.
- **Google Maps:** se usa `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sCosmoCaixa+Barcelona!6i16`, sin clave de API. La variante `maps?q=…&output=embed` redirige con `X-Frame-Options: SAMEORIGIN` y no carga. Las capturas headless no pintan las teselas del mapa: hay que comprobarlo en un navegador real.
- **Cifras en titulares:** en Instrument Serif "11" se lee "ll". Se usa `enLetras()` (`lib/expo.ts`, de 0 a 99) para escribirlas en letra: "Treinta y tres objetos".
- **Carga de imágenes en carruseles:** la cinta del CTA final usa `loading="eager"` (sin eso aparecían recuadros vacíos). El carrusel del hero precarga solo la pieza actual y sus dos vecinas.
- **Formato:** `npx prettier --write` sobre `components`, `lib` y `app` antes de cerrar cambios.
- **Truco de la sección oscura:** la clase `dark` aplicada a una sección usa la paleta oscura solo dentro de ella.
- **Comandos:**
  - `npm run dev`: servidor en http://localhost:3000.
  - `npm run typecheck` y `npm run lint`: **ejecutarlos antes de dar algo por terminado**.
  - `npm run build`.
- **Revisión visual:** con capturas de Edge en modo headless. Las capturas de móvil se hacen dentro de un iframe de 390 px, porque el modo headless impone un ancho mínimo.

---

## 5. Pendientes generales

- [ ] **Verificar las líneas de bus (V15, 196) en la web de CosmoCaixa** antes de entregar.
- [x] Aviso de proyecto académico y créditos de Kamprani en el footer.
- [ ] Crédito de la foto de CosmoCaixa (falta saber de dónde es).
- [ ] Revisar el modo oscuro de toda la página (ahora por defecto es claro; la tecla `d` lo cambia).
- [ ] Subir a GitHub y desplegar en Vercel.
- [ ] Metadatos para compartir en redes (imagen Open Graph).
