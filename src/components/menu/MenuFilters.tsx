import { useEffect, useRef } from "react";

import type { MenuCategory, MenuCategoryId } from "../../data/menu";

interface MenuFiltersProps {
  categories: readonly MenuCategory[];
  category: MenuCategoryId;
  resultCount: number;
  onCategoryChange: (category: MenuCategoryId) => void;
}

/** Holgura que se deja a los lados al acercar una categoría al centro del carril. */
const SCROLL_INSET = 24;

export default function MenuFilters({
  categories,
  category,
  resultCount,
  onCategoryChange,
}: MenuFiltersProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef(new Map<MenuCategoryId, HTMLButtonElement>());

  // Si la categoría elegida se ha quedado fuera del carril, se acerca. Se mueve
  // `scrollLeft` a mano en vez de usar `scrollIntoView` para no arrastrar
  // también el scroll vertical de la página.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const chip = chipsRef.current.get(category);
    if (scroller === null || chip === undefined) return;

    const start = chip.offsetLeft - SCROLL_INSET;
    const end = chip.offsetLeft + chip.offsetWidth + SCROLL_INSET;
    const viewStart = scroller.scrollLeft;
    const viewEnd = viewStart + scroller.clientWidth;

    let left = viewStart;
    if (start < viewStart) left = start;
    else if (end > viewEnd) left = end - scroller.clientWidth;
    else return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  }, [category]);

  return (
    <div className="menu-filters">
      <div
        className="menu-filters__categories"
        ref={scrollerRef}
        role="group"
        aria-label="Filtrar por categoría"
      >
        {categories.map((option) => (
          <button
            key={option.id}
            type="button"
            className="menu-filters__chip"
            aria-pressed={category === option.id}
            ref={(node) => {
              if (node === null) chipsRef.current.delete(option.id);
              else chipsRef.current.set(option.id, node);
            }}
            onClick={() => onCategoryChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <p className="menu-filters__count" role="status">
        {resultCount === 1 ? "1 producto" : `${resultCount} productos`}
      </p>
    </div>
  );
}
