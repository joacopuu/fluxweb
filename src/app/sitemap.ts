import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { cases } from "@/content/cases";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-11-13");
  return [
    { url: `${site.url}/`, lastModified: updated, changeFrequency: "monthly", priority: 1 },
    ...cases.map((item) => ({
      url: `${site.url}/trabajos/${item.slug}`,
      lastModified: updated,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/privacidad`, lastModified: updated, changeFrequency: "yearly", priority: 0.2 },
  ];
}
