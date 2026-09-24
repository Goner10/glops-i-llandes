// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';

/*
 * `DEPLOY_TARGET=github-pages` solo se define en el workflow de GitHub Pages, donde
 * la web vive en https://goner10.github.io/glops-i-llandes/. En local y en un
 * despliegue con dominio raíz (Vercel) la base sigue siendo `/`.
 * Las rutas internas leen el base con `withBase()` (src/lib/paths.ts).
 */
const isGitHubPages = process.env.DEPLOY_TARGET === 'github-pages';

// https://astro.build/config
export default defineConfig({
  site: isGitHubPages ? 'https://goner10.github.io' : undefined,
  base: isGitHubPages ? '/glops-i-llandes' : '/',
  integrations: [react()],
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Oswald',
      cssVariable: '--font-oswald',
      weights: [500, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Arial Narrow', 'Impact', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Archivo',
      cssVariable: '--font-archivo',
      weights: [400, 600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-plex-mono',
      weights: [400, 600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'monospace'],
    },
  ],
});
