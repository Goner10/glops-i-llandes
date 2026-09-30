const euro = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Precio en euros con formato español, p. ej. `3,50 €`. */
export function formatEuro(value: number): string {
  return euro.format(value);
}
