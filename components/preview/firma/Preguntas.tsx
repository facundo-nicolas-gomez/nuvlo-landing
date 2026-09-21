import { Entra, Fila } from "./Entra";

/**
 * PREGUNTAS.
 *
 * ── EL ACORDEÓN ES NATIVO ───────────────────────────────────────────────────
 * `<details>` y `<summary>`, sin una línea de JavaScript. Abre y cierra, es
 * navegable con teclado, se puede buscar con Ctrl+F donde el navegador lo
 * soporta, y funciona sin JS por construcción y no por un respaldo escrito a
 * mano. Un acordeón con estado en React sería la misma interfaz con más partes
 * que se pueden romper.
 *
 * ── LAS QUE CONTESTAN QUE NO ────────────────────────────────────────────────
 * La mitad responde que el producto NO hace algo, a propósito: son las que el
 * visitante ya se está haciendo, y esquivarlas cuesta más caro que no tenerlas.
 */

const PREGUNTAS = [
  {
    q: "¿Cómo se conecta la cuenta de mi cliente?",
    a: "Con tu propio acceso de Meta, el mismo con el que ya administrás la cuenta. Nuvlo pide un solo permiso: leer las métricas. No crea, no pausa y no edita campañas.",
  },
  {
    q: "¿La IA puede inventarme un número?",
    a: "No, y no por una política sino por cómo está construido: las métricas las calcula una función determinística, y a la IA se le pasa un resumen ordinal de campañas sin una sola cifra. Si el número no entra al prompt, no puede salir en el reporte.",
  },
  {
    q: "¿Qué pasa si no me convence lo que escribió?",
    a: "El reporte nace borrador y no sale hasta que apretás «Aprobar y Enviar», con el destinatario impreso debajo del botón. Podés leerlo entero antes, y si no te sirve, no lo mandás.",
  },
  {
    q: "¿Se puede programar para que salga solo?",
    a: "Sí, cada 7 días, cada 14 o el día 1 de cada mes, y exige suscripción activa. El envío automático se autoinhibe si la redacción cayó al texto de respaldo: mandarle prosa genérica al cliente de tu cliente es peor que no mandar nada.",
  },
  {
    q: "¿A qué hora sale el reporte programado?",
    a: "Hoy a las 08:00 UTC para todas las cuentas. El campo de hora existe y se guarda, pero todavía no se cumple, así que no lo prometemos.",
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
    <section className="f-seccion f-q-seccion" id="preguntas">
      <div className="f-marco">
        <div className="f-q-fila">
          <Entra className="f-q-voz">
            <h2 className="f-display">
              Preguntas,{" "}
              <span className="f-marca-frase">y varias dicen que no</span>.
            </h2>
            <p className="f-bajada f-q-bajada">
              Si algo no está acá, escribinos a soporte@nuvloapp.com.
            </p>
          </Entra>

          <Entra className="f-superficie">
            {PREGUNTAS.map((p, i) => (
              <Fila key={p.q} orden={i} className="f-q-item">
                <details>
                  <summary>
                    <span className="f-titulo">{p.q}</span>
                    <span className="f-q-signo" aria-hidden="true" />
                  </summary>
                  <p className="f-cuerpo f-q-respuesta">{p.a}</p>
                </details>
              </Fila>
            ))}
          </Entra>
        </div>
      </div>
    </section>
  );
}
