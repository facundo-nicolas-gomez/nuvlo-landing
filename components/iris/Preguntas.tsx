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
 * debajo nueve filas a todo el ancho con la pregunta a la izquierda y la
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
const PREGUNTAS = [
  {
    q: "¿Cómo se conecta la cuenta de mi cliente?",
    a: "Con tu propio acceso de Meta. Nuvlo trae las métricas; las campañas se siguen manejando desde Meta.",
  },
  {
    q: "¿La IA puede inventarme un número?",
    a: "No. Las métricas las calcula el sistema antes de escribir; la IA las recibe hechas y no hace ninguna cuenta.",
  },
  {
    q: "¿Qué pasa si no me convence lo que escribió?",
    a: "No lo mandás. El reporte nace borrador y sólo sale cuando apretás «Aprobar y enviar».",
  },
  {
    // Va acá, pegada a «¿Qué pasa si no me convence…?», porque es su
    // continuación literal. Verificado en el panel: no hay endpoint ni
    // componente de edición. El crédito también está verificado
    // —`consumesCredit` es `paddleSubscriptionId === null` en
    // `generate-report.ts`—: se consume sólo en la prueba.
    q: "¿Puedo cambiar lo que escribió antes de mandarlo?",
    a: "No: se aprueba o se vuelve a generar. En la prueba, cada generación es uno de tus 3 reportes.",
  },
  {
    q: "¿Se puede programar para que salga solo?",
    a: "Sí: cada 7 o 14 días, o el día 1, a la hora que elijas por cliente. Exige suscripción y se frena solo si la redacción cae al texto de respaldo.",
  },
  {
    q: "¿Qué pasa cuando Meta no devuelve un dato?",
    a: "Se escribe una raya, nunca un cero. Si el período anterior fue cero, dice «Sin base»; si no cambió, «Estable».",
  },
  {
    q: "¿Sirve para Google Ads o TikTok?",
    a: "No. Nuvlo es sólo Meta Ads, y no hay otra plataforma en camino.",
  },
  {
    q: "¿Cuánto dura la prueba gratuita?",
    a: "No se mide en días: son 3 reportes, sin tarjeta.",
  },
  {
    q: "¿Hay reembolsos?",
    a: "Sí, el total, dentro de los 10 días corridos desde que contratás. Después se cancela cuando quieras, con acceso hasta el fin del período.",
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
            Preguntas, y varias dicen que no.
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
            <p className="i-cuerpo">¿Y si no está acá?</p>
            <a href="mailto:soporte@nuvloapp.com">soporte@nuvloapp.com</a>
          </div>
        </Entra>
      </div>
    </section>
  );
}
