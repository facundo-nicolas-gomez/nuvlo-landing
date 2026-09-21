"use client";

import NumberFlow from "@number-flow/react";
import { useState } from "react";
import {
  PRECIO_ESTANDAR_LABEL,
  PRECIO_ESTANDAR_USD,
  PRECIO_WHITE_LABEL_LABEL,
  PRECIO_WHITE_LABEL_USD,
} from "@/lib/precios";
import {
  ACCIONES_MUESTRA,
  AGENCIA_MUESTRA,
  CIERRE_MUESTRA,
  PIE_INFORME_ESTANDAR,
  PIE_INFORME_MARCA_BLANCA,
  RUTA_REPORTE_MUESTRA,
} from "@/lib/reporte-muestra";
import { Entra } from "./Entra";
import { CorteVertical } from "./CorteVertical";
import { Boton } from "./Piezas";
import { Conmutador } from "./Conmutador";
import { Contador, INICIAL, acotar, formato } from "./Calculadora";

/**
 * PRECIOS.
 *
 * ── NUNCA SIN MONEDA NI SIN UNIDAD ──────────────────────────────────────────
 * «USD 39 por cliente, al mes», con la etiqueta importada de `lib/precios.ts`.
 * Un `$` pelado es incorrecto por uno o dos órdenes de magnitud con alcance
 * LatAm, y «/mes» a secas se lee como abono fijo, que es otro precio.
 *
 * ── DE DÓNDE VIENEN LAS PIEZAS (dueño, 10/09/2026) ──────────────────────────
 * El dueño pasó el «pricing-section-1» de 21st.dev y de ahí quedan dos dibujos:
 * el conmutador con perilla (`Conmutador.tsx`) y la cifra que cuenta
 * (NumberFlow). Lo que se descartó entonces, con motivo, sigue afuera: el copete
 * con ícono, que el sistema prohíbe; el fondo radial y el botón con degradé
 * azul, porque el acento es uno y va en la acción; y el precio tachado de
 * «antes», porque no hay descuento que citar y PRODUCT.md no admite inventarlo.
 *
 * ── LA CUENTA EN UNA FRASE (17/09/2026, modo live) ──────────────────────────
 * «Atiendo [3] clientes con [Estándar | Marca Blanca]», a tamaño de titular, con
 * el contador y el conmutador adentro de la frase, y debajo el total grande con
 * su cuenta, su escolta y el botón. Antes eran dos columnas —lo que incluye a
 * la izquierda, los controles y el total a la derecha— y el total quedaba un
 * escalón abajo de todo. El dueño eligió ésta entre tres —el total al lado del
 * titular, una vista del informe que cambia con el plan, y la frase— y le sumó
 * la vista de la segunda: los dos pies estáticos de «Así cierra el informe»
 * pasan a ser «Lo que ve tu cliente», una ventana chica cuyo host y cuyo pie
 * cambian con el plan elegido arriba. La frase decide; la ventana muestra la
 * consecuencia.
 *
 * Con la frase se fueron el título «¿Cuántos clientes atendés?» y su nota: la
 * pregunta ahora es la oración, y «Atiendo» es la etiqueta del campo.
 *
 * ── LA CONSECUENCIA REACCIONA (17/09/2026, modo live) ───────────────────────
 * Al cambiar de plan, la ventana de «Lo que ve tu cliente» lo acusa: el campo
 * de dirección destella en petróleo, el host nuevo sube a su lugar y el pie se
 * escribe de izquierda a derecha; al cambiar de clientes, la multiplicación se
 * aclara. No hay otro movimiento en reposo: es la sección de la decisión, y
 * nada parpadea al lado del botón. Las animaciones se disparan porque esos
 * nodos llevan `key` con el plan o la cuenta: al cambiar, React los vuelve a
 * montar y la animación de entrada corre de nuevo. Al entrar la sección, la
 * ventana además llega desde la derecha, una sola vez. Elegido por el dueño
 * entre tres (esta respuesta, una entrada coreografiada y una pista en bucle),
 * con la llegada de la ventana tomada de la segunda. Ver `secciones.css`.
 *
 * ── EL TOTAL ES EL NÚMERO GRANDE, Y CUENTA ──────────────────────────────────
 * El precio por cliente vive dentro de cada opción del conmutador, y el total
 * es lo que la sección muestra grande, contando al cambiar de plan o de
 * clientes. Va con su multiplicación a la vista y con su escolta —«la parte del
 * mes que no podés facturar»—, sin sumar una sola cifra que PRODUCT.md no
 * respalde.
 */

/* Lo que incluye el plan. Son las cuatro filas que la matriz repetía idénticas
   en las dos columnas: si no distinguen planes, no son una comparación, son
   una lista. */
const INCLUYE = [
  "Clientes atendidos, sin tope",
  "Cuentas publicitarias por cliente, sin tope",
  "Reportes manuales y programados",
  "Página pública y PDF",
];

type Plan = "estandar" | "marca-blanca";

const PLANES: Record<
  Plan,
  { precio: number; etiqueta: string; pie: string; host: string }
> = {
  estandar: {
    precio: PRECIO_ESTANDAR_USD,
    etiqueta: PRECIO_ESTANDAR_LABEL,
    pie: PIE_INFORME_ESTANDAR,
    host: "panel.nuvloapp.com",
  },
  "marca-blanca": {
    precio: PRECIO_WHITE_LABEL_USD,
    etiqueta: PRECIO_WHITE_LABEL_LABEL,
    pie: PIE_INFORME_MARCA_BLANCA,
    host: "r.nuvloapp.com",
  },
};

/* El «check-check» de lucide, dibujado a mano: dos tildes desfasados. */
function TildeDoble() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 6 7 17l-5-5M22 10l-7.5 7.5L13 16"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Precios() {
  const [plan, setPlan] = useState<Plan>("estandar");
  const [texto, setTexto] = useState(String(INICIAL));
  const clientes = acotar(texto);
  const elegido = PLANES[plan];
  const total = clientes * elegido.precio;

  return (
    <section className="i-seccion" id="precios" aria-labelledby="i-h-precios">
      <div className="i-marco">
        {/* ── LA ENTRADA DEL COMPONENTE (dueño, 10/09/2026) ──────────────────
            El titular entra por palabras (`CorteVertical`) y cada bloque entra
            desde arriba con desenfoque, escalonado y rápido: Precios es la
            sección de la decisión, y el precio tiene que estar ahí cuando lo
            buscás. El estado servido es visible y con movimiento reducido no se
            mueve nada. */}
        <h2 id="i-h-precios" className="i-display">
          <CorteVertical demora={60} paso={70}>
            Se paga por cliente atendido.
          </CorteVertical>
        </h2>
        <Entra className="i-entra-arriba" demora={120}>
          <p className="i-bajada i-cabeza-bajada">
            La misma unidad con la que le facturás a él. Empezás con 3 reportes
            gratis, sin tarjeta.
          </p>
        </Entra>

        <Entra className="i-cuenta i-entra-arriba" demora={180}>
          {/* La frase no es un párrafo: lleva un campo y un grupo de opciones
              adentro, y un `<p>` no los admite (rompía la hidratación). */}
          <div className="i-cuenta-frase">
            <label htmlFor="i-clientes">Atiendo</label>
            <Contador id="i-clientes" texto={texto} onTexto={setTexto} />
            <span>{clientes === 1 ? "cliente" : "clientes"} con</span>
            <div className="i-cuenta-plan">
              <Conmutador
                nombre="Plan"
                valor={plan}
                onCambiar={(v) => setPlan(v as Plan)}
                opciones={[
                  {
                    valor: "estandar",
                    etiqueta: "Estándar",
                    detalle: PRECIO_ESTANDAR_LABEL,
                  },
                  {
                    valor: "marca-blanca",
                    etiqueta: "Marca Blanca",
                    detalle: PRECIO_WHITE_LABEL_LABEL,
                  },
                ]}
              />
            </div>
          </div>

          {/* Debajo de la frase, dos mitades —las mismas de la reja de abajo—:
              a la izquierda el resultado y la acción, a la derecha lo que ve
              el cliente con el plan elegido. La consecuencia queda al lado del
              número. Apilados, la mitad derecha quedaba vacía (dueño,
              17/09/2026: «quedó mucho aire vacío»). */}
          <div className="i-cuenta-cuerpo">
            <div className="i-cuenta-resultado">
              {/* ── EL NÚMERO GRANDE ES EL PRECIO, NO EL TOTAL ────────────────
                  Hasta el 18/09/2026 el titular de la sección era el total —USD
                  117 a 72px, contra los 13px del precio por cliente—, decisión
                  del 10/09. La crítica lo marcó y el dueño lo dio vuelta: en una
                  superficie que persuade, **el número que se lee primero es el
                  que el visitante se lleva y con el que compara**, y ese tiene
                  que ser el precio de Nuvlo. El total dependía del
                  contador, o sea que era un número grande que no era el precio
                  de nada.

                  La unidad viaja con el número, como pide `PRODUCT.md`: nunca
                  «USD 39» solo, siempre «por cliente, al mes». */}
              <p className="i-total-cifra i-cifra">
                <span className="i-solo-lectores">
                  {elegido.etiqueta} por cliente, al mes
                </span>
                <span aria-hidden="true">
                  <NumberFlow
                    value={elegido.precio}
                    prefix="USD "
                    locales="es-AR"
                    format={{ useGrouping: true }}
                  />
                </span>
                <span className="i-chico i-total-unidad" aria-hidden="true">
                  por cliente, al mes
                </span>
              </p>
              {/* El total, que ahora es el RESULTADO de la cuenta y no su
                  titular. Es el único que se anuncia, y su texto para lectores
                  dice las dos cosas —precio y total— en una sola frase: con un
                  `aria-live` en cada uno, mover el contador disparaba dos avisos
                  para un solo gesto. NumberFlow no expone nombre accesible, así
                  que el dibujo va `aria-hidden` y el número formateado va en el
                  texto sólo para lectores. */}
              <p
                key={`${clientes}-${plan}`}
                className="i-fino i-total-cuenta"
                aria-live="polite"
              >
                <span className="i-solo-lectores">
                  {elegido.etiqueta} por cliente, al mes. {clientes}{" "}
                  {clientes === 1 ? "cliente" : "clientes"}: USD{" "}
                  {formato.format(total)} al mes.
                </span>
                <span aria-hidden="true">
                  <span className="i-cifra">{clientes}</span>{" "}
                  {clientes === 1 ? "cliente" : "clientes"} ·{" "}
                  <span className="i-cifra">USD {formato.format(total)}</span> al
                  mes
                </span>
              </p>
              {/* La escolta del total: el marco que PRODUCT.md ya afirma —el
                  reporte es trabajo no facturable—, sin una cifra nueva. */}
              <p className="i-cuerpo i-total-escolta">
                El reporte es la parte del mes que no podés facturar.
              </p>
              <div className="i-total-accion">
                <Boton>Empezar gratis</Boton>
                <p className="i-chico">
                  <span className="i-cifra">3</span> reportes gratis, sin
                  tarjeta.
                </p>
              </div>
            </div>

            {/* ── LO QUE VE TU CLIENTE ────────────────────────────────────────
                La diferencia entre planes se muestra, no se describe: el host
                del enlace público y la línea con la que cierra el informe, los
                dos del plan elegido en la frase. Los hosts son los reales
                (`report-public-url.ts` del panel) y el pie sale de
                `reporte-muestra.ts`, que es de donde lo toma el informe.
                `aria-hidden` porque es una cita del documento, y la nota de
                Marca Blanca lo dice en palabras. */}
            <div className="i-vista-plan" aria-hidden="true">
              <p className="i-titulo">Lo que ve tu cliente</p>
              <div className="i-vista-ventana">
                <div className="i-vista-cromo">
                  <span className="i-vista-luces">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span key={plan} className="i-vista-url">
                    <span className="i-vista-host">{elegido.host}</span>
                    <span>{RUTA_REPORTE_MUESTRA}</span>
                  </span>
                </div>
                {/* La página pública al llegar al final: el último punto del
                    plan de acción entra cortado desde arriba, después el cierre
                    con la firma, la hoja termina sobre el campo y debajo va el
                    pie de la página. Son las clases del documento (`documento.css`), así
                    que se ve como el cierre del informe y no como un dibujo. */}
                <div className="i-vista-pagina">
                  <div className="i-doc i-vista-doc">
                    <div className="i-doc-in">
                      <div className="i-doc-bloque" data-parte="plan">
                        <ol className="i-acciones">
                          <li>
                            <span className="i-ordinal i-cifra">
                              {ACCIONES_MUESTRA.length}.
                            </span>
                            <span>{ACCIONES_MUESTRA[ACCIONES_MUESTRA.length - 1]}</span>
                          </li>
                        </ol>
                      </div>
                      <div className="i-doc-bloque i-doc-cierre">
                        <p>
                          {CIERRE_MUESTRA}
                          <span className="i-doc-firma">{AGENCIA_MUESTRA}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* El pie va debajo de la hoja, sobre el campo, como lo pone
                      el marco de la página pública (`report-view.tsx`): no es
                      una línea del documento, es la firma de la página. */}
                  <p key={plan} className="i-fino i-vista-pie">
                    {elegido.pie}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Entra>

        <div className="i-precios-cuerpo">
          <div className="i-incluye">
            <Entra className="i-entra-arriba" demora={220}>
              <h3 className="i-titulo">Lo que incluye</h3>
            </Entra>
            <ul className="i-incluye-lista">
              {INCLUYE.map((i, n) => (
                <Entra
                  key={i}
                  como="li"
                  className="i-entra-arriba"
                  demora={260 + n * 50}
                >
                  {/* El tilde doble del componente, en su disco: el dueño
                      rechazó el cuadradito iris de la rama acá. Ver
                      `.i-incluye-tilde`. */}
                  <span className="i-incluye-tilde" aria-hidden="true">
                    <TildeDoble />
                  </span>
                  <span className="i-cuerpo">{i}</span>
                </Entra>
              ))}
            </ul>
          </div>

          {/* Las dos notas, apiladas en la mitad derecha de la reja, al lado de
              lo que incluye: en su fila propia dejaban otra franja de aire abajo
              (dueño, 17/09/2026). */}
          <Entra className="i-precios-notas i-entra-arriba" demora={260}>
            {/* ── «TU PROPIO HOST» NO ERA VERDAD (12/09/2026) ────────────────
                Esto decía «por tu propio host de reportes» y se lee como un
                dominio de la agencia. No lo es: `reportPublicBaseUrl` del panel
                devuelve un único `NEXT_PUBLIC_REPORT_URL` para todos los
                usuarios de Marca Blanca, así que el host es de Nuvlo y es el
                mismo para todos. Lo que cambia de verdad —y alcanza— es que el
                enlace que abre el cliente no dice «panel». */}
            <p className="i-plan-nota">
              <strong>Marca Blanca</strong> cambia dos cosas: la línea con la
              que cierra el informe, y que la página pública salga por el host
              de reportes —<span className="i-cifra">r.nuvloapp.com</span> en
              vez de <span className="i-cifra">panel.nuvloapp.com</span>—. Es un
              dominio de Nuvlo sin el nombre del panel; todavía no se puede
              publicar en uno tuyo.
            </p>
            <p className="i-fino i-precios-nota">
              Con tarjeta internacional cobra Paddle como Merchant of Record: el
              cargo figura a nombre de Paddle en tu resumen. En Argentina
              también podés pagar en pesos con Mercado Pago. En los dos casos
              Nuvlo no toca datos de tarjeta, se cancela cuando quieras con
              acceso hasta el fin del período pago, y tenés 10 días desde que
              contratás para arrepentirte con reembolso total.
            </p>
          </Entra>
        </div>
      </div>
    </section>
  );
}
