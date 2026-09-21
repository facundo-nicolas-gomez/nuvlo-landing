import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content-Security-Policy para un sitio estático de marketing (Next 16, App Router).
 *
 * Sólo lo que el sitio carga hoy: todo sale de 'self'. Se retiró el tracking
 * (GTM, Analytics, Pixel de Meta) y con él los permisos que existían para él
 * —googletagmanager, connect.facebook.net, *.google-analytics, doubleclick, los
 * dominios de ga-audiences— más el `data:` de img-src, que estaba por el SVG de
 * grano del Hero. Si vuelve alguna de esas piezas, el permiso vuelve con ella.
 *
 * Nota sobre 'unsafe-inline' en script-src: Next hidrata la página con scripts
 * inline (bootstrap + payload RSC) y no hay nonce por-request en SSG, así que un
 * `script-src 'self'` puro rompería la interactividad y dispararía violaciones
 * de CSP. 'unsafe-inline' es el mínimo estándar para que Next no rompa.
 * style-src lo necesita por los <style> que inyecta next/font. font-src 'self'
 * alcanza porque next/font/google descarga las tipografías en build y las sirve
 * desde /_next. En dev, Turbopack/HMR además usan eval y websockets, así que
 * esos permisos se agregan solo en desarrollo.
 */
// El overlay de /impeccable live carga live.js desde el helper local y le habla por SSE:
// es otro origen, y sin esto la CSP lo bloquea. Sólo en desarrollo.
const __impeccableLiveDev =
  process.env.NODE_ENV === "development" ? " http://localhost:8400" : "";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${__impeccableLiveDev}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self'",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}${__impeccableLiveDev}`,
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
