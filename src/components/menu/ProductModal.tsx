import { useEffect, useRef } from "react";

import type { Locale } from "../../i18n/locale";
import { categoryLabel, type LocalizedProduct } from "../../i18n/products";
import { interpolate, ui } from "../../i18n/ui";
import { withBase } from "../../lib/paths";
import AllergenList from "./AllergenList";
import ProductPlaceholder from "./ProductPlaceholder";

interface ProductModalProps {
  locale: Locale;
  product: LocalizedProduct | null;
  onClose: () => void;
}

export default function ProductModal({ locale, product, onClose }: ProductModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const t = ui(locale);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (product !== null && !dialog.open) {
      dialog.showModal();
    } else if (product === null && dialog.open) {
      dialog.close();
    }
  }, [product]);

  useEffect(() => {
    if (product === null) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [product]);

  if (product === null) return null;

  const titleId = `producto-${product.id}`;
  const description = product.description?.trim();

  return (
    <dialog
      ref={dialogRef}
      className="product-modal"
      aria-modal="true"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="product-modal__panel">
        <button type="button" className="product-modal__close" onClick={onClose} autoFocus>
          <span aria-hidden="true">✕</span>
          <span className="visually-hidden">{interpolate(t.closeProduct, { name: product.name })}</span>
        </button>

        <div className="product-modal__media">
          {product.image === null ? (
            <ProductPlaceholder locale={locale} name={product.name} ratio="1 / 1" size="modal" />
          ) : (
            <img
              className="product-modal__image"
              src={withBase(product.image)}
              alt={product.imageAlt ?? product.name}
              width={500}
              height={667}
            />
          )}
        </div>

        <div className="product-modal__body">
          <p className="tag tag--brand">{categoryLabel(product.category, locale)}</p>
          <h2 className="product-modal__title" id={titleId}>
            {product.name}
          </h2>
          <p className="product-modal__price">{product.priceLabel}</p>

          {description && <p className="product-modal__description">{description}</p>}

          <AllergenList locale={locale} allergens={product.allergens} variant="modal" />

          <div className="product-modal__cut" aria-hidden="true" />
        </div>
      </div>
    </dialog>
  );
}
