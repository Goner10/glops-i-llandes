interface ProductPlaceholderProps {
  /**
   * Solo en el modal, donde el hueco se lee aislado. En la tarjeta el nombre
   * ya está justo debajo y repetirlo sería ruido.
   */
  name?: string;
  /** Relación de aspecto del hueco, para que la rejilla no salte. */
  ratio?: string;
  size?: "card" | "modal";
}

/**
 * Hueco gráfico para los productos que todavía no tienen fotografía.
 * Se construye con HTML y CSS: fondo papel, corte de ticket punteado y sello.
 */
export default function ProductPlaceholder({
  name,
  ratio = "4 / 5",
  size = "card",
}: ProductPlaceholderProps) {
  return (
    <div
      className={`product-ph product-ph--${size}`}
      style={{ ["--ph-ratio" as string]: ratio }}
    >
      {name !== undefined && <p className="product-ph__name">{name}</p>}
      <span className="product-ph__cut" aria-hidden="true" />
      <p className="stamp product-ph__stamp">Foto próximamente</p>
    </div>
  );
}
