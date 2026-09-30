import { getWinesByType, wineTypeOrder, type WineProduct } from "../../data/wines";
import type { Locale } from "../../i18n/locale";
import { ui } from "../../i18n/ui";
import { wineNoteLabel, wineTypeLabel } from "../../i18n/wines";
import { formatEuro } from "../../lib/money";

function wineMeta(wine: WineProduct): string {
  return [wine.designation, wine.grape].filter((part): part is string => part !== null).join(" · ");
}

interface WineListProps {
  locale: Locale;
}

export default function WineList({ locale }: WineListProps) {
  const t = ui(locale);

  function priceCell(value: number | null): string {
    return value === null ? "—" : formatEuro(value, locale);
  }

  return (
    <div className="wine-list">
      {wineTypeOrder.map((type) => {
        const wines = getWinesByType(type);
        if (wines.length === 0) return null;

        const headingId = `vinos-${type}`;

        return (
          <section key={type} className="wine-group" aria-labelledby={headingId}>
            <h3 className="wine-group__title" id={headingId}>
              {wineTypeLabel(type, locale)}
            </h3>

            <table className="wine-table">
              <thead>
                <tr>
                  <th scope="col" className="wine-table__wine">
                    {t.wineColumnWine}
                  </th>
                  <th scope="col" className="wine-table__price">
                    {t.wineColumnGlass}
                  </th>
                  <th scope="col" className="wine-table__price">
                    {t.wineColumnBottle}
                  </th>
                </tr>
              </thead>
              <tbody>
                {wines.map((wine) => {
                  const meta = wineMeta(wine);

                  return (
                    <tr key={wine.id}>
                      <th scope="row" className="wine-table__wine">
                        <span className="wine-table__name">{wine.name}</span>
                        {meta !== "" && <span className="wine-table__meta">{meta}</span>}
                        {wine.notes.length > 0 && (
                          <span className="wine-table__notes">
                            {wine.notes.map((note) => wineNoteLabel(note, locale)).join(" · ")}
                          </span>
                        )}
                      </th>
                      <td className="wine-table__price">{priceCell(wine.glassPrice)}</td>
                      <td className="wine-table__price">{priceCell(wine.bottlePrice)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        );
      })}
    </div>
  );
}
