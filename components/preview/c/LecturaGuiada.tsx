"use client";

import { useEffect, useRef, useState } from "react";

/**
 * LECTURA GUIADA. El informe muestra y oculta partes según la nota que se está
 * leyendo, en vez de desplazarse entero e inerte.
 *
 * ── POR QUÉ EXISTE ──────────────────────────────────────────────────────────
 * El informe entero de entrada es una pared de datos: el ojo no sabe dónde
 * mirar y la sección se lee como una grilla. Acá cada nota enciende la parte
 * del documento de la que habla y apaga el resto, así la lectura tiene un orden
 * en vez de un volumen. Es storytelling, que es una de las razones válidas para
 * que algo se mueva: la animación comunica jerarquía, no decora.
 *
 * ── CÓMO ESTÁ HECHO, Y CÓMO NO ──────────────────────────────────────────────
 * IntersectionObserver con la raíz recortada a una banda fina en el centro del
 * viewport: la nota que cruza esa banda es la que manda. Nada de escuchar
 * `scroll`, que corre en cada cuadro y no se puede agrupar, y nada de guardar
 * el progreso del scroll en estado de React. El estado que sí se guarda es
 * discreto -cuál de cuatro notas está activa- y cambia unas pocas veces en toda
 * la sección.
 *
 * ── LOS TRES CASOS EN LOS QUE NO SE ACTIVA ──────────────────────────────────
 * Sin JavaScript, con `prefers-reduced-motion` o en una sola columna, el
 * atributo se queda en "todo" y el documento se ve entero y nítido. El realce
 * es una mejora sobre una sección que ya funciona, nunca un requisito para
 * poder leerla.
 */
export default function LecturaGuiada({
  notas,
  children,
}: {
  notas: { clave: string; titulo: string; texto: string }[];
  children: React.ReactNode;
}) {
  const [foco, setFoco] = useState("todo");
  const contenedor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodos = contenedor.current?.querySelectorAll<HTMLElement>("[data-clave]");
    if (!nodos?.length) return;

    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");
    const angosta = window.matchMedia("(max-width: 999px)");

    let io: IntersectionObserver | null = null;

    const conectar = () => {
      io?.disconnect();
      io = null;
      if (sinMovimiento.matches || angosta.matches) {
        setFoco("todo");
        return;
      }
      io = new IntersectionObserver(
        (entradas) => {
          for (const entrada of entradas) {
            if (!entrada.isIntersecting) continue;
            const clave = (entrada.target as HTMLElement).dataset.clave;
            if (clave) setFoco(clave);
          }
        },
        // Raíz recortada a una banda de 10dvh en el centro: la nota que la cruza
        // es la que el lector tiene delante.
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
      );
      nodos.forEach((n) => io?.observe(n));
    };

    conectar();
    sinMovimiento.addEventListener("change", conectar);
    angosta.addEventListener("change", conectar);

    return () => {
      io?.disconnect();
      sinMovimiento.removeEventListener("change", conectar);
      angosta.removeEventListener("change", conectar);
    };
  }, []);

  return (
    <div className="c-prueba-grilla" data-foco={foco} ref={contenedor}>
      <div className="c-hoja">{children}</div>

      <aside className="c-notas">
        {notas.map((nota) => (
          <div
            className="c-nota"
            key={nota.clave}
            data-clave={nota.clave}
            data-activa={foco === nota.clave ? "" : undefined}
          >
            <h3 className="c-nota-titulo">{nota.titulo}</h3>
            <p className="c-nota-texto">{nota.texto}</p>
          </div>
        ))}
      </aside>
    </div>
  );
}
