import {
  AGENCIA_MUESTRA,
  ASUNTO_MAIL_MUESTRA,
  BOTON_MAIL_MUESTRA,
  CUERPO_MAIL_MUESTRA,
  DESDE_MUESTRA,
  EMAIL_CLIENTE_MUESTRA,
  HASTA_MUESTRA,
  REMITENTE_MAIL_MUESTRA,
  SALUDO_MAIL_MUESTRA,
} from "@/lib/reporte-muestra";
import { Entra } from "./Entra";

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
 * ── LAS OTRAS DOS FORMAS VAN COMO TEXTO ─────────────────────────────────────
 * Página pública y PDF son el mismo documento del héroe, que el visitante ya
 * vio entero. Dibujarlo dos veces más sería llenar la sección con el mismo
 * objeto; dos líneas dicen lo que cambia, que es dónde vive y cuánto dura.
 */

const FORMAS = [
  {
    termino: "Una página pública",
    definicion:
      "El botón del mail abre el informe en su propia página, con un enlace que vence a los 90 días. En Marca Blanca sale por tu propio host de reportes.",
  },
  {
    termino: "Y un PDF",
    definicion:
      "Con las mismas secciones, para bajar desde esa página. Es el que tu cliente archiva.",
  },
];

export function Entregable() {
  return (
    <section className="n-seccion" id="entregable">
      <div className="n-marco n-entregable-fila">
        <Entra>
          <h2 className="n-display">Lo que recibe tu cliente.</h2>
          <p className="n-bajada n-cabeza-bajada">
            Un mail firmado por vos, sin contenido del reporte ni marca de
            Nuvlo en el cuerpo. Y desde ahí, el informe.
          </p>

          <dl className="n-formas">
            {FORMAS.map((f) => (
              <div key={f.termino} className="n-forma">
                <dt className="n-titulo">{f.termino}</dt>
                <dd className="n-cuerpo">{f.definicion}</dd>
              </div>
            ))}
          </dl>
        </Entra>

        <Entra demora={120} className="n-hoja n-mail">
          <dl className="n-mail-cabeza">
            <dt>De</dt>
            <dd>
              <span className="n-mail-remitente">{AGENCIA_MUESTRA}</span>{" "}
              <span className="n-mail-direccion">
                &lt;{REMITENTE_MAIL_MUESTRA}&gt;
              </span>
            </dd>
            <dt>Para</dt>
            <dd>{EMAIL_CLIENTE_MUESTRA}</dd>
            <dt>Asunto</dt>
            <dd>{ASUNTO_MAIL_MUESTRA}</dd>
          </dl>
          <div className="n-mail-cuerpo">
            <p>{SALUDO_MAIL_MUESTRA}</p>
            <p>
              {CUERPO_MAIL_MUESTRA.antes}
              <strong>{DESDE_MUESTRA}</strong>
              {CUERPO_MAIL_MUESTRA.entre}
              <strong>{HASTA_MUESTRA}</strong>
              {CUERPO_MAIL_MUESTRA.despues}
            </p>
            <span className="n-mail-boton" aria-hidden="true">
              {BOTON_MAIL_MUESTRA}
            </span>
            <p className="n-mail-firma n-chico">
              Saludos,
              <strong>{AGENCIA_MUESTRA}</strong>
            </p>
          </div>
        </Entra>
      </div>
    </section>
  );
}
