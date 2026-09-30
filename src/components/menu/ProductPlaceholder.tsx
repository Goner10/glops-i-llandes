import type { Locale } from "../../i18n/locale";
import { ui } from "../../i18n/ui";

interface ProductPlaceholderProps {
  locale: Locale;
  name?: string;
  ratio?: string;
  size?: "card" | "modal";
}

export default function ProductPlaceholder({
  locale,
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
      <p className="stamp product-ph__stamp">{ui(locale).photoSoon}</p>
    </div>
  );
}
