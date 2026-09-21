/**
 * PIE.
 *
 * Lo mínimo que un sitio con obligaciones legales necesita: quién es, qué
 * vende, y los tres documentos. Sin columnas de links inventados.
 */
const LEGALES = [
  { href: "/terminos", texto: "Términos" },
  { href: "/privacidad", texto: "Privacidad" },
  { href: "/reembolsos", texto: "Reembolsos" },
];

export default function Pie() {
  return (
    <footer className="pie" data-seccion="pie">
      <div className="contenedor pie-grilla">
        <div>
          <span className="wordmark">Nuvlo</span>
          <p className="pie-linea">
            Informes de Meta Ads para quien los entrega con su propia marca.
          </p>
        </div>
        <nav className="pie-enlaces">
          {LEGALES.map((l) => (
            <a key={l.href} href={l.href}>
              {l.texto}
            </a>
          ))}
          <a href="mailto:soporte@nuvloapp.com">soporte@nuvloapp.com</a>
        </nav>
      </div>
    </footer>
  );
}
