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

/* ── LA CTA ─────────────────────────────────────────────────────────────────
   El único CTA del sitio es `PanelLink`, que reenvía la atribución por lista
   blanca. Acá sólo se viste. Sin ícono: en una página sin color de acento, el
   botón negro ya es lo único que tira del ojo. */
export function Boton({
  children,
  chico = false,
}: {
  children: ReactNode;
  chico?: boolean;
}) {
  return (
    <PanelLink className={chico ? "n-boton n-boton-chico" : "n-boton"}>
      {children}
    </PanelLink>
  );
}

/* ── EL WORDMARK ────────────────────────────────────────────────────────────
   Cinco letras en la misma familia, sin dibujo. Es la decisión del sistema
   entero en chico: la personalidad sale de la letra, no de un adorno. */
export function Wordmark({ href = "#" }: { href?: string }) {
  return (
    <a className="n-marca" href={href} aria-label="Nuvlo">
      Nuvlo
    </a>
  );
}

/* ── LA NAVEGACIÓN ───────────────────────────────────────────────────────────
   Tres enlaces, y apuntan a secciones que existen: en la pasada anterior la
   barra quedó nombrando una sección desmontada. */
const ENLACES = [
  { texto: "El reporte", href: "#reporte" },
  { texto: "Control", href: "#control" },
  { texto: "Precios", href: "#precios" },
];

export function Navbar() {
  return (
    <header className="n-nav">
      <div className="n-marco n-nav-fila">
        <Wordmark />
        <nav className="n-nav-enlaces" aria-label="Secciones">
          {ENLACES.map((e) => (
            <a key={e.href} href={e.href}>
              {e.texto}
            </a>
          ))}
        </nav>
        <Boton chico>Empezar gratis</Boton>
      </div>
    </header>
  );
}

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
    <span className="n-capsula" data-sentido={sentido}>
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
      <span className="n-cifra">{variacion.replace(/^[+−-]/, "")}</span>
    </span>
  );
}
