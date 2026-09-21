import { Entra } from "./Entra";

/**
 * CONTROL — el primer tramo oscuro.
 *
 * Tres filas, un objeto. Cada fila es una regla de producto de `PRODUCT.md`
 * dicha en su forma más corta: el borrador, la aprobación, la programación que
 * se frena sola. No hay ilustración porque la sección anterior ya mostró el
 * botón y el destinatario en el propio documento; acá se dice lo que el dibujo
 * no puede decir, que es lo que pasa cuando algo sale mal.
 */

const TRAMOS = [
  {
    titulo: "Nace borrador.",
    texto:
      "Sin enlace público y sin mail. Lo leés entero antes de que exista para nadie más que vos.",
  },
  {
    titulo: "Aprobás, y recién ahí sale.",
    texto:
      "Un botón, con el destinatario impreso debajo. Es el paso que Nuvlo no da solo, y no se puede saltear.",
  },
  {
    titulo: "Programado, se frena solo.",
    texto:
      "Cada 7 días, cada 14 o el día 1 de cada mes, con suscripción activa. Si la IA cayó al texto de respaldo, el reporte queda en borrador sin enviar: mandarle prosa genérica a tu cliente es peor que no mandar nada.",
  },
];

export function Control() {
  return (
    <section className="n-oscuro n-control" id="control">
      <div className="n-marco n-marco-angosto">
        <Entra className="n-control-cabeza">
          <h2 className="n-display">Nada sale hasta que lo aprobás vos.</h2>
          <p className="n-bajada">
            El envío automático es opcional, se activa por cuenta, y aun así
            hay una condición que lo frena.
          </p>
        </Entra>

        <Entra demora={120} className="n-tramos">
          {TRAMOS.map((t) => (
            <div key={t.titulo} className="n-tramo">
              <h3 className="n-titulo">{t.titulo}</h3>
              <p className="n-cuerpo">{t.texto}</p>
            </div>
          ))}
        </Entra>
      </div>
    </section>
  );
}
