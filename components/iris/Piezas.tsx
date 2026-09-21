import type { ReactNode } from "react";
import PanelLink from "@/components/landing/PanelLink";
import type { Sentido } from "@/lib/reporte-muestra";

/**
 * EL CROMO DE LA PÁGINA.
 *
 * Lo que rodea al documento. El documento vive en `Reporte.tsx`, alineado con
 * `buildReportHtml()` del panel; separarlos deja claro qué parte de la
 * pantalla es Nuvlo hablando y qué parte es el entregable del trafficker.
 */

/* ── LA FLECHA ──────────────────────────────────────────────────────────────
   Dibujada, no un glifo: un «→» hereda la métrica de la fuente y no se puede
   mover aparte del texto. Los botones ya no la llevan (bloque, 07/09/2026);
   queda para quien la necesite. */
export function Flecha() {
  return (
    <svg
      className="i-boton-flecha"
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 6h13.5M9.5 1.5 14 6l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── LA CTA ─────────────────────────────────────────────────────────────────
   El único CTA del sitio es `PanelLink`, que reenvía la atribución por lista
   blanca. Acá sólo se viste: el bloque iris de esquinas interiores, sin
   flecha, o invertido a hoja sobre la noche. El dueño eligió este diseño
   entre tres el 07/09/2026 («B · Bloque»), después de probar la pastilla con
   el disco que se llena. */
export function Boton({
  children,
  chico = false,
  hoja = false,
}: {
  children: ReactNode;
  chico?: boolean;
  hoja?: boolean;
}) {
  const clase = [
    "i-boton",
    chico ? "i-boton-chico" : "",
    hoja ? "i-boton-hoja" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return <PanelLink className={clase}>{children}</PanelLink>;
}

/* ── EL WORDMARK ────────────────────────────────────────────────────────────
   El nombre en la familia del sistema —Geist desde el 12/09/2026—, pelado.
   Pedido del dueño (11/09/2026): sin el cuadradito de color que lo acompañaba.
   Desde el 16/09/2026 va en minúscula, «nuvlo», a 800 y muy apretado: elegido
   en modo live (ver `.i-marca` en `base.css`). El nombre accesible sigue siendo
   «Nuvlo», por el `aria-label`.

   **El monograma entró al lado del nombre el 20/09/2026 y salió el mismo día.**
   El dueño aportó la marca y se montó acá; mirándolo, la objeción es que el
   signo **es una N** pegada a una palabra que empieza con «n», así que el
   lockup dice *N + nuvlo* y el dibujo sólo repite la inicial. Un mark se gana
   el lugar al lado de su wordmark cuando aporta algo que la palabra no dice;
   cuando es la letra, no aporta. Es la tercera vez que este repo llega a la
   misma conclusión: el cuadradito de color que el dueño sacó el 11/09 y el
   *Don't* del copete arriba del titular dicen lo mismo con otras piezas.

   Y tenía un costo que no era estético: el signo sumaba 37,2px a la fila de la
   barra, y por esos 37 hubo que subir el umbral de los dos botones de la
   Disposición 954/2025 de 1100 a 1140 —o sea 40px más de franja donde el sitio
   no cumple—. Sacarlo los devuelve.

   **Dónde sí quedó, que era la pregunta que el archivo del dueño vino a
   contestar:** en `app/icon.svg` y `app/apple-icon.png`. Ahí el wordmark no
   entra —a 16px «nuvlo» es una mancha— y el monograma hace un trabajo que
   ninguna otra pieza puede hacer. Los `path` vectorizados y su verificación
   están documentados en `app/icon.svg`; los fuentes, en `marca/`.

   Lo que NO se probó y queda dicho: el signo solo, sin la palabra. Para una
   marca que todavía nadie reconoce, el nombre es lo que tiene que quedar. */
export function Wordmark({ href = "/#inicio" }: { href?: string }) {
  return (
    <a className="i-marca" href={href} aria-label="Nuvlo">
      <span aria-hidden="true">nuvlo</span>
    </a>
  );
}

/* La navegación vive en `Navbar.tsx`: es de cliente (se viste al
   scrollear y marca la sección activa). */

/* ── LA CÁPSULA DE VARIACIÓN ────────────────────────────────────────────────
   El tick lo decide el SIGNO; el color lo decide el NEGOCIO y viene dado en
   `sentido` desde `lib/reporte-muestra.ts`. Nunca se infiere uno del otro. */
function tickDe(variacion: string) {
  if (variacion.startsWith("−") || variacion.startsWith("-")) return "baja";
  if (variacion.startsWith("+")) return "sube";
  return "igual";
}

export function Capsula({
  variacion,
  sentido,
}: {
  variacion: string;
  sentido: Sentido;
}) {
  const tick = tickDe(variacion);
  return (
    <span className="i-capsula" data-sentido={sentido}>
      <svg width="8" height="8" viewBox="0 0 9 9" aria-hidden="true">
        {tick === "sube" && (
          <path d="M4.5 0.9 L8.3 7.2 H0.7 Z" fill="currentColor" />
        )}
        {tick === "baja" && (
          <path d="M4.5 8.1 L0.7 1.8 H8.3 Z" fill="currentColor" />
        )}
        {tick === "igual" && (
          <rect x="0.7" y="3.8" width="7.6" height="1.5" fill="currentColor" />
        )}
      </svg>
      <span className="i-cifra">{variacion.replace(/^[+−-]/, "")}</span>
    </span>
  );
}
