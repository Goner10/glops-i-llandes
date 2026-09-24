import type { MenuProduct } from "../../data/menu";
import { withBase } from "../../lib/paths";
import AllergenList from "./AllergenList";
import ProductPlaceholder from "./ProductPlaceholder";

interface ProductCardProps {
  product: MenuProduct;
  onOpen: (product: MenuProduct, trigger: HTMLButtonElement) => void;
}

/**
 * Ficha completa de un producto: un único marco negro envuelve la fotografía,
 * el nombre, el precio y los alérgenos. La descripción vive solo en el modal.
 */
export default function ProductCard({ product, onOpen }: ProductCardProps) {
  return (
    <li className="product-card">
      <button
        type="button"
        className="product-card__button"
        onClick={(event) => onOpen(product, event.currentTarget)}
      >
        <span className="product-card__media">
          {product.image === null ? (
            <ProductPlaceholder />
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
          {/* Sin alérgenos el componente no pinta nada: la fila no reserva hueco. */}
          <span className="product-card__foot">
            <span className="product-card__price">{product.priceLabel}</span>
            <AllergenList allergens={product.allergens} variant="card" />
          </span>
        </span>
      </button>
    </li>
  );
}
