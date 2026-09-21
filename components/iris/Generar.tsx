"use client";

import { useState } from "react";
import {
  AYUDA_PERIODO_MUESTRA,
  CAMPANAS_ROTULO_MUESTRA,
  CAMPANAS_VALOR_MUESTRA,
  CUANDO_BLOQUEADO_MUESTRA,
  CUANDO_OPCIONES_MUESTRA,
  CUANDO_ROTULO_MUESTRA,
  CUENTAS_META_MUESTRA,
  DISPARADOR_MANUAL_MUESTRA,
  PERIODO_RANGO_MUESTRA,
} from "@/lib/reporte-muestra";
import { Periodo, utc, type Rango } from "./Periodo";

/**
 * GENERAR REPORTE — el diálogo del panel, dibujado.
 *
 * ── POR QUÉ REEMPLAZÓ AL CALENDARIO SUELTO (13/09/2026) ─────────────────────
 * La fila 1 de Tres pasos mostraba un calendario solo y la ficha del cliente al
 * lado, y afirmaba —con `PRODUCT.md`— que «al generar solo se elige el
 * período». Desde el 12/09/2026 el diálogo real pregunta tres cosas: el
 * período, las campañas y cuándo sale. Las dos últimas vienen con la respuesta
 * de siempre —toda la cuenta, ahora—, así que quien genera como todos los meses
 * sigue tocando sólo el calendario; pero la pantalla ya no es la que la landing
 * dibujaba. El dueño eligió mostrar el diálogo entero (opción A de la
 * propuesta) en vez de sumar un objeto más a la fila.
 *
 * ── LO QUE SE DIBUJA Y LO QUE NO ────────────────────────────────────────────
 * Título, cuenta, el calendario con sus atajos, la ayuda del período y la fila
 * de campañas y salida, con «Ahora» elegido. **No se dibujan los botones del
 * pie** («Cancelar» y «Generar»): el principal va en el acento, y un botón del
 * acento que no hace nada es exactamente lo que la cuarta crítica le sacó a la
 * fila 3 —y lo que la regla del acento llama decorar—. El diálogo termina en su
 * última pregunta, que es donde termina lo que el visitante tiene que ver.
 *
 * ── Y TAMPOCO SE DIBUJA LA CRUZ (dueño, 18/09/2026) ─────────────────────────
 * La «×» de cerrar estuvo hasta que la crítica contó las afordancias muertas de
 * este diálogo. Es el caso más puro de todos: una cruz **sólo** promete cerrar,
 * no informa nada, y acá no hay nada que cerrar. Sale por el mismo argumento
 * que ya había dejado afuera a «Cancelar» y «Generar»; lo que cambia es que
 * aquel argumento era sobre el acento y éste es sobre la promesa.
 *
 * «Programar» se ve y no se elige: elegido, el diálogo escribe que el reporte
 * sale sin revisión, y esta fila no es la del control sino la de generar. Ese
 * camino lo cuentan Control y Preguntas.
 *
 * Todo es dibujo bajo `aria-hidden`, salvo el calendario —que desde el
 * 18/09/2026 se toca de verdad (ver `Periodo.tsx`)— y la ayuda del período, que
 * es la frase que dice en palabras lo que la grilla dice con forma.
 *
 * ── LA AYUDA SIGUE AL RANGO ─────────────────────────────────────────────────
 * Era un literal fijo. Con el calendario vivo tiene que decir lo que el
 * visitante acaba de elegir, o vuelve a ser un dibujo —y peor, uno que
 * contradice a la grilla de al lado—. `AYUDA_PERIODO_MUESTRA` no se va: es el
 * literal verificado contra `generate-report-dialog.tsx` del panel, y se usa
 * para el rango inicial, de modo que el primer render sea idéntico al de antes.
 * De ahí sale también el formato de la frase que se arma al cambiar.
 */

/** «01 de jul de 2026», el formato del panel. */
const CORTO = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const INICIAL: Rango = {
  desde: utc(PERIODO_RANGO_MUESTRA.desde),
  hasta: utc(PERIODO_RANGO_MUESTRA.hasta),
};

function ayudaDe(rango: Rango) {
  if (rango.desde === INICIAL.desde && rango.hasta === INICIAL.hasta) {
    return AYUDA_PERIODO_MUESTRA;
  }
  const f = (ts: number) => CORTO.format(new Date(ts)).replace(/\./g, "");
  return `Del ${f(rango.desde)} al ${f(rango.hasta)}. Se compara con el período anterior del mismo largo.`;
}

export function Generar() {
  const [rango, setRango] = useState<Rango>(INICIAL);

  return (
    <div className="i-generar">
      <div className="i-generar-cabeza" aria-hidden="true">
        <div>
          <p className="i-generar-titulo">{DISPARADOR_MANUAL_MUESTRA}</p>
          <p className="i-generar-bajada">{CUENTAS_META_MUESTRA[0].nombre}</p>
        </div>
      </div>

      <div className="i-generar-cuerpo">
        <Periodo rango={rango} alElegir={setRango} />

        <p className="i-fino i-generar-ayuda" aria-live="polite">
          {ayudaDe(rango)}
        </p>

        {/* ── LAS DOS PREGUNTAS SON DIBUJO, Y VUELVEN A DECIRLO (19/09/2026) ──
            El 19/09 pasaron de `span` a `<button>` para que se entendieran como
            controles, en la misma tanda en que el calendario pasó a funcionar
            de verdad. Pero **sólo les llegó el cromo, no el comportamiento**:
            el campo de campañas no abre ningún menú —el dueño sacó el menú— y
            el segmentado no conmuta nada —«Programar» va `disabled` porque en
            el trial el panel lo gatea—. Quedaron dos `<button>` sin `onClick`.

            Medido sobre la home: eran las dos únicas paradas de teclado muertas
            de toda la pieza. Un `<button>` sin handler se anuncia «botón», se
            enfoca, se aprieta con Enter y no pasa nada; y como los 39 controles
            de arriba sí responden, el visitante llega a éstos ya entrenado a
            confiar. Es el caso exacto del *Don't* de la afordancia que sólo
            promete, y el más caro, porque viene después de la que cumple.

            Vuelven a ser texto. No se les puso `tabIndex={-1}`: eso los saca
            del Tab pero les deja el rol de botón en el árbol de accesibilidad
            —un lector los sigue anunciando y activando— y encima deja algo que
            el mouse aprieta y el teclado no alcanza. El tag es la mentira; el
            foco es sólo su síntoma.

            Lo que informan no cambia y se sigue leyendo: la caja del panel, su
            flecha y su realce al pasar el mouse siguen ahí (decisión del dueño,
            19/09), «Ahora» sigue siendo la hoja elegida sobre el hundido, y
            para lector de pantalla el par va `aria-hidden` con una frase que
            dice cuál está elegido y cuál no —el mismo recurso que usa el total
            de Precios—. */}
        <div className="i-generar-campos">
          {/* ── CAMPAÑAS: SIN MENÚ, PERO CON CARA DE CAMPO (19/09/2026) ──────
              Estuvo abriendo un menú de selección múltiple; el dueño sacó el
              menú y quedó el dato impreso, sin caja ni filete. Esa vuelta duró
              poco: «no se entiende que es un botón». Y es cierto —al lado del
              segmentado, la reja de dos celdas quedaba con una mitad control y
              la otra texto suelto—.

              La objeción que había justificado sacarle el cromo era que un
              elemento que responde al mouse y no responde al click promete algo
              que no entrega. La retiró el propio dueño al pedir que TODOS los
              elementos de la ficha se iluminen: acá el click no abre nada, y lo
              que la caja promete —que el alcance se elige— es cierto.

              Sigue sin menú, y «Toda la cuenta» sigue siendo la respuesta por
              defecto del panel.

              Lo que se revisó a la noche es el TAG, no la caja: el cromo que el
              dueño pidió está entero y por eso sigue acá arriba escrito, pero
              un `<button>` sin `onClick` era además una parada de teclado
              muerta y un «botón» anunciado a los lectores. Va como `<p>`. */}
          <div>
            <p className="i-generar-etiqueta">{CAMPANAS_ROTULO_MUESTRA}</p>
            {/* Rótulo y valor, uno detrás del otro: el lector lee «Campañas» y
                «Toda la cuenta» sin que nada prometa abrirse. */}
            <p className="i-generar-campo">
              {CAMPANAS_VALOR_MUESTRA}
              {/* La misma flecha que las del calendario, girada: una sola forma
                  de flecha en la ficha. */}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path
                  d="M2.5 4.5 6 8l3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
          </div>

          <div>
            <p className="i-generar-etiqueta">{CUANDO_ROTULO_MUESTRA}</p>
            {/* ── «PROGRAMAR» VA APAGADO, COMO EN EL PANEL (dueño, 19/09/2026) ──
                Estuvo un rato alternando, y era el peor control de la ficha por
                dos motivos que se suman.

                Mentía: en el panel, elegir «Programar» REVELA una fila con el
                campo «Día», y acá sólo se movía el resaltado. Y encima mentía
                después de que el calendario enseñó a confiar, que es cuando una
                afordancia muerta sale más cara.

                Pero el motivo de fondo es de producto, y se verificó en el
                código del panel: monta ese botón con
                `disabled={!puedeProgramar}` y `puedeProgramar` sale de
                `tieneSuscripcionActiva(user)`. O sea que **en el trial —el plan
                que esta página vende— el botón está gris**. Mostrarlo encendido
                le prometía al visitante una función que su primer día no va a
                tener.

                Apagado deja de ser una afordancia muerta y pasa a ser una
                afirmación: programar existe, y es parte de pagar. La línea de
                ayuda es la del panel, literal.

                Lo dice `data-bloqueado` y ya no `:disabled`, porque el par dejó
                de ser de botones: «Ahora» tampoco conmutaba nada —no había a
                qué conmutar— y era la otra parada de teclado muerta. */}
            {/* El dibujo va `aria-hidden` y la frase de al lado dice lo mismo
                en palabras. El `title` del panel se fue con el botón: en un
                elemento que no se enfoca no lo anuncia nadie, y la nota de
                abajo ya lo dice en texto a la vista. */}
            <p className="i-solo-lectores">
              {CUANDO_OPCIONES_MUESTRA[0]}: elegido. {CUANDO_OPCIONES_MUESTRA[1]}: no
              disponible.
            </p>
            <div className="i-generar-segmentos" aria-hidden="true">
              <span data-elegido="">{CUANDO_OPCIONES_MUESTRA[0]}</span>
              <span data-bloqueado="">{CUANDO_OPCIONES_MUESTRA[1]}</span>
            </div>
            <p className="i-fino i-generar-nota">{CUANDO_BLOQUEADO_MUESTRA}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
