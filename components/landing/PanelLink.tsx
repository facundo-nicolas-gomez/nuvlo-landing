"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * EL ÚNICO CTA DEL SITIO. Manda al alta del panel y reenvía la atribución.
 *
 * ── POR QUÉ HAY LISTA BLANCA Y NO SE REENVÍA LA QUERY ENTERA ────────────────
 * Reenviar `location.search` completo dejaría que cualquiera arme un link a
 * nuvloapp.com con un parámetro ajeno colgado —un `redirect_url`, por ejemplo—
 * y que ese parámetro llegue al panel viajando **con la credibilidad del
 * dominio propio**. La lista blanca es la defensa: entra lo que está acá
 * enumerado y nada más.
 *
 * ── POR QUÉ EN useEffect Y NO EN EL RENDER ──────────────────────────────────
 * El sitio es estático: en el servidor no existe la query del visitante. Si el
 * href se calculara durante el render, el HTML generado en build quedaría con
 * una versión y el cliente con otra, y React tiraría un error de hidratación.
 * Se renderiza el destino limpio y se le suman los parámetros después de
 * montar. Consecuencia buscada: **sin JS el link sigue funcionando**, sólo que
 * sin atribución.
 *
 * ── POR QUÉ SE ESCRIBE EL DOM Y NO UN useState ──────────────────────────────
 * Un `setState` dentro del efecto dispara un render en cascada por cada CTA de
 * la página, y la regla `react-hooks/set-state-in-effect` lo marca como error.
 * Escribir `href` sobre el nodo es exactamente para lo que existe un efecto:
 * sincronizar React con un sistema externo, que acá es el DOM. Un solo write,
 * sin re-render.
 */

const DESTINO = "https://panel.nuvloapp.com/sign-up";

const PERMITIDOS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "fbclid",
  "gclid",
  "ttclid",
  "msclkid",
];

export default function PanelLink({
  children,
  className,
  ...resto
}: {
  children: ReactNode;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  const ancla = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const entrada = new URLSearchParams(window.location.search);
    const salida = new URLSearchParams();

    for (const clave of PERMITIDOS) {
      const valor = entrada.get(clave);
      // Un tope de largo por si alguien intenta empujar una carga larga a
      // través de un parámetro que sí está permitido.
      if (valor && valor.length <= 256) salida.set(clave, valor);
    }

    const query = salida.toString();
    if (query && ancla.current) ancla.current.href = `${DESTINO}?${query}`;
  }, []);

  return (
    <a ref={ancla} href={DESTINO} className={className} {...resto}>
      {children}
    </a>
  );
}
