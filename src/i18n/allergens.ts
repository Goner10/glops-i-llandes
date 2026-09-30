import type { Locale } from './locale';
import type { AllergenId } from '../data/allergens';

const es: Readonly<Record<AllergenId, string>> = {
  apio: 'Apio',
  crustaceos: 'Crustáceos',
  'frutos-secos': 'Frutos secos',
  gluten: 'Gluten',
  huevos: 'Huevos',
  lacteos: 'Lácteos',
  moluscos: 'Moluscos',
  mostaza: 'Mostaza',
  pescado: 'Pescado',
  sesamo: 'Sésamo',
  soja: 'Soja',
  sulfitos: 'Sulfitos',
};

const en: Readonly<Record<AllergenId, string>> = {
  apio: 'Celery',
  crustaceos: 'Crustaceans',
  'frutos-secos': 'Nuts',
  gluten: 'Gluten',
  huevos: 'Eggs',
  lacteos: 'Dairy',
  moluscos: 'Molluscs',
  mostaza: 'Mustard',
  pescado: 'Fish',
  sesamo: 'Sesame',
  soja: 'Soy',
  sulfitos: 'Sulphites',
};

const labels: Record<Locale, Readonly<Record<AllergenId, string>>> = { es, en };

export function allergenLabel(id: AllergenId, locale: Locale): string {
  return labels[locale][id];
}
