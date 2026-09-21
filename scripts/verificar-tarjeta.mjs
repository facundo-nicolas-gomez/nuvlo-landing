/**
 * ¿LA TARJETA SOCIAL SIGUE AL SISTEMA?
 *
 * ── POR QUÉ EXISTE ───────────────────────────────────────────────────────────
 * `app/opengraph-image.tsx` la rasteriza satori, que no tiene cascada: `var()`
 * no existe ahí, así que los tokens están copiados a mano en hex. Ningún cambio
 * de paleta la alcanza y ningún build la rompe, y por eso se shippeó TRES veces
 * mostrando un mundo que el sitio ya había retirado —la última el 18/09/2026,
 * con ocho colores, una sombra en vino y dos radios atrasados—. Es la imagen que
 * ve quien recibe el link por WhatsApp antes de entrar al sitio.
 *
 * Tres veces es un patrón, no un descuido: el aviso escrito no alcanza porque
 * quien cambia un token no abre ese archivo. Esto lo abre por él.
 *
 * ── CÓMO ─────────────────────────────────────────────────────────────────────
 * No hace falta inventar el vínculo: la tarjeta ya declara cada constante con el
 * nombre de su token al lado —«el nombre es la trazabilidad», dice su
 * comentario— y eso alcanza para leerlo con una expresión regular:
 *
 *     const CAMPO = "#fbfcfd"; // --campo
 *
 * El chequeo cruza ese par contra los dos archivos donde viven los valores:
 * `sistema/nuvlo.css`, que desde el 19/09/2026 tiene los tokens compartidos con
 * sus nombres de sistema (`--color-campo`), y `app/estilos/base.css`, que se
 * quedó con los de escenario (`--titulo-gris`, `--noche-honda`…). Se eligió esto y no
 * derivar los valores en el build —leer el CSS desde el componente— para no
 * ponerle al paso que publica una lectura de disco que puede fallar: la tarjeta
 * sigue siendo autónoma y sin dependencias, y lo que cambia es que ahora hay
 * alguien mirando. Es el mismo mecanismo con que el panel cuida los precios
 * (`verificar-precios`) y este sistema (`verificar-sistema`).
 *
 * ── QUÉ NO MIRA ──────────────────────────────────────────────────────────────
 * Lo que no lleva token al lado: la composición, los tamaños, las tres luces de
 * macOS —que son las de macOS y no salen de la paleta— y la sombra, que ahí va
 * escrita en un solo plano porque el corto no se ve a ese tamaño. Un valor sin
 * anotación no se inventa: si algún día tiene que viajar, se le pone el nombre.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
// Los dos: un token vive en uno o en el otro, nunca en los dos (el renombre del
// 19/09/2026 sacó de `base.css` todo lo que el sistema ya declara).
const HOJAS = [join(raiz, "sistema/nuvlo.css"), join(raiz, "app/estilos/base.css")];
const TARJETA = join(raiz, "app/opengraph-image.tsx");

/** Los tokens de las dos hojas. Sin comentarios: adentro hay hex de ejemplo y
 *  de valores retirados, y cualquiera de ellos daría un par falso. */
function tokens() {
  const m = {};
  for (const hoja of HOJAS) {
    const txt = readFileSync(hoja, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    for (const [, n, v] of txt.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) {
      m[n] ??= v.replace(/\s+/g, " ").trim().toLowerCase();
    }
  }
  return m;
}

/** Los pares `const X = "valor"; // --token` de la tarjeta. */
function anotados() {
  const txt = readFileSync(TARJETA, "utf8");
  return [
    ...txt.matchAll(/const\s+([A-Z_0-9]+)\s*=\s*"([^"]+)";\s*\/\/\s*--([a-z0-9-]+)/g),
  ].map(([, cte, valor, token]) => ({ cte, valor: valor.toLowerCase(), token }));
}

const sistema = tokens();
const tarjeta = anotados();

if (tarjeta.length === 0) {
  console.error(
    "verificar-tarjeta: no encontré ninguna constante anotada en app/opengraph-image.tsx.\n" +
      "  Si se reescribió, o el chequeo dejó de servir o alguien le sacó las anotaciones.\n" +
      "  Cada valor que salga de la paleta lleva `// --token` al lado; ver la cabecera de este script.",
  );
  process.exit(1);
}

const fallan = [];
for (const { cte, valor, token } of tarjeta) {
  const esperado = sistema[token];
  if (esperado === undefined) fallan.push(`  ${cte} dice ser --${token}, y ese token no existe ni en el sistema ni en base.css`);
  else if (esperado !== valor) fallan.push(`  ${cte} (--${token}): la tarjeta tiene ${valor} y el sistema ${esperado}`);
}

if (fallan.length > 0) {
  console.error(
    `verificar-tarjeta: la tarjeta social quedó atrás del sistema en ${fallan.length} ` +
      `de ${tarjeta.length} valores.\n\n${fallan.join("\n")}\n\n` +
      "  Es lo que se ve al compartir el link. Actualizá app/opengraph-image.tsx.",
  );
  process.exit(1);
}

console.log(
  `verificar-tarjeta: OK — los ${tarjeta.length} valores anotados de la tarjeta social ` +
    "coinciden con sistema/nuvlo.css y app/estilos/base.css.",
);
