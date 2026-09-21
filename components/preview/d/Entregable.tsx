import { AGENCIA_MUESTRA, CLIENTE_MUESTRA } from "@/lib/reporte-muestra";
import { Revelar } from "./Revelar";

/**
 * EL ENTREGABLE — las tres formas en que existe, según `PRODUCT.md`.
 *
 * ── POR QUÉ EL MAIL ESTÁ DIBUJADO Y NO PEGADO ───────────────────────────────
 * Hay una captura real de Gmail en `public/mockups/image00003.png`, y no se usa
 * (decisión del dueño, 03/09/2026). Sirve como referencia de QUÉ información
 * lleva el mail y en qué orden —remitente, asunto, saludo, período, botón,
 * firma—, y eso es lo que está redibujado acá con el sistema de esta página.
 * Los colores de esa captura son de la paleta retirada y no cuentan.
 *
 * Además la captura contradice tres cosas que el sitio afirma: el remitente
 * dice «Nuvlo Media» (choca de frente con la promesa de marca blanca), la
 * palabra «Nuvlo» sale resaltada en amarillo por venir de una búsqueda, y el
 * asunto usa rayas, que el repo reserva al marcador de dato faltante. Acá el
 * remitente es la agencia, no hay resaltado, y el rango va con guion.
 *
 * ── LA COMPOSICIÓN ──────────────────────────────────────────────────────────
 * Un objeto grande —el mail— y dos notas al costado. No son tres tarjetas
 * hermanas: el mail es lo que el cliente recibe, y las otras dos son lo que
 * pasa después de que hace clic.
 */
export default function Entregable() {
  return (
    <section className="e-seccion d-seccion-abre" id="entregable">
      <div className="d-marco">
        <Revelar className="e-cabeza">
          <h2 className="t-display">
            Tu cliente no ve Nuvlo. Te ve a vos.
          </h2>
          <p className="t-bajada medida-bajada">
            El mail sale con el nombre de tu agencia, sin una línea de contenido
            nuestro. Es el entregable de tu estudio, no el de una herramienta.
          </p>
        </Revelar>

        <div className="e-fila">
          <Revelar className="e-mail-col" eje="escala">
            {/* El mail, con el sistema de esta página. */}
            <div className="e-mail">
              <div className="e-mail-cabeza">
                <div className="e-mail-de">
                  <span className="e-mail-avatar" aria-hidden="true">
                    {AGENCIA_MUESTRA.charAt(0)}
                  </span>
                  <div>
                    <p className="t-titulo">{AGENCIA_MUESTRA}</p>
                    <p className="t-fino">para {CLIENTE_MUESTRA}</p>
                  </div>
                </div>
                <p className="t-fino cifra">23 ago</p>
              </div>

              <p className="e-mail-asunto">
                {AGENCIA_MUESTRA} · Reporte de Meta Ads · 1 jul 2026 - 31 jul
                2026
              </p>

              <div className="e-mail-cuerpo">
                <p className="t-cuerpo">Hola {CLIENTE_MUESTRA},</p>
                <p className="t-cuerpo">
                  Tu reporte de Meta Ads del período{" "}
                  <strong>1 jul 2026</strong> a <strong>31 jul 2026</strong> ya
                  está listo.
                </p>
                <span className="e-mail-boton">Ver reporte completo</span>
                <p className="t-chico e-mail-firma">{AGENCIA_MUESTRA}</p>
              </div>

              <p className="e-mail-pie t-fino">
                Ejemplo. Así queda el mail en el plan Marca Blanca: saludo,
                período, botón y tu firma. Nada más.
              </p>
            </div>
          </Revelar>

          <div className="e-notas">
            <Revelar demora={0.06}>
              <article className="e-nota">
                <h3 className="t-titulo">Una página que sólo abre él</h3>
                <p className="t-cuerpo">
                  El botón lleva a una página pública con el reporte entero. No
                  la indexa ningún buscador, no necesita cuenta, y el enlace
                  vence a los 90 días.
                </p>
              </article>
            </Revelar>
            <Revelar demora={0.12}>
              <article className="e-nota">
                <h3 className="t-titulo">Y un PDF para archivar</h3>
                <p className="t-cuerpo">
                  Con las mismas secciones y los mismos números que la página.
                  Se lo descarga de ahí mismo.
                </p>
              </article>
            </Revelar>
          </div>
        </div>
      </div>
    </section>
  );
}
