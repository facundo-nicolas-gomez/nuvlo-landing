"use client";

import { useState } from "react";
import PanelLink from "@/components/landing/PanelLink";

/**
 * LA CABECERA. Completa, no reducida a wordmark + botón.
 *
 * No es sticky, y es una decisión: el argumento del producto es que nada sale
 * sin que vos lo decidas, así que clavarle al visitante un botón de venta en la
 * esquina de todos los cuadros es tonalmente lo contrario de lo que la página
 * dice. La cabecera se lee una vez, arriba, y después se va.
 *
 * En teléfono el menú es un `disclosure` de verdad —botón con `aria-expanded`,
 * panel que se muestra y se esconde—, no un enlace que desaparece.
 */

const ENLACES = [
  { href: "#reporte", texto: "El reporte" },
  { href: "#control", texto: "Control" },
  { href: "#entregable", texto: "El entregable" },
  { href: "#planes", texto: "Precios" },
  { href: "#preguntas", texto: "Preguntas" },
];

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="n-barra">
      <div className="d-marco n-fila">
        <a href="#" className="n-wordmark">
          Nuvlo
        </a>

        <nav className="n-enlaces" aria-label="Secciones">
          {ENLACES.map((e) => (
            <a key={e.href} href={e.href} className="n-enlace">
              {e.texto}
            </a>
          ))}
        </nav>

        <div className="n-acciones">
          <PanelLink className="d-boton d-boton-chico n-cta">
            Empezar gratis
          </PanelLink>
          <button
            type="button"
            className="n-menu"
            aria-expanded={abierto}
            aria-controls="n-panel"
            onClick={() => setAbierto((v) => !v)}
          >
            <span className="n-menu-texto">{abierto ? "Cerrar" : "Menú"}</span>
            <span className="n-menu-lineas" data-abierto={abierto || undefined} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div className="n-panel" id="n-panel" hidden={!abierto}>
        <div className="d-marco n-panel-cuerpo">
          {ENLACES.map((e) => (
            <a
              key={e.href}
              href={e.href}
              className="n-panel-enlace"
              onClick={() => setAbierto(false)}
            >
              {e.texto}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
