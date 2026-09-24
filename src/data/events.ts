export interface EventItem {
  readonly id: string;
  readonly title: string;
  /** Fecha ISO. Solo se rellena con carteles reales confirmados por el local. */
  readonly date: string;
  readonly time: string;
  readonly kind: string;
  readonly detail: string;
}

/**
 * Vacío a propósito: todavía no hay carteles ni fechas confirmadas.
 * Mientras esté vacío, `Events.astro` muestra la pieza editorial sin fechas.
 */
export const events: readonly EventItem[] = [];

export interface EditorialPillar {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly text: string;
}

/** Pieza editorial genérica sobre lo que pasa en la casa, sin fechas ni nombres inventados. */
export const editorialPillars: readonly EditorialPillar[] = [
  {
    id: 'arte',
    label: 'Arte',
    title: 'Paredes que cambian',
    text: 'Cedemos las paredes a artistas del barrio y de fuera. Cada tanto, la casa se transforma en sala.',
  },
  {
    id: 'musica',
    label: 'Música',
    title: 'Cabina abierta',
    text: 'Vinilos, sesiones en directo y volumen de bar. La música manda en la vibra de la noche.',
  },
  {
    id: 'colabos',
    label: 'Colabos',
    title: 'Cuatro manos',
    text: 'Cocinas invitadas, bodegas y proyectos amigos que se pasan por la barra a jugar.',
  },
];
