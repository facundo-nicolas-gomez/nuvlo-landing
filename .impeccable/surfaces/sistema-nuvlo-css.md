---
version: 1
slug: "sistema-nuvlo-css"
primary_target: "sistema/nuvlo.css"
related_targets: ["app/estilos/base.css", "app/estilos/secciones.css", "../nuvlo-panel/src"]
---

# El sistema contra el código de los dos repos (relevamiento del 23/09/2026)

**Alcance:** `sistema/nuvlo.css` —la copia única de los tokens compartidos— contra lo que
hacen la landing (`app/estilos/`, `components/iris/`) y el panel (`../nuvlo-panel/src`, commit
`2aca81a` del 23/09/2026). Se recorrieron color, tipografía, radios, sombras, espacios,
movimiento, breakpoints, capas, anchos máximos, bordes, íconos y estados, y cada cifra de acá
salió de contar en el código, sin contar tests ni comentarios.

**Cómo leer esta lista.** Es lo que dice el brief de la home desde el 19/09/2026: una línea es
una afirmación sobre el código y envejece como cualquier otra. **Se verifica antes de citarla.**
Lo que se decida se anota acá tachado, con su fecha, y la regla que salga va a `DESIGN.md`.

**Recordatorio del orden:** la landing decide y el panel adopta después. Un cambio de valor
va en `sistema/nuvlo.css`, nunca en `base.css`, y se copia entero al panel en la misma tanda
(`verificar-sistema` compara los dos por sha256). Eso incluye los comentarios: corregir uno
también obliga a copiar.

## Lo que quedó sin resolver

### Decisiones del dueño

- ~~**Movimiento reducido: tres comportamientos.**~~ **Cerrado el 23/09/2026: lo que espera se
  queda quieto** (*La Regla de lo Que Espera, Quieto*, en `DESIGN.md`). Esta línea describía mal
  a la landing: además del acuse tiene una segunda excepción desde el 13/09, las entradas con un
  fundido de 400ms, que ya era lo que pedía el sistema. La diferencia real era una sola: el
  sistema decía que lo que espera «late», y la landing lo dejaba quieto para que con movimiento
  reducido no corra ningún bucle. El dueño eligió quieto; el comentario del sistema lo dice y el
  panel frena sus 4 `animate-spin` y sus `animate-pulse` con una regla en `globals.css`.
- **La sombra y el texto del botón.** Ningún botón compartido usa `--shadow-boton`: el de la
  landing es tinta y plano desde el 18/09/2026, y el tono `accion` del panel se aplanó con el
  login. `--shadow-boton-noche` y los tres `--text-boton*` no los usa ninguno de los dos. El
  comentario del sistema decía lo contrario («el primario de la landing la lleva; el del panel
  no»); se corrigió el 23/09/2026 y ahora remite acá. Decidir si los tokens siguen.
- **Los titulares se cambiaron en `base.css`.** El 19/09/2026 la landing pasó portada y display
  a 550, 76 y 51 (`.i-portada`, `.i-display`), pero `--text-portada` y `--text-display` siguen en
  600, 72 y 48. Es justo lo que la regla del orden prohíbe. Decidir si sube al sistema, y con él
  al panel, o si queda como escenografía de la landing y se dice así.
- **La chapa de estado, dos dibujos.** En la landing tiñe fondo (11%) y borde (26%) del color
  del estado. En el panel es hoja con `filete-fuerte` y el color solo en el punto y el texto, a
  propósito según `chapa-estado.tsx`. Elegir uno.
- **El escalón medio de control.** El sistema destina `--spacing-control-medio` (40px) a los
  encabezados, diálogos y filtros del panel. El panel lo usa cero veces y `estilos-boton.ts`
  solo tiene 52 y 32.
- **Las escalas sin nombre.** Breakpoints, capas y anchos de columna no tienen tokens en ningún
  repo. La landing tiene 18 breakpoints sueltos y 14 anchos de columna; el panel usa los cortes y
  las capas de fábrica de Tailwind y ordenó sus anchos con `Pantalla`. Decidir si se nombran.
- **Apretar.** El botón de la landing se hunde un 3% y los días del calendario un 12%. El panel
  no tiene ni una clase `active:`.
- **El destello del toque.** La landing lo tiñe con el acento al 12% en `base.css`, que no es
  parte del sistema, así que el panel tiene el gris del navegador. Si vale para los dos, sube al
  sistema.
- **Deshabilitado.** El panel tiene tres versiones: botones a opacidad 60% con cursor de
  prohibido; campos y casilla en `hoja-hundida` con cursor normal; el calendario a 50%. La
  landing usa cursor normal.
- **La fuente del PDF.** Helvetica, porque `@react-pdf` solo incrusta TTF u OTF. Ya está anotada
  como decisión abierta en `report-pdf.tsx`.

### Valores fuera de la paleta o de la escala

- **Hovers de la landing con hex:** `#242b33` (botón primario), `#e8ecf1` (botón sobre la
  noche), `#a8d2d7` (botón del remate) y `rgb(28 20 10 / 0.11)` (días del rango del calendario,
  un gris cálido de cuando el campo lo era). El primario aclara porque la tinta ya es lo más
  oscuro; en el panel el primario oscurece hacia `acento-tinta`, que sí es token, y lo fija
  `accion-sistema.test.ts`.
- **`app/icon.svg` usa `#a8d2d7`**, que no es un token. Los colores del ícono a mano ya son deuda
  anotada en el propio archivo.
- **La escena del ingreso del panel usa `#8cb2b8`** y el comentario lo llama
  `acento-sobre-noche`, que vale `#8fc3c9`. Está en `escena-auth.css` y como literal en
  `escena-shader.tsx`.
- **La viñeta de esa escena** sigue en `rgb(9 9 11)`, el oscuro de la pantalla de ingreso
  anterior.
- **El mail de arrepentimiento y baja** (`solicitudes-consumidor.ts`) escribe texto y botón en
  `#1a1a1a`. `reporte-colores-sistema.test.ts` cuida el reporte y su mail, no este.
- **Textos del panel debajo del piso de 13px:** `text-xs` (12px) aparece 31 veces y ninguna es
  versalita, y hay un `text-[11px]` en una chapa de la lista de reportes.
- **Dos escalas tipográficas en el panel:** 139 usos de roles del sistema y 140 de tamaños de
  Tailwind. Casi todos los de Tailwind miden lo mismo que un rol (`text-sm` es `text-chico`).
- **`.casilla` escribe 6px a mano,** que es `--radius-chico`: el token que el sistema destina a
  las piezas de 16px como una casilla.
- **`rounded-[10px]`** en el botón del PDF de `report-view.tsx`, fuera de la escala. El test de
  radios no lo ve porque el archivo está exento.
- **Dos botones del panel fuera de los escalones:** 38px en la página de error pública y 34px en
  el botón del PDF. Los escalones son 52, 40 y 32.
- **Dos botones sueltos del panel** —conectar Meta y `global-error.tsx`— no pasan por
  `estilos-boton.ts`: conservan `shadow-boton` y se levantan 1px al pasar el mouse, dos cosas que
  el botón compartido ya dejó.
- **El movimiento del panel no lee los tokens:** los esqueletos pulsan a 2000ms (el sistema pide
  `--duracion-latido`, 1400); los hovers usan los 150ms y la curva de Tailwind en vez de
  `--duracion-rapida` y `--ease-nuvlo`; `animate-fade-in` va a 150ms `ease-out` y su comentario
  ya lo anota; la casilla usa 150 y 120ms.
- **Anchos copiados a mano entre repos:** el índice del panel mide 1440 (el `--marco` de la
  landing), el documento 760 y la vista del reporte 800. Si cambian en la landing, el panel no se
  entera.
- **Los íconos de la landing no tienen regla:** nueve grillas y nueve grosores de trazo, de 1,1 a
  2,6. Solo los glifos del teléfono la tienen (grilla 24, trazo 1,75), y es el mismo trazo que el
  panel usa en 17 lugares.
- **Pares de breakpoints desfasados en la landing:** 479 con 480 y 718 con 719.

### Accesibilidad

- **El calendario del panel trae su propio anillo:** `focus-visible:ring-[3px]` en `ring/50`,
  un halo de acento al 50%. El sistema no admite halos.
- **El aviso de activación de Paddle va en `z-[100]`,** por encima de cualquier diálogo, sin
  comentario que diga por qué.

### Comentarios que describen mal el código

- ~~`--color-acento-filete` descrito como «el borde de las citas del producto».~~ **Cerrado el
  23/09/2026**, y esta línea lo ubicaba mal: no estaba en `sistema/nuvlo.css` sino en `base.css`
  y en `DESIGN.md`. Los dos dicen ahora lo que hace: el divisor de la barra y el borde del avatar
  del mensaje. En la misma frase de `base.css` también estaba mal `--color-acento-luz`, que hoy
  es solo el hover del botón de la barra en las legales.
- ~~`sistema/nuvlo.css`: «700 firma el wordmark».~~ **Cerrado el 23/09/2026**: dice 800, que
  es como lo componen los dos repos. Copiado al panel en la misma tanda.
- `estilos-boton.ts` (panel): la cabecera dice que `accion` va «con su sombra»; el código es
  plano.
- `chapa-estado.tsx` (panel): dice que el texto va en el rol `fino` (13px); la clase es
  `text-xs` (12px).
- `.casilla` en `globals.css` (panel): cita la escala vieja de radios (hoja 16, interior 10,
  control 16).
- `report-pdf.tsx` (panel): todavía habla de Inter y del eje `opsz`.
- `base.css`: dice que `globals.css` declara un halo de foco que hay que apagar; hoy ya no lo
  declara.

### Entre los dos repos

- **El reporte tiene dos cortes que el panel no adoptó:** `documento.css` corta en 340 y 280, y
  `report-generator.ts` no. Los demás (640, 480, 470) coinciden.
- **El panel no tiene favicon,** y `middleware.ts` ya deja pasar `/icon.png` y
  `/apple-icon.png`. Adoptarlo es tanda del panel.
- **Los mismos íconos, dos dibujos:** el tilde, la flecha y el de descargar están escritos a
  mano en la landing y vienen de `lucide-react` en el panel. El tilde doble y el de descargar de
  la landing ya son formas de lucide redibujadas.
- **`Flecha` de `components/iris/Piezas.tsx` no la usa ningún componente.** El comentario dice
  que se conserva a propósito; queda anotada por si se decide borrarla.
