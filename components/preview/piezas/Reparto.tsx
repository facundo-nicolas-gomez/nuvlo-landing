/**
 * 02 · QUÉ HACE SOLO, QUÉ HACÉS VOS.
 *
 * ── POR QUÉ NO SON TARJETAS ─────────────────────────────────────────────────
 * La versión anterior eran dos filas de tarjetas idénticas, una de cuatro y otra
 * de tres, todas de 297px. Es exactamente el patrón que había que evitar, y
 * encima repetido dos veces en la misma sección.
 *
 * Acá los dos carriles tienen tratamientos OPUESTOS, y ese contraste es el
 * argumento: lo de Nuvlo es un riel fino, técnico y gris, cuatro marcas en una
 * línea continua; lo tuyo son tres frases grandes sin caja, con el color de
 * acción. La forma dice quién hace qué antes de que se lea una palabra.
 */
const NUVLO = [
  { titulo: "Trae las métricas", texto: "De la cuenta de Meta Ads, del período que elegiste." },
  { titulo: "Calcula", texto: "KPI, tabla y variaciones, antes de que el modelo intervenga." },
  { titulo: "Redacta", texto: "Resumen, una alerta sólo si hay algo crítico, y hasta tres acciones." },
  { titulo: "Arma el entregable", texto: "El email, la página del informe y el PDF." },
];

const VOS = [
  {
    frase: "Elegís el período.",
    apoyo:
      "Lo demás ya quedó configurado antes: el email del cliente, el nombre de tu agencia y el modo.",
  },
  {
    frase: "Leés el borrador.",
    apoyo:
      "Podés abrirlo tal como lo va a abrir tu cliente, antes de que exista ningún envío.",
  },
  {
    frase: "Apretás Aprobar y Enviar.",
    apoyo: "Recién ahí sale. Es el único paso que Nuvlo no da solo.",
  },
];

export default function Reparto() {
  return (
    <section className="p-reparto" id="reparto" data-seccion="reparto">
      <div className="p-marco">
        <div className="p-reparto-cab p-revela">
          <h2 className="p-titulo-sec">Qué hace solo, qué hacés vos.</h2>
          <p className="p-bajada">
            Siete pasos. Cuatro no te necesitan y tres son tuyos, y esos tres son
            los que hacen que puedas poner tu nombre arriba.
          </p>
        </div>

        {/* Carril de Nuvlo: riel continuo, cuatro marcas, tipografía chica. */}
        <div className="p-riel p-revela">
          <span className="p-riel-et">Nuvlo, sin vos</span>
          <ol className="p-riel-pasos">
            {NUVLO.map((h) => (
              <li className="p-riel-paso" key={h.titulo}>
                <span className="p-riel-marca" aria-hidden="true" />
                <h3 className="p-riel-titulo">{h.titulo}</h3>
                <p className="p-riel-texto">{h.texto}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Lo tuyo: tres frases grandes, sin caja. */}
        <div className="p-tuyos p-revela">
          <span className="p-tuyos-et">Vos</span>
          <ol className="p-tuyos-lista">
            {VOS.map((v, i) => (
              <li className="p-tuyo" key={v.frase}>
                <span className="p-tuyo-n cifra" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="p-tuyo-frase">{v.frase}</p>
                <p className="p-tuyo-apoyo">{v.apoyo}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
