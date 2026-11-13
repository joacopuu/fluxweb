import { getCase } from "@/content/cases";
import { caseOg, homeOg, ogPalettes, ogSize } from "@/lib/og";

export const alt = "Un caso de estudio de FluxWeb";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) return homeOg();
  return caseOg({
    palette: ogPalettes[item.skin] ?? ogPalettes.tinta,
    name: item.name,
    kind: item.kind,
    line: item.lead,
  });
}
