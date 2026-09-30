import {
  availableCategories,
  getProductsByCategory,
  menuProducts,
  type MenuCategory,
  type MenuCategoryId,
  type MenuProduct,
  type ProductCategoryId,
} from '../data/menu';
import { formatEuro } from '../lib/money';
import type { Locale } from './locale';
import { productCopyEn } from './products-en';
import { ui } from './ui';

export interface ProductCopy {
  readonly name: string;
  readonly imageAlt: string | null;
  readonly description: string | null;
}

export interface LocalizedProduct extends MenuProduct {
  readonly priceLabel: string;
}

const categoryKeys = {
  aperitivos: 'catAperitivos',
  tablas: 'catTablas',
  compartir: 'catCompartir',
  pates: 'catPates',
  conservas: 'catConservas',
  extras: 'catExtras',
  postres: 'catPostres',
  cocteles: 'catCocteles',
  vinos: 'catVinos',
} as const satisfies Record<MenuCategoryId, keyof ReturnType<typeof ui>>;

export function categoryLabel(id: MenuCategoryId, locale: Locale): string {
  return ui(locale)[categoryKeys[id]];
}

export function localizedCategories(locale: Locale): readonly MenuCategory[] {
  return availableCategories.map((category) => ({
    id: category.id,
    label: categoryLabel(category.id, locale),
  }));
}

export function localizeProduct(product: MenuProduct, locale: Locale): LocalizedProduct {
  const copy = locale === 'en' ? productCopyEn[product.id] : undefined;
  return {
    ...product,
    name: copy?.name ?? product.name,
    imageAlt: copy ? copy.imageAlt : product.imageAlt,
    description: copy ? copy.description : product.description,
    priceLabel: formatEuro(product.price, locale),
  };
}

export function localizedProductsByCategory(
  id: ProductCategoryId,
  locale: Locale,
): readonly LocalizedProduct[] {
  return getProductsByCategory(id).map((product) => localizeProduct(product, locale));
}

assertProductCopyComplete(menuProducts);

function assertProductCopyComplete(products: readonly MenuProduct[]): void {
  const missing = products.filter((product) => productCopyEn[product.id] === undefined).map((p) => p.id);
  if (missing.length > 0) {
    throw new Error(`Falta copy EN para: ${missing.join(', ')}`);
  }

  const extra = Object.keys(productCopyEn).filter((id) => !products.some((product) => product.id === id));
  if (extra.length > 0) {
    throw new Error(`Copy EN huérfano: ${extra.join(', ')}`);
  }

  const mismatched = products.filter((product) => {
    const copy = productCopyEn[product.id];
    return (
      (product.description === null) !== (copy.description === null) ||
      (product.imageAlt === null) !== (copy.imageAlt === null)
    );
  });
  if (mismatched.length > 0) {
    throw new Error(`Copy EN con description/imageAlt distinto de null: ${mismatched.map((p) => p.id).join(', ')}`);
  }
}
