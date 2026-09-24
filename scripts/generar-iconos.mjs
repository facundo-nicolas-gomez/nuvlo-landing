/**
 * LOS TRES ÍCONOS, DERIVADOS DE LA MARCA
 *
 * ── POR QUÉ EXISTE ───────────────────────────────────────────────────────────
 * `app/icon.svg`, `app/favicon.ico` y `app/apple-icon.png` no son tres dibujos:
 * son tres recortes del MISMO archivo, `marca/nuvlo-monograma.svg`, que aportó
 * el dueño. Dos de los tres son binarios, así que sin este script nadie puede
 * rehacerlos cuando la marca cambie —y la versión anterior de estos íconos se
 * trazó a mano de un PNG que hoy ya no está en el repo—.
 *
 * Los tres colores de la marca SON tres tokens del sistema: el dueño la dibujó
 * con la paleta. Pero Next sirve estos archivos como íconos, fuera del árbol de
 * la página, así que ahí adentro no hay `var()` que valga y el hex queda
 * copiado. Es el mismo problema que la tarjeta social, que se shippeó TRES veces
 * mostrando un mundo que el sitio ya había retirado.
 *
 * ── LOS DOS MODOS ────────────────────────────────────────────────────────────
 *   node scripts/generar-iconos.mjs              escribe los seis archivos
 *   node scripts/generar-iconos.mjs --verificar  no escribe nada; rompe si los
 *                                                del repo quedaron atrás
 *
 * El segundo corre en el CI (`npm run verificar-iconos`, en `verificar.yml` al
 * lado del de la tarjeta). Sin él, un cambio de paleta o de marca no rompe nada:
 * el que toca un token no abre este archivo, y la copia envejece en silencio.
 *
 *   marca/nuvlo-monograma.svg
 *     ├── app/icon.svg        círculo + monograma  (la pestaña del navegador)
 *     ├── app/favicon.ico     16/32/48 del mismo   (el fallback de siempre)
 *     └── app/apple-icon.png  180 cuadrado         (la pantalla de inicio de iOS)
 *
 * Y los mismos tres en `../nuvlo-panel/src/app/`: `ENTORNO.md §12` del panel pide
 * que el ícono entre a los dos repos con el mismo archivo.
 *
 * Aparte, una COPIA que no se deriva:
 *
 *   marca/nuvlo-monograma.png
 *     └── public/nuvlo-monograma.png  512 cuadrado, el PNG del dueño tal cual
 *                                     (la URL del logo en los productos de
 *                                     Paddle; Retain no la lee: guarda su
 *                                     propia copia al subirlo, ver next.config.ts)
 *
 * No se rasteriza del SVG: el dueño ya entregó su PNG, y re-rasterizarlo daría
 * otro archivo por el mismo motivo que explica abajo el sello. Así que se copia
 * byte a byte y se verifica byte a byte, sin holgura. Va sólo en la landing
 * porque Paddle lo lee de una URL pública, y ésa es `nuvloapp.com`.
 *
 * ── LO QUE DECIDE Y NO SE TOCA A OJO ─────────────────────────────────────────
 * Los vértices salen del archivo del dueño SIN EDITAR: se copian los dos `d`
 * tal cual y lo único que se agrega es un `transform`. Un vértice movido a mano
 * es una marca distinta que nadie sabría comparar contra el original.
 *
 * ── CÓMO SE VERIFICA UN BINARIO, Y POR QUÉ NO POR PÍXEL ──────────────────────
 * `icon.svg` es texto que arma este script: determinista, y se compara byte a
 * byte, sin holgura.
 *
 * Los otros dos los rasteriza `sharp`, y ahí el byte depende del build de
 * libvips —el CI corre en Linux, el desarrollo en Windows— y del parche que
 * resuelva el lockfile. El primer intento fue comparar PÍXELES con holgura, y se
 * descartó con el número en la mano: midiendo en este repo el MISMO dibujo por
 * otro pipeline de resampleo, los subpíxeles fuera de holgura dan 8,1% a 16px,
 * 5,9% a 32px y 3,5% a 48px. Un dibujo genuinamente distinto —la marca con el
 * acento corrido un tono— daba 2,3%. O sea que el ruido del rasterizador es MÁS
 * GRANDE que la señal: ninguna tolerancia separa «otro Linux» de «otra marca», y
 * la que pareciera andar sería un rojo que aparece sin que nadie haya tocado
 * nada. Un chequeo que miente se borra, y entonces el hueco vuelve.
 *
 * Así que cada ráster lleva ADENTRO el sha del SVG del que salió, en un chunk
 * `tEXt` que todo decodificador de PNG ignora. Verificar deja de ser una
 * estimación: o el sello es el del `icon.svg` de hoy, o el ráster quedó atrás.
 * No depende de la plataforma, no tiene holgura, y no se puede despegar de su
 * archivo con un commit parcial.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const APP = join(raiz, "app");
const PANEL = join(raiz, "..", "nuvlo-panel", "src", "app");

const VERIFICAR = process.argv.includes("--verificar");
const fallas = [];
const falla = (msg) => fallas.push(msg);
const sha = (b) => createHash("sha256").update(b).digest("hex").slice(0, 16);

/* ── 1. Leer la marca ───────────────────────────────────────────────────────── */

const fuente = readFileSync(join(raiz, "marca/nuvlo-monograma.svg"), "utf8");

/** Los dos `path` con su color, en el orden en que los pintó el original. */
const trazos = [...fuente.matchAll(/<path fill="(#[0-9a-f]{6})" d="([^"]+)"/g)].map(
  ([, fill, d]) => ({ fill, d }),
);
if (trazos.length !== 2) {
  throw new Error(`esperaba 2 paths en la marca, encontré ${trazos.length}`);
}

// El `viewBox` del original es 384 y el monograma está centrado en él: lo
// verificamos en vez de confiar, porque toda la geometría de abajo lo asume.
const CAJA = 384;
const vb = fuente.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
if (!vb || Math.round(+vb[1]) !== CAJA || Math.round(+vb[2]) !== CAJA) {
  throw new Error(`la marca dejó de ser un cuadrado de ${CAJA}: viewBox ${vb?.[0]}`);
}

/** El fondo: el original apila un blanco inerte y encima el petróleo. El que
 *  manda es el último, y es el que viaja a los tres archivos. */
const rects = [...fuente.matchAll(/<rect[^>]*fill="(#[0-9a-f]{6})"/g)].map((m) => m[1]);
const PLACA = rects.at(-1);

/* ── 2. Los colores contra el sistema ───────────────────────────────────────── */

// Éste es el chequeo que cierra el hueco: sin él, mover un token en
// `sistema/nuvlo.css` deja los íconos atrás y nada da rojo.
const TOKENS = {
  [PLACA]: "--color-acento-tinta",
  "#e9ebdf": "--color-sobre-noche",
  "#8fc3c9": "--color-acento-sobre-noche",
};
const sistema = readFileSync(join(raiz, "sistema/nuvlo.css"), "utf8").replace(
  /\/\*[\s\S]*?\*\//g, // adentro hay hex de ejemplo y de valores retirados
  "",
);
for (const [hex, token] of Object.entries(TOKENS)) {
  const decl = sistema.match(new RegExp(`${token}:\\s*([^;]+);`));
  const valor = decl?.[1]?.trim().toLowerCase();
  if (valor !== hex) {
    falla(
      `${token} vale ${valor ?? "(no está en sistema/nuvlo.css)"}, pero la marca lo usa como ${hex}.\n` +
        `    O cambió la paleta y la marca quedó atrás, o cambió la marca. Los dos\n` +
        `    casos los decide una persona, no este script.`,
    );
  }
}
for (const { fill } of trazos) {
  if (!TOKENS[fill]) falla(`la marca trae un color sin token: ${fill}`);
}

/* ── 3. La escala dentro del círculo ────────────────────────────────────────── */

/** Cuánto se aleja del centro el punto más lejano del monograma. Manda la punta
 *  de la diagonal del acento, no la esquina de la caja: el corte del círculo no
 *  muerde una caja, muerde un trazo. */
const radioMarca = Math.max(
  ...trazos.flatMap(({ d }) => {
    const raros = [...new Set(d.match(/[A-Za-z]/g))].filter((c) => !"MLZ".includes(c));
    if (raros.length) throw new Error(`la marca trae curvas (${raros}): remedir a mano`);
    const n = d.match(/-?\d+(?:\.\d+)?/g).map(Number);
    return n.reduce((acc, _, i) => {
      if (i % 2) acc.push(Math.hypot(n[i - 1] - CAJA / 2, n[i] - CAJA / 2));
      return acc;
    }, []);
  }),
);

const LADO = 512; // el lienzo de `icon.svg`
const R = LADO / 2;

// 0,745 del radio es la proporción que ya tenía el ícono retirado (mark de 330
// sobre un círculo de 512) y el motivo sigue siendo el mismo: deja aire para que
// el corte del círculo no muerda la diagonal. Con este monograma da el mismo
// ancho de 330, porque las dos marcas tienen casi la misma relación de lados.
// Probado contra 0,80 y 0,85: a 16px no se lee mejor y a 0,85 ya roza la punta.
const AIRE = 0.745;
const escala = +((AIRE * R) / radioMarca).toFixed(5);
const corre = +(R - (CAJA / 2) * escala).toFixed(3);

/* ── 4. Los dos SVG ─────────────────────────────────────────────────────────── */

const grupo = (indent) =>
  trazos
    .map(
      ({ fill, d }) =>
        `${indent}<path fill="${fill}" data-token="${TOKENS[fill]}" d="${d}" />`,
    )
    .join("\n");

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LADO} ${LADO}" role="img" aria-label="Nuvlo">
  <!--
    GENERADO POR \`scripts/generar-iconos.mjs\` — NO EDITAR A MANO.
    Sale de \`marca/nuvlo-monograma.svg\`; si la marca cambia, se corre el script.
    El CI compara este archivo byte a byte contra lo que el script produce hoy, y
    los dos rásters llevan adentro el sha de este texto, así que una edición a
    mano acá da rojo por partida doble (\`npm run verificar-iconos\`).

    EL MONOGRAMA ES LA MARCA DEL DUEÑO, SIN TOCAR. Los dos \`path\` están copiados
    tal cual del archivo que aportó; lo único agregado es el \`transform\` que los
    centra y los escala. No se editó un vértice, así que este dibujo se puede
    comparar contra el original sin interpretar nada.

    EL FONDO ES REDONDO por pedido del dueño, y el motivo aguanta el cambio de
    marca: a 16px un cuadrado con el signo adentro se lee como una ficha, y el
    círculo deja que lo único con forma reconocible sea el monograma. El ícono de
    iOS sí es cuadrado, porque ahí enmascara el sistema.

    LA MARCA ENTRA AL ${(AIRE * 100).toFixed(1)}% DEL RADIO. No es la caja del monograma la que
    decide: manda la punta de la diagonal del acento, que es el punto más lejano
    del centro, y de ahí sale la escala de ${escala}. Con menos aire el círculo le
    muerde la diagonal; es la misma proporción que tenía el ícono retirado.

    LOS COLORES VAN EN HEX Y ESO ESTÁ BIEN ACÁ. Next sirve este archivo como
    ícono, fuera del árbol de la página, así que no hay \`var()\` que valga. Pero
    los tres son tokens del sistema —el dueño dibujó la marca con la paleta— y el
    CI rompe si alguno deja de coincidir con \`sistema/nuvlo.css\`. Cada elemento
    lleva su \`data-token\` al lado del hex: es la misma trazabilidad que la
    tarjeta social escribe como comentario, que acá no se puede porque XML
    prohíbe el guión doble adentro de un comentario.
  -->
  <circle cx="${R}" cy="${R}" r="${R}" fill="${PLACA}" data-token="${TOKENS[PLACA]}" />
  <g transform="translate(${corre} ${corre}) scale(${escala})">
${grupo("    ")}
  </g>
</svg>
`;

// A sangre, con la composición del dueño: iOS recorta con su propio squircle, y
// la punta más lejana del monograma queda holgada adentro de esa máscara.
const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CAJA} ${CAJA}">
  <rect width="${CAJA}" height="${CAJA}" fill="${PLACA}" />
${grupo("  ")}
</svg>
`;

/* ── 5. El sello de origen ──────────────────────────────────────────────────── */

/** CRC32 propio y no `zlib.crc32`, que recién existe desde Node 22.2: este
 *  script corre en el CI y no conviene que dependa del parche de Node. */
const TABLA_CRC = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = TABLA_CRC[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};

const CLAVE = "nuvlo-origen";

/** Mete el sha del SVG de origen como chunk `tEXt`, justo antes del IEND. Es un
 *  chunk auxiliar: ningún navegador lo mira y pesa 30 bytes. */
function sellar(png, sello) {
  const datos = Buffer.concat([
    Buffer.from(CLAVE, "latin1"),
    Buffer.alloc(1), // el separador es un 0
    Buffer.from(sello, "latin1"),
  ]);
  const tipo = Buffer.from("tEXt", "latin1");
  const largo = Buffer.alloc(4);
  largo.writeUInt32BE(datos.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([tipo, datos])));
  const iend = png.length - 12; // IEND son siempre los últimos 12 bytes
  return Buffer.concat([
    png.subarray(0, iend),
    largo,
    tipo,
    datos,
    crc,
    png.subarray(iend),
  ]);
}

/** El sello de un PNG ya escrito, recorriendo los chunks como manda el formato
 *  —buscar la clave por substring encontraría cualquier cosa—. */
function leerSello(png) {
  if (png.length < 8 || png.readUInt32BE(0) !== 0x89504e47) return null;
  let o = 8;
  while (o + 8 <= png.length) {
    const largo = png.readUInt32BE(o);
    const tipo = png.toString("latin1", o + 4, o + 8);
    if (tipo === "IEND") return null;
    if (tipo === "tEXt") {
      const datos = png.subarray(o + 8, o + 8 + largo);
      const corte = datos.indexOf(0);
      if (corte > 0 && datos.toString("latin1", 0, corte) === CLAVE) {
        return datos.toString("latin1", corte + 1);
      }
    }
    o += 12 + largo;
  }
  return null;
}

/* ── 6. Rasterizar ──────────────────────────────────────────────────────────── */

const LADOS_ICO = [16, 32, 48];
const APPLE = 180; // el tamaño que pide Apple para la pantalla de inicio

const SELLO_ICON = sha(iconSvg);
const SELLO_APPLE = sha(appleSvg);

const png = async (svg, lado, sello) =>
  sellar(
    await sharp(Buffer.from(svg), { density: 384 })
      .resize(lado, lado)
      .png({ compressionLevel: 9 })
      .toBuffer(),
    sello,
  );

/** Un .ico con los PNG adentro: 6 bytes de cabecera, 16 por entrada, y las
 *  imágenes al final. Todo navegador lo lee desde hace más de una década. */
function ico(imgs) {
  const cab = Buffer.alloc(6);
  cab.writeUInt16LE(0, 0); // reservado
  cab.writeUInt16LE(1, 2); // 1 = ícono
  cab.writeUInt16LE(imgs.length, 4);

  let offset = 6 + imgs.length * 16;
  const dir = imgs.map(({ lado, buf }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(lado, 0); // 256 se escribiría como 0; acá no llegamos
    e.writeUInt8(lado, 1);
    e.writeUInt16LE(1, 4); // planos
    e.writeUInt16LE(32, 6); // bits por píxel
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buf.length;
    return e;
  });

  return Buffer.concat([cab, ...dir, ...imgs.map((i) => i.buf)]);
}

/** Los cuadros de un .ico ya escrito, para mirarlos de a uno. */
function leerIco(buf, donde) {
  if (buf.length < 6 || buf.readUInt16LE(0) !== 0 || buf.readUInt16LE(2) !== 1) {
    falla(`${donde} no es un .ico`);
    return null;
  }
  return Array.from({ length: buf.readUInt16LE(4) }, (_, i) => {
    const o = 6 + i * 16;
    const off = buf.readUInt32LE(o + 12);
    return { lado: buf[o] || 256, buf: buf.subarray(off, off + buf.readUInt32LE(o + 8)) };
  });
}

const cuadros = await Promise.all(
  LADOS_ICO.map(async (lado) => ({ lado, buf: await png(iconSvg, lado, SELLO_ICON) })),
);

const SALIDAS = [
  { nombre: "icon.svg", buf: Buffer.from(iconSvg), texto: true },
  { nombre: "favicon.ico", buf: ico(cuadros), sello: SELLO_ICON },
  { nombre: "apple-icon.png", buf: await png(appleSvg, APPLE, SELLO_APPLE), sello: SELLO_APPLE, lado: APPLE },
];

/** Las copias sin derivar (ver la cabecera): de la marca a `public/`, idénticas. */
const COPIAS = [{ desde: "marca/nuvlo-monograma.png", hacia: "public/nuvlo-monograma.png" }];

/* ── 7. Escribir, o comparar ────────────────────────────────────────────────── */

/** Que el PNG sea legible y mida lo que tiene que medir. El sello dice de dónde
 *  salió; esto dice que además es una imagen y no cualquier cosa. */
async function mide(buf, lado, donde) {
  try {
    const m = await sharp(buf).metadata();
    if (m.format !== "png") falla(`${donde} no es un PNG (es ${m.format})`);
    else if (m.width !== lado || m.height !== lado) {
      falla(`${donde} mide ${m.width}×${m.height} y debería medir ${lado}×${lado}`);
    }
  } catch (e) {
    falla(`${donde} no se pudo decodificar: ${e.message}`);
  }
}

if (!VERIFICAR) {
  // Antes de escribir, no después: no tiene sentido dejar seis archivos con una
  // paleta que ya no existe. Lo único que pudo fallar hasta acá son los tokens,
  // y eso lo decide una persona.
  if (fallas.length) {
    console.error("no escribí nada:\n");
    for (const f of fallas) console.error(`  · ${f}\n`);
    process.exit(1);
  }

  for (const { nombre, buf } of SALIDAS) {
    for (const destino of [APP, PANEL]) writeFileSync(join(destino, nombre), buf);
    console.log(
      `✓ ${nombre.padEnd(15)} ${String(buf.length).padStart(6)} B  →  app/ y nuvlo-panel/src/app/`,
    );
  }
  console.log(
    `\n  radio del monograma ${radioMarca.toFixed(2)}/${CAJA / 2} · escala ${escala} · ` +
      `radio final ${(radioMarca * escala).toFixed(1)} sobre ${R}\n` +
      `  sello: icon.svg ${SELLO_ICON} · apple ${SELLO_APPLE}`,
  );
  for (const { desde, hacia } of COPIAS) {
    writeFileSync(join(raiz, hacia), readFileSync(join(raiz, desde)));
    console.log(`✓ ${hacia}  ←  copia de ${desde}`);
  }
} else {
  for (const { nombre, buf, texto, sello, lado } of SALIDAS) {
    const ruta = join(APP, nombre);
    const donde = `app/${nombre}`;
    if (!existsSync(ruta)) {
      falla(`falta ${donde}. Correr \`node scripts/generar-iconos.mjs\`.`);
      continue;
    }
    const enDisco = readFileSync(ruta);

    if (texto) {
      // Sin holgura: lo arma este script y es determinista. Se normaliza el fin
      // de línea porque git lo puede cambiar al clonar en Windows.
      const norm = (b) => b.toString("utf8").replace(/\r\n/g, "\n");
      if (norm(enDisco) !== norm(buf)) {
        falla(
          `${donde} no es lo que el script produce hoy (${sha(enDisco)} vs ${sha(buf)}).\n` +
            `    Cambió la marca, cambió un token, o alguien lo editó a mano —el archivo\n` +
            `    dice que no—. Correr \`node scripts/generar-iconos.mjs\` y commitear los seis.`,
        );
      }
      continue;
    }

    const stale = (d, visto) =>
      falla(
        `${d} salió de otro dibujo: lleva el sello ${visto ?? "(ninguno)"} y el ` +
          `icon.svg de hoy\n    es ${sello}. Correr \`node scripts/generar-iconos.mjs\` y commitear los seis.`,
      );

    if (nombre === "favicon.ico") {
      const frames = leerIco(enDisco, donde);
      if (!frames) continue;
      const lados = frames.map((c) => c.lado).join("/");
      if (lados !== LADOS_ICO.join("/")) {
        falla(`${donde} trae los cuadros ${lados} y deberían ser ${LADOS_ICO.join("/")}`);
        continue;
      }
      for (const cuadro of frames) {
        await mide(cuadro.buf, cuadro.lado, `${donde} (${cuadro.lado}px)`);
        const visto = leerSello(cuadro.buf);
        if (visto !== sello) stale(`${donde} (${cuadro.lado}px)`, visto);
      }
      continue;
    }

    await mide(enDisco, lado, donde);
    const visto = leerSello(enDisco);
    if (visto !== sello) stale(donde, visto);
  }

  // Las copias del panel. En el CI de la landing el otro repo no está en el
  // disco, y eso no es un error: se saltea diciéndolo, igual que los pasos
  // cruzados de `/verificar`. Quien sí las ve es quien corre local antes de
  // commitear, que es el único momento en que se pueden despegar.
  if (existsSync(PANEL)) {
    for (const { nombre } of SALIDAS) {
      const copia = join(PANEL, nombre);
      // Si el de la landing falta, ya se reportó arriba: compararlo tiraría una
      // excepción y se perdería el informe entero.
      if (!existsSync(join(APP, nombre))) continue;
      if (!existsSync(copia)) {
        falla(
          `falta ${relative(raiz, copia).replace(/\\/g, "/")}. Correr el script sin \`--verificar\`.`,
        );
      } else if (sha(readFileSync(copia)) !== sha(readFileSync(join(APP, nombre)))) {
        falla(
          `${nombre} difiere entre los dos repos. ENTORNO.md §12 del panel pide el mismo\n` +
            `    archivo en los dos; correr el script sin \`--verificar\` y commitear allá también.`,
        );
      }
    }
  } else {
    console.log(
      "verificar-iconos: sin ../nuvlo-panel en el disco, no comparo las copias del panel.",
    );
  }

  // Byte a byte y sin sello: no hay rasterizador en el medio que cambie un byte.
  for (const { desde, hacia } of COPIAS) {
    const ruta = join(raiz, hacia);
    if (!existsSync(ruta)) {
      falla(`falta ${hacia}. Correr \`node scripts/generar-iconos.mjs\`.`);
    } else if (sha(readFileSync(ruta)) !== sha(readFileSync(join(raiz, desde)))) {
      falla(
        `${hacia} ya no es copia de ${desde}. Cambió la marca y la copia quedó atrás,\n` +
          `    o alguien la editó a mano. Correr \`node scripts/generar-iconos.mjs\` y commitearla.`,
      );
    }
  }

  if (fallas.length) {
    console.error("\nverificar-iconos: los íconos quedaron atrás.\n");
    for (const f of fallas) console.error(`  · ${f}\n`);
    process.exit(1);
  }
  console.log(
    `verificar-iconos: OK — los tres salen de marca/nuvlo-monograma.svg ` +
      `(sello ${SELLO_ICON})${existsSync(PANEL) ? ", y el panel tiene los mismos" : ""}; ` +
      `${COPIAS.map((c) => c.hacia).join(", ")} es copia exacta de la marca.`,
  );
}
