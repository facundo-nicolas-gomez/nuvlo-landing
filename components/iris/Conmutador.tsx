"use client";

import { MotionConfig, motion } from "motion/react";
import { useId } from "react";

/**
 * EL CONMUTADOR — dos opciones en un riel, con la perilla que se desliza.
 *
 * ── DE DÓNDE VIENE ──────────────────────────────────────────────────────────
 * Es el `PricingSwitch` del «pricing-section-1» de 21st.dev que el dueño pasó
 * el 10/09/2026 («me gustó la composición entera»). Lo que se conserva es su
 * dibujo: un riel en pastilla y una perilla oscura que viaja de una opción a
 * la otra con un resorte, en vez de dos botones que cambian de color. Lo que
 * no se copia es su código: ni Tailwind, ni `cn`, ni el degradé negro con
 * borde de 4px, ni el azul —el sistema tiene un acento y va en la acción—.
 * Revestido: riel `hoja-hundida` con filete, perilla `tinta` con texto `hoja`,
 * el radio de pastilla y los cuerpos de la escala.
 *
 * ── RADIOS DE VERDAD, NO BOTONES CON ROL ────────────────────────────────────
 * El original era dos `<button>` sin ningún rol: para un lector de pantalla,
 * dos botones sueltos que no dicen cuál está elegido. Acá son dos `<input
 * type="radio">` con su `<label>`: el grupo se anuncia con su nombre, la
 * opción elegida se anuncia como tal, las flechas cambian de opción y hay una
 * sola parada de tabulación, que es lo que el patrón pide. El anillo de foco
 * lo dibuja la etiqueta cuando su radio lo tiene (`:has`).
 *
 * ── LA PERILLA ES UNA SOLA ──────────────────────────────────────────────────
 * El original montaba una perilla adentro del botón activo y la movía con
 * `layoutId`. Con radios nativos es más simple: una sola perilla absoluta que
 * se desplaza el ancho de una opción. `MotionConfig reducedMotion="user"` la
 * deja saltar sin resorte para quien pidió movimiento reducido.
 *
 * Sin JavaScript los radios funcionan igual —el navegador los conmuta— y la
 * perilla se queda en la opción servida; lo que no cambia es el total, que es
 * el costo asumido de que la cuenta viva en el cliente.
 */

export type OpcionConmutador = {
  valor: string;
  etiqueta: string;
  /** Un dato al lado de la etiqueta: el precio del plan, en tabulares. */
  detalle?: string;
};

export function Conmutador({
  nombre,
  opciones,
  valor,
  onCambiar,
}: {
  nombre: string;
  opciones: readonly [OpcionConmutador, OpcionConmutador];
  valor: string;
  onCambiar: (valor: string) => void;
}) {
  const grupo = useId();
  const indice = Math.max(
    0,
    opciones.findIndex((o) => o.valor === valor),
  );

  return (
    <MotionConfig reducedMotion="user">
      <fieldset className="i-conmutador">
        <legend className="i-solo-lectores">{nombre}</legend>
        <motion.span
          className="i-conmutador-perilla"
          aria-hidden="true"
          initial={false}
          animate={{ x: `${indice * 100}%` }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        {opciones.map((o) => {
          const activa = o.valor === valor;
          return (
            <label
              key={o.valor}
              className="i-conmutador-opcion"
              data-activa={activa ? "" : undefined}
            >
              <input
                type="radio"
                name={grupo}
                value={o.valor}
                checked={activa}
                onChange={() => onCambiar(o.valor)}
                className="i-solo-lectores"
              />
              <span className="i-conmutador-texto">
                {o.etiqueta}
                {o.detalle ? (
                  <span className="i-conmutador-detalle i-cifra">
                    {o.detalle}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </fieldset>
    </MotionConfig>
  );
}
