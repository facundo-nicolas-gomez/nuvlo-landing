# CLAUDE.md

Guía para Claude Code (claude.ai/code) cuando trabaja en este repositorio.

Todo el repo —código, comentarios, docs y commits— está en castellano. Escribí en
castellano, y escribí el porqué al lado de la decisión: los archivos de acá comentan
el motivo, no lo que hace la línea.

Esta es **la landing**: superficie de marketing estática (Next.js 16 App Router,
React 19, Tailwind v4). Sin backend, sin formularios, sin variables de entorno, sin
base de datos. Tiene un solo objetivo: que el visitante se registre en
`panel.nuvloapp.com/sign-up`. El producto vive en `../nuvlo-panel`, el repo principal.

Lo que Nuvlo vende es un reporte de Meta Ads que el trafficker freelance manda a sus
clientes bajo su propia marca. El trabajo de esta landing es **mostrar ese reporte y
la historia de control** —«vos aprobás antes de que salga nada»—, no describir el
producto en abstracto.

## Los documentos que mandan

Antes de tocar contenido o diseño, leelos. No son contexto: son la autoridad.

- **[PRODUCT.md](PRODUCT.md)** — qué se puede afirmar y a quién: usuario primario,
  posicionamiento, precios, evidencia disponible, restricciones de copy, compromisos de
  marca. Encabezados en inglés (esquema de Impeccable), cuerpo en castellano. Registra
  las decisiones del dueño que cambian el rumbo, con fecha.
- **[DESIGN.md](DESIGN.md)** — el sistema visual: tokens, roles tipográficos, layout,
  elevación, componentes, *Named Rules* y un `Do's / Don'ts` donde cada *Don't*
  registra un error ya cometido. **Leer primero su cabecera**: dice qué partes
  describen la dirección vigente y cuáles la anterior. Si un cambio contradice una
  *Named Rule* o un *Don't*, eso es señal de parar y revisar, no de rodearla.
- **[.impeccable/surfaces/](.impeccable/surfaces/)** — el brief de cada superficie en
  rediseño: dirección elegida, decisiones tomadas y lo que quedó sin resolver. Se
  re-siembra con cada pasada. `ENTORNO.md §12` del panel remite acá.

Los dos primeros dicen lo mismo: si contradicen al código, el archivo está mal. Los
precios de `PRODUCT.md` sí son la fuente de verdad del código (un desajuste ahí es el
código derivando); los tokens de `DESIGN.md`, que ya describen `iris`, sí valen — pero
ante conflicto con el CSS de `app/estilos/`, manda el CSS.

Este archivo no los resume: los nombra. Un inventario copiado envejece sin avisar.

## Comandos

```bash
npm run dev       # Next dev (Turbopack)
npm run build     # build de producción
npm run start     # sirve el build
npm run lint      # eslint (flat config, eslint-config-next)
npm run typecheck # next typegen && tsc --noEmit — typegen genera next-env.d.ts, que está
                  # en .gitignore: sin él, un checkout limpio no tiene los tipos de Next
```

**No hay suite de tests, por decisión** (ver `.github/workflows/verificar.yml`): para
una landing estática sin backend no vale el costo. No agregues una sin que te la pidan.

El CI (`verificar.yml`, en push a `main` y en PRs) corre en orden: `npm ci` →
`npm run lint` → `npm run typecheck` → `npm run build` y, en push a `main` con todo en
verde, el job `publicar` corre `vercel deploy --prod`. **Vercel no publica `main` por su
cuenta** (`vercel.json`, `git.deploymentEnabled`): un CI en rojo no llega a producción.
Reproducí esa secuencia en local antes de dar algo por terminado.

**`/verificar`** (y `/verificar rapido`, sin build) corre esa secuencia y, al final, los
dos chequeos del panel que leen este repo (`verificar-precios`, `verificar-sistema`):
el CI de acá no los corre, y si fallan se rompe el del panel.

## Arquitectura

**Todo vive en la raíz del repo**, no hay `src/`: `app/` (rutas), `components/`
(toda la UI), `lib/` (datos y constantes).

### Un solo mundo visual, desde la promoción del 11/09/2026

Hasta esa fecha convivían dos: la landing pública corría el mundo retirado «Sala de
revisión» y la dirección nueva vivía en `/preview/iris`. Ya no. Lo que hay que saber
antes de abrir un archivo:

- **El sistema vive en `app/estilos/`** (`base.css`, `documento.css`, `secciones.css`)
  bajo la clase raíz `.iris`, y lo carga `app/layout.tsx` **en todas las rutas**. De
  ahí se sigue la regla que más caro sale romper: **nada de esas hojas puede tener un
  selector pelado**, porque alcanzaría también a las nueve direcciones históricas de
  `/preview`. **Antes de tocar una sección hay que leer las cabeceras de `base.css` y
  `secciones.css`**: ahí está escrito el sistema de objetos. Ante conflicto entre
  `DESIGN.md` y ese CSS, manda el CSS.
- **La UI vive en `components/iris/`.** De `components/landing/` sobreviven sólo dos
  archivos, y no por inercia: `PanelLink` —el único CTA, con su lista blanca— y
  `LegalPage`. Los once componentes del mundo retirado se borraron.
- **`app/globals.css` ya no es un mundo**: quedan el reset de Tailwind y los dos pisos
  de `PRODUCT.md` (ninguna imagen empuja a lo ancho, toda parada de tabulación se ve).
  Si una declaración sabe de qué color es el sitio, no va ahí: va en `app/estilos/`.
- **`app/preview/**`** (`robots: noindex`) guarda las nueve pasadas anteriores, cada
  una con su layout y su CSS scopeados. Se conservan sólo para comparar y **ninguna se
  cita como referencia.** El banco de tipografías se borró al promover, que era su
  condición desde que se armó.
- **El renombre de tokens se hizo el 19/09/2026, en tanda propia.** `app/globals.css`
  importa `sistema/nuvlo.css`, y los tokens compartidos se leen con su nombre de sistema
  —`--color-tinta`, `--radius-hoja`, `--shadow-ventana`, `--spacing-seccion`,
  `--ease-nuvlo`—. `base.css` se quedó sólo con el escenario de la landing (lavados,
  bandeja, brillos, marco, rieles, barra), que el sistema no lleva a propósito. Se
  verificó con los estilos computados de 2.422 elementos antes y después: idénticos.
  **No quedan tokens propios que dupliquen uno del sistema.** El último, un
  `--alto-control-compacto` de 36, se retiró el mismo día: sus dos únicos usos eran los
  controles de la barra, que **ni siquiera lo leían** —una regla más específica les fija
  35 desde el 16/09—, así que era un cuarto escalón y encima muerto. Los dos declaran
  ahora el escalón MEDIO, que es el que el sistema destina a «la barra de la landing», y
  la regla de la barra lo sigue pisando con su 35: ahí el alto no lo decide el control
  sino la pista, que tiene que medir 43 para quedar a la altura de su gemela. Está
  anotado al lado del número, en `secciones.css`.

### El reporte de muestra es estructural, no decorativo

El mockup del reporte **reproduce** —no ilustra— el reporte real que genera el panel:
mismas secciones y mismo orden que `buildReportHtml()` en
`nuvlo-panel/src/lib/report-generator.ts`. Por decisión del dueño registrada en
`PRODUCT.md`, **este mockup manda sobre el producto**: los cambios de acá se adoptan
después en la plantilla real del panel, nunca al revés.

Sus datos salen de `lib/reporte-muestra.ts`: ficticios pero internamente consistentes
(CTR, CPC y costo por conversión tienen que computar bien a partir de los números que
se muestran) y **nunca se reemplazan por datos de una cuenta real**. `DOCUMENTO_MUESTRA`
lo usa el panel de Control; las otras ventanas muestran lo que su escena pide y lo
comentan in situ. La tarjeta social consume `CLIENTE_MUESTRA`, `PERIODO_MUESTRA` y
`KPIS_MUESTRA` del mismo archivo.

### Precios

`lib/precios.ts` exporta sólo números crudos en USD (`PRECIO_ESTANDAR_USD`,
`PRECIO_WHITE_LABEL_USD`) y strings `_LABEL` preformateados con moneda —nunca un `$`
pelado—. **El CI del panel lee este archivo por ruta y por nombre de constante**
(`nuvlo-panel/scripts/verificar-precios.mjs`) y lo cruza contra
`nuvlo-panel/src/lib/plans.ts`: no renombres ni muevas esos exports, y nunca escribas
un precio a mano en vez de importarlo. El precio se escribe siempre con moneda y unidad
—«USD 39 por cliente, al mes»— porque la unidad es parte del número (`PRODUCT.md`).

### El CTA y la atribución

Hay un solo componente de CTA en el sitio, `components/landing/PanelLink.tsx`, y lo
usan tanto la landing vigente como la dirección en `preview/`. Reenvía al sign-up del panel **una lista
blanca** de parámetros UTM y click-id, nunca la query entera: reenviarla dejaría que un
tercero cuelgue un parámetro ajeno —un `redirect_url`— y llegue al panel viajando con
la credibilidad de este dominio. Es un requisito de seguridad del enlace entre repos
(`ENTORNO.md §12`), no una decisión de la landing. Escribe el `href` por ref dentro de
`useEffect` —no `useState`, para no re-renderizar en cascada; no en render, para no
desajustar la hidratación en SSG—. Sin JS el enlace funciona igual, sin atribución.

### Las tres legales

`/terminos`, `/privacidad` y `/reembolsos` comparten `components/landing/LegalPage.tsx`
y se estilan vía `.i-prosa-legal` en `app/estilos/secciones.css`, sobre `h2`/`p`/`ul`/
`li`/`strong`/`a`/`em` pelados: el contenido no lleva clases, así que el texto legal se
edita sin tocar marcado. **Son texto contractual, permanentes**: un rediseño las
remaqueta, no las discute. Sus precios se importan de `lib/precios.ts`.

Corren el mismo sistema que la home —arrancan con `<div className="iris">`, porque los
tokens están scopeados ahí— y comparten su barra y su pie (`components/iris/Pie.tsx`).
El texto va directo sobre el campo, sin ficha: la ventana con cromo es el entregable, y
un texto contractual no va en la misma caja. **Son las únicas páginas con un `<em>`**, y
no declaran itálica: Geist no la trae, y no se carga la de otra familia para tres palabras.

### CSP (`next.config.ts`)

La CSP de producción no tiene excepciones (`'self'` en todo lo que puede); dev agrega
`'unsafe-eval'` y `ws:` sólo para Turbopack/HMR, y se quitan en el build. Cualquier
recurso externo nuevo —fuentes, scripts, imágenes, analítica— pasa por acá. Y según
`PRODUCT.md`, volver a meter cualquier script de tracking es un cambio de tres partes
en la misma tanda: consentimiento previo, CSP y actualizar `/privacidad`, que hoy
afirma que no se carga ninguna herramienta de terceros.

### Tarjeta social (`app/opengraph-image.tsx`)

La renderiza Satori (`next/og`), no un navegador: sólo flexbox —sin grid, sin
pseudo-elementos, sin `background-image` externo—, sin las fuentes del sitio ni el
grano. Importa `CLIENTE_MUESTRA`, `PERIODO_MUESTRA` y `KPIS_MUESTRA` de
`lib/reporte-muestra.ts`, pero
**los colores están copiados a mano como hex**: no consume tokens, así que ningún
cambio de paleta la alcanza. Se shippeó **tres** veces mostrando un mundo que el sitio
había retirado, y por eso desde el 18/09/2026 la cuida `scripts/verificar-tarjeta.mjs`,
que corre en el CI antes del build: cruza cada constante contra `sistema/nuvlo.css` y
`app/estilos/base.css` —el token vive en uno o en el otro— y rompe en rojo si alguna quedó
atrás. El vínculo que lee es el `// --token` al lado de
cada constante, así que esa anotación es el contrato, no un comentario: **un valor que
salga de la paleta lleva su nombre al lado, o no lo cuida nadie.** Lo que el chequeo no
puede ver —la composición, los tamaños, las tres luces de macOS— sigue siendo a mano.

## Lo que cuesta caro si no lo sabés

- **El CI del panel lee todos los `.md` de este repo** (`nuvlo-panel/scripts/verificar-precios.mjs`):
  un precio escrito en prosa en `DESIGN.md`, en un brief de `.impeccable/` o en este
  archivo se contrasta contra `plans.ts` del panel y, si no coincide, **rompe el CI del
  otro repo**. Los tramos entre backticks se ignoran: los ejemplos van entre backticks,
  las afirmaciones van correctas.
- **Hay dos lugares para un token, y cuál es cuál importa.** Los del sistema viven en
  `:root`, declarados por el `@theme static` de `sistema/nuvlo.css`; los de escenario, en
  `.iris`, en `app/estilos/base.css` (`var(--lavado-a)` no existe fuera de ese árbol).
  **Un valor del sistema se cambia en `sistema/nuvlo.css` y nunca en `base.css`**, y
  después se copia entero al panel: `verificar-sistema`, en el CI del panel, compara los
  dos archivos por `sha256` y lee la landing de `main`, así que un cambio del sistema se
  publica en los dos repos seguidos. `--font-sans` es el único nombre que pisa uno de
  Tailwind, a propósito: la fuente llega por `next/font` como `--fuente-nuvlo`.
- **La CSP de producción no tiene `data:` en `img-src`.** Un SVG embebido como
  `data:` URI no carga en producción aunque funcione en dev.
- **Hay shadcn en el repo, acotado.** `components/ui/button.tsx` (usado sólo en
  `preview/firma/Piezas.tsx`; **iris no lo usa**), `components.json`, y `shadcn`, `radix-ui`,
  `class-variance-authority`, `motion` y `@phosphor-icons/react` en `package.json`.
  `components.json` declara `iconLibrary: lucide` (no instalado) y el alias
  `@/lib/utils` (no existe; el botón importa `cn` del paquete npm). El panel, en cambio,
  no admite librerías de componentes: no copiar de acá para allá.
- **`PanelLink` sólo escribe el `href` si hay query**, recorta cada valor a 256
  caracteres y descarta lo que no está en la lista blanca. **No todo enlace al panel
  pasa por él, y está bien**: «Ingresar» —en la barra, en el remate y en el pie—
  es para quien ya tiene cuenta, va a la raíz del panel (que resuelve sola si hay
  sesión) y sin atribución, porque no es el alta. El alta es
  una sola y siempre es `PanelLink`.
- **`lib/serie-muestra.ts` existe sólo para `preview/d`** y sus totales tienen que
  igualar `KPIS_MUESTRA`: tocar un KPI de `reporte-muestra.ts` obliga a rehacer la
  serie o a borrarla con D.
- **El host del reporte público depende del plan del panel**: `r.nuvloapp.com` es sólo
  para `WHITE_LABEL`; el Estándar —el plan del trial— sale por `panel.nuvloapp.com/r/…`
  (`nuvlo-panel/src/lib/report-public-url.ts`). Cualquier maqueta que muestre la URL
  tiene que elegir a cuál de los dos planes le está hablando.

## Lo que cruza los dos repos

`../nuvlo-panel` es el producto y el repo principal. Su `docs/ENTORNO.md §11` y `§12`
registran lo que ata a los dos: las tres legales, el sitemap que sólo anuncia rutas
montadas, la lista blanca del CTA, el reporte de muestra que manda sobre el reporte
real y los precios que el CI del panel lee por ruta. Los íconos estaban en esa lista, se
borraron el 12/09/2026 y **volvieron el 20/09/2026**, cuando el dueño aportó la marca: la
landing tiene `app/icon.svg` —fondo redondo, la variante oscura— y `app/apple-icon.png`
—cuadrado, porque iOS enmascara por su cuenta—. Los dos llevan los mismos dos `path`,
vectorizados de `marca/nuvlo-clara.png`: si la marca cambia, se vuelve a trazar del archivo
y se actualizan los dos. **El monograma vive sólo ahí**: estuvo unas horas al lado del
wordmark y se sacó el mismo día —repetía la inicial y le costaba 40px de cumplimiento a la
barra—; el porqué está en `Piezas.tsx`. **El panel sigue sin
favicon**, y adoptarlo es una tanda suya. **§12 no es autoridad sobre la landing**: remite acá a propósito, y
acá es donde se decide el diseño. El orden es landing elige → panel adopta después,
nunca al revés. Las paletas y los Tailwind de los dos repos son independientes.

Este repo va por Next 16; el panel va por Next 15. No copies código de uno al otro sin
leer `node_modules/next/dist/docs/` del repo donde vas a escribir.

## Mantener los documentos

Al cerrar cualquier cambio: si tocaste algo que `PRODUCT.md`, `DESIGN.md` o el brief
de `.impeccable/surfaces/` describen, actualizalos **en la misma tanda**. Mostrá los
cambios antes de guardarlos; nunca los edites en silencio.

`DESIGN.md` registra los errores ya cometidos como *Don'ts* y las reglas ganadas como
*Named Rules*: cuando el dueño rechaza algo construido, la lección va ahí, con el
motivo, no en un archivo aparte. Un andamio temporal fuera de `DESIGN.md` se borra
cuando cumple; lo que sobrevive se funde en el sistema.

Las mismas reglas aplican a este archivo: nada que no se pueda verificar contra el
código, y ningún inventario que otro archivo ya tenga.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
