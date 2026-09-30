import { getAllergens, type AllergenId } from "../../data/allergens";
import { allergenLabel } from "../../i18n/allergens";
import type { Locale } from "../../i18n/locale";
import { interpolate, ui } from "../../i18n/ui";

interface AllergenListProps {
  locale: Locale;
  allergens: readonly AllergenId[];
  variant: "card" | "modal";
}

const ICON = {
  card: { width: 40, height: 57 },
  modal: { width: 68, height: 96 },
} as const;

export default function AllergenList({ locale, allergens, variant }: AllergenListProps) {
  if (allergens.length === 0) return null;

  const items = getAllergens(allergens);
  const { width, height } = ICON[variant];
  const t = ui(locale);

  if (variant === "card") {
    return (
      <span className="allergens allergens--card">
        {items.map((allergen) => (
          <img
            key={allergen.id}
            className="allergens__icon"
            src={allergen.icon}
            alt={interpolate(t.allergenContains, { name: allergenLabel(allergen.id, locale).toLowerCase() })}
            width={width}
            height={height}
            loading="lazy"
          />
        ))}
      </span>
    );
  }

  return (
    <div className="allergens-block">
      <p className="allergens__title">{t.allergensTitle}</p>
      <ul className="allergens allergens--modal">
        {items.map((allergen) => (
          <li key={allergen.id} className="allergens__item">
            <img
              className="allergens__icon"
              src={allergen.icon}
              alt={allergenLabel(allergen.id, locale)}
              width={width}
              height={height}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
