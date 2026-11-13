import { homeOg, ogSize } from "@/lib/og";

export const alt = "FluxWeb. Tenés la idea. Nosotros la convertimos en una web que se siente tuya.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return homeOg();
}
