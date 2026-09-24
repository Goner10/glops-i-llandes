/**
 * Registro central de alérgenos. Los componentes solo manejan identificadores:
 * el nombre y la ruta del icono se resuelven siempre aquí.
 *
 * Los SVG de `public/images/allergens/` incluyen icono y texto dentro del propio
 * archivo, así que se usan tal cual hasta que haya una versión solo de icono.
 */

export type AllergenId =
  | 'apio'
  | 'crustaceos'
  | 'frutos-secos'
  | 'gluten'
  | 'huevos'
  | 'lacteos'
  | 'moluscos'
  | 'mostaza'
  | 'pescado'
  | 'sesamo'
  | 'soja'
  | 'sulfitos';

export interface Allergen {
  readonly id: AllergenId;
  readonly label: string;
  /** Ruta pública del SVG, servido desde `public/`. */
  readonly icon: string;
}

function entry(id: AllergenId, label: string): Allergen {
  return { id, label, icon: `/images/allergens/${id}.svg` };
}

export const allergens: Readonly<Record<AllergenId, Allergen>> = {
  apio: entry('apio', 'Apio'),
  crustaceos: entry('crustaceos', 'Crustáceos'),
  'frutos-secos': entry('frutos-secos', 'Frutos secos'),
  gluten: entry('gluten', 'Gluten'),
  huevos: entry('huevos', 'Huevos'),
  lacteos: entry('lacteos', 'Lácteos'),
  moluscos: entry('moluscos', 'Moluscos'),
  mostaza: entry('mostaza', 'Mostaza'),
  pescado: entry('pescado', 'Pescado'),
  sesamo: entry('sesamo', 'Sésamo'),
  soja: entry('soja', 'Soja'),
  sulfitos: entry('sulfitos', 'Sulfitos'),
};

export function getAllergens(ids: readonly AllergenId[]): readonly Allergen[] {
  return ids.map((id) => allergens[id]);
}
