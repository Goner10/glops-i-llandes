import { useEffect, useRef } from "react";

import { getCategoryLabel, type MenuProduct } from "../../data/menu";
import { withBase } from "../../lib/paths";
import AllergenList from "./AllergenList";
import ProductPlaceholder from "./ProductPlaceholder";

interface ProductModalProps {
  product: MenuProduct | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // `showModal` aporta la trampa de foco y el cierre con Escape del navegador.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (product !== null && !dialog.open) {
      dialog.showModal();
    } else if (product === null && dialog.open) {
      dialog.close();
    }
  }, [product]);

  // El scroll del body se bloquea mientras el modal está abierto.
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
  // Sin redacción confirmada no se pinta nada: ni párrafo vacío ni aviso.
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
        // Clic en el backdrop: el objetivo es el propio <dialog>, no su contenido.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="product-modal__panel">
        <button
          type="button"
          className="product-modal__close"
          onClick={onClose}
          autoFocus
        >
          <span aria-hidden="true">✕</span>
          <span className="visually-hidden">Cerrar ficha de {product.name}</span>
        </button>

        <div className="product-modal__media">
          {product.image === null ? (
            <ProductPlaceholder name={product.name} ratio="1 / 1" size="modal" />
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
          <p className="tag tag--brand">{getCategoryLabel(product.category)}</p>
          <h2 className="product-modal__title" id={titleId}>
            {product.name}
          </h2>
          <p className="product-modal__price">{product.priceLabel}</p>

          {description && <p className="product-modal__description">{description}</p>}

          {/* Después de la descripción, y solo si el local los ha confirmado. */}
          <AllergenList allergens={product.allergens} variant="modal" />

          <div className="product-modal__cut" aria-hidden="true" />
        </div>
      </div>
    </dialog>
  );
}
