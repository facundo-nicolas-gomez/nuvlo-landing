import { Entra } from "./Entra";

/**
 * PREGUNTAS.
 *
 * ── EL ACORDEÓN ES NATIVO ───────────────────────────────────────────────────
 * `<details>` y `<summary>`, sin JavaScript: abre, cierra, se navega con
 * teclado y se busca con Ctrl+F donde el navegador lo soporta.
 *
 * ── LOS LÍMITES VIVEN ACÁ ───────────────────────────────────────────────────
 * La pasada anterior tenía una sección propia de «lo que no hace». Son las
 * mismas respuestas que el visitante viene a buscar a esta lista, así que
 * están acá, en forma de pregunta, y la mitad contesta que no.
 */

const PREGUNTAS = [
  {
    q: "¿Cómo se conecta la cuenta de mi cliente?",
    a: "Con tu propio acceso de Meta, el mismo con el que ya administrás la cuenta. Nuvlo pide un solo permiso: leer las métricas. No crea, no pausa y no edita campañas.",
  },
  {
    q: "¿La IA puede inventarme un número?",
    a: "No, y no por una política sino por cómo está construido: las métricas las calcula una función determinística, y a la IA se le pasa un resumen de campañas sin una sola cifra. Si el número no entra al prompt, no puede salir en el reporte.",
  },
  {
    q: "¿Qué pasa si no me convence lo que escribió?",
    a: "El reporte nace borrador y no sale hasta que apretás «Aprobar y Enviar», con el destinatario impreso debajo del botón. Lo leés entero antes, y si no te sirve, no lo mandás.",
  },
  {
    q: "¿Se puede programar para que salga solo?",
    a: "Sí: cada 7 días, cada 14 o el día 1 de cada mes, y exige suscripción activa. Hoy sale a las 08:00 UTC para todas las cuentas; la hora todavía no se elige. Y se frena solo si la redacción cayó al texto de respaldo.",
  },
  {
    q: "¿Qué pasa cuando Meta no devuelve un dato?",
    a: "Se escribe una raya, nunca un cero. Y sin período anterior comparable no hay variación: la columna queda vacía en vez de decir 0 %, que significaría «no cambió». Un reporte abarca hasta 92 días.",
  },
  {
    q: "¿Sirve para Google Ads o TikTok?",
    a: "No. Nuvlo es sólo Meta Ads y no hay otra plataforma en camino. Sumar una sería otro producto, no una función más.",
  },
  {
    q: "¿Cuánto dura la prueba gratuita?",
    a: "No se mide en días: son 3 reportes, sin tarjeta. Hasta que tengas suscripción también podés cargar hasta 3 clientes, que es un freno antifraude y no un límite comercial.",
  },
  {
    q: "¿Hay reembolsos?",
    a: "No. La prueba gratuita es la garantía: hacés los tres reportes antes de pagar nada. Se cancela cuando quieras y el acceso sigue hasta el fin del período pago.",
  },
];

export function Preguntas() {
  return (
    <section className="n-seccion" id="preguntas">
      <div className="n-marco n-preguntas-fila">
        <Entra>
          <h2 className="n-display">Preguntas, y varias dicen que no.</h2>
          <p className="n-bajada n-cabeza-bajada">
            Si algo no está acá, escribinos a{" "}
            <a href="mailto:soporte@nuvloapp.com">soporte@nuvloapp.com</a>.
          </p>
        </Entra>

        <Entra demora={100} className="n-acordeon">
          {PREGUNTAS.map((p) => (
            <details key={p.q}>
              <summary>
                <span>{p.q}</span>
                <span className="n-signo" aria-hidden="true" />
              </summary>
              <p className="n-cuerpo n-respuesta">{p.a}</p>
            </details>
          ))}
        </Entra>
      </div>
    </section>
  );
}
