export interface SiteAddress {
  readonly street: string;
  readonly postalCode: string;
  readonly city: string;
  readonly neighbourhood: string;
  /** Dirección completa en una línea, lista para mostrar. */
  readonly full: string;
  /** Búsqueda de Google Maps generada a partir de la dirección, no un enlace de perfil. */
  readonly mapsSearchUrl: string;
}

export interface SitePhone {
  readonly display: string;
  readonly href: string;
}

export interface SiteReservationsWidget {
  /** Identificador del establecimiento en Dish (`_hors.eid`). */
  readonly eid: string;
  /** `id` del contenedor donde el widget se monta (`_hors.tagid`). */
  readonly containerId: string;
  /** Script externo del widget. */
  readonly scriptSrc: string;
}

export interface SiteReservations {
  /** Ruta interna de la página con el widget de reservas. */
  readonly url: string;
  readonly note: string;
  readonly widget: SiteReservationsWidget;
}

export interface SiteNavItem {
  readonly label: string;
  readonly href: string;
}

const name = 'Glops i Llandes';
const street = 'Carrer de Martí Grajales, 15';
const postalCode = '46011';
const city = 'València';
const fullAddress = `${street}, ${postalCode} ${city}`;

const address: SiteAddress = {
  street,
  postalCode,
  city,
  neighbourhood: 'El Cabanyal',
  full: fullAddress,
  mapsSearchUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${name} ${fullAddress}`,
  )}`,
};

const phone: SitePhone = {
  display: '658 159 503',
  href: 'tel:+34658159503',
};

const reservations: SiteReservations = {
  url: '/reservas',
  note: 'Reserva online o por teléfono. Para grupos grandes, mejor llámanos.',
  widget: {
    eid: 'hydra-882011d3-6ed0-4816-b696-e98e1b6cf02d',
    containerId: 'hors-hydra-882011d3-6ed0-4816-b696-e98e1b6cf02d',
    scriptSrc: 'https://reservation.dish.co/widget.js',
  },
};

const nav: readonly SiteNavItem[] = [
  { label: 'Carta', href: '/carta' },
  { label: 'La casa', href: '/#manifesto' },
  { label: 'Galería', href: '/#galeria' },
  { label: 'Dónde estamos', href: '/#ubicacion' },
];

export const site = {
  name,
  claim: 'COMIDA · ARTE · COCKTAILS · AMIGOS',
  description:
    'Bar de tapas, conservas y cócteles en el Cabanyal, València. Comida, arte, cócteles y amigos.',
  address,
  phone,
  reservations,
  nav,
} as const;
