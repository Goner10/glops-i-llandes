/**
 * Revela los elementos marcados con `data-reveal` cuando entran en pantalla.
 * La transición vive en `global.css`; aquí solo se activa la clase.
 */
export function initReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (targets.length === 0) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    for (const target of targets) target.classList.add("is-revealed");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target as HTMLElement;
        const delay = Number(target.dataset.revealDelay ?? "0");
        window.setTimeout(() => target.classList.add("is-revealed"), delay);
        observer.unobserve(target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
  );

  for (const target of targets) observer.observe(target);
}
