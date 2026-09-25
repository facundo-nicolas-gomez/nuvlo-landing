import { Entra } from "./Entra";

/**
 * EL PERMISO — la pantalla real de Meta, recortada (24/09/2026).
 *
 * ── DE DÓNDE VIENE ─────────────────────────────────────────────────────────
 * Fue un diodo con sello («parece de un estudio jurídico»), una tarjeta de
 * permisos propia, la captura entera —casi toda blanca, «se nota pegada»— y
 * una réplica en HTML, que el dueño leyó como pérdida de calidad. Queda la
 * captura real, recortada: la réplica era más limpia pero dejaba de ser
 * Meta, y lo que convence al trafficker escéptico es justamente que lo sea.
 *
 * ── QUÉ PANTALLA ES ────────────────────────────────────────────────────────
 * La de REVISAR el acceso de Nuvlo —por eso el botón dice «Guardar»—, no la
 * de la primera conexión (confirmado por el dueño, 25/09/2026). La bajada lo
 * dice así y no «al conectar»: una cita que se presenta como otro momento
 * del flujo deja de ser exacta aunque la imagen sea real.
 *
 * ── LOS DOS RECORTES ───────────────────────────────────────────────────────
 * Salen de la captura de 991×1182 que aportó el dueño con el zoom del
 * navegador al 175 % (al 200 % la ventana no entraba). En los dos, la foto de
 * perfil de quien autorizó queda fuera: es un dato personal en una página
 * pública.
 * - `autorizacion-nuvlo.png`, 983×458, para pantallas anchas: la ventana
 *   entera sin el blanco del medio. Arriba llega hasta 40px debajo del
 *   permiso (y=291) y abajo arranca 35px antes de la línea del pie (y=1006);
 *   entre esas filas no hay un píxel que no sea blanco, así que la unión no se
 *   ve. Sin el canto gris (4px a los lados, 5 arriba, 4 abajo), y la foto,
 *   tapada por un círculo gris. Se muestra a 562×262: 1,75 píxeles por píxel.
 * - `autorizacion-nuvlo-movil.png`, 901×286, para teléfono: sólo la barra, el
 *   título y el permiso. A 287px de ancho la ventana entera dejaba el renglón
 *   del permiso en 7px —la prueba se veía como una forma— y «Guardar» se
 *   ofrecía para tocar sin hacer nada. Sin el pie de Meta el mismo ancho
 *   alcanza para leerlo. El avatar y su flecha se pintaron de blanco para
 *   poder cortar a margen parejo del texto (x=905).
 *
 * ── LO QUE SE AFIRMA ───────────────────────────────────────────────────────
 * - `ads_read` es el ÚNICO permiso que pide el panel (`META_SCOPES` en
 *   `nuvlo-panel/src/lib/meta.ts`), y Meta lo muestra como ese solo renglón.
 *   Si el arreglo cambia, la captura y el texto mienten a la vez.
 * - Quitar el acceso deja a Nuvlo sin poder leer la cuenta y no cambia nada
 *   en Meta: `ads_read` no escribe, así que no hay nada que deshacer.
 * - La revisión de apps de Meta la afirma el dueño (`PRODUCT.md`) y va como
 *   dato, sin logo ni «aval». Va al final del pie: el último renglón es de
 *   confianza, no la salida.
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
              Es la pantalla de Meta donde se revisa el acceso de Nuvlo: un solo
              permiso, de sólo lectura,{" "}
              <code className="i-permiso-codigo">ads_read</code>. No puede crear,
              editar ni pausar campañas, ni cambiar presupuestos.
            </p>
            <div className="i-permiso-pie">
              <p>
                Si se quita el acceso, Nuvlo deja de leer la cuenta y en Meta no
                cambia nada.
              </p>
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
              <p className="i-permiso-revision">
                Nuvlo pasó la revisión de apps de Meta para ese permiso.
              </p>
            </div>
          </Entra>

          <Entra className="i-permiso-escena">
            {/* El azul nace de la ventana: el halo se enciende con ella.
                Elemento y no pseudo (*La Regla del Pseudo-elemento
                Compartido*). */}
            <div className="i-permiso-halo" aria-hidden="true" />
            {/* `<picture>` y no `next/image`: hay dos recortes distintos, no el
                mismo a dos tamaños, y `next/image` sólo sabe de lo segundo. Sin
                recompresión, que en una captura de interfaz deja halos en cada
                letra. Los `width`/`height` de cada uno reservan su proporción. */}
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="/meta/autorizacion-nuvlo-movil.png"
                width={901}
                height={286}
              />
              <img
                className="i-permiso-ventana"
                src="/meta/autorizacion-nuvlo.png"
                width={983}
                height={458}
                loading="lazy"
                decoding="async"
                alt="Pantalla de Meta para revisar el acceso de Nuvlo: «Revisa la solicitud de acceso de Nuvlo», con un único permiso, «Acceder a tus anuncios de Facebook y estadísticas relacionadas»."
              />
            </picture>
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
