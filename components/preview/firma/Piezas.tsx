import type { ReactNode } from "react";
import PanelLink from "@/components/landing/PanelLink";
import { buttonVariants } from "@/components/ui/button";
import type { Sentido } from "@/lib/reporte-muestra";

/**
 * EL CROMO DE LA PÁGINA.
 *
 * Acá vive lo que rodea al documento. El documento en sí vive en `Reporte.tsx`,
 * alineado con `buildReportHtml()` del panel: separarlos deja claro qué parte de
 * la pantalla es Nuvlo hablando y qué parte es el entregable del trafficker.
 */

/* ── LA MARCA ───────────────────────────────────────────────────────────────
   El elemento firma, a una sola escala: el punto. Las otras dos que llegó a
   tener declaradas —la barra bajo la frase clave y la regla de sección— ya no
   están, y por qué se fue cada una está escrito en `base.css`. */

export function Punto() {
  return <span className="f-marca-punto" aria-hidden="true" />;
}

/* ── LA ACCIÓN ──────────────────────────────────────────────────────────────
   La flecha va dibujada en SVG y no es un glifo de texto: un «→» hereda la
   métrica de la fuente, se desalinea con el peso del botón y no se puede animar
   por separado. */

function Flecha() {
  return (
    <svg
      className="f-boton-flecha"
      width="17"
      height="12"
      viewBox="0 0 17 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 6h14M10.5 1.5 15 6l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * LA CTA.
 *
 * Las clases salen de `buttonVariants`, el botón de shadcn/ui adaptado a los
 * tokens de esta landing (ver `components/ui/button.tsx`): de la biblioteca
 * viene el sistema de variantes y el comportamiento; el color, la tipografía y
 * el radio los sigue poniendo la página.
 *
 * Se usa `buttonVariants` sobre `PanelLink` y no `<Button asChild>` porque el
 * destino es SIEMPRE un ancla, y es el propio `PanelLink` el que escribe su
 * `href` sobre el nodo con un ref. Meter el `Slot` de Radix en el medio le
 * pasaría un segundo ref al mismo elemento para no ganar nada: no hay ningún
 * caso en esta página donde la CTA sea un `<button>`. Es el patrón que la
 * propia documentación de shadcn usa para enlaces.
 */
export function Boton({
  children,
  chico = false,
}: {
  children: ReactNode;
  chico?: boolean;
}) {
  return (
    <PanelLink className={buttonVariants({ size: chico ? "chico" : "normal" })}>
      {children}
      {/* La flecha va encerrada en un disco: contra un botón de esquinas
          suaves, un círculo adentro es la única forma redonda que queda y por
          eso lee como el punto de acción y no como un adorno del texto. */}
      <span className="f-boton-disco" aria-hidden="true">
        <Flecha />
      </span>
    </PanelLink>
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
    <span className="f-capsula" data-sentido={sentido}>
      <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden="true">
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
      <span className="f-cifra">{variacion.replace(/^[+−-]/, "")}</span>
    </span>
  );
}

/* ── EL WORDMARK ────────────────────────────────────────────────────────────
   La «o» final es un anillo dibujado del diámetro de su caja tipográfica. No es
   un adorno colgado al costado del nombre: es una letra del nombre, así que el
   wordmark sigue leyéndose «Nuvlo» con el anillo vacío.

   Es la misma forma que la marca —un estadio, acá cerrado en círculo— y toma el
   acento en hover, con lo cual el logo participa del sistema en vez de ser una
   isla. La letra sigue estando para quien no ve: el `aria-label` la escribe y el
   anillo va oculto a la lectura. */

export function Wordmark({ href = "#" }: { href?: string }) {
  return (
    <a className="f-marca-nombre" href={href} aria-label="Nuvlo">
      <span aria-hidden="true">Nuvl</span>
      <span className="f-marca-o" aria-hidden="true" />
    </a>
  );
}

/* ── LA NAVEGACIÓN FLOTANTE ───────────────────────────────────────────────── */

const ENLACES = [
  { texto: "El reporte", href: "#reporte" },
  { texto: "Cómo sale", href: "#flujo" },
  { texto: "Control", href: "#control" },
  { texto: "Precios", href: "#precios" },
];

export function Navbar() {
  return (
    <header className="f-nav">
      <div className="f-marco">
        <div className="f-nav-pastilla">
          <Wordmark />
          <nav className="f-nav-enlaces">
            {ENLACES.map((e) => (
              <a key={e.texto} href={e.href}>
                {e.texto}
              </a>
            ))}
          </nav>
          <div className="f-nav-cta">
            <Boton chico>Empezar gratis</Boton>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── EL MARCO DE NAVEGADOR ──────────────────────────────────────────────────
   La URL es la real: el cliente final abre el informe como página pública en
   `r.nuvloapp.com/r/{token}` y de ahí baja el PDF. El token va cortado y en
   tinta suave porque eso es un token: un dato que no se lee. */

function Candado() {
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 11 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.6 5V3.4a2.9 2.9 0 0 1 5.8 0V5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <rect
        x="0.9"
        y="5"
        width="9.2"
        height="6.4"
        rx="1.6"
        fill="currentColor"
        opacity="0.16"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}

export function BarraNavegador() {
  return (
    <div className="f-navegador-barra">
      <div className="f-luces" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p className="f-url">
        <Candado />
        <span>
          r.nuvloapp.com/r/<span className="f-url-token">8f2c41a9…</span>
        </span>
      </p>
    </div>
  );
}

/* ── LAS DOS PIEZAS QUE SALEN DEL MARCO ─────────────────────────────────────
   Antes era una sola. Ahora son dos, en esquinas opuestas de la escena, y
   cada una rompe el marco por un motivo distinto: abajo a la izquierda, la
   decisión de aprobar es tuya y vive afuera del documento; arriba a la
   derecha, la consulta del cliente es lo que dispara todo el ritual y llega
   antes que el reporte, así que también entra desde afuera. Ninguna de las
   dos pisa la otra ni el documento: cada una tiene su propia esquina. */

export function Aprobacion() {
  return (
    <div className="f-flotante">
      <Punto />
      <div className="f-flotante-texto">
        <p className="f-flotante-titulo">Esperando tu aprobación</p>
        <p className="f-flotante-pie">Nada sale hasta que lo apretás vos.</p>
      </div>
    </div>
  );
}

/**
 * LA ETIQUETA DE WHATSAPP.
 *
 * Una burbuja de chat y nada más: ni nombre, ni hora, ni una línea que narre
 * lo que ya se ve. El canal se reconoce por el verde y por la forma —fondo
 * claro con la colita apuntando hacia afuera de la escena—, así que agregarle
 * un rótulo sería explicar un dibujo que se explica solo.
 *
 * La consulta completa, con quién escribe y a qué hora, vive en su propia
 * sección (El entregable). Acá comparte escena con `Aprobacion` y por eso es
 * la versión mínima.
 */
export function EtiquetaWhatsApp() {
  return (
    <p className="f-wa-etiqueta">¡Llegó el reporte, gracias!</p>
  );
}

/* La burbuja de consulta por WhatsApp se retiró el 05/09/2026. Vivía en El
   entregable, y esa sección pasó a mostrar un TELÉFONO con el cliente de correo:
   una burbuja de chat al lado de una bandeja de mail son dos metáforas de canal
   a la vez, y la que importa es la que el producto usa de verdad. La etiqueta
   verde del héroe se queda, que es otra pieza. */

