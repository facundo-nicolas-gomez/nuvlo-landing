import { Entra } from "./Entra";

/**
 * PREGUNTAS — la única sección sin objeto.
 *
 * ── SIN ACORDEÓN (10/09/2026) ───────────────────────────────────────────────
 * Fue un `<details>` nativo por pregunta desde el 08/09 —abría, cerraba, se
 * navegaba con teclado—, y llegaba con nueve filas cerradas y cero respuestas
 * a la vista: un menú de títulos, no una sección de respuestas. Dos críticas
 * seguidas lo marcaron, y la décima preguntó además qué pasaría si exactamente
 * una de las siete secciones rompiera la silueta «titular + objeto».
 *
 * ── FILAS DE DOS COLUMNAS (17/09/2026, modo live) ───────────────────────────
 * Con las respuestas cortas, la reja de dos columnas con el titular como celda
 * sobraba: estaba pensada para bloques de cinco renglones. El dueño eligió entre
 * tres composiciones nuevas —filas, titular fijo a la izquierda y una columna de
 * veredictos— la más sobria: el titular arriba, y
 * debajo las filas a todo el ancho con la pregunta a la izquierda y la
 * respuesta a la derecha. Sigue siendo la sección que rompe la silueta
 * «titular + objeto»: acá el titular va arriba y a todo el ancho.
 *
 * ── LOS LÍMITES VIVEN ACÁ ───────────────────────────────────────────────────
 * Son las respuestas que el visitante viene a buscar a esta lista, así que
 * están acá, en forma de pregunta, y la mitad contesta que no.
 *
 * ── EL SOPORTE VA DESPUÉS DE LAS RESPUESTAS ─────────────────────────────────
 * «Si algo no está acá, escribinos» arriba de todo ofrecía ayuda antes de que
 * las preguntas tuvieran oportunidad de hacer falta (crítica del 08/09/2026).
 * La composición de filas lo subió a la fila del titular y el 17/09/2026 el
 * dueño lo volvió a bajar: arriba, el mail en color era lo primero que se veía
 * de la sección y competía con el registro. Va debajo de la última fila, en la
 * columna de las respuestas, como una décima respuesta.
 */

/* ── RESPUESTAS CORTAS (17/09/2026) ──────────────────────────────────────────
   Eran nueve respuestas de tres a cinco renglones, unas 330 palabras, y el dueño
   leyó la sección «mucho texto». Cada una quedó en su idea central, unas 150
   palabras en total, con los hechos intactos. Lo que dejó de decirse acá sigue
   siendo verdad en el producto: que la IA recibe el detalle por campaña sin
   cifras, que un reporte abarca hasta 92 días, el tope de 3 clientes en la
   prueba y la raya cuando falta el dato de alguno de los dos períodos. */
/* ── OCHO, Y EN PALABRAS DEL VISITANTE (dueño, 24/09/2026) ──────────────────
   El dueño pidió respuestas más simples y sin tecnicismos: afuera «texto de
   respaldo», «generación» y la mecánica de la raya, que es del informe y ya la
   cuenta La lectura. «No me convence» y «¿puedo cambiarlo?» eran la misma duda
   en dos filas y quedaron en una. Entró la de la marca, que es la pregunta que
   el trafficker se hace antes de mandarle algo a su cliente, y la respuesta
   dice lo que hay —el nombre de la agencia— y lo que no —logo y colores—,
   porque la promesa de más en marca blanca ya se intentó tres veces
   (`PRODUCT.md`). En reembolsos, cancelar es algo que hace el usuario: la
   frase anterior se podía leer como si la suscripción se cancelara sola. */
const PREGUNTAS = [
  {
    q: "¿Cómo se conecta la cuenta de mi cliente?",
    a: "Con tu propio usuario de Meta. Nuvlo solo lee los resultados: las campañas se siguen manejando como siempre, desde Meta.",
  },
  {
    q: "¿La IA puede inventar un número?",
    a: "No. Todos los números los calcula Nuvlo. La IA solo escribe el texto a partir de esos resultados.",
  },
  {
    // Verificado en el panel: no hay endpoint ni componente de edición. El
    // crédito también —`consumesCredit` es `paddleSubscriptionId === null` en
    // `generate-report.ts`—: se consume sólo en la prueba.
    q: "¿Y si no me convence lo que escribió la IA?",
    a: "No se envía. El texto no se edita: el reporte se aprueba como está o se genera de nuevo. En la prueba gratuita, cada reporte nuevo cuenta como uno de los 3.",
  },
  {
    // Estándar cierra con «<agencia> · Generado con Nuvlo» (`report-footer.ts`);
    // el panel no guarda logo ni colores de la agencia.
    q: "¿El reporte lleva mi marca?",
    a: "Lleva el nombre de tu agencia arriba del reporte y en el correo. En el plan Estándar cierra con «Generado con Nuvlo»; en Marca Blanca, esa línea no aparece. Por ahora no incluye logo ni colores propios.",
  },
  {
    q: "¿Se puede programar para que salga solo?",
    a: "Sí, con una suscripción activa: cada 7 o 14 días, o el día 1 de cada mes, a la hora que se elija para cada cliente. Si la IA no logra escribir el análisis, ese reporte no sale y queda esperando tu revisión.",
  },
  {
    q: "¿Sirve para Google Ads o TikTok?",
    a: "No. Nuvlo trabaja solo con Meta Ads.",
  },
  {
    q: "¿Cuánto dura la prueba gratuita?",
    a: "No tiene plazo: son 3 reportes gratis, sin tarjeta.",
  },
  {
    q: "¿Hay reembolsos?",
    a: "Sí. Dentro de los 10 días corridos desde la contratación, se devuelve el total. Después no hay reembolsos, pero la suscripción se puede cancelar en cualquier momento y el acceso sigue hasta el fin del período pagado.",
  },
];

export function Preguntas() {
  return (
    <section
      className="i-seccion"
      id="preguntas"
      aria-labelledby="i-h-preguntas"
    >
      <div className="i-marco">
        <Entra className="i-preguntas-cabeza">
          <h2 id="i-h-preguntas" className="i-display">
            Lo que conviene saber antes de empezar
          </h2>
        </Entra>

        <Entra demora={120} className="i-preguntas-filas">
          {PREGUNTAS.map((p) => (
            <div key={p.q} className="i-pregunta">
              <h3>{p.q}</h3>
              <p className="i-cuerpo">{p.a}</p>
            </div>
          ))}
        </Entra>

        {/* Dos líneas por construcción y no por casualidad: en una sola, la
            frase caía justo en el borde del corte y saltaba entre una y dos
            líneas según el ancho. Partida es estable, y el mail queda en su
            propia línea y se toca mejor. */}
        <Entra demora={220} className="i-preguntas-pie">
          <div className="i-preguntas-soporte">
            <p className="i-cuerpo">¿Tu pregunta no está aquí?</p>
            <a href="mailto:soporte@nuvloapp.com">soporte@nuvloapp.com</a>
          </div>
        </Entra>
      </div>
    </section>
  );
}
