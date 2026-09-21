import Link from "next/link";

/**
 * Índice de los tres registros. Es una ruta de trabajo, no una pieza de diseño:
 * existe para llegar a las tres y para que quede escrito qué se está eligiendo.
 */

const REGISTROS = [
  {
    href: "/preview/registro/escala",
    nombre: "1 · Escala",
    manda: "Manda el titular",
    resumen:
      "La presencia sale del cuerpo tipográfico. El titular ocupa el primer viewport casi entero y el documento asoma recortado abajo. Archivo 800.",
    paga: "El reporte queda subordinado: se promete antes de probar.",
  },
  {
    href: "/preview/registro/masa",
    nombre: "2 · Masa",
    manda: "Manda el valor",
    resumen:
      "La presencia sale de un corte duro de negro a blanco a escala de página, y el documento cruza la frontera. Schibsted Grotesk 700.",
    paga: "Compromete a la landing entera: el negro puede aparecer dos veces, no cinco.",
  },
  {
    href: "/preview/registro/objeto",
    nombre: "3 · Objeto",
    manda: "Manda el documento",
    resumen:
      "La presencia sale de la densidad de dato real a tamaño de lectura. El reporte ocupa medio viewport y se corta contra el borde. Public Sans 700.",
    paga: "Es el que menos se distingue de un competidor que también muestre su producto grande.",
  },
];

export default function IndiceRegistros() {
  return (
    <main
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "64px 24px 96px",
        fontFamily: "system-ui, sans-serif",
        color: "#0b0d0f",
      }}
    >
      <h1 style={{ fontSize: 28, letterSpacing: "-0.03em", margin: 0 }}>
        Tres registros
      </h1>
      <p style={{ color: "#4a515b", marginTop: 8, lineHeight: 1.6 }}>
        Mismo mundo, mismo copy, mismos datos. Lo único que cambia es de dónde
        sale la presencia.
      </p>
      <div style={{ marginTop: 32, display: "grid", gap: 12 }}>
        {REGISTROS.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            style={{
              display: "block",
              padding: "18px 20px",
              border: "1px solid #e2e4e7",
              borderRadius: 10,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", gap: 12 }}
            >
              <strong style={{ fontSize: 16, letterSpacing: "-0.02em" }}>
                {r.nombre}
              </strong>
              <span style={{ fontSize: 12, color: "#676e79" }}>{r.manda}</span>
            </div>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 13.5,
                lineHeight: 1.6,
                color: "#4a515b",
              }}
            >
              {r.resumen}
            </p>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 13.5,
                lineHeight: 1.6,
                color: "#676e79",
              }}
            >
              Paga: {r.paga}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
