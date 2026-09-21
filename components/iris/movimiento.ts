import { useSyncExternalStore } from "react";

/**
 * La preferencia de movimiento reducido como estado externo: es lo que el
 * navegador sabe, no algo que React decide, y así ningún efecto escribe
 * estado por su cuenta. En el servidor vale `false`.
 */
const REDUCIDO = "(prefers-reduced-motion: reduce)";

export function useMovimientoReducido() {
  return useSyncExternalStore(
    (avisar) => {
      const mq = window.matchMedia(REDUCIDO);
      mq.addEventListener("change", avisar);
      return () => mq.removeEventListener("change", avisar);
    },
    () => window.matchMedia(REDUCIDO).matches,
    () => false,
  );
}
