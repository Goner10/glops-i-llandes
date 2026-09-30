import type { Locale } from "../../i18n/locale";
import type { LocalizedProduct } from "../../i18n/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  locale: Locale;
  products: readonly LocalizedProduct[];
  onOpen: (product: LocalizedProduct, trigger: HTMLButtonElement) => void;
}

export default function ProductGrid({ locale, products, onOpen }: ProductGridProps) {
  return (
    <ul className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} locale={locale} product={product} onOpen={onOpen} />
      ))}
    </ul>
  );
}
