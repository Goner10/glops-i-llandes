import { useEffect, useMemo, useRef, useState } from "react";

import {
  availableCategories,
  getProductsByCategory,
  isProductCategory,
  type MenuCategoryId,
  type MenuProduct,
} from "../../data/menu";
import { wineProducts } from "../../data/wines";
import MenuFilters from "./MenuFilters";
import ProductGrid from "./ProductGrid";
import ProductModal from "./ProductModal";
import WineList from "./WineList";
import "../../styles/menu.css";

// La carta arranca en la primera categoría con contenido, sin depender de ningún
// identificador escrito a mano.
const initialCategory: MenuCategoryId = availableCategories[0].id;

export default function MenuExplorer() {
  const [category, setCategory] = useState<MenuCategoryId>(initialCategory);
  const [selectedProduct, setSelectedProduct] = useState<MenuProduct | null>(null);

  // El disparador no es estado: solo hace falta para devolverle el foco al cerrar.
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const showingWines = category === "vinos";

  const visibleProducts = useMemo<readonly MenuProduct[]>(
    () => (isProductCategory(category) ? getProductsByCategory(category) : []),
    [category],
  );

  const resultCount = showingWines ? wineProducts.length : visibleProducts.length;

  // El foco se devuelve una vez el modal ya ha salido del DOM, para que el
  // cierre del <dialog> no se lo lleve de vuelta al documento.
  useEffect(() => {
    if (selectedProduct !== null) return;

    const trigger = triggerRef.current;
    if (trigger === null) return;

    triggerRef.current = null;
    trigger.focus();
  }, [selectedProduct]);

  const openProduct = (product: MenuProduct, trigger: HTMLButtonElement): void => {
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
        categories={availableCategories}
        category={category}
        resultCount={resultCount}
        onCategoryChange={changeCategory}
      />

      {showingWines ? <WineList /> : <ProductGrid products={visibleProducts} onOpen={openProduct} />}

      <ProductModal product={selectedProduct} onClose={closeProduct} />
    </div>
  );
}
