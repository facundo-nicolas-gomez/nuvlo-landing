import Link from "next/link";

const DIRECCIONES = [
  {
    href: "/preview/neto",
    nombre: "Neto",
    campo: "Piedra y tinta, sin acento",
    resumen:
      "Rediseño de cero (07/09/2026). Un solo objeto —el reporte entero a escala real— que viaja bajo tres notas; sin color de acento, el negro hace de acento y la tipografía carga la personalidad. Seis secciones.",
  },
  {
    href: "/preview/firma",
    nombre: "Firma",
    campo: "Hueso cálido, naranja",
    resumen:
      "La pasada anterior, completa: héroe con marco de navegador y hojas apiladas, canvas de nodos, tramo oscuro con el prompt, teléfono. Queda para comparar.",
  },
  {
    href: "/preview/registro",
    nombre: "Tres registros",
    campo: "Clara con negro",
    resumen:
      "Tres registros del mismo mundo con el mismo copy y los mismos datos: lo único que cambiaba era de dónde salía la presencia — del titular, del corte de valor o del documento. Sirvió para elegir, y lo elegido está en la home.",
  },
  {
    href: "/preview/d",
    nombre: "D · Documento a la vista",
    campo: "Papel cálido",
    resumen:
      "La landing entera construida en papel cálido con grano y ámbar (04/09/2026). Fue la que DESIGN.md documentaba antes de «firma»; hoy no.",
  },
  {
    href: "/preview/piezas",
    nombre: "C · Piezas",
    campo: "Oscura y clara",
    resumen:
      "Estuvo aprobada en su momento. La landing no mostraba una captura del producto: mostraba sus piezas, cada componente real como objeto propio con su plano. Sistema y secciones 00 a 04.",
  },
  {
    href: "/preview/bocetos",
    nombre: "Bocetos de C · Piezas",
    campo: "Documento",
    resumen:
      "El sistema visual y las doce secciones dibujadas a proporción. Es lo que se aprobó antes de construir.",
  },
  {
    href: "/preview/b",
    nombre: "B · Taller",
    campo: "Clara",
    resumen:
      "ADN de Attio. Campo neutro con valor real, canto definido en todo, densidad de herramienta. Las ventanas del panel llevan chrome oscuro, que es lo que evita el defecto de hoja blanca sobre campo casi blanco.",
  },
  {
    href: "/preview/c",
    nombre: "C · Estados",
    campo: "Clara, sin metáfora",
    resumen:
      "Sin mesa, sin papel, sin luz sobre nada. El principio organizador es el pipeline real del reporte y el héroe ES el recorrido, tratado como pieza de interfaz. El acento marca un solo punto: donde entra una persona.",
  },
  {
    href: "/preview/mesa",
    nombre: "Mesa de luz",
    campo: "Oscura",
    resumen:
      "La pasada anterior, completa. Queda para comparar: es la única con la landing entera construida, no sólo el héroe.",
  },
];

export default function Indice() {
  return (
    <main
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "64px 24px 96px",
        fontFamily: "system-ui, sans-serif",
        color: "#16181b",
      }}
    >
      <h1 style={{ fontSize: 28, letterSpacing: "-0.03em", margin: 0 }}>
        Direcciones anteriores
      </h1>
      <p style={{ color: "#585c63", marginTop: 8, lineHeight: 1.6 }}>
        La dirección vigente es «iris» y desde el 11/09/2026 vive en la home, no
        acá. Estas nueve son las pasadas que la precedieron: se conservan sólo
        para comparar y ninguna se cita como referencia. El banco de tipografías
        se borró con la promoción, que era su condición desde que se armó.
      </p>
      <div style={{ marginTop: 32, display: "grid", gap: 12 }}>
        {DIRECCIONES.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            style={{
              display: "block",
              padding: "18px 20px",
              border: "1px solid #e0ddd8",
              borderRadius: 10,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <strong style={{ fontSize: 16, letterSpacing: "-0.02em" }}>
                {d.nombre}
              </strong>
              <span style={{ fontSize: 12, color: "#75797f" }}>{d.campo}</span>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: 13.5, lineHeight: 1.6, color: "#585c63" }}>
              {d.resumen}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
