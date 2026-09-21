import { Entra } from "@/components/preview/registro/Entra";
import {
  Accion,
  Acciones,
  Banco,
  Encabezado,
  Navbar,
  NotaEjemplo,
  Resumen,
  Tabla,
} from "@/components/preview/registro/Piezas";
import "./objeto.css";

/**
 * REGISTRO 3 — OBJETO. Manda el documento.
 *
 * ── LA TESIS ────────────────────────────────────────────────────────────────
 * La presencia sale de la DENSIDAD DE DATO REAL a escala legible. El reporte no
 * está miniaturizado ni decorado ni flotando en perspectiva: entra a tamaño de
 * lectura, ocupa la mayor parte del primer viewport y se corta contra el borde
 * del viewport porque sigue. Se pueden leer las cifras, la columna del mes
 * anterior y las variaciones con su color asignado.
 *
 * El titular baja de escalón a propósito. Acá no compite: presenta. La energía
 * de la pantalla la pone la cantidad de información verdadera puesta a la
 * vista, que es exactamente el argumento del producto —el entregable ES el
 * argumento— y la única prueba que Nuvlo tiene.
 *
 * ── POR QUÉ LA TIPOGRAFÍA SE RETIRA ─────────────────────────────────────────
 * Public Sans es una cara de trabajo sin gesto propio. Cuando el protagonista
 * es el documento, una tipografía con carácter le compite: el visitante mira la
 * letra en vez de mirar la cifra. La decisión de este registro es que la
 * tipografía desaparezca y la retícula hable.
 *
 * ── LO QUE ESTE REGISTRO SACRIFICA ──────────────────────────────────────────
 * Es el que más se parece a lo que ya hay construido, y el que menos se
 * distingue de un competidor que también muestre su producto grande. Gana en
 * prueba y paga en distinción.
 */
export default function RegistroObjeto() {
  return (
    <div className="reg r-objeto">
      <Navbar />

      <main>
        <section className="o-heroe">
          <div className="rg-marco o-fila">
            <Entra className="o-texto">
              <h1 className="o-titular">
                El reporte mensual de tu cliente, hecho. Sale cuando vos decís.
              </h1>
              <p className="rg-bajada o-bajada">
                Nuvlo conecta la cuenta de Meta Ads, calcula las métricas y
                redacta el análisis. Queda en borrador hasta que lo aprobás, y
                sale con tu marca.
              </p>
              <Accion className="o-accion" />
              <div className="o-nota">
                {/* Sin «al lado» ni «acá abajo»: en escritorio el documento
                    está a la derecha y en móvil está debajo, así que una nota
                    que señala una posición miente en la mitad de los casos. */}
                <NotaEjemplo>
                  Es un reporte real de Nuvlo con datos ficticios. Las cuentas se
                  cumplen: el CTR es clics sobre impresiones.
                </NotaEjemplo>
              </div>
            </Entra>

            {/**
             * El documento sale del marco hacia el borde del viewport. La
             * superficie puede sangrar; el contenido nunca cambia de margen. El
             * corte contra el borde del viewport es el que dice que el
             * documento sigue: uno que entra entero y centrado es una captura.
             */}
            <Entra demora={110} className="o-doc">
              <div className="rg-reporte o-hoja">
                <Encabezado />
                <Banco className="o-banco" />
                <Tabla className="o-tabla" />
                <Resumen />
                <Acciones />
              </div>
            </Entra>
          </div>
        </section>
      </main>
    </div>
  );
}
