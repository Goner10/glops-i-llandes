import type { Locale } from '../i18n/locale';

const formatters: Record<Locale, Intl.NumberFormat> = {
  es: new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  en: new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
};

/** Precio en euros con dos decimales. El valor numérico no cambia de idioma. */
export function formatEuro(value: number, locale: Locale = 'es'): string {
  return formatters[locale].format(value);
}
