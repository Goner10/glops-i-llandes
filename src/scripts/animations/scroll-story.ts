import { createTimeline, onScroll } from "animejs";

const DESKTOP_QUERY = "(min-width: 62rem)";

/*
 * Reparto de la escena en unidades de línea de tiempo. `TOTAL` se estira sobre toda
 * la altura de `.story__track` (ver ScrollStory.astro), así que cada unidad equivale
 * a `alturaTrack / TOTAL` de scroll. Con un track de 240vh, 100 unidades ≈ 24vh.
 */
const TOTAL = 1000;
/** Primera pieza: arranca con el escenario ya asomado a media pantalla. */
const ENTER_START = 200;
/** Separación entre el inicio de una pieza y el de la siguiente. */
const ENTER_STEP = 90;
/** Duración de la entrada de cada pieza (se solapan para que el paso sea fluido). */
const ENTER_DURATION = 240;
/** Inicio del desvanecimiento conjunto; termina justo cuando el track se agota. */
const EXIT_AT = 820;

/**
 * Liga la escena de `ScrollStory.astro` al progreso del scroll.
 * Solo se activa en escritorio y sin movimiento reducido: en el resto de casos
 * el CSS ya presenta el collage como composición estática.
 */
export function initScrollStory(root: HTMLElement): void {
  const desktop = window.matchMedia(DESKTOP_QUERY);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!desktop.matches || reduceMotion.matches) return;

  const track = root.querySelector<HTMLElement>("[data-story-track]");
  const pieces = Array.from(root.querySelectorAll<HTMLElement>("[data-story-piece]"));

  if (!track || pieces.length === 0) return;

  const timeline = createTimeline({
    defaults: { ease: "linear" },
    autoplay: onScroll({
      target: track,
      // Arranca cuando el track asoma por abajo y termina cuando su final alcanza el
      // pie de la ventana: en ese instante el escenario deja de estar fijo y la
      // siguiente sección entra sin tramo vacío.
      enter: { container: "bottom", target: "top" },
      leave: { container: "bottom", target: "bottom" },
      sync: true,
    }),
  });

  // Cada pieza entra desde su propio ángulo y se retira al final del recorrido.
  const entries = [
    { x: ["-24%", "0%"], y: ["26%", "0%"], rotate: [-12, -3], exit: { y: "-16%", rotate: -7 } },
    { x: ["22%", "0%"], y: ["-22%", "0%"], rotate: [10, 2.5], exit: { y: "14%", rotate: 6 } },
    { x: ["-16%", "0%"], y: ["30%", "0%"], rotate: [8, -1.5], exit: { y: "-20%", rotate: -5 } },
    { x: ["18%", "0%"], y: ["18%", "0%"], rotate: [-14, 4], exit: { y: "-10%", rotate: 9 } },
    { x: ["0%", "0%"], y: ["12%", "0%"], rotate: [0, 0], exit: { y: "-8%", rotate: 0 } },
  ];

  pieces.forEach((piece, index) => {
    const config = entries[index % entries.length]!;
    const start = ENTER_START + index * ENTER_STEP;

    timeline.add(
      piece,
      {
        opacity: [0, 1],
        scale: [0.82, 1],
        x: config.x,
        y: config.y,
        rotate: config.rotate,
        duration: ENTER_DURATION,
      },
      start,
    );

    timeline.add(
      piece,
      {
        opacity: 0.3,
        scale: 0.94,
        y: config.exit.y,
        rotate: config.exit.rotate,
        duration: TOTAL - EXIT_AT,
      },
      EXIT_AT,
    );
  });
}
