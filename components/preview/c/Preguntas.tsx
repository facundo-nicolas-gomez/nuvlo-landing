/**
 * PREGUNTAS.
 *
 * Agrupadas por el momento en que aparece la duda (antes de conectar, sobre el
 * informe, sobre la plata) y no en una lista larga con un filete debajo de cada
 * fila. Con siete preguntas seguidas el ojo cuenta rayas; con tres grupos entra
 * por el que le toca.
 *
 * ── COMPOSICIÓN PROPIA: EL TITULAR SE QUEDA QUIETO ──────────────────────────
 * El titular queda `sticky` a la izquierda mientras los grupos pasan por la
 * derecha. Ninguna otra sección hace eso, y le da a la sección más larga de la
 * página un ancla que no se va.
 *
 * `details`/`summary` nativos: sin JavaScript, sin librería y sin estado. La
 * respuesta de edición es la que más tienta suavizar y la que menos conviene
 * tocar: que no se pueda editar es una decisión de producto con una razón.
 */
const GRUPOS = [
  {
    id: "antes",
    titulo: "Antes de conectar",
    preguntas: [
      {
        p: "¿Cómo conecto la cuenta de mi cliente?",
        r: "Con tu propia cuenta de Facebook. Autorizás desde el panel, aparecen las cuentas publicitarias a las que ya tenés acceso, elegís la de ese cliente y listo. No hace falta pedir contraseñas ni sumar a nadie al Business Manager.",
      },
      {
        p: "¿Y si un cliente tiene varias cuentas publicitarias?",
        r: "Cada cuenta genera su propio informe, con su propio período y su propia programación: no se mezclan en uno solo. Conectás todas las que tenga y decidís cuáles reportás y cada cuánto.",
      },
    ],
  },
  {
    id: "informe",
    titulo: "Sobre el informe",
    preguntas: [
      {
        p: "¿La IA puede inventar un número?",
        r: "No, y no es una promesa sino una consecuencia de cómo está armado. Los números los calcula Nuvlo antes de que el modelo intervenga, y del desglose por campaña el prompt recibe nombres y orden, nunca cifras. Todo número que la IA pueda mencionar ya está impreso en la tabla que tu cliente tiene delante.",
      },
      {
        p: "¿Puedo editarlo antes de mandarlo?",
        r: "No. Se aprueba o no se aprueba. Si el análisis no te convence, podés regenerarlo o escribirle vos a tu cliente. Preferimos eso antes que un editor a medias que te haga responsable de un texto que parece nuestro.",
      },
      {
        p: "¿Se nota que usé Nuvlo?",
        r: "En Estándar sí: el informe cierra con «Generado con Nuvlo». En Marca Blanca no aparece por ningún lado, ni al pie ni en el email, que sale firmado por tu agencia.",
      },
    ],
  },
  {
    id: "plata",
    titulo: "Envío y plata",
    preguntas: [
      {
        p: "¿Pueden salir solos?",
        r: "Sí, cuenta por cuenta, y requiere suscripción activa. Elegís frecuencia: cada 7 días, cada 14, o el día 1 de cada mes. Con una salvedad: si la IA no logró redactar el análisis, ese reporte no se manda y te espera como borrador.",
      },
      {
        p: "¿Hay reembolsos?",
        r: "No. Por eso la prueba son 3 reportes completos y sin tarjeta: la idea es que evalúes antes de pagar, no que pagues y reclames después. Podés cancelar cuando quieras y mantenés el acceso hasta el fin del período pago.",
      },
    ],
  },
];

export default function Preguntas() {
  return (
    <section className="c-sec c-preguntas" data-seccion="preguntas">
      <div className="c-marco c-preguntas-grilla">
        <h2 className="c-titulo-sec c-preguntas-titulo">
          Lo que se pregunta antes de conectar la primera cuenta.
        </h2>

        <div className="c-grupos">
          {GRUPOS.map((grupo) => (
            <div className="c-grupo" key={grupo.id}>
              <h3 className="c-grupo-titulo">{grupo.titulo}</h3>
              {grupo.preguntas.map((item) => (
                <details className="c-pregunta" key={item.p}>
                  <summary>
                    <span>{item.p}</span>
                    <span className="c-cruz" aria-hidden="true" />
                  </summary>
                  <p>{item.r}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
