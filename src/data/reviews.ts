export interface GoogleRating {
  /** Media confirmada. No se calcula a partir de las reseñas seleccionadas. */
  readonly average: number;
  readonly total: number;
  /** Fecha de referencia de la media y el total, en ISO (AAAA-MM-DD). */
  readonly asOf: string;
}

export interface Review {
  readonly id: string;
  readonly author: string;
  readonly rating: number;
  readonly text: string;
  /** Idioma original de la opinión (BCP 47). */
  readonly language: string;
  /** Fecha ISO, o null si la captura solo muestra una fecha relativa. */
  readonly publishedAt: string | null;
  /** Enlace directo a la reseña en Google Maps, o null si aún no está. */
  readonly url: string | null;
}

/**
 * Valoración global del local en Google, actualizable a mano.
 * Referencia confirmada el 2026-09-30.
 */
export const googleRating: GoogleRating = {
  average: 4.8,
  total: 126,
  asOf: '2026-09-30',
};

/**
 * Selección fija de reseñas públicas.
 * Las capturas solo indicaban antigüedad relativa («2 months ago», etc.),
 * así que `publishedAt` queda en null y no se muestra fecha.
 */
export const reviews: readonly Review[] = [
  {
    id: 'cristina-peirats',
    author: 'Cristina Peirats',
    rating: 5,
    language: 'es',
    publishedAt: null,
    url: 'https://maps.app.goo.gl/U1wHSXcQqbo4r23z7',
    text: 'Estupendo local en El Cabanyal para picar, con unas latas y cócteles de diez. La terraza muy agradable y el servicio insuperable. Sin duda, un local para volver',
  },
  {
    id: 'nacho-cabrera',
    author: 'Nacho Cabrera',
    rating: 5,
    language: 'es',
    publishedAt: null,
    url: 'https://maps.app.goo.gl/76W6CyWCG8K6xjfV8',
    text: 'Un sitio altamente recomendable. Muy buen ambiente siempre, muy buen picoteo y unos cocktails de 10. El equipo lo borda!',
  },
  {
    id: 'andy-forbes',
    author: 'Andy Forbes',
    rating: 5,
    language: 'en',
    publishedAt: null,
    url: 'https://maps.app.goo.gl/7gPM2WQcsFcAWQqt8',
    text: [
      'What an amazing find.',
      'We are staying in the neighborhood and exploring when we found this gem of a restaurant and bar.',
      'There is magic going on in the kitchen where clearly, someone understands food pairings and the need for quality ingredients',
      'Our hosts were super friendly and helpful with their guidance on our selections and what order to eat them in. I would like to say there was a standout item but the reality was that each serving was a delight.',
      'Thank you, we shall return 👍 😍 💯',
    ].join('\n\n'),
  },
  {
    id: 'brian-palmeiro-freixinet',
    author: 'Brian Palmeiro freixinet',
    rating: 5,
    language: 'es',
    publishedAt: null,
    url: 'https://maps.app.goo.gl/LPHExr6iLDxuEYNEA',
    text: 'Hemos venido de reus a trabajar por la zona, decidimos quedarnos en este sitio para hacer una cerveza, y acabamos haciendo 4 tapas, la comida nos dejo sin palabras, todo buenisimo, el servicio excelente, y el entorno tranquilo, lo recomiendo 100%,',
  },
  {
    id: 'myriam-loor',
    author: 'Myriam Loor',
    rating: 5,
    language: 'en',
    publishedAt: null,
    url: 'https://maps.app.goo.gl/RD97zqgRQHRRaKAc9',
    text: 'We found it after a flamenco show. Different foods and great service. The staff is friendly and helpful. Good prices',
  },
  
];
