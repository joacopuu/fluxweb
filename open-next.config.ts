import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Todas las páginas se pregeneran en el build (no hay ISR ni `use cache`), así
 * que alcanza con la caché de assets estáticos: solo lectura, sin R2 ni KV.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
