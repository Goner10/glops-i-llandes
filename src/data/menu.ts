import type { AllergenId } from './allergens';

export type MenuCategoryId =  'aperitivos' | 'tablas' | 'compartir' | 'pates' | 'conservas' | 'extras' | 'postres' | 'cocteles';

export interface MenuCategory {
  readonly id: MenuCategoryId;
  readonly label: string;
}

export interface MenuProduct {
  readonly id: string;
  readonly name: string;
  readonly category: MenuCategoryId;
  /** Precio en euros, para ordenar o comparar. */
  readonly price: number;
  /** Precio ya formateado tal y como debe leerse en la web. */
  readonly priceLabel: string;
  /**
   * Ruta pública de la fotografía del producto, desde la raíz de `public/`
   * (p. ej. `/images/products/gilda.jpg`); las fichas le añaden el base con `withBase`.
   * `null` mientras no haya fotografía definitiva: la ficha usa el hueco gráfico.
   */
  readonly image: string | null;
  readonly imageAlt: string | null;
  /**
   * Alérgenos confirmados por el local. Vacío significa «sin confirmar
   * todavía», no «sin alérgenos»: por eso no se muestra ningún aviso.
   */
  readonly allergens: readonly AllergenId[];
  /**
   * Texto de la ficha, tal y como lo confirme el local. `null` mientras no haya
   * redacción definitiva: el modal no enseña nada en su lugar.
   */
  readonly description: string | null;
}

export const menuCategories: readonly MenuCategory[] = [
  { id: 'aperitivos', label: 'Aperitivos' },
  { id: 'tablas', label: 'Tablas' },
  { id: 'compartir', label: 'Para compartir' },
  { id: 'pates', label: 'Patés' },
  { id: 'conservas', label: 'Conservas' },
  { id: 'extras', label: 'Extras' },
  { id: 'postres', label: 'Postres' },
  { id: 'cocteles', label: 'Cócteles' },
];


export const menuProducts: readonly MenuProduct[] = [
  {
    id: 'trompellot',
    name: 'Trompellot',
    category: 'cocteles',
    price: 12,
    priceLabel: '12 €',
    image: null,
    imageAlt: null,
    allergens: [],
    description: 'Bourbon, amontillado, zumo de limón, sirope de palomitas y magic velvet.',
  },
  {
    id: 'malandrasa',
    name: 'MalandrAsa',
    category: 'cocteles',
    price: 11,
    priceLabel: '11 €',
    image: null,
    imageAlt: null,
    allergens: [],
    description: null,
  },
  {
    id: 'gilda-de-anchoa',
    name: 'Gilda de anchoa',
    category: 'aperitivos',
    price: 2.6,
    priceLabel: '2,60 €',
    image: '/images/products/gilda.jpg',
    imageAlt:
      'Una mano cogiendo una gilda de una bandeja metálica con aceitunas, guindillas y anchoa',
    allergens: ['pescado'],
    description: null,
  },
  {
    id: 'gilda-de-boqueron',
    name: 'Gilda de boquerón',
    category: 'aperitivos',
    price: 2.6,
    priceLabel: '2,60 €',
    image: '/images/products/gilda.jpg',
    imageAlt:
      'Una mano cogiendo una gilda de una bandeja metálica con aceitunas, guindillas y anchoa',
    allergens: ['pescado'],
    description: null,
  },
  {
    id: 'tosta-de-sardina-ahumada',
    name: 'Tosta de sardina ahumada',
    category: 'aperitivos',
    price: 3.5,
    priceLabel: '3,50 €',
    image: null,
    imageAlt: null,
    allergens: ['gluten', 'pescado'],
    description: null,
  },
  {
    id: 'mini-hojaldre-de-anchoa',
    name: 'Mini hojaldre de anchoa',
    category: 'aperitivos',
    price: 4.5,
    priceLabel: '4,50 €',
    image: null,
    imageAlt: null,
    allergens: ['gluten', 'pescado'],
    description: 'Con mantequilla de algas',
  },

  {
    id: 'quesos-en-aove',
    name: 'Quesos EN AOVE',
    category: 'tablas',
    price: 5.50,
    priceLabel: '5,50 €',
    image: null,
    imageAlt: null,
    allergens: ['lacteos', 'gluten'],
    description: null,
  },
  {
    id: 'chicharron-de-cadiz',
    name: 'Chicharrón de Cádiz',
    category: 'tablas',
    price: 9.80,
    priceLabel: '9,80 €',
    image: null,
    imageAlt: null,
    allergens: ['gluten'],
    description: null,
  },
  {
    id: 'ensaladilla-de-marisco',
    name: 'Ensaladilla de marisco',
    category: 'compartir',
    price: 9.8,
    priceLabel: '9,80 €',
    image: null,
    imageAlt: null,
    allergens: ['gluten', 'pescado', 'huevos', 'crustaceos'],
    description: null,
  },
  {
    id: 'pate-de-atun-a-la-mostaza-y-miel',
    name: 'Paté de Atún a la Mostaza y Miel',
    category: 'pates',
    price: 8.5,
    priceLabel: '8,50 €',
    image: null,
    imageAlt: null,
    allergens: ['gluten', 'pescado', 'sulfitos'],
    description: null,
  },
  {
    id: 'chipirones-en-su-tinta',
    name: 'Chipirones en su Tinta',
    category: 'conservas',
    price: 11.20,
    priceLabel: '11,20 €',
    image: null,
    imageAlt: null,
    allergens: ['gluten', 'pescado', 'moluscos', 'crustaceos'],
    description: null,
  },
  {
    id: 'pan-de-masa-madre',
    name: 'Pan de Masa Madre',
    category: 'extras',
    price: 2.5,
    priceLabel: '2,50 €',
    image: null,
    imageAlt: null,
    allergens: ['gluten'],
    description: null,
  },
  {
    id: 'tarta-de-queso',
    name: 'Tarta de queso',
    category: 'postres',
    price: 5.5,
    priceLabel: '5,50 €',
    image: null,
    imageAlt: null,
    allergens: ['gluten', 'lacteos', 'huevos'],
    description: null,
  },
];


export const availableCategories: readonly MenuCategory[] = menuCategories.filter((category) =>
  menuProducts.some((product) => product.category === category.id),
);

/** Productos que se enseñan en la portada, sin montar la carta completa. */
export const featuredProductIds: readonly string[] = [
  'gilda-de-anchoa',
  'ensaladilla-de-marisco',
  'trompellot',
  'tarta-de-queso',
];

export const featuredProducts: readonly MenuProduct[] = featuredProductIds
  .map((id) => menuProducts.find((product) => product.id === id))
  .filter((product): product is MenuProduct => product !== undefined);

export function getCategoryLabel(id: MenuCategoryId): string {
  return menuCategories.find((category) => category.id === id)?.label ?? id;
}

export function getProductsByCategory(id: MenuCategoryId): readonly MenuProduct[] {
  return menuProducts.filter((product) => product.category === id);
}
