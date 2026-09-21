import Documento from "@/components/preview/Documento";
import LecturaGuiada from "./LecturaGuiada";

/**
 * LA PRUEBA. El documento entero, a escala real y sin recorte.
 *
 * ── LA HOJA SALE DE LA OSCURIDAD ────────────────────────────────────────────
 * La sección empieza dentro del movimiento oscuro y la hoja lo atraviesa: su
 * borde superior queda sobre negro y el resto baja al campo claro. Es la única
 * superposición de la página que cruza un cambio de valor, y es el momento por
 * el que existe la sección oscura de arriba: papel blanco contra negro es el
 * contraste más alto que puede tener este sitio, y llega justo donde el
 * argumento es "esto es lo que tu cliente abre".
 *
 * ── NO SE MUESTRA TODO DE ENTRADA ───────────────────────────────────────────
 * Cada nota enciende la parte del informe de la que habla y apaga el resto. El
 * informe entero nítido de una vez es una pared de datos donde el ojo no sabe
 * dónde mirar; con el realce, la sección tiene un orden de lectura. La clave de
 * cada nota apunta al `data-parte` del documento, que es lo único que las
 * mantiene atadas.
 *
 * ── DOS ENCUADRES DEL MISMO OBJETO, NO UNA REPETICIÓN ───────────────────────
 * En la portada el documento sangra y se corta: dice "esto existe". Acá no se
 * corta: dice "leelo".
 */
const NOTAS = [
  {
    clave: "marca",
    titulo: "Tu marca arriba, no la nuestra",
    texto:
      "El nombre de tu agencia es requisito duro: sin él el panel no genera ni envía. En Marca Blanca es lo único que aparece.",
  },
  {
    clave: "numeros",
    titulo: "Los números no los escribe la IA",
    texto:
      "Nuvlo los calcula antes de que el modelo intervenga. La IA redacta el texto que acompaña a la tabla, y sólo ve cifras ya calculadas.",
  },
  {
    clave: "variacion",
    titulo: "La variación la juzga el negocio",
    texto:
      "Que la inversión suba no es verde. Que el costo por conversación baje, sí. El color lo decide qué significa el número, no hacia dónde se movió.",
  },
  {
    clave: "acciones",
    titulo: "Tres acciones, no diez",
    texto:
      "El informe cierra con hasta tres cosas para hacer el mes que viene. Una lista más larga no se lee, y tu cliente te va a preguntar por ella igual.",
  },
];

export default function Prueba() {
  return (
    <section className="c-sec c-prueba" data-seccion="prueba">
      <div className="c-marco">
        <div className="c-prueba-cabeza c-revela">
          <h2 className="c-titulo-sec c-titulo-noche">
            Y esto es lo que abre.
          </h2>
          <p className="c-bajada-sec c-bajada-noche">
            El informe completo, con datos de ejemplo. Es el mismo que arma el
            panel: mismas secciones, mismo orden.
          </p>
        </div>

        <LecturaGuiada notas={NOTAS}>
          <Documento />
        </LecturaGuiada>

        <p className="c-nota-pie">
          Ejemplo con datos ficticios. La agencia y el anunciante no existen.
        </p>
      </div>
    </section>
  );
}
