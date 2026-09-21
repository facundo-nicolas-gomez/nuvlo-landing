import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { Navbar } from "@/components/iris/Navbar";
import { Pie } from "@/components/iris/Pie";

/**
 * LAS TRES PÁGINAS LEGALES.
 *
 * ── SIN TARJETA, Y ES LA DECISIÓN DE LA REMAQUETA (11/09/2026) ──────────────
 * Antes esto era una hoja blanca de 37rem flotando sobre el campo, con barra de
 * título, borde, radio y elevación. Tenía su lógica —«es un documento, se trata
 * como un documento»— y el dueño la sacó al promover «iris»: **el texto va
 * directo sobre el campo**, topeado a medida de lectura, sin ficha, sin borde y
 * sin sombra.
 *
 * Lo que la decisión gana es que estas páginas dejan de imitar al objeto que la
 * home vende. En este sistema la ventana con cromo es el informe, que es lo que
 * el trafficker manda con su nombre; darle el mismo tratamiento a los términos
 * de servicio ponía dos cosas muy distintas en la misma caja. Un texto legal no
 * necesita parecer un producto: necesita leerse.
 *
 * ── EL ÍNDICE SALE DEL CONTENIDO, NO DE UNA LISTA A MANO ────────────────────
 * Este componente recorre los hijos, encuentra los `<h2>`, les escribe un `id`
 * derivado de su texto y arma el índice con eso. **Es la única forma que no
 * rompe el contrato de estas páginas**: el texto legal se escribe en etiquetas
 * peladas, sin clases y sin ids, así que una corrección que agregue, saque o
 * renombre una sección aparece en el índice sola. Una lista escrita a mano al
 * lado del contenido se desincroniza en la primera corrección, y estas páginas
 * se corrigen por motivos que no tienen nada que ver con el diseño.
 *
 * El ancla se deriva del texto sin diacríticos: «Suscripciones y planes» →
 * `suscripciones-y-planes`. Es estable mientras el título no cambie, que es
 * exactamente cuando corresponde que el enlace viejo deje de servir.
 *
 * ── LA ITÁLICA, QUE YA NO SE DECLARA (12/09/2026) ───────────────────────────
 * Acá vivía una instancia de Inter itálica, sin precarga, sólo para el `<em>`
 * de «Merchant of Record» —un término jurídico en otro idioma lleva itálica por
 * convención—. Con Geist como familia del sitio esa instancia se fue: Geist no
 * trae itálica en Google Fonts, y cargar la de OTRA familia para tres palabras
 * es mezclar dos caras en la misma línea, que es peor que lo que evitaba. El
 * navegador sintetiza la oblicua sobre los dibujos de Geist; a 15px y en tres
 * palabras, la diferencia con una itálica dibujada no se ve, y se sabe.
 *
 * El API no cambió: `title`, `updated?`, `children`.
 */

/** El texto plano de un árbol de nodos, para derivar el ancla de un título. */
function textoDe(nodo: ReactNode): string {
  if (typeof nodo === "string" || typeof nodo === "number") return String(nodo);
  if (Array.isArray(nodo)) return nodo.map(textoDe).join("");
  if (isValidElement(nodo)) {
    return textoDe((nodo.props as { children?: ReactNode }).children);
  }
  return "";
}

/**
 * El ancla. `normalize("NFD")` parte cada letra acentuada en letra + tilde
 * suelta, y `\p{Diacritic}` se lleva las tildes: «Cancelación» da `cancelacion`
 * y no un fragmento con caracteres que hay que escapar en una URL.
 *
 * Se usa la propiedad Unicode y no el rango `̀-ͯ` a propósito: dice
 * qué se está sacando en vez de qué códigos, y **el fuente queda en ASCII**.
 * Escrito como rango, la forma corta del regex son caracteres combinantes
 * literales —invisibles en el editor y que el primer copiar y pegar rompe.
 */
function anclaDe(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  const secciones: { id: string; texto: string }[] = [];

  const cuerpo = Children.toArray(children).map((hijo) => {
    if (!isValidElement(hijo) || hijo.type !== "h2") return hijo;
    const texto = textoDe((hijo.props as { children?: ReactNode }).children);
    const id = anclaDe(texto);
    if (!id) return hijo;
    secciones.push({ id, texto });
    return cloneElement(hijo as ReactElement<{ id?: string }>, { id });
  });

  return (
    <div className="iris i-legal-pagina">
      <Navbar />

      <main className="i-legal" id="contenido" tabIndex={-1}>
        <div className="i-marco">
          <div className="i-legal-columna">
            <h1 className="i-legal-titulo">{title}</h1>
            {updated ? (
              <p className="i-chico i-legal-fecha">{updated}</p>
            ) : null}

            {secciones.length > 1 ? (
              <nav className="i-legal-indice" aria-label="En esta página">
                <p className="i-rotulo i-legal-indice-titulo">En esta página</p>
                <ul className="i-legal-indice-lista">
                  {secciones.map((s) => (
                    <li key={s.id}>
                      {/* La clase no es para estilar: es para SALIR de
                          `.iris a:not([class])`, que pinta todo anchor pelado
                          como enlace de prosa —vino y subrayado—. Un anchor con
                          clase se declara otra cosa, y éstos son navegación. */}
                      <a className="i-legal-indice-enlace" href={`#${s.id}`}>
                        {s.texto}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            {/* El contenido no lleva clases: los `<h2>`, `<p>`, `<ul>` y `<a>`
                pelados los estila `.i-prosa-legal` con los roles del sistema.
                Es lo que deja que una corrección legal se edite sin tocar
                marcado, y vale más acá que en cualquier otra página: son las
                que se corrigen por motivos que no tienen nada que ver con el
                diseño. Los `id` de los `<h2>` los escribe este componente. */}
            <div className="i-prosa-legal">{cuerpo}</div>
          </div>
        </div>
      </main>

      {/* El mismo pie de la home, sin el telón ni el remate: `Pie.tsx` explica
          por qué es el mismo componente y por qué va de noche en las dos. */}
      <footer className="i-noche i-legal-pie">
        <Pie />
      </footer>
    </div>
  );
}
