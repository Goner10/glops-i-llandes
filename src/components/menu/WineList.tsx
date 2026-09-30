import { formatEuro } from "../../lib/money";
import { getWinesByType, wineTypeLabels, wineTypeOrder, type WineProduct } from "../../data/wines";

function wineMeta(wine: WineProduct): string {
  return [wine.designation, wine.grape].filter((part): part is string => part !== null).join(" · ");
}

function priceCell(value: number | null): string {
  return value === null ? "—" : formatEuro(value);
}

export default function WineList() {
  return (
    <div className="wine-list">
      {wineTypeOrder.map((type) => {
        const wines = getWinesByType(type);
        if (wines.length === 0) return null;

        const headingId = `vinos-${type}`;

        return (
          <section key={type} className="wine-group" aria-labelledby={headingId}>
            <h3 className="wine-group__title" id={headingId}>
              {wineTypeLabels[type]}
            </h3>

            <table className="wine-table">
              <thead>
                <tr>
                  <th scope="col" className="wine-table__wine">
                    Vino
                  </th>
                  <th scope="col" className="wine-table__price">
                    Copa
                  </th>
                  <th scope="col" className="wine-table__price">
                    Botella
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
                          <span className="wine-table__notes">{wine.notes.join(" · ")}</span>
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
