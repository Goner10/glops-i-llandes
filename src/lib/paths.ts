/**
 * Rutas internas y archivos de `public/` con el `base` del despliegue.
 *
 * En local y en un dominio raíz `base` es `/`; en GitHub Pages es
 * `/glops-i-llandes` (ver astro.config.mjs). Vite sustituye
 * `import.meta.env.BASE_URL` en tiempo de build, tanto en componentes Astro como
 * en la isla React, así que este módulo funciona en ambos lados.
 *
 * Los imports de `src/assets` no pasan por aquí: Astro ya les añade el base.
 */

/** Base sin barra final: `""` en raíz, `"/glops-i-llandes"` en GitHub Pages. */
const base = import.meta.env.BASE_URL.replace(/\/+$/, "");

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

/**
 * Antepone el base a una ruta que empieza por `/`.
 * `withBase("/carta")` → `/carta` o `/glops-i-llandes/carta`.
 * `withBase("/#ubicacion")` → `/#ubicacion` o `/glops-i-llandes/#ubicacion`.
 * URLs absolutas, `tel:`, `mailto:` y fragmentos sueltos se devuelven intactos.
 */
export function withBase(path: string): string {
  if (EXTERNAL.test(path)) return path;
  return `${base}/${path.replace(/^\/+/, "")}`;
}
