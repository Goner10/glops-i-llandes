import type { WineType } from '../data/wines';
import type { Locale } from './locale';
import { ui } from './ui';

const noteKeys = {
  Vegano: 'wineNoteVegano',
  Ecológico: 'wineNoteEcologico',
  'Ecológico-Vegano': 'wineNoteEcologicoVegano',
} as const;

const typeKeys = {
  blanco: 'wineGroupBlanco',
  tinto: 'wineGroupTinto',
  rosado: 'wineGroupRosado',
  espumoso: 'wineGroupEspumoso',
} as const satisfies Record<WineType, keyof ReturnType<typeof ui>>;

export function wineTypeLabel(type: WineType, locale: Locale): string {
  return ui(locale)[typeKeys[type]];
}

export function wineNoteLabel(note: string, locale: Locale): string {
  const key = noteKeys[note as keyof typeof noteKeys];
  return key ? ui(locale)[key] : note;
}
