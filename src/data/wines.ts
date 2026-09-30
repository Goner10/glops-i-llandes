export type WineType = 'blanco' | 'tinto' | 'rosado' | 'espumoso';

export interface WineProduct {
  readonly id: string;
  readonly name: string;
  readonly type: WineType;
  /** Denominación de origen, tal como figura en la carta. */
  readonly designation: string | null;
  /** Variedades y porcentajes publicados. */
  readonly grape: string | null;
  /** Precio por copa. `null` si la fuente no lo publica. */
  readonly glassPrice: number | null;
  readonly bottlePrice: number | null;
  /** Indicaciones publicadas: ecológico, vegano, etc. */
  readonly notes: readonly string[];
}

export const wineTypeOrder: readonly WineType[] = ['blanco', 'tinto', 'rosado', 'espumoso'];

export const wineTypeLabels: Readonly<Record<WineType, string>> = {
  blanco: 'Blancos',
  tinto: 'Tintos',
  rosado: 'Rosados',
  espumoso: 'Espumosos',
};

export const wineProducts: readonly WineProduct[] = [
  {
    id: 'musgo-blanco',
    name: 'Musgo',
    type: 'blanco',
    designation: 'D.O. Rueda',
    grape: 'Verdejo',
    glassPrice: 3.5,
    bottlePrice: 18.2,
    notes: [],
  },
  {
    id: 'primi-blanco',
    name: 'Primi',
    type: 'blanco',
    designation: 'D.O. Navarra',
    grape: 'Chardonay',
    glassPrice: 3.5,
    bottlePrice: 17.9,
    notes: [],
  },
  {
    id: 'malacuera-blanco',
    name: 'Malacuera',
    type: 'blanco',
    designation: 'D.O. Ribera del Duero',
    grape: 'Albillo Mayor',
    glassPrice: null,
    bottlePrice: 24.5,
    notes: [],
  },
  {
    id: 'valdamor-blanco',
    name: 'Valdamor',
    type: 'blanco',
    designation: 'D.O. Rías Baixas',
    grape: 'Albariño',
    glassPrice: null,
    bottlePrice: 22.3,
    notes: [],
  },
  {
    id: 'o-godello-blanco',
    name: 'O Godello',
    type: 'blanco',
    designation: 'D.O. Valdeorras',
    grape: 'Godello',
    glassPrice: null,
    bottlePrice: 23.6,
    notes: [],
  },

  {
    id: 'montecillo-crianza-tinto',
    name: 'Montecillo Crianza',
    type: 'tinto',
    designation: 'D.O. Rioja',
    grape: 'Tempranillo 87% Garnacha tinta 13%',
    glassPrice: 3.5,
    bottlePrice: 17.5,
    notes: ['Vegano'],
  },
  {
    id: 'pasion-de-bobal-tinto',
    name: 'Pasión de Bobal',
    type: 'tinto',
    designation: 'D.O. Utiel-Requena',
    grape: 'Bobal',
    glassPrice: 3.5,
    bottlePrice: 17.5,
    notes: ['Ecológico-Vegano'],
  },
  {
    id: 'malacuera-tinto',
    name: 'Malacuera',
    type: 'tinto',
    designation: 'D.O. Ribera del Duero',
    grape: 'Tempranillo',
    glassPrice: null,
    bottlePrice: 19.8,
    notes: [],
  },
  {
    id: 'el-abuelo-tinto',
    name: 'El Abuelo',
    type: 'tinto',
    designation: 'D.O. Almansa',
    grape: 'Garnacha Tintorera 60% Monastrell 25% Syrah 15%',
    glassPrice: null,
    bottlePrice: 24.8,
    notes: [],
  },
  {
    id: 'piqueras-nature-tinto',
    name: 'Piqueras Nature',
    type: 'tinto',
    designation: 'D.O. Almansa',
    grape: 'Syrah',
    glassPrice: null,
    bottlePrice: 26.9,
    notes: ['Ecológico'],
  },
  {
    id: 'bancales-olvidados-tinto',
    name: 'Bancales Olvidados',
    type: 'tinto',
    designation: 'D.O. Ribeira Sacra',
    grape: 'Mencía',
    glassPrice: null,
    bottlePrice: 27.4,
    notes: [],
  },

  {
    id: 'pasion-de-bobal-rosado',
    name: 'Pasión de Bobal',
    type: 'rosado',
    designation: 'D.O. Utiel-Requena',
    grape: 'Bobal',
    glassPrice: 3.5,
    bottlePrice: 18.6,
    notes: ['Ecológico-Vegano'],
  },

  {
    id: 'champagne-piper-espumoso',
    name: 'Champagne Piper',
    type: 'espumoso',
    designation: null,
    grape: 'Pinot Noir 50% Pinot Meunier 30% Chardonay 20%',
    glassPrice: null,
    bottlePrice: 48,
    notes: [],
  },
  {
    id: 'cava-brut-nature-pasion-espumoso',
    name: 'Cava Brut Nature Pasión',
    type: 'espumoso',
    designation: 'D.O. Utiel-Requena',
    grape: 'Chardonay 90% Xarel.lo 10%',
    glassPrice: null,
    bottlePrice: 24.6,
    notes: ['Ecológico-Vegano'],
  },
  {
    id: 'cava-brut-nature-rosado-pasion-espumoso',
    name: 'Cava Brut Nature Rosado Pasión',
    type: 'espumoso',
    designation: 'D.O. Utiel-Requena',
    grape: 'Pinot Noir 85% Garnacha 15%',
    glassPrice: null,
    bottlePrice: 21.5,
    notes: ['Ecológico-Vegano'],
  },
];

export function getWinesByType(type: WineType): readonly WineProduct[] {
  return wineProducts.filter((wine) => wine.type === type);
}
