import { Revelar } from "./Revelar";

/**
 * PREGUNTAS.
 *
 * Incluye las que contestan que no, que son las que hacen creíbles a las otras.
 * Todas las respuestas están contrastadas contra `PRODUCT.md`: no hay ninguna
 * que prometa algo que el producto no cumple hoy.
 *
 * El acordeón es `<details>` / `<summary>` nativo: funciona sin JS, lo lee un
 * lector de pantalla sin ayuda y el teclado lo abre solo. El único ícono de la
 * página es la cruz que rota 45° al abrir, dibujada con `currentColor`.
 */

const PREGUNTAS = [
  {
    q: "¿Cómo se conecta la cuenta de mi cliente?",
    a: "Desde el panel conectás su cuenta publicitaria de Meta. De esa conexión se guarda el identificador de la cuenta y nada más. No hay tope de cuentas publicitarias por cliente.",
  },
  {
    q: "¿La IA puede inventarse un número?",
    a: "No, y no por una política sino por cómo está armado: las métricas las calcula el código antes de que la IA participe, y lo que se le manda es un resumen ordinal sin una sola cifra. Un número que no entra al prompt no puede salir del prompt.",
  },
  {
    q: "¿Qué pasa si no me convence lo que redactó?",
    a: "No sale. El reporte nace como borrador y se queda ahí hasta que apretás «Aprobar y Enviar». Si no lo aprobás, tu cliente nunca lo ve.",
  },
  {
    q: "¿Se puede programar para que salga solo?",
    a: "Sí, y es opcional. Las frecuencias son cada 7 días, cada 14 días o el día 1 de cada mes. Requiere suscripción activa, y se autoinhibe si la redacción cayó al texto de respaldo: antes que mandarle prosa genérica a tu cliente, no manda nada.",
  },
  {
    q: "¿Cuánto dura la prueba gratuita?",
    a: "No es por tiempo, es por trabajo: 3 reportes, sin tarjeta. Mientras no tengas suscripción también estás topeado a 3 clientes, que es un freno antifraude y no un límite comercial.",
  },
  {
    q: "¿Funciona con Google Ads o TikTok?",
    a: "No. Nuvlo es sólo Meta Ads y no hay nada en camino. Si trabajás mayormente en otras plataformas, esto todavía no es para vos.",
  },
  {
    q: "¿Hay reembolsos?",
    a: "No. La prueba gratuita es la garantía: querés saber si sirve, hacés los tres reportes. Cancelás cuando quieras y mantenés el acceso hasta que se termine el período que ya pagaste.",
  },
  {
    q: "¿Este sitio me rastrea?",
    a: "No carga ninguna herramienta de terceros: ni analítica, ni gestor de etiquetas, ni píxel. La política de privacidad lo dice y el sitio lo cumple.",
  },
];

export default function Preguntas() {
  return (
    <section className="q-seccion" id="preguntas">
      <div className="d-marco q-fila">
        <Revelar className="q-voz" eje="izquierda">
          <h2 className="t-titular">
            Lo que se pregunta antes de conectar la primera cuenta.
          </h2>
        </Revelar>

        <div className="q-lista">
          {PREGUNTAS.map((p, i) => (
            <Revelar key={p.q} demora={0.03 * i}>
              <details className="q-item">
                <summary className="q-pregunta">
                  <span className="t-titulo">{p.q}</span>
                  <svg
                    className="q-cruz"
                    viewBox="0 0 16 16"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M8 2.75v10.5M2.75 8h10.5" />
                  </svg>
                </summary>
                <p className="t-cuerpo q-respuesta">{p.a}</p>
              </details>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
