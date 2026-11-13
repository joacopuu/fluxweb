import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";

/**
 * Tipografías del sitio. `next/font` las descarga en el build y las sirve
 * desde nuestro dominio. Para probar otra display (ver el comparativo en
 * DESIGN.md) alcanza con cambiar `Playfair_Display` acá.
 */
export const display = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "variable",
  display: "swap",
  variable: "--font-playfair",
});

export const sans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

export const mono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
  preload: false,
});
