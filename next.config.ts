import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // 90 para las piezas de la colección: las fotos originales ya vienen
    // comprimidas y a 75 los degradados grises de los renders se llenan de
    // cuadritos
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig
