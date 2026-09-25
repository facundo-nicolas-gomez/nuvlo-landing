import Image from "next/image";
import { Entra } from "./Entra";

/**
 * EL PERMISO — la autorización real de Meta, recortada (24/09/2026).
 *
 * ── DE DÓNDE VIENE ─────────────────────────────────────────────────────────
 * Fue un diodo con sello («parece de un estudio jurídico»), una tarjeta de
 * permisos propia, la captura entera —casi toda blanca, «se nota pegada»— y
 * una réplica en HTML, que el dueño leyó como pérdida de calidad. Queda la
 * captura real, recortada: la réplica era más limpia pero dejaba de ser
 * Meta, y lo que convence al trafficker escéptico es justamente que lo sea.
 *
 * ── EL RECORTE ─────────────────────────────────────────────────────────────
 * `public/meta/autorizacion-nuvlo.png`, 983×502, sale de la captura de 991×1182
 * que aportó el dueño con el zoom del navegador al 175 % (al 200 % la ventana
 * no entraba en la pantalla), con tres cambios y nada más:
 * - se sacó el blanco del medio: la parte de arriba llega hasta 70px debajo
 *   del permiso (y=321) y la de abajo arranca 49px antes de la línea del pie
 *   (y=992) —los 40 y 28 de la primera captura, a 1,75—. Entre esas dos filas
 *   no hay un solo píxel que no sea blanco, así que la unión no se ve;
 * - se recortó el canto gris de la ventana (4px a los lados, 5 arriba, 4
 *   abajo): el borde lo pone la sombra de la página;
 * - la foto de perfil de quien autorizó es un círculo gris neutro, porque es
 *   un dato personal en una página pública.
 *
 * Se muestra a 562×287 —la medida de siempre—, así que lleva 1,75 píxeles por
 * píxel de pantalla. La primera era 1x y se ablandaba en cualquier pantalla
 * densa. Si algún día llega una a 2x, se cambia el archivo y nada más: las
 * medidas de acá son las de pantalla, no las del archivo.
 *
 * ── LO QUE SE AFIRMA ───────────────────────────────────────────────────────
 * - `ads_read` es el ÚNICO permiso que pide el panel (`META_SCOPES` en
 *   `nuvlo-panel/src/lib/meta.ts`), y Meta lo muestra como ese solo renglón.
 *   Si el arreglo cambia, la captura y el texto mienten a la vez.
 * - La revisión de apps de Meta la afirma el dueño (`PRODUCT.md`) y va como
 *   dato, sin logo ni «aval».
 * - El enlace va a la ayuda de Meta sobre cómo quitar integraciones: abre sin
 *   sesión y en castellano.
 */

const AYUDA_INTEGRACIONES = "https://www.facebook.com/help/405094243235242";

export function Permiso() {
  return (
    <section
      className="i-seccion i-permiso"
      id="permiso"
      aria-labelledby="i-h-permiso"
    >
      <div className="i-marco">
        <div className="i-permiso-panel">
          <Entra className="i-permiso-lado">
            <h2 id="i-h-permiso" className="i-display">
              <span className="i-permiso-frase">Lee las campañas.</span>{" "}
              <span className="i-permiso-frase">No las toca.</span>
            </h2>
            <p className="i-bajada i-cabeza-bajada">
              Es lo que Meta muestra al conectar la cuenta: Nuvlo pide un solo
              permiso,{" "}
              <code className="i-permiso-codigo">ads_read</code>. No puede crear,
              editar ni pausar campañas, ni cambiar presupuestos.
            </p>
            <div className="i-permiso-pie">
              <p>Nuvlo pasó la revisión de apps de Meta para ese permiso.</p>
              <a
                className="i-permiso-enlace"
                href={AYUDA_INTEGRACIONES}
                target="_blank"
                rel="noopener noreferrer"
              >
                Cómo quitar el acceso desde{" "}
                <span className="i-permiso-enlace-fin">
                  Facebook
                  <Sale />
                </span>
                <span className="i-solo-lectores"> (se abre en otra pestaña)</span>
              </a>
            </div>
          </Entra>

          <Entra className="i-permiso-escena">
            {/* El azul nace de la ventana: el halo se enciende con ella.
                Elemento y no pseudo (*La Regla del Pseudo-elemento
                Compartido*). */}
            <div className="i-permiso-halo" aria-hidden="true" />
            {/* `unoptimized`: `next/image` la recomprimiría a WebP q75, y en
                una captura de interfaz eso deja halos en cada letra. */}
            <Image
              className="i-permiso-ventana"
              src="/meta/autorizacion-nuvlo.png"
              width={562}
              height={287}
              unoptimized
              alt="Pantalla de autorización de Meta: «Revisa la solicitud de acceso de Nuvlo», con un único permiso, «Acceder a tus anuncios de Facebook y estadísticas relacionadas», y los botones Atrás y Guardar."
            />
          </Entra>
        </div>
      </div>
    </section>
  );
}

function Sale() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M3 1.5h5.5V7M8.5 1.5 1.5 8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
