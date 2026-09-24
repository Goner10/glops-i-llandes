import { getAllergens, type AllergenId } from "../../data/allergens";

interface AllergenListProps {
  allergens: readonly AllergenId[];
  variant: "card" | "modal";
}

/** Proporción de los SVG originales (262 × 372), para reservar sitio sin saltos. */
const ICON = {
  card: { width: 40, height: 57 },
  modal: { width: 68, height: 96 },
} as const;

export default function AllergenList({ allergens, variant }: AllergenListProps) {
  if (allergens.length === 0) return null;

  const items = getAllergens(allergens);
  const { width, height } = ICON[variant];

  // Dentro de la tarjeta todo cuelga de un <button>, que solo admite contenido
  // en línea: de ahí los <span> en lugar de una lista.
  if (variant === "card") {
    return (
      <span className="allergens allergens--card">
        {items.map((allergen) => (
          <img
            key={allergen.id}
            className="allergens__icon"
            src={allergen.icon}
            alt={`Contiene ${allergen.label.toLowerCase()}`}
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
      <p className="allergens__title">Alérgenos</p>
      <ul className="allergens allergens--modal">
        {items.map((allergen) => (
          <li key={allergen.id} className="allergens__item">
            {/* El nombre va dibujado dentro del SVG, así que aquí solo se expone
                al lector de pantalla. El título de la sección ya da el contexto. */}
            <img
              className="allergens__icon"
              src={allergen.icon}
              alt={allergen.label}
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
