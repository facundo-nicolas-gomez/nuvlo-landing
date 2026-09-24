import Link from "next/link";
import {
  AGENCIA_MUESTRA,
  ASUNTO_MAIL_MUESTRA,
  BOTON_MAIL_MUESTRA,
  CUERPO_MAIL_MUESTRA,
  DESDE_MUESTRA,
  HASTA_MUESTRA,
  HORA_LECTURA_MAIL_MUESTRA,
  RECORRIDO_MUESTRA,
  REMITENTE_MAIL_MUESTRA,
  SALUDO_MAIL_MUESTRA,
} from "@/lib/reporte-muestra";
import { Entra } from "./Entra";
import { Navegador } from "./Navegador";
import { Reporte } from "./Reporte";
import { iniciales, Telefono } from "./Telefono";

/**
 * EL ENTREGABLE — lo que recibe el cliente del trafficker.
 *
 * ── EL MAIL ES LITERAL ──────────────────────────────────────────────────────
 * Cada string sale de `lib/reporte-muestra.ts`, que los copia del template
 * real del panel (`report-email.ts`). Mostrar un mail inventado en la sección
 * que promete marca propia sería prometer un entregable que nadie recibe.
 *
 * ── LO QUE EL MAIL NO LLEVA, Y LO QUE SÍ ────────────────────────────────────
 * El cuerpo no lleva marca de Nuvlo ni contenido del reporte. El remitente
 * muestra el nombre de la agencia sobre el dominio de Nuvlo, en los dos
 * planes, y se muestra tal cual: es la parte que un competidor esconde.
 *
 * ── TRES TIEMPOS, TODOS DEL LADO DEL CLIENTE (17/09/2026, modo live) ────────
 * Le llega → lo abre → ve el informe. Hasta este día la escena decía «Lo que
 * sale», «Lo que le llega» y «Lo que abre», y la ventana del mail llevaba una
 * cabecera De / Para / Asunto: la vista de quien lo manda. El dueño preguntó si
 * «Lo que sale» estaba bien, si lo que se ve es el mail que le llega al
 * cliente, y no lo estaba. El titular es «Lo que recibe tu cliente», así que
 * los tres tiempos pasan en su bandeja: el teléfono con la fila de la agencia,
 * el mismo mail abierto en Gmail —la app en la que le llegó— y la página
 * pública a la que lleva el botón. La decisión del 07/09 («son el envío y la
 * recepción») queda superada por ésta.
 *
 * El mail abierto sigue mostrando la dirección al lado del nombre, como la
 * muestra Gmail en escritorio: no es una licencia, y es lo que no se esconde.
 * La hora sale de `RECORRIDO_MUESTRA`, la misma de la fila del teléfono, y
 * el «hace 14 minutos» es la distancia hasta la hora del teléfono: el cliente
 * lo abre a la hora que marca su pantalla.
 *
 * ── LA PÁGINA PÚBLICA LLEVA SU CABEZAL ─────────────────────────────────────
 * El informe se muestra como lo sirve `report-view.tsx` del panel: una barra
 * blanca con el nombre de la agencia y «Descargar PDF», y la hoja debajo. Es
 * lo primero que ve el cliente al tocar el botón, y es la marca del
 * trafficker encima de todo; el botón es la otra forma que la columna nombra.
 *
 * ── LA SILUETA ──────────────────────────────────────────────────────────────
 * Dos filas que siguen el recorrido: arriba llega y se abre —el teléfono a su
 * tamaño, cortado al alto del mail, y el mail al ancho de un panel de lectura—;
 * abajo, el informe al mismo ancho, con las dos formas en la columna del
 * teléfono. En tres columnas no entraba: el mail quedaba en 370px a 1440 y el
 * dueño lo leyó «todo apretado».
 *
 * ── EL RECORRIDO, EN BUCLE (17/09/2026, modo live) ──────────────────────────
 * Una vuelta de 12 segundos cuenta los tres tiempos en orden: baja el aviso del
 * mail en el teléfono y se funde en la fila de la agencia, la fila entra a la
 * bandeja, se dibuja la línea hacia «Lo abre», se toca «Ver reporte completo» y
 * se levanta el informe, con el destello de la dirección al final. Después
 * descansa. El dueño eligió la secuencia entre tres y le sumó la notificación,
 * que era otra de las variantes. Vive entera en `secciones.css`; en reposo y
 * con movimiento reducido la escena se ve quieta y completa.
 *
 * ── LAS OTRAS DOS FORMAS VAN COMO TEXTO ─────────────────────────────────────
 * Página pública y PDF son el mismo documento del héroe, que el visitante ya
 * vio con su URL. Dos líneas dicen lo que cambia: dónde vive y cuánto dura.
 */

/** Minutos entre dos horas «hh:mm» del mismo día. */
function minutosEntre(desde: string, hasta: string) {
  const [hd, md] = desde.split(":").map(Number);
  const [hh, mh] = hasta.split(":").map(Number);
  return hh * 60 + mh - (hd * 60 + md);
}

const FORMAS = [
  {
    termino: "Una página pública",
    // El host de Marca Blanca se fue de acá el 13/09/2026: lo dice Precios,
    // que es donde se elige el plan, y acá alargaba la definición a cuatro
    // renglones con un dato que no es de «lo que recibe tu cliente».
    definicion:
      "El botón del correo abre el reporte en su propia página. El enlace vence a los 90 días.",
  },
  {
    termino: "Y un PDF",
    definicion:
      "Con las mismas secciones, para descargar desde esa página. Es el que tu cliente archiva.",
  },
];

export function Entregable() {
  const enviado = RECORRIDO_MUESTRA[2];
  const hace = minutosEntre(enviado.hora, HORA_LECTURA_MAIL_MUESTRA);

  return (
    <section
      className="i-seccion i-entregable"
      id="entregable"
      aria-labelledby="i-h-entregable"
    >
      <div className="i-marco i-entregable-fila">
        <Entra>
          <h2 id="i-h-entregable" className="i-display">
            Lo que recibe tu cliente.
          </h2>
          <p className="i-bajada i-cabeza-bajada">
            Un correo breve, a tu nombre o al de tu agencia, con un botón al
            reporte. Sin marca de Nuvlo en el cuerpo.
          </p>
        </Entra>

        <Entra demora={220} className="i-entregable-escena i-entra-cascada">
          <div className="i-tiempo i-tiempo-llega">
            <p className="i-rotulo i-escena-rotulo">
              Le llega
              {/* La línea lleva de «Le llega» a «Lo abre», que es el paso que
                  la vista no hace sola: el teléfono y el mail están lado a
                  lado. Del mail al informe se baja, y eso ya se lee. */}
              <span className="i-escena-flecha" aria-hidden="true">
                <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
                  <path
                    d="M1 1l4.5 4L1 9"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </p>
            <div className="i-tel-recorte">
              <Telefono />
              {/* El aviso del sistema: baja, se sostiene y se funde en la fila de
                  la agencia. Lo pone el teléfono y no Gmail ni Nuvlo, así que no
                  afirma nada del producto; el ícono es un sobre genérico y no la
                  marca de Gmail. Invisible en reposo: sin animación no está. */}
              <div className="i-tel-aviso" aria-hidden="true">
                <span className="i-tel-aviso-app">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2.5" />
                    <path d="m3.5 7 8.5 6 8.5-6" />
                  </svg>
                </span>
                <span className="i-tel-aviso-texto">
                  <strong>{AGENCIA_MUESTRA}</strong>
                  <span>{ASUNTO_MAIL_MUESTRA}</span>
                </span>
                <span className="i-tel-aviso-hora">ahora</span>
              </div>
            </div>
          </div>

          <div className="i-tiempo i-tiempo-abre">
            <p className="i-rotulo i-escena-rotulo">Lo abre</p>
            <div className="i-mail-recorte">
              <div className="i-mail i-gmail">
                <div className="i-gmail-titulo">
                  <p className="i-gmail-asunto">{ASUNTO_MAIL_MUESTRA}</p>
                  <span className="i-gmail-etiqueta" aria-hidden="true">
                    Recibidos
                  </span>
                </div>
                <div className="i-gmail-de">
                  <span className="i-gmail-avatar" aria-hidden="true">
                    {iniciales(AGENCIA_MUESTRA)}
                  </span>
                  <p className="i-gmail-remitente">
                    <strong>{AGENCIA_MUESTRA}</strong>{" "}
                    <span>&lt;{REMITENTE_MAIL_MUESTRA}&gt;</span>
                  </p>
                  <p className="i-gmail-para">
                    para mí
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2.5 4l2.5 2.5L7.5 4"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </p>
                  <span className="i-gmail-acciones" aria-hidden="true">
                    <span className="i-gmail-hora i-cifra">
                      {enviado.hora} <span>(hace {hace} minutos)</span>
                    </span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 3.75 2.55 5.35 5.85.7-4.3 4 1.15 5.8L12 16.75l-5.25 2.85 1.15-5.8-4.3-4 5.85-.7z" />
                    </svg>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.5 7.5 4.5 12l5 4.5M5 12h9.5a5 5 0 0 1 5 5v1" />
                    </svg>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="5.5" r="1.6" />
                      <circle cx="12" cy="12" r="1.6" />
                      <circle cx="12" cy="18.5" r="1.6" />
                    </svg>
                  </span>
                </div>
                <div className="i-mail-cuerpo">
                  <p>{SALUDO_MAIL_MUESTRA}</p>
                  <p>
                    {CUERPO_MAIL_MUESTRA.antes}
                    <strong>{DESDE_MUESTRA}</strong>
                    {CUERPO_MAIL_MUESTRA.entre}
                    <strong>{HASTA_MUESTRA}</strong>
                    {CUERPO_MAIL_MUESTRA.despues}
                  </p>
                  <span className="i-mail-boton" aria-hidden="true">
                    {BOTON_MAIL_MUESTRA}
                  </span>
                  <p className="i-mail-firma i-chico">
                    Saludos,
                    <strong>{AGENCIA_MUESTRA}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* La URL va aprobada porque es lo que el cliente abre: la página
              pública del plan Estándar, no la vista previa. */}
          <div className="i-tiempo i-tiempo-informe">
            <p className="i-rotulo i-escena-rotulo">Y ve el reporte</p>
            <div className="i-abre-recorte">
              {/* El envoltorio lleva la sombra y el recorte la máscara: una
                  máscara recorta también la sombra del elemento que enmascara,
                  así que van en dos nodos. Ver `.i-abre-sombra`. */}
              <div className="i-abre-sombra">
                <div className="i-abre">
                  <Navegador aprobado>
                    <div className="i-publica-cabezal" aria-hidden="true">
                      <div className="i-publica-cabezal-in">
                        <span className="i-publica-agencia">
                          {AGENCIA_MUESTRA}
                        </span>
                        <span className="i-publica-pdf">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                          </svg>
                          Descargar PDF
                        </span>
                      </div>
                    </div>
                    <Reporte />
                  </Navegador>
                </div>
              </div>
            </div>
          </div>

          <dl className="i-formas">
            {FORMAS.map((f) => (
              <div key={f.termino} className="i-forma">
                <dt className="i-titulo">{f.termino}</dt>
                <dd className="i-cuerpo">{f.definicion}</dd>
              </div>
            ))}
          </dl>

          {/* ── LA ENTRADA A `/reporte` (19/09/2026) ──────────────────────────
              El enlace va ACÁ, al lado de la escena, y no adentro del mail.
              «Ver reporte completo» del mail sigue siendo un `span` dibujado
              bajo `aria-hidden`: el mail es una CITA de Gmail, y si su botón
              navegara el visitante estaría tocando el botón de un Gmail de
              mentira para aterrizar en nuvloapp.com. Sería además el único
              elemento de esta escena que responde, que es el defecto que
              `DESIGN.md` ya registró —«el visitante aprende que los dibujos no
              responden y no prueba el que sí»—.

              Un enlace del sitio, afuera del aparato, dice la verdad: el que
              ofrece es Nuvlo y no Gmail. */}
          <p className="i-entregable-entero">
            <Link className="i-entregable-entero-enlace" href="/reporte">
              Ver el reporte completo
            </Link>
          </p>
        </Entra>
      </div>
    </section>
  );
}
