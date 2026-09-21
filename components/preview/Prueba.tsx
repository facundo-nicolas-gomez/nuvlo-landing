import Documento from "./Documento";

/**
 * LA PRUEBA. El documento a escala real, sin recorte y sin excusas.
 *
 * ── POR QUÉ OCUPA TANTO ─────────────────────────────────────────────────────
 * Es la única evidencia citable que tiene el sitio. PRODUCT.md es explícito:
 * no hay testimonios, ni logos de clientes, ni casos, ni métricas de adopción,
 * ni capturas aprobadas del panel, y nada de eso se inventa. Entonces la
 * sección que en otra landing sería la prueba social acá es el entregable
 * entero, legible de punta a punta.
 *
 * En la portada el documento sangra y se corta: dice "esto existe". Acá no se
 * corta: dice "leelo". Son dos encuadres del mismo objeto con dos trabajos
 * distintos, y por eso la página puede mostrarlo dos veces sin repetirse.
 *
 * ── LA LECTURA VA AL COSTADO, PEGADA ────────────────────────────────────────
 * Las anotaciones son `sticky`: acompañan al documento mientras se lo recorre,
 * que es exactamente lo que hace alguien evaluando si esto se le puede mandar a
 * un cliente. Cada una nombra una decisión de producto que se ve en la hoja de
 * al lado, no una virtud abstracta.
 */
const NOTAS = [
  {
    titulo: "Tu marca arriba, no la nuestra",
    texto:
      "El nombre de tu agencia es requisito duro: sin él el panel no genera ni envía. En Marca Blanca es lo único que aparece.",
  },
  {
    titulo: "Los números no los escribe la IA",
    texto:
      "Nuvlo los calcula antes de que el modelo intervenga. La IA redacta el texto que acompaña a la tabla, y sólo ve cifras ya calculadas.",
  },
  {
    titulo: "La variación la juzga el negocio",
    texto:
      "Que la inversión suba no es verde. Que el costo por conversación baje, sí. El color lo decide qué significa el número, no hacia dónde se movió.",
  },
  {
    titulo: "Tres acciones, no diez",
    texto:
      "El informe cierra con hasta tres cosas para hacer el mes que viene. Una lista más larga no se lee, y tu cliente te va a preguntar por ella igual.",
  },
];

export default function Prueba() {
  return (
    <section className="prueba" data-seccion="prueba">
      <div className="contenedor">
        <div className="prueba-cabeza entra">
          <span className="marca" aria-hidden="true" />
          <h2 className="titular">Esto es lo que abre tu cliente.</h2>
          <p className="bajada">
            El informe completo, con datos de ejemplo. Es el mismo que arma el
            panel: mismas secciones, mismo orden.
          </p>
        </div>

        <div className="prueba-grilla">
          <div className="prueba-hoja">
            <Documento />
          </div>

          <aside className="prueba-notas">
            {NOTAS.map((nota) => (
              <div className="nota" key={nota.titulo}>
                <h3 className="nota-titulo">{nota.titulo}</h3>
                <p className="nota-texto">{nota.texto}</p>
              </div>
            ))}
          </aside>
        </div>

        <p className="prueba-pie">
          Ejemplo con datos ficticios. La agencia y el anunciante no existen.
        </p>
      </div>
    </section>
  );
}
