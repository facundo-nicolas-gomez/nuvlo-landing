"use client";

/**
 * EL CONTADOR — cuántos clientes atendés.
 *
 * ── DESDE EL 10/09/2026 ES UN CONTROL, NO LA CUENTA ─────────────────────────
 * Hasta acá este archivo guardaba el estado, hacía la multiplicación y
 * dibujaba el total. Cuando Precios pasó a tener dos controles —el plan y la
 * cantidad de clientes— con un solo total que depende de los dos, el estado
 * subió a `Precios.tsx`, que es el padre común, y esto quedó como lo que el
 * sistema llama un control de verdad: la caja con el menos, el campo y el más.
 * Las reglas de acotar y de mover se quedan acá, exportadas, porque son del
 * control y no del precio.
 *
 * ── POR QUÉ ADENTRO DE LA HOJA, Y NO UN DESLIZADOR ──────────────────────────
 * El deslizador es impreciso con el dedo y obliga a inventar un techo, que
 * contradiría el «sin tope» que la sección dice dos líneas más arriba. El
 * freelance sabe cuántos clientes tiene: un campo numérico con dos botones se
 * escribe, se toca y entra por teclado. El tope de 999 es del campo, no del
 * plan: existe para que un número absurdo no rompa la fila.
 *
 * ── SIN JAVASCRIPT ──────────────────────────────────────────────────────────
 * El servidor emite el arranque entero y verdadero —5 clientes y su total—.
 * Los botones no hacen nada, pero no hay un solo dato falso en pantalla.
 */

/* ── VUELVE A 5 (dueño, 18/09/2026) ────────────────────────────────────────
   Arrancó en 5, el dueño lo bajó a 3 el 08/09/2026 después de mirarlo en 10, y
   el motivo era bueno: con la cartera grande **el total** empezaba a pedir un
   contexto que la página no tiene —cuánto le factura él a cada cliente— y que
   no puede inventar.

   **Ese motivo era sobre el total cuando el total era el número de 72px.** El
   18/09 el titular pasó a ser el precio por cliente y el total bajó a una línea
   de 16 que reporta el resultado. Un total más grande ya no grita, así que la
   razón para achicar el arranque se fue con el tamaño.

   Y quedó viva la razón contraria: 3 es también el tope de reportes de la
   prueba, y «Atiendo 3 clientes» convivía con «3 reportes gratis, sin tarjeta»
   a doscientos píxeles, dos treses sin relación que el visitante tiene que
   descubrir que no son el mismo. Cinco saca la colisión, deja ver la
   multiplicación trabajando —en 1 la línea del resultado repetiría el número
   grande y el contador parecería no hacer nada— y no afirma nada sobre nadie:
   el que tiene más, sube. */
export const INICIAL = 5;
export const TOPE = 999;

/* El separador de miles es el mismo del informe: «USD 1.170 al mes». */
export const formato = new Intl.NumberFormat("es-AR");

/* El texto del campo a un número usable: entero, al menos 1, hasta el tope. */
export function acotar(texto: string) {
  return Math.min(TOPE, Math.max(1, Number.parseInt(texto, 10) || 1));
}

/* Un paso arriba o abajo, acotado: sin esto, bajar desde 1 dejaba un 0 escrito
   en el campo mientras la cuenta seguía en 1. */
function mover(texto: string, paso: number) {
  return String(Math.min(TOPE, Math.max(1, acotar(texto) + paso)));
}

function Signo({ mas }: { mas?: boolean }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={mas ? "M6.5 1.5v10M1.5 6.5h10" : "M1.5 6.5h10"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Contador({
  id,
  texto,
  onTexto,
}: {
  /** El `id` del campo, para que el `<label>` de Precios lo nombre. */
  id: string;
  /** El campo guarda texto para que se pueda borrar y volver a escribir; el
      número sale de ahí, acotado. */
  texto: string;
  onTexto: (siguiente: (t: string) => string) => void;
}) {
  const clientes = acotar(texto);

  return (
    <div className="i-contador">
      <button
        type="button"
        aria-label="Un cliente menos"
        disabled={clientes <= 1}
        // Funcional, no desde `clientes`: dos clics en el mismo tick leerían
        // el mismo render y se pisarían.
        onClick={() => onTexto((t) => mover(t, -1))}
      >
        <Signo />
      </button>
      <input
        id={id}
        className="i-cifra"
        type="number"
        inputMode="numeric"
        min={1}
        max={TOPE}
        value={texto}
        // Se acota AL ESCRIBIR y no recién al salir del campo: con `-5` el
        // campo mostraba «-5» mientras el total ya decía «1 × USD 39», dos
        // verdades en pantalla hasta el blur (novena crítica). Se conservan
        // los dígitos DE ADELANTE —quitar todo lo que no es dígito convertía
        // «7.5» pegado en 75 (décima crítica)— y se acota por los dos lados:
        // un 0 escrito pasaba al campo mientras el total cobraba un cliente.
        // El vacío se permite mientras se escribe y el blur lo devuelve al
        // valor efectivo.
        onChange={(e) => {
          const digitos = e.target.value.match(/^\d*/)?.[0] ?? "";
          onTexto(() =>
            digitos === ""
              ? ""
              : String(Math.min(TOPE, Math.max(1, Number(digitos)))),
          );
        }}
        onBlur={() => onTexto(() => String(clientes))}
      />
      <button
        type="button"
        aria-label="Un cliente más"
        disabled={clientes >= TOPE}
        onClick={() => onTexto((t) => mover(t, 1))}
      >
        <Signo mas />
      </button>
    </div>
  );
}
