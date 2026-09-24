import type { MenuProduct } from "../../data/menu";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: readonly MenuProduct[];
  onOpen: (product: MenuProduct, trigger: HTMLButtonElement) => void;
}

export default function ProductGrid({ products, onOpen }: ProductGridProps) {
  return (
    <ul className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onOpen={onOpen} />
      ))}
    </ul>
  );
}
