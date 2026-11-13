# PENDIENTES

Lo que necesita una acción o una decisión del equipo. Ordenado por urgencia.

## Para poder publicar

1. **Falta `wrangler login`.** `npx wrangler whoami` dice que no hay sesión (lo revisé al empezar y de nuevo al final). No inicié sesión ni usé `--temporary`, como pedía el encargo. **El sitio no está publicado.** Para publicarlo:
   - `npx wrangler login`
   - `npm run deploy`
   - El Worker se llama `fluxweb-v2`. No toca al sitio anterior (`fluxweb`).
2. **URL pública.** `src/config/site.ts` tiene por defecto `https://fluxweb-v2.franciscoaybar2110.workers.dev`. Es una suposición: la real depende de la cuenta con la que se publique. Después del primer deploy, definir `NEXT_PUBLIC_SITE_URL` con la URL verdadera y volver a publicar (afecta a la canónica, el sitemap y las `og:image`).
3. **`RESEND_API_KEY`.** Sin la clave, el formulario ofrece solo "Seguir por WhatsApp" (probado). Para sumar el envío por email: `npx wrangler secret put RESEND_API_KEY` y `npx wrangler secret put CONTACT_FROM_EMAIL` con un remitente de un dominio verificado en Resend.

## Para confirmar (lo escribí yo y habla por ustedes)

4. **El "detalle favorito" de cada integrante es un borrador mío.** Está en `src/config/site.ts` (campo `favorite`). Que cada uno lo confirme o lo cambie por el suyo.
5. **Promesas de respuesta.** El sitio dice "Te contesta alguno de los tres" y "Te respondemos dentro de las próximas 24 horas hábiles" (esta última venía del portfolio anterior). Confirmar que se sostienen.
6. **Duración de las etapas.** El perfil da el plazo total, no el de cada etapa. Escribí "Media hora de charla", "Antes de programar una línea", "El grueso del plazo" y "El día del lanzamiento y los meses que siguen". Si quieren días concretos por etapa, van en `src/content/home.ts`.
7. **Se nombra a Wix** en "Para quién" y en las preguntas, porque el encargo pedía usar la tabla del perfil tal cual. El perfil de redes pide no nombrar marcas. Decidan cuál manda en el sitio.
8. **Mirande tiene 33 propiedades publicadas, no 31.** El sitio dice "más de 30" para no quedar viejo. Conviene actualizar el número en `FluxWeb_Perfil.md`.
9. **Dos capturas de Mirande muestran su teléfono y su email de contacto** (`formulario.webp` y `m-formulario.webp`). Son datos públicos de su sitio y se ven chicos, pero el perfil pide no ponerlos en primer plano. Si prefieren, se reemplazan.
10. **Privacidad.** El texto es claro y corto, pero no lo revisó nadie con formación legal.

## Contenido que falta

11. **Fotos del equipo.** No usé ninguna: el perfil de marca pide el OK de Joaquín antes de mostrar al equipo, y el encargo prohíbe caras de stock o generadas. La sección está resuelta con tipografía. Si aprueban fotos, van arriba del nombre de cada persona en `src/components/sections/studio.tsx`, con duotono oliva y grano.
12. **Testimonios.** No hay, así que no hay sección. Cuando existan, el lugar natural es al final de cada página de caso.
13. **Instagram.** El conector no conectó. No recorrí la cuenta buscando fotos ni métricas nuevas: usé lo que ya estaba documentado en `Sitios_y_Cuenta_v2.md`.

## Pruebas que no pude hacer

14. **Safari real.** Probé con el WebKit de Playwright para Windows: portal, pieles, formulario y navegación andan bien y sin errores. Pero esa versión no tiene 3D acelerado, así que **el cilindro del hero se ve como una fila plana** en lugar de curva. En Safari de iPhone o de Mac debería verse curvo, pero no lo pude confirmar. Abrir el sitio en un iPhone y mirar el hero.
15. **Android de gama media.** La fluidez la medí con el procesador frenado 4 veces en Chrome de escritorio, no en un teléfono real.
16. **Lighthouse sobre la URL publicada.** Los números de `PROGRESO.md` son locales. En las páginas de caso el LCP simulado da 3,3 s (el observado es 0,5 s): conviene medir de nuevo ya publicado, con la compresión y la caché de Cloudflare.

## Quedó afuera

17. **Easter egg** y **versión en inglés.** Prioridad 3 del encargo. El tercer caso (`/trabajos/fluxweb`) sí entró.
18. **Reel del estudio.** El portfolio anterior tenía "Treinta segundos del estudio en movimiento". Decidí no sumarlo: los dos clips de los casos (el logo de Mirande partiéndose y la tableta de BeClean) ya muestran los sitios en movimiento, y pesan 0,9 y 0,5 MB.
19. **Cloudflare Web Analytics.** El sitio está preparado: definir `NEXT_PUBLIC_CF_BEACON_TOKEN` con el token del panel de Cloudflare.
20. **Dominio propio.** No se tocó ningún dominio ni DNS.
21. **Tipografía.** Me quedé con Playfair Display. Propongo probar Playfair (la versión con eje óptico) en una segunda vuelta: el comparativo está en `DESIGN.md` §3.

## Cosas que dejé en la máquina

- `C:\FluxWeb - Principal\_referencia\`: el portfolio anterior clonado (sin modificar) y los dos componentes originales de 21st.dev. Se puede borrar.
- `C:\FluxWeb - Principal\.claude\launch.json`: configuración del servidor de desarrollo para la vista previa. Se puede borrar.
- Los commits salieron con la identidad de git de la máquina (Joaquin Puga).
