import { Boton, Navbar } from "./Piezas";
import { Entra } from "./Entra";
import { Hoja } from "./Reporte";
import { Visor } from "./Visor";
import { Control } from "./Control";
import { Entregable } from "./Entregable";
import { Precios } from "./Precios";
import { Preguntas } from "./Preguntas";
import { Cierre } from "./Cierre";

/**
 * LA LANDING — pasada «neto».
 *
 * ── SEIS SECCIONES, UN OBJETO ───────────────────────────────────────────────
 *   El reporte     el documento entero, a escala real, y tres notas al costado
 *                  que lo recorren: qué escribe la IA, qué calcula Nuvlo, qué
 *                  decidís vos. Reemplaza al héroe, Se arma, La máquina y El
 *                  momento de la pasada anterior.
 *   Control        tramo oscuro: nada sale hasta que lo aprobás, en tres filas.
 *   El entregable  el mail que recibe el cliente, y las otras dos formas.
 *   Precios        por cliente, al mes, con la diferencia citada.
 *   Preguntas      incluidas las que dicen que no.
 *   Cierre         tramo oscuro: la misma acción, sin promesa nueva, y el pie.
 *
 * ── LAS TRES NOTAS SON LA TESIS DE `PRODUCT.md` ─────────────────────────────
 * «La IA no computa ni un solo número» y «el reporte siempre nace como
 * borrador» no van escritos como afirmación en una sección propia: son lo que
 * el documento muestra mientras la nota lo señala. Cada título nombra la parte
 * del reporte de la que habla, así que en pantallas angostas —donde el
 * documento no viaja— las tres se leen igual.
 */

const NOTAS = [
  {
    id: "resumen",
    titulo: "El resumen lo escribe la IA.",
    texto:
      "El resumen, la alerta y hasta tres acciones. Es lo único que redacta, y le llega sin una sola cifra: los nombres de las campañas y su orden por inversión. Si un número no entra al prompt, no puede salir en el reporte.",
  },
  {
    id: "cifras",
    titulo: "Las cifras las calcula Nuvlo.",
    texto:
      "Inversión, conversaciones, costo por conversación, CTR y la tabla contra el período anterior: aritmética sobre lo que devuelve Meta, sin IA en el medio. Sin dato va una raya, nunca un cero.",
  },
  {
    id: "decision",
    titulo: "Y el envío lo decidís vos.",
    texto:
      "Nace borrador, sin enlace público. Sale cuando apretás «Aprobar y Enviar», con el destinatario impreso debajo del botón. Si lo dejás programado, se frena solo cuando la redacción cae al texto de respaldo.",
  },
];

export function Pagina() {
  return (
    <div className="neto">
      <div className="n-fondo" aria-hidden="true" />

      <Navbar />

      <main>
        <section className="n-heroe" id="reporte" aria-labelledby="n-h1">
          <div className="n-marco n-tablero" data-tablero>
            {/**
             * EL TEXTO DEL HÉROE, corto a propósito: al lado hay un reporte
             * entero a escala de lectura, y el titular lo señala. «El reporte»
             * es el que está ahí, no uno abstracto.
             */}
            <div className="n-heroe-texto" data-nota="inicio">
              <h1 id="n-h1" className="n-portada">
                El reporte, hecho. Vos lo aprobás.
              </h1>
              <p className="n-bajada n-heroe-bajada">
                Nuvlo conecta la cuenta de Meta Ads de tu cliente, calcula las
                métricas y redacta el análisis. Queda en borrador hasta que lo
                aprobás, y sale con tu marca.
              </p>
              <div className="n-accion">
                <Boton>Empezar gratis</Boton>
                <p className="n-chico">
                  <span className="n-cifra">3</span> reportes gratis, sin
                  tarjeta.
                </p>
              </div>
            </div>

            <Visor>
              <Hoja />
            </Visor>

            <div className="n-notas">
              {NOTAS.map((n) => (
                <Entra key={n.id} className="n-nota" data-nota={n.id}>
                  <h2 className="n-nota-titulo">{n.titulo}</h2>
                  <p className="n-cuerpo n-nota-texto">{n.texto}</p>
                </Entra>
              ))}
            </div>
          </div>
        </section>

        <Control />
        <Entregable />
        <Precios />
        <Preguntas />
        <Cierre />
      </main>
    </div>
  );
}
