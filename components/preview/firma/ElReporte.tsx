import {
  ACCIONES_MUESTRA,
  ALERTA_MUESTRA,
  RESUMEN_MUESTRA,
} from "@/lib/reporte-muestra";
import { Entra, Fila } from "./Entra";
import { Punto } from "./Piezas";

/**
 * LO QUE DICE — el análisis, no el documento.
 *
 * ── POR QUÉ ESTA SECCIÓN CAMBIÓ DE TEMA ────────────────────────────────────
 * Mostraba el reporte otra vez. El héroe ya muestra ese documento, así que por
 * más que acá se armara con el scroll seguían siendo **el mismo objeto dos
 * veces**, y la segunda no agregaba nada que la primera no dijera.
 *
 * Lo que el héroe NO deja hacer es LEER el informe. El documento está ahí como
 * objeto —se ve que existe, que es denso, que tiene tablas—, pero el visitante
 * nunca llega a leer una línea del análisis. Y el análisis es la única parte
 * del producto que no aparece en ninguna otra sección: el panel se ve en Cómo
 * sale, el mail en El entregable, las cifras en el héroe. La prosa, en ningún
 * lado.
 *
 * Así que la sección deja de mostrar el reporte y muestra **lo que el reporte
 * dice**: el resumen ejecutivo, la alerta y el plan de acción, con las palabras
 * exactas que salen de `lib/reporte-muestra.ts`, a tamaño de lectura y sin
 * ningún mockup. Es texto porque lo que se está enseñando es texto.
 *
 * De paso arma el argumento de Control, que viene después: acá se ve QUÉ
 * escribe la IA, y allá por qué eso no puede inventar un número.
 *
 * ── LA ALTERNATIVA QUE SE DESCARTÓ ─────────────────────────────────────────
 * Sacar la sección. Funcionaba —el héroe, Cómo sale y El entregable cubren el
 * producto— pero dejaba la página sin mostrar nunca lo que el trafficker
 * realmente entrega: un análisis escrito. La prueba de que el reporte no es
 * una planilla con colores es que se puede leer.
 *
 * ── QUIETA ─────────────────────────────────────────────────────────────────
 * Sin scroll atado. Entra sola al llegar, escalonada, y se queda quieta para
 * que se pueda leer, que es todo lo que esta sección pide.
 */

export function ElReporte() {
  return (
    <section className="f-seccion f-lq-seccion" id="reporte">
      <div className="f-marco">
        <Entra className="f-lq-cabeza">
          <h2 className="f-display">
            No es una planilla con colores.{" "}
            <span className="f-marca-frase">Se lee.</span>
          </h2>
          <p className="f-bajada f-lq-bajada">
            Esto es el análisis del ejemplo, con las palabras que sale a
            escribir. Los números los calculó el código; esto es lo único que
            redacta la IA.
          </p>
        </Entra>

        <div className="f-lq-cuerpo">
          <Entra className="f-lq-resumen">
            <p className="f-rotulo">Resumen ejecutivo</p>
            {RESUMEN_MUESTRA.map((parrafo, i) => (
              <Fila key={i} orden={i} className="f-lq-parrafo">
                {parrafo}
              </Fila>
            ))}
          </Entra>

          {/* La alerta lleva el punto de la marca: es lo único del informe que
              pide una decisión, y ésa es la definición del marcador. */}
          <Entra className="f-lq-alerta">
            <Punto />
            <p className="f-bajada">{ALERTA_MUESTRA}</p>
          </Entra>

          <Entra como="ol" className="f-lq-acciones">
            {ACCIONES_MUESTRA.map((accion, i) => (
              <Fila key={accion} orden={i} como="li" className="f-lq-accion">
                <span className="f-lq-numero f-cifra">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{accion}</span>
              </Fila>
            ))}
          </Entra>

          <Entra className="f-lq-pie">
            <p className="f-fino">
              Hasta tres acciones, nunca más. Si el período no da para tres, el
              informe trae las que hay.
            </p>
          </Entra>
        </div>
      </div>
    </section>
  );
}
