import { useEffect, useMemo, useRef, useState } from "react";

import {
  availableCategories,
  getProductsByCategory,
  type MenuCategoryId,
  type MenuProduct,
} from "../../data/menu";
import MenuFilters from "./MenuFilters";
import ProductGrid from "./ProductGrid";
import ProductModal from "./ProductModal";
import "../../styles/menu.css";

// La carta arranca en la primera categoría con producto, sin depender de ningún
// identificador escrito a mano.
const initialCategory: MenuCategoryId = availableCategories[0].id;

export default function MenuExplorer() {
  const [category, setCategory] = useState<MenuCategoryId>(initialCategory);
  const [selectedProduct, setSelectedProduct] = useState<MenuProduct | null>(null);

  // El disparador no es estado: solo hace falta para devolverle el foco al cerrar.
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const visibleProducts = useMemo<readonly MenuProduct[]>(
    () => getProductsByCategory(category),
    [category],
  );

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

  return (
    <div className="menu-explorer">
      <MenuFilters
        categories={availableCategories}
        category={category}
        resultCount={visibleProducts.length}
        onCategoryChange={setCategory}
      />

      <ProductGrid products={visibleProducts} onOpen={openProduct} />

      <ProductModal product={selectedProduct} onClose={closeProduct} />
    </div>
  );
}
