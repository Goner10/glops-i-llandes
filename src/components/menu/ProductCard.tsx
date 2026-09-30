import type { Locale } from "../../i18n/locale";
import type { LocalizedProduct } from "../../i18n/products";
import { withBase } from "../../lib/paths";
import AllergenList from "./AllergenList";
import ProductPlaceholder from "./ProductPlaceholder";

interface ProductCardProps {
  locale: Locale;
  product: LocalizedProduct;
  onOpen: (product: LocalizedProduct, trigger: HTMLButtonElement) => void;
}

export default function ProductCard({ locale, product, onOpen }: ProductCardProps) {
  return (
    <li className="product-card">
      <button
        type="button"
        className="product-card__button"
        onClick={(event) => onOpen(product, event.currentTarget)}
      >
        <span className="product-card__media">
          {product.image === null ? (
            <ProductPlaceholder locale={locale} />
          ) : (
            <img
              className="product-card__image"
              src={withBase(product.image)}
              alt={product.imageAlt ?? product.name}
              width={500}
              height={667}
              loading="lazy"
            />
          )}
        </span>

        <span className="product-card__body">
          <span className="product-card__name">{product.name}</span>
          <span className="product-card__foot">
            <span className="product-card__price">{product.priceLabel}</span>
            <AllergenList locale={locale} allergens={product.allergens} variant="card" />
          </span>
        </span>
      </button>
    </li>
  );
}
