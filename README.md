# Museo de Objetos Inútiles

> Una colección que no sirve para nada.

Landing page para una exposición temporal (ficticia) en **CosmoCaixa Barcelona**, del 5 de octubre al 1 de noviembre de 2026, dedicada a objetos cotidianos rediseñados para no funcionar. Su objetivo de conversión es **vender entradas anticipadas**.

Es un proyecto académico, realizado para el encargo *My First Professional Landing Page*.

## Secciones

| # | Sección | Qué hace |
|---|---|---|
| 0 | Hero | Claim, botones de compra y carrusel con las 33 piezas |
| 1 | Manifiesto | Por qué una exposición de objetos inútiles (diseño, humor y cultura tecnológica) |
| 2 | La colección | Las 33 piezas en formato ficha, con un botón "Ver más" |
| 3 | El recorrido | Los 45 minutos de visita, sala por sala |
| 4 | Programa | Actividades de las cuatro semanas |
| 5 | Entradas | Tarifas y taquilla online (simulada) |
| 6 | Visita | Horario, cómo llegar y mapa |
| 7 | FAQ | Preguntas frecuentes |
| 8 | CTA final | Último empujón a la compra, con la cinta de piezas |

## Stack

- [Next.js](https://nextjs.org) 16, React 19, TypeScript y Tailwind CSS 4
- [shadcn/ui](https://ui.shadcn.com) sobre Base UI
- Animaciones con [motion](https://motion.dev), [animate-ui](https://animate-ui.com) y [lucide-animated](https://lucide-animated.com)
- Tipografías: Bricolage Grotesque y Caveat (Google Fonts)

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # comprobación de tipos
npm run lint
npm run build
```

Los datos de la exposición (fechas, horario, precios) están en `lib/expo.ts` y las fichas de las piezas en `lib/coleccion.ts`. El registro de decisiones del proyecto está en [`memory.md`](memory.md).

## Créditos y aviso

- **Obras e imágenes de la colección:** © [Katerina Kamprani · The Uncomfortable](https://www.theuncomfortable.com). Se reproducen con fines exclusivamente educativos.
- **Exposición ficticia:** las fechas, actividades y precios son inventados. No está afiliada a CosmoCaixa ni a la Fundación "la Caixa", y no se vende ninguna entrada real.
