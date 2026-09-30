import { useEffect, useMemo, useRef, useState } from "react";

import { availableCategories, isProductCategory, type MenuCategoryId } from "../../data/menu";
import { wineProducts } from "../../data/wines";
import type { Locale } from "../../i18n/locale";
import {
  localizedCategories,
  localizedProductsByCategory,
  type LocalizedProduct,
} from "../../i18n/products";
import MenuFilters from "./MenuFilters";
import ProductGrid from "./ProductGrid";
import ProductModal from "./ProductModal";
import WineList from "./WineList";
import "../../styles/menu.css";

const initialCategory: MenuCategoryId = availableCategories[0].id;

interface MenuExplorerProps {
  locale: Locale;
}

export default function MenuExplorer({ locale }: MenuExplorerProps) {
  const [category, setCategory] = useState<MenuCategoryId>(initialCategory);
  const [selectedProduct, setSelectedProduct] = useState<LocalizedProduct | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const showingWines = category === "vinos";
  const categories = useMemo(() => localizedCategories(locale), [locale]);

  const visibleProducts = useMemo<readonly LocalizedProduct[]>(
    () => (isProductCategory(category) ? localizedProductsByCategory(category, locale) : []),
    [category, locale],
  );

  const resultCount = showingWines ? wineProducts.length : visibleProducts.length;

  useEffect(() => {
    if (selectedProduct !== null) return;

    const trigger = triggerRef.current;
    if (trigger === null) return;

    triggerRef.current = null;
    trigger.focus();
  }, [selectedProduct]);

  const openProduct = (product: LocalizedProduct, trigger: HTMLButtonElement): void => {
    triggerRef.current = trigger;
    setSelectedProduct(product);
  };

  const closeProduct = (): void => {
    setSelectedProduct(null);
  };

  const changeCategory = (next: MenuCategoryId): void => {
    setSelectedProduct(null);
    setCategory(next);
  };

  return (
    <div className="menu-explorer">
      <MenuFilters
        locale={locale}
        categories={categories}
        category={category}
        resultCount={resultCount}
        onCategoryChange={changeCategory}
      />

      {showingWines ? (
        <WineList locale={locale} />
      ) : (
        <ProductGrid locale={locale} products={visibleProducts} onOpen={openProduct} />
      )}

      <ProductModal locale={locale} product={selectedProduct} onClose={closeProduct} />
    </div>
  );
}
