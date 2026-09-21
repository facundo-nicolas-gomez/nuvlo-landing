import { Entra, Fila } from "./Entra";
import { Punto } from "./Piezas";

/**
 * LA CUENTA — el balance desparejo.
 *
 * ── QUÉ SE TIRÓ, Y POR QUÉ ─────────────────────────────────────────────────
 * Una tarjeta con cuatro filas, tildes y cruces. Es la solución más obvia de la
 * categoría: buscando en las bibliotecas de componentes, «permisos» devuelve
 * exactamente eso —listas de checkboxes con badges de color— una y otra vez.
 * Que sea lo que todos hacen no la hace mala, la hace invisible.
 *
 * ── LA IDEA ────────────────────────────────────────────────────────────────
 * El argumento no es «pedimos un permiso». Es **la desproporción**: de todo lo
 * que se puede pedir sobre una cuenta publicitaria, Nuvlo pide una cosa y deja
 * afuera las tres que dan miedo. Así que la sección se compone como un balance
 * desparejo, y la desproporción se lee en la tipografía antes que en el texto:
 *
 *   lo que pide      una línea, chica, en tinta llena, con el punto de la
 *                    marca. Es lo único sólido de la sección.
 *   lo que no pide   tres líneas a cuerpo de titular, casi transparentes.
 *                    Ocupan cuatro veces más espacio y pesan la mitad.
 *
 * Grande y fantasmal contra chico y sólido: se entiende de un vistazo, sin un
 * ícono, sin un color de estado y sin leer una palabra. Cuando el ojo baja al
 * texto, ya sabe qué le van a decir.
 *
 * ── EL HOVER TERMINA LA FRASE ──────────────────────────────────────────────
 * Pasar por una de las tres **traza el tachado** de izquierda a derecha. No es
 * decoración: el tachado dibujándose es lo que la línea afirma, y como las tres
 * ya están apagadas, el tachado confirma en vez de informar. Se dibuja con
 * `scaleX`, así que no hay una sola propiedad que dispare layout.
 *
 * Es un recurso distinto del de Control, donde el hover revela TEXTO. Acá pinta
 * una marca y no aparece una sola palabra nueva.
 *
 * ── LOS PERMISOS SON LOS REALES ────────────────────────────────────────────
 * `PRODUCT.md`: Nuvlo lee las métricas de la cuenta publicitaria y nada más.
 * Las tres que no se piden son acciones que la API de Meta permite y que el
 * producto no usa. No son un espantapájaros: son exactamente lo que un
 * trafficker teme que le toquen.
 */

const NO_PIDE = [
  "Crear campañas",
  "Pausar o activar anuncios",
  "Editar presupuestos",
];

export function Cuenta() {
  return (
    <section className="f-seccion f-cu-seccion" id="cuenta">
      <div className="f-marco f-marco-medio">
        <Entra className="f-cu-cabeza">
          <h2 className="f-display">
            Vas a conectar la cuenta de un cliente tuyo.{" "}
            <span className="f-marca-frase">Los bordes, primero.</span>
          </h2>
        </Entra>

        <div className="f-cu-balance">
          {/* El lado sólido: una línea. */}
          <Entra className="f-cu-pide">
            <p className="f-rotulo">Lo que pide</p>
            <p className="f-cu-pide-linea">
              <Punto />
              Leer las métricas de la cuenta
            </p>
            <p className="f-fino f-cu-pide-nota">
              Es lo único que hace falta para escribir el informe.
            </p>
          </Entra>

          {/* El lado grande y vacío: tres. */}
          <Entra className="f-cu-nopide">
            <p className="f-rotulo">Lo que no pide</p>
            <ul className="f-cu-lista">
              {NO_PIDE.map((texto, i) => (
                <Fila key={texto} orden={i} como="li" className="f-cu-item">
                  <span className="f-display f-cu-nombre">{texto}</span>
                </Fila>
              ))}
            </ul>
          </Entra>
        </div>

        <Entra className="f-cu-hechos">
          <Fila orden={0} className="f-cu-hecho">
            <h3 className="f-titular">Te conectás con tu cuenta</h3>
            <p className="f-cuerpo">
              Usás tu propio acceso de Meta, el mismo con el que ya administrás
              la cuenta. Tu cliente no tiene que darte una contraseña ni crear un
              usuario nuevo.
            </p>
          </Fila>
          <Fila orden={1} className="f-cu-hecho">
            <h3 className="f-titular">El enlace del reporte vence</h3>
            <p className="f-cuerpo">
              La página pública deja de servir el informe a los 90 días. Si el
              enlace no es válido no muestra nada: falla cerrada, no abierta.
            </p>
          </Fila>
        </Entra>
      </div>
    </section>
  );
}
