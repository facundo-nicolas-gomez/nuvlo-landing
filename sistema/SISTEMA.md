# El sistema visual de Nuvlo, para los dos repos

Extraído de `app/estilos/**` + `components/iris/**` el 11/09/2026, para que `nuvlo-panel` se pueda
alinear a la landing sin copiar componentes.

**Este archivo explica; `sistema/nuvlo.css` es lo que se copia.** Desde la fase 3 del
trabajo de diseño (14/09/2026) `sistema/nuvlo.css` es **la fuente**: el dueño aprobó sus
valores para las tres superficies —landing, panel y reporte público—, y lo que varía entre
ellas es la densidad y el peso visual, nunca un valor. La copia del panel es
byte-idéntica y su CI lo verifica. `app/estilos/base.css` repite los valores bajo `.iris`
con nombres cortos hasta que la landing importe el archivo; si no coinciden, el que está
mal es `base.css`. `DESIGN.md` sigue siendo el documento del sistema y registra las
reglas ganadas y los errores cometidos; acá está sólo lo que cruza a otro repo.

## Cómo leer este documento

Está partido en dos, y la división importa más que cualquier tabla:

- **Parte I — Lo que sale del código.** Observado en `base.css`, `secciones.css`,
  `documento.css` y los componentes de `components/iris/**`. Cada valor y cada
  regla existen porque se construyeron, se miraron y en varios casos se rechazaron y se
  rehicieron. Esto se adopta.
- **Parte II — Lo abierto.** Derivado de las reglas, no observado: el panel necesita
  cosas que la landing no tiene, así que no hay nada que extraer y hubo que razonarlo.
  Esto se propone, se construye mirándolo, y se corrige.

Un lector apurado que confunda las dos partes va a tratar una hipótesis como si fuera
evidencia. Por eso están separadas y no intercaladas.

---

## Por qué la extracción no es copiar la landing

La landing **persuade**: el visitante decide y se registra, y el diseño es el producto.
El panel **opera**: el usuario completa una tarea, y ahí mandan la escaneabilidad, la
consistencia y la densidad. Son dos modos distintos y el mismo sistema.

Lo que cruza es **el material** —**La Regla del Material**, en `DESIGN.md`—: las
superficies, las tintas, el petróleo de la acción, el grafito, los dos colores del negocio,
los radios, las sombras, el anillo de foco y los roles tipográficos. Lo que no cruza es
**la escenografía**: todo lo que existe para poner en escena el informe en una página
larga de marketing.

Y hay una tercera cosa, que es la que hace que esto valga la pena ahora: **la landing ya
publicó un retrato del panel.** La sección Control dibuja la barra de acción, el
recorrido de un reporte y las dos pestañas de modo, con este sistema y con los estados
reales. El panel real todavía no se parece a ese dibujo. Alinearlo no es adoptar una
paleta ajena: es alcanzar el dibujo que el sitio ya usa para vender el producto.

Ese retrato es además el que decide qué va en la Parte I y qué en la Parte II: **lo que
Control dibuja del panel está observado; lo que el panel tiene y Control no muestra está
abierto.**

---

## Estado de los dos repos, medido

> **Al día (19/09/2026).** La landing importa `nuvlo.css` en `app/globals.css` y lee
> los tokens con sus nombres de sistema; `app/estilos/base.css` dejó de repetirlos y se
> quedó con el escenario (la lista de «Lo que se queda en la landing», más abajo, y
> `--alto-control-compacto`, que es de una escala de control distinta y está pendiente
> de una decisión del dueño). La tabla de abajo es del 11/09/2026 y describe el panel,
> que no cambió con esto: sigue teniendo la capa disponible y casi sin uso.

Medido el 11/09/2026, **después de que el panel copiara la capa** (paso 1 y 2 de la
adopción, más abajo). La distinción que esta tabla no puede difuminar es entre
**disponible** y **en uso**: el panel ya tiene los tokens, y casi ninguna pantalla los
consume todavía.

| | Landing (`preview/iris`) | Panel (hoy) |
|---|---|---|
| Tokens | 44 bajo `.iris`, cada uno con su razón escrita | **la capa entera, byte-idéntica**, en `src/app/nuvlo.css` e importada desde `globals.css`; **2 usos en todo `src/`** |
| Campo | marfil cálido `#fffcf8` | gris frío de Tailwind, pintado a mano por pantalla; el `body` bloquea `campo` a propósito hasta la tanda de superficies |
| Hoja | blanco puro, separada por filete | blanca, separada por borde — mismo mecanismo |
| Acento | petróleo `#0f5f6b`, sólo en la acción | índigo, 116 utilidades, varias sin acción; `bg-acento` se usa 1 vez |
| Estados | `espera` / `hecho`, un sistema | ámbar y verde de Tailwind, 49 utilidades, sin relación entre sí |
| Reporte | `bueno` / `malo`, asignados por el negocio | verde y rojo sueltos |
| Tipografía | Geist (desde el 12/09/2026; antes Inter con eje `opsz`), once roles nombrados | **Geist bajo `--fuente-nuvlo`, los mismos once roles**. **Bricolage se fue del repo** |
| Foco | anillo de 2px en el acento, 3px de separación | **el anillo del sistema es el que rige por defecto**; 18 elementos lo pisan con utilidades propias (16 en índigo, 2 en rojo) |
| Radios | tres y una pastilla, por pertenencia | tres medidas de Tailwind, por costumbre |

**Lo que cambió es el piso, no las pantallas.** El panel dejó de no tener sistema: tiene
la capa, la fuente y el wordmark. Pero las 53 pantallas siguen pintando a mano —116
utilidades de índigo, 49 de ámbar y verde— y el `body` todavía bloquea `campo` y `tinta`
a propósito, porque cambiarlas sueltas dejaría el marfil del sistema asomando sólo en los
bordes que ninguna pantalla tapa.

Que la copia sea byte-idéntica es lo que hace barato el chequeo de deriva —un `sha256sum`
de los dos archivos—, que todavía no está escrito. **Es el mismo hueco que este documento
ya declaraba al final**, y ahora tiene una forma concreta.

---

# Parte I — Lo que sale del código

Todo lo de esta parte está construido y mirado en la landing.

## Superficies

| Superficie | Token | Por qué |
|---|---|---|
| El plano de abajo | `campo` | No lleva sombra ni borde. |
| Lo que se apoya en el campo | `hoja` + borde `filete` | **Toda hoja que se apoya en el campo lleva filete.** El escalón de valor entre las dos mide 1,02:1: no se ve, y no tiene que verse. |
| Lo que va hundido adentro de una hoja | `hoja-hundida` + filete | La barra de acción del panel, la alerta del reporte, la cabecera del mail. Radio interior. |
| División entre filas de una misma hoja | filete de 1px | Las filas de una hoja se separan con filete, no con aire ni con cards hermanas. |
| Borde de algo que se puede tocar | `filete-fuerte` | Un borde que invita a tocar pesa más que uno que sólo divide. |

**El mecanismo, que es lo que de verdad se adopta.** La separación es por filete y no por
valor. Fue un cambio pedido con objetivo dicho —que la hoja del informe se vea más
blanca—, porque con separación por valor el campo tenía que quedarse oscuro para que la
hoja se despegara, y eso le ponía un techo al blanco del documento. Si un objeto nuevo
aparece sin borde, no se lo arregla oscureciendo el campo.

Al panel le llega barato: sus cards ya son blancas con borde de un píxel, o sea que ya
usa el mecanismo correcto con los valores equivocados.

⚠️ **Pendiente: `.hoja` en `nuvlo.css` no lleva filete, y su comentario promete una
sombra que tampoco declara.** La clase existe para que el anillo no se pueda olvidar
—declara `--anillo` en la misma regla que pinta el blanco— y en eso funciona. Pero lo
que declara es fondo, tinta y radio y nada más, mientras su propio comentario dice que
quien se olvida la clase «se olvida el fondo, el radio y la sombra». O sea que la clase
que existe para que no te puedas olvidar del anillo te deja olvidarte justo del filete,
que es el mecanismo que esta sección declara no negociable.

En un panel pesa más que acá, porque va a tener muchas más hojas claras que una landing.
Se decide allá si `.hoja` lleva el filete o si se parte en dos clases: `.i-isla` de
`base.css` sí lleva sombra de ventana y `overflow: hidden`, y es otro objeto —uno que
reproduce el producto, por La Regla de la Caja—, así que probablemente no sea el mismo
que la hoja genérica. Hasta que se resuelva, el panel no puede confiar en la clase para
cumplir la regla del filete.

**La Regla de la Caja**, que en un panel es la que más trabajo hace: borde, radio y sombra
son del objeto que reproduce el producto; los conjuntos se agrupan con filete y aire,
nunca con otra caja. Una hoja que contiene hojas es el error que el dueño señaló cuatro
veces seguidas en la landing, y un tablero es justo donde más fácil se cae en él.

## Tintas

| Texto | Token |
|---|---|
| Título, dato principal | `tinta` |
| Cuerpo, descripción | `tinta-2` |
| Metadato, ayuda, hora | `tinta-3` |

**Antes de agregar un cuarto escalón, medir.** La terciaria se mide contra la hoja
hundida —la superficie más oscura donde escribe, 4,86:1—, no contra la más clara donde
podría escribir. Es la lección que `base.css` registra cuatro veces y la única falla de
contraste que la landing tuvo que corregir dos veces.

## La acción

| Control | Cómo se viste |
|---|---|
| Escalones de control | `control` 52px con radio `control`; `control-medio` 40px y `control-compacto` 32px con radio interior. Un campo mide lo mismo que el botón que lo envía. El texto del botón no tiene rol del sistema: cada repo lo escribe en su módulo, en peso 500 (se retiraron `boton`, `boton-medio` y `boton-compacto` el 23/09/2026, que nadie leía). |
| Botón primario | Texto blanco y **sin sombra** en los dos repos. En el panel el fondo es `acento`; en la landing es `tinta` desde el 18/09/2026. `shadow-boton` y `shadow-boton-noche` se retiraron el 23/09/2026. |
| Botón primario, hover | Fondo `acento-tinta` —**se oscurece, no se aclara**—. |
| Botón secundario | Hoja con borde `filete-fuerte`; en hover el borde y el texto pasan al acento. |
| Botón sobre superficie oscura | Se invierte a `hoja` con texto en `tinta`. **No se aclara el acento**: sobre el grafito mide 1,94:1, bajo el mínimo de 3:1 de un control. |
| Enlace de prosa | `acento`, subrayado de 1px a 3px de separación. |
| Control que actúa como enlace | Sin fondo, subrayado, hereda el color. |

El hover del panel hoy va al revés que el del sistema: **aclara** el índigo. El sistema
oscurece, y ésa es la dirección que hay que invertir en cada botón — es el único punto de
la migración que no es un reemplazo de valor sino un cambio de comportamiento.

**El acento no pinta fondos, ni gráficos, ni chapas de estado.** Si aparece donde no hay
nada que hacer, está decorando. La regla se reescribió tres veces en dos días, con seis
hues descartados en el mismo rol antes de que se entendiera que el problema era el rol y
no el valor.

## Los estados del reporte

Observado en Control, que dibuja el panel con sus dos estados reales.

| Chapa | Fondo | Texto | Punto |
|---|---|---|---|
| Borrador | `hoja` con borde `filete-fuerte` | `espera-tinta` | `espera` |
| Enviado | `hoja` con borde `filete-fuerte` | `hecho-tinta` | `hecho` |

Pastilla de 24px, rol `fino` en peso 500, punto de 6px delante. **No hay «Aprobado»**,
porque aprobar es la acción y no un estado en el que el reporte se queda.

Dos reglas que viajan con esto: todo lo que diga «Enviado» es verde, por decisión del
dueño; y Borrador es naranja y **no rojo**, porque adentro del reporte el rojo ya
significa «empeoró».

Son una excepción sancionada a la regla de los dos colores del negocio, con tokens
propios para que la excepción no se confunda con la regla: adentro del informe el verde es
una afirmación de **negocio** que asigna el negocio; un paso terminado o un reporte
enviado es una afirmación de **máquina**, que no la decide nadie.

En el panel reemplazan la improvisación actual: ámbar para Borrador y verde para Enviado,
elegidos por separado y sin relación entre sí.

## El reporte

`bueno` / `bueno-campo` y `malo` / `malo-campo` viven adentro del documento y en ningún
otro lado, en la cápsula de variación: pastilla de 20px, cuerpo de `fino` en peso 500, con
el tick en SVG por signo. El neutro es `tinta-2` sobre `hoja-hundida`.

**El color lo asigna el negocio, nunca el signo.** Que la inversión suba no es verde.
En el panel esto es `buildReportHtml()`, y el mockup de la landing manda sobre él por
decisión del dueño: los cambios se hacen allá y se adoptan acá, nunca al revés.

**La Regla de Sin Acento Adentro**: el informe es del trafficker y lleva su marca, no la
nuestra. Adentro del documento el único color es el del negocio.

## El grafito

Un solo material oscuro, frío y neutro a propósito: es lo que hace un navegador de verdad
en modo oscuro. En la landing vive en el cromo del navegador que muestra el informe y en
los dos tramos de noche.

**La Regla del Oscuro Adentro del Objeto viaja con el token, y es más restrictiva de lo
que parece.** La barra de acción del panel estuvo oscura unas horas y volvió a ser clara,
porque partía el objeto en dos y obligaba a invertir el botón a blanco. El cromo del
navegador es una cita del sistema operativo y existe de verdad en modo oscuro; una barra
de interfaz propia, no. Ésa es la línea.

**La Regla de la Hoja Clara en la Noche**: una hoja clara adentro de una superficie oscura
recupera sus tintas, su acento y su anillo. La noche no se filtra dentro del objeto que
sostiene.

## Forma y profundidad

- **Radio bandeja (22px):** lo más grande que se apoya en el campo. Sólo la landing.
- **Radio hoja (16px):** lo que se apoya en el campo.
- **Radio interior (10px):** lo que va adentro de una hoja — celda, alerta.
- **Radio de control:** por escalón — 16px en el de 52, interior en los de 40 y 32.
- **Radio chico (6px) y fino (2px):** piezas de 16px —casilla, marcador— y rayas.
- **Pastilla:** lo que se rotula — chapa de estado, cápsula.
- **`shadow-hoja`:** el mínimo que separa una hoja del campo.
- **`shadow-ventana`:** el objeto que la pantalla existe para mostrar, y los diálogos.
- **`shadow-flota`:** lo que se superpone a otra cosa — menús, avisos.
- **El botón no tiene sombra:** pesa por su valor contra el fondo. `shadow-boton` y
  `shadow-boton-noche` se retiraron el 23/09/2026.

Los bordes son siempre de un píxel en filete: no hay bordes de 2px ni callouts con borde
grueso de color.

**La Regla del Escalón** antes que cualquier sombra: si un objeto no se distingue con el
escalón de superficie, se revisa el objeto y no se sube la sombra. **La Regla del
Desplazamiento**: toda sombra lleva desplazamiento y desenfoque; el canto de un objeto se
resuelve con un borde de un píxel, no con un halo.

## Tipografía

Una familia, cuatro pesos: 400 lee, 500 controla, 600 titula, 700 firma. El contraste
entre escalones lo hacen el peso y el color tanto como el cuerpo.

**Geist, por decisión del dueño (12/09/2026).** Hasta ese día era Inter con el eje `opsz`,
y el argumento de esa elección era el eje: «Inter Display» no es otra familia sino Inter en
`opsz` alto, y declararlo daba a cada cuerpo su corte sin una regla por rol. **Geist no tiene
`opsz`**: el rótulo de 11px y el total de 28px son la misma forma escalada. Se sabe y se
acepta; lo que carga la diferencia entre escalones pasa a ser el peso, el tracking y el
cuerpo, que ya lo hacían.

Condición no negociable, medida y no leída de la ficha: «111111», «000000» y «444444»
rinden el mismo ancho con `tabular-nums`. Doce de las 60 familias probadas fallan eso.
Geist pasa (54,00px las tres a 15px), como pasaba Inter.

Roles, iguales en las tres superficies: `portada`, `portada-bajada`, `display`, `total`,
`vista`, `titulo`, `bajada`, `cuerpo`, `boton`, `boton-medio`, `boton-compacto`,
`control`, `chico`, `fino`, `rotulo`. Los de titular viajan aunque el panel no los use.
`compacto` y `chico` se fundieron en `chico` cuando el piso subió un escalón: habían
quedado idénticos. El documento del reporte se lee a 13,5px por su propia regla y entra
al sistema en la fase 6.

**`rotulo` rotula lo que tiene DEBAJO y adentro de un objeto** —una tabla, un formulario,
un reporte—. Nunca es un copete arriba de un titular: ése es el uso que lo convierte en
decoración.

## Foco y superficies del navegador

Selección, foco, caret y barra de scroll vienen del navegador y no pertenecen a ningún
sistema; se tiñen desde la paleta y punto.

**El anillo se elige por superficie, no por sección.** Una variable que hereda: el acento
sobre el campo, su versión clara sobre el grafito, y vuelve al acento en cualquier hoja clara que
viva adentro del grafito. El antipatrón ya costó una falla real: escrito con un selector
de descendencia pinta por árbol y no por fondo, y dejó el anillo claro sobre una hoja
clara a 2,57:1 —bajo el mínimo de 3:1 de WCAG 1.4.11— justo en el único botón que su
sección existía para que se apretara.

2px de trazo, 3px de separación, **sin halo**.

---

# Parte II — Lo abierto

Nada de esta parte está construido ni mirado. Es derivación: el panel lo necesita, la
landing no lo tiene, y lo que sigue son propuestas razonadas desde las reglas de la
Parte I. **Se construye mirándolo y se corrige.** Si algo de acá no cierra al verlo, gana
lo que se ve.

## 1. `falla` — el color de error ✓ sancionado el 11/09/2026

Es lo único que la extracción tuvo que **agregar** al sistema, y el dueño lo sancionó con
el mismo criterio con el que sancionó `hecho`.

El panel tiene errores y hoy los pinta con un rojo de Tailwind en doce lugares. El sistema
no tenía con qué: su único rojo es del negocio y no sale del reporte. El argumento es el
mismo con el que `hecho` entró como excepción — un error de la aplicación es una
afirmación de **máquina**, no un juicio de negocio.

Por eso **no es un rojo nuevo: es la misma tinta bajo otro nombre**, y el nombre es lo que
carga la regla. Inventar un segundo rojo para distinguirlo del primero sería arbitrario;
llamarlo `malo` fuera del reporte rompería la regla que dice que el rojo del dato no sale
del documento.

Medido: 6,14:1 sobre hoja, 6,00:1 sobre campo, 5,49:1 sobre hoja hundida y 5,19:1 sobre
`falla-campo`. Pasa como texto en las cuatro superficies sin necesitar un tono oscuro
aparte, que es la razón por la que no hay `falla-tinta`.

**Se descartó un rojo propio, y el motivo vale escrito porque es contraintuitivo.** El
candidato `#a8202f` contrastaba mejor en todas las superficies (7,21:1 sobre hoja contra
6,14:1), pero medido en OKLCH cae **entre** los dos colores que ya existen: 10° de hue del
rojo del dato y 9° del vino que entonces era la acción, con casi la misma diferencia de luminosidad
contra los dos. Un rojo que se inventa para no confundirse con el del dato termina
confundiéndose con el de la acción — entre esos dos hues no hay lugar donde pararse.

## 2. El rol `vista` — el título de una pantalla

El título de una pantalla del panel cae entre `display` (30px de mínimo, demasiado para un
tablero) y `titulo` (18px, demasiado poco para encabezar una vista). El panel hoy lo
resuelve a mano con ese mismo cuerpo, sin nombre.

Sigue la regla que el sistema ya tenía: un valor que cae entre dos pasos de la escala o se
corrige, o **falta un rol y se documenta**. `portada-bajada` nació igual en la landing.

Propuesto: 1,5rem / 600 / 1.2 / −0.02em.

## 3. Formularios

**La landing no tiene formularios.** Esto es lo derivado del único campo que sí dibuja —el
de la dirección del navegador— más las reglas de la Parte I. Es la parte con menos
evidencia detrás de todo el documento y la primera que hay que corregir al construirla.

| Parte | Propuesta |
|---|---|
| Campo | `hoja` con borde `filete-fuerte`, radio interior, rol `cuerpo` en `tinta`. |
| Etiqueta | Rol `control` en `tinta-2`, a `linea` de separación del campo. |
| Ayuda | Rol `chico` en `tinta-3`. |
| Placeholder | Rol `cuerpo` en `tinta-3`. |
| Foco | El anillo del sistema, sin cambios. |
| Error | Borde `falla` y mensaje en `falla`, rol `chico`. El campo no se pinta de rojo por dentro: un fondo saturado es del acento. |
| Deshabilitado | `hoja-hundida` con texto en `tinta-3` y cursor de flecha. |

## 4. El botón destructivo

La landing no tiene ninguna acción destructiva; el panel borra clientes y cancela
suscripciones.

Propuesta: hoja con borde `filete-fuerte`, y en hover el borde y el texto pasan a `falla`
—el mismo dibujo que el botón secundario, con la otra tinta—. **Nunca un botón de fondo
rojo**: el fondo saturado es del acento y sólo del acento.

Depende de que `falla` se sancione.

## 5. Las superficies que Control no dibuja

Control muestra el panel de aprobación, su barra de acción, el recorrido y las dos
pestañas de modo. No muestra sidebar, ni tabla de listado, ni diálogo modal.

| Superficie | Propuesta | Por qué es derivada |
|---|---|---|
| Sidebar | `hoja` con filete a la derecha | La landing tiene una barra de navegación horizontal de marketing, que es otro objeto. |
| Cabecera de tabla | `hoja-hundida` + rol `rotulo` | El reporte tiene tablas, pero son de documento y no de aplicación: no se ordenan ni se filtran. |
| Fila de tabla | Rol `compacto`, separada por filete | Misma razón. |
| Diálogo modal | Hoja con `shadow-ventana` | No existe en la landing. |

## 6. La densidad del panel

Los tres aires viajan en el archivo —`linea`, `bloque` y `seccion`—, pero el panel usa
sólo `linea`: bloque y sección son ritmo de página larga, y **un panel mide su densidad
por fila y por hoja, no por sección**. La escala de espaciado es la unidad de 4px de
Tailwind con estos pasos: 2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 20 · 24 · 28 · 32 · 36 · 40 ·
48 · 56 · 64 · 80 · 96.

Queda abierto a propósito: la densidad del panel es una decisión suya, tomada sobre sus
propias pantallas. Este documento no la inventa desde acá.

## 7. El grafito adentro del panel

El token cruza, pero **en el panel no tiene todavía ningún domicilio observado**. Los
candidatos razonables son superficies que *citan* algo —una vista previa con cromo, un
tooltip, un toast— y nunca el sidebar ni una barra propia, por la regla de la Parte I.

Si al construirlo resulta que el panel no tiene ninguna superficie que cite, el grafito se
queda sin trabajo ahí, y eso está bien: un token sin uso no se fuerza a tener uno.

---

# El wordmark

**Es un activo de marca, no un rol tipográfico**, y por eso está fuera de la escala de
`nuvlo.css`. Decisión del dueño del 11/09/2026 al cerrar esta extracción.

- Es un **SVG con paths hechos a mano**, no texto compuesto. Por eso el conflicto entre
  «una sola familia» y la Bricolage del panel nunca existió: no hay familia que unificar.
- Va **inline en el header**, nunca como `<img>`: es la única forma de que tome
  `currentColor` y sirva sobre claro y sobre oscuro con el mismo archivo.
- **Nunca un `<text>` adentro del SVG.** Un `<text>` depende de que la fuente esté
  instalada y se compone distinto en cada máquina, que es exactamente el problema que un
  wordmark dibujado resuelve.
- Lleva `role="img"` y `aria-label="Nuvlo"`, y el resto del árbol es decorativo.

**Consecuencia para el panel: Bricolage Grotesque se va** de `(panel)`, `(auth)` y
`(publico)`. Es una fuente menos que descargar y un `--font-display` menos que mantener.
Geist queda como única familia de interfaz en los dos repos (era Inter hasta el 12/09/2026).

⚠️ **Pendiente: el SVG no está regularizado.** En `public/marca/` hay tres candidatos
—`marca-a`, `marca-b` y `marca-b-mono`— y todavía no son un activo terminado:

- Están dibujados con **trazo** (`stroke` + `fill: none`), no con contornos cerrados. Un
  trazo uniforme no admite corrección óptica en los encuentros ni ajuste de grosor por
  letra, y un wordmark se termina en contornos.
- El interletraje está puesto con saltos fijos de 50px y dos correcciones sueltas (150 y
  170 en una variante, 153 y 173 en la otra). No está espaciado ópticamente.
- `marca-b-mono` es un solo trazo, y todavía no está decidido si el monograma es esa marca
  o el cuadradito del acento que la landing ya usa hoy.

Hasta que se regularice, **el código y este documento no coinciden**: `Wordmark` en
`components/iris/Piezas.tsx` —y desde el 11/09/2026 también
`nuvlo-panel/src/components/wordmark.tsx`, que lo replica— siguen componiendo «Nuvlo» en
Inter 700 con el cuadradito del acento delante. Eso es deliberado —no se cambia el
componente vigente por un activo sin terminar— y se cierra cuando el SVG esté listo, ahora
en los dos repos a la vez.

---

# Lo que se queda en la landing

Nada de esto entra a `nuvlo.css`, y cada exclusión tiene su motivo. La prueba es de una
línea: **si el token no tiene trabajo en un tablero, no cruza.**

| Token o rol | Por qué no cruza |
|---|---|
| `bandeja-a`, `bandeja-b`, radio de bandeja | La Regla de la Bandeja se retiró el 10/09/2026. Sobreviven en la landing sólo mientras quede un degradé que los consuma; no se extiende su vida cruzando de repo. |
| `resplandor`, `luz-heroe` | Brillos del héroe. **Un halo pertenece a la familia de la superficie que ilumina**, y esa superficie no existe en un panel. |
| `ventana-canto`, `ventana-canto-suave` | El canto del marco de navegador dibujado. El panel no dibuja navegadores; usa el de verdad. |
| `sombra-ventana-heroe` | Sombra dimensionada para un objeto que ocupa media pantalla. **La sombra se relaciona con el tamaño del objeto**, y no hay nada de ese tamaño en un tablero. |
| `wa`, `wa-tinta-2` | Cita del canal de WhatsApp en el héroe. Un objeto citado se cita entero, incluida su tinta; fuera de esa cita no significa nada. |
| Google Sans | La tipografía de Gmail, para la pantalla del teléfono. Misma lógica de cita. |
| `campo-luz` | El lavado vertical del fondo de la página. Una página larga tiene arriba y abajo; un panel con scroll interno, no. |
| `marco`, `borde-x` | Medidas de página. El panel tiene sidebar y contenido, que es otro problema de layout. |
| `noche-honda`, `noche-luz`, `titulo-gris`, `lavado-a`, `lavado-b`, `banda-fria`, `bandeja-a`, `bandeja-b` | Luz y fondo de los tramos de la página. Son del escenario, no del material. |

---

# Cómo lo adopta el panel

La migración es una sesión propia en el otro repo, con su propia revisión. El orden que
tiene sentido, del más barato al más caro — **los dos primeros ya están hechos**:

1. ✓ **Copiar `nuvlo.css`** e importarlo después de Tailwind (11/09/2026). Copia
   byte-idéntica en `src/app/nuvlo.css`, sin una sola línea agregada, que es lo que deja
   el chequeo de deriva en un `sha256sum`.
2. ✓ **Declarar `--fuente-nuvlo`** con `next/font` (11/09/2026; Inter con `axes: ["opsz"]`
   hasta el 12/09/2026, Geist desde entonces, sin ejes).
   Bricolage y `--font-display` fuera de los layouts, y el wordmark como componente propio.
3. **El reporte**, que es el producto: `buildReportHtml()` a `bueno` / `malo` y a los
   roles tipográficos. Es donde el sistema se nota más y donde el mockup de la landing ya
   manda.
4. **Las chapas de estado**, que son ocho clases y arreglan la improvisación ámbar/verde.
5. **Superficies y tintas**, que es el reemplazo mecánico de las tablas de la Parte I.
6. **La acción**: el acento, y **la inversión del hover**.
7. **Todo lo de la Parte II, al final y a propósito.** Formularios, error, destructivo y
   las superficies derivadas se construyen cuando el resto del sistema ya esté puesto y se
   pueda mirar al lado. Antes de eso no hay con qué comparar.

Un cambio de valores se hace en `sistema/nuvlo.css` y se copia entero al panel, a mano.
**La copia sí tiene chequeo**: `verificar-sistema`, en el CI del panel, compara el
`sha256` de los dos archivos y falla ante cualquier diferencia. Como ese job lee la landing
de `main`, un cambio del sistema se publica en los dos repos seguidos: primero la landing,
enseguida el panel. Los colores del reporte, que el panel escribe a mano a propósito,
tienen su propio test contra `nuvlo.css`.
