import { withBase } from '../lib/paths';
import { defaultLocale, type Locale } from './locale';

/** Páginas con versión en cada idioma. No se deriva el inglés prefixando `/en/` al pathname. */
export type PageId = 'home' | 'carta' | 'reservas';

const pagePaths: Record<Locale, Record<PageId, string>> = {
  es: {
    home: '/',
    carta: '/carta',
    reservas: '/reservas',
  },
  en: {
    home: '/en',
    carta: '/en/carta',
    reservas: '/en/reservas',
  },
};

const htmlLang: Record<Locale, string> = {
  es: 'es',
  en: 'en',
};

const ogLocale: Record<Locale, string> = {
  es: 'es_ES',
  en: 'en_GB',
};

export function pagePath(locale: Locale, page: PageId): string {
  return pagePaths[locale][page];
}

/** Ruta interna ya resuelta con el `base` del despliegue. */
export function pageHref(locale: Locale, page: PageId): string {
  return withBase(pagePath(locale, page));
}

/** Ancla de una sección de la portada, en el idioma actual. */
export function homeSectionHref(locale: Locale, sectionId: string): string {
  if (locale === defaultLocale) return withBase(`/#${sectionId}`);
  return withBase(`${pagePath(locale, 'home')}/#${sectionId}`);
}

export function equivalentHref(locale: Locale, page: PageId): string {
  return pageHref(locale, page);
}

export function localeHtmlLang(locale: Locale): string {
  return htmlLang[locale];
}

export function localeOg(locale: Locale): string {
  return ogLocale[locale];
}

/**
 * URL absoluta para canonical y hreflang. Solo si hay `site` en la config
 * (p. ej. GitHub Pages). No inventa un dominio.
 */
export function absolutePageUrl(locale: Locale, page: PageId): string | undefined {
  const site = import.meta.env.SITE;
  if (!site) return undefined;

  const origin = site.endsWith('/') ? site : `${site}/`;
  const path = pageHref(locale, page).replace(/^\//, '');
  return new URL(path, origin).href;
}

export function getNavItems(locale: Locale, labels: NavLabels) {
  return [
    { label: labels.carta, href: pageHref(locale, 'carta') },
    { label: labels.house, href: homeSectionHref(locale, 'manifesto') },
    { label: labels.gallery, href: homeSectionHref(locale, 'galeria') },
  ] as const;
}

export interface NavLabels {
  readonly carta: string;
  readonly house: string;
  readonly gallery: string;
}
