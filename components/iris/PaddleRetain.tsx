"use client";

import Script from "next/script";

/**
 * PADDLE.JS EN LA HOME, PARA PADDLE RETAIN.
 *
 * Retain recupera pagos fallidos y pide Paddle.js en una página pública: la doc
 * de Paddle («Include and initialize Paddle.js») dice que ahí se inicializa sin
 * `pwCustomer`. Los avisos DENTRO de la app sí lo necesitan —con el id de
 * cliente de Paddle, no uno nuestro—, y ésos son del panel, no de acá.
 *
 * Va sólo en la home y no en el layout: Retain no la pide en las legales, y
 * cada página sin script de terceros es una página que `/privacidad` no tiene
 * que explicar.
 *
 * `afterInteractive` y no `beforeInteractive`: nada de la página depende de
 * Paddle, así que no tiene por qué competir con la hidratación.
 *
 * El token es el client-side (`live_…`), que Paddle hace para ir en el
 * navegador: `NEXT_PUBLIC_` lo escribe en el bundle y está bien que así sea.
 * Sin token no se carga nada —el build del CI no lo tiene y tiene que seguir en
 * verde—; que en producción no falte lo cuida `next.config.ts`.
 */
const TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

declare global {
  interface Window {
    Paddle?: { Initialize: (opciones: { token: string }) => void };
  }
}

export function PaddleRetain() {
  if (!TOKEN) return null;
  return (
    <Script
      src="https://cdn.paddle.com/paddle/v2/paddle.js"
      strategy="afterInteractive"
      onLoad={() => window.Paddle?.Initialize({ token: TOKEN })}
    />
  );
}
