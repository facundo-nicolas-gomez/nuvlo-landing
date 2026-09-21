import type { CSSProperties } from "react";
import Image from "next/image";

/**
 * LAS TRES CUENTAS DE DONDE SALIÓ ESTO.
 *
 * ── QUÉ AFIRMA, QUE ES LO ÚNICO DELICADO DE ESTA SECCIÓN (19/09/2026) ───────
 * Hasta hoy `PRODUCT.md` decía que **no hay usuarios citables** y que los logos
 * de clientes «no existen y no se inventan, ni siquiera como placeholder». El
 * dueño aportó tres cuentas reales —negocios familiares de San Martín de los
 * Andes— y con eso la restricción cambia de contenido: ya no es que no haya, es
 * qué se puede decir de ellas.
 *
 * Lo que el dueño dijo, literal, es **«tres clientes que ya tuve»**. O sea:
 * anunciantes a los que ATENDIÓ como trafficker. No dijo que usen Nuvlo ni que
 * tengan cuenta en el panel. Por eso el único renglón de la sección dice que
 * **Nuvlo salió de atender estas cuentas** —que es verdad y además es el
 * argumento más fuerte que estos tres logos pueden sostener— y no dice que
 * confían en Nuvlo, ni que son clientes de Nuvlo, ni que reciben el producto.
 *
 * **Si algún día recibieron un informe hecho con Nuvlo, el copy puede subir un
 * escalón entero** —de «de acá salió» a «esto es lo que reciben»— y ahí sí
 * valdría la frase de confianza. No se escribe hasta que alguien lo confirme.
 *
 * ── EL COPY SUBIÓ UN ESCALÓN EL 20/09/2026, Y ESTABA PREVISTO ──────────────
 * Hasta ese día esta sección tenía prohibido decir que las tres recibieran algo
 * hecho con el producto, y `PRODUCT.md` dejaba la puerta abierta con nombre y
 * condición: «si algún día recibieron un informe hecho con Nuvlo, el copy sube
 * un escalón entero —de *de acá salió* a *esto es lo que reciben*— y ahí sí
 * vale la frase de confianza; no se escribe hasta que alguien lo confirme».
 *
 * **El dueño lo confirmó ese día, para las tres.** Por eso el renglón dice lo
 * que dice. No es una licencia: es la condición cumplida.
 *
 * ── LO QUE SIGUE SIN PODER DECIR ────────────────────────────────────────────
 * **No son usuarios del panel y no pueden figurar como tales.** Quien tiene la
 * cuenta es el trafficker; ellas RECIBEN el informe. La diferencia importa
 * porque las tres son anunciantes —o sea el tipo de empresa que es cliente de
 * un trafficker— y el que mira la landing ES un trafficker: son los clientes de
 * nuestro cliente. Por eso el verbo es «reciben» y nunca «usan».
 *
 * Tampoco va en primera del plural: **el sitio no tiene un solo «nosotros» en
 * el copy visible** —le habla de «vos» al trafficker y menciona a Nuvlo en
 * tercera—, así que un «que ya reportamos» inventaba una voz nueva justo acá.
 *
 * **Y el renglón sigue siendo el que más fácil se rompe de la landing:**
 * cambiar «reciben sus informes con Nuvlo» por «usan Nuvlo» parece un recorte y
 * es una afirmación distinta y falsa.
 *
 * ── UN SOLO RENGLÓN, Y ARRIBA (dueño, 19/09/2026) ───────────────────────────
 * La primera versión llevaba titular de display y bajada de tres líneas, y
 * pesaba más que los logos. El dueño la mandó **debajo del héroe, centrada,
 * «sin texto o con muy poco»**: lo que quedó es un rótulo y la fila. Una tira
 * de logos no necesita que se la presente —se lee sola en medio segundo— y
 * cuanto más se la explica, menos parece una cartera y más una lámina de
 * marketing. El rótulo es el nombre accesible de la sección (`aria-labelledby`)
 * justamente porque es el único texto: no hay un `h2` escondido para el lector
 * de pantalla que el que mira no vea.
 *
 * ── LOS LOGOS SON DE TERCEROS ───────────────────────────────────────────────
 * Se sirven desde nuestro propio dominio, en `public/clientes/`, y no por
 * hotlink: la CSP de producción tiene `img-src 'self'` sin `data:`, así que una
 * imagen externa no cargaría.
 *
 * ── Y VAN A UNA TINTA, QUE ES LO CONTRARIO DE LO QUE DECÍA ACÁ ──────────────
 * La primera versión los mostraba **tal cual, sin recolorear**, con el
 * argumento de que un logo ajeno teñido deja de ser esa marca. Se construyó
 * así, se miró, y eso fue lo que dio vuelta la regla: tres paletas y tres
 * tipografías de peso distinto se leen como tres marcas prestadas, no como una
 * cartera. El dueño mandó a parecerse a la tira de Superhuman, que funciona
 * porque sus seis marcas le dieron su versión de UNA TINTA; ninguno de estos
 * tres publica una, así que el 19/09/2026 eligió que la hagamos nosotros.
 * **Si alguna vez mandan el archivo monocromo, entra en lugar del `-mono` y
 * esta conversión se borra.**
 *
 * La conversión NO es `filter: grayscale()` ni opacidad bajada. Cada archivo se
 * compone sobre blanco, se mide la densidad de cada píxel y se escribe
 * `--color-tinta` con esa densidad en el ALFA, así que las formas internas del
 * logo sobreviven como tonos de una sola tinta en vez de aplanarse a una
 * silueta. La densidad es:
 *
 *     α = (1 − L/255) + 0,30 · saturación
 *
 * **El término de CROMA hace falta** y se ganó mirando: sin él, el círculo gris
 * y la flecha naranja del isotipo de Destino Andino —luminancia 150 contra
 * 143— caen en la misma densidad y el mark se funde en un borrón con el «DA»
 * adentro, ilegible. Y de paso sostiene el pin amarillo de Go By, que por
 * luminancia sola queda casi en el valor del papel.
 *
 * **Acá hubo además un PISO de 0,42 y era un defecto**, corregido el mismo día:
 * se puso para salvar ese pin, pero se aplicaba a TODO píxel con algo de tinta,
 * así que un borde de antialias que debía ser 5 % de tinta saltaba a 45 %. Eso
 * engorda y ablanda cada canto —el alfa medio de los tres estaba en 0,73/0,82—
 * y es lo que el dueño vio como «borrosos» y «muy oscuros». **Un piso de alfa
 * no distingue una forma clara de un borde: los pinta a los dos.**
 *
 * Los archivos a color quedan al lado, sin el sufijo, y son la fuente de los
 * `-mono`: volver atrás es cambiar tres rutas acá.
 *
 * El de Go By es la variante para fondo CLARO (`_sf_`, sin fondo): la que su
 * sitio usa en el `header` es blanca sobre transparente y acá sería invisible.
 *
 * ── DE DÓNDE SALE CADA ARCHIVO, QUE NO ES OBVIO EN NINGUNO ──────────────────
 * **Destino Andino** lo aportó el dueño el 19/09/2026 y reemplazó al que había
 * bajado del sitio, que medía 135×66 y no daba para agrandar. El que aportó es
 * otro lockup —**apilado**, isotipo arriba y wordmark abajo— de 1600×705, con
 * DOS renglones de bajada legal al pie («Empresa de Viajes y Turismo» / «San
 * Martín de los Andes | Patagonia Argentina») que al alto de esta fila medirían
 * nueve píxeles. Se recortó en la fila 580, adentro del hueco de 37 filas en
 * blanco que separa el wordmark de esa bajada, así que **el corte no toca
 * ninguna letra** y lo que queda es el lockup que la marca también publica
 * suelto. Después se bajó a 400 de alto: el techo de la fila es 68, o sea 136
 * píxeles en retina, y 400 deja casi 3× de margen sin que el archivo pese.
 *
 * **Posada Quinen es el único sin mejor fuente.** Su sitio publica el logo sólo
 * en JPG, o sea con fondo blanco propio, y 419×78 es el techo: se probaron el
 * original sin sufijo de WordPress, las variantes del `srcset` y las de
 * `-scaled`, y todas devuelven el mismo archivo. Por eso se muestra a 38 contra
 * un techo retina de 39 —al límite—, y por eso **si alguna vez aparece el
 * original, éste es el que hay que cambiar.**
 *
 * ── LOS DOS SE DESMULTIPLICARON, Y ESO ATA LA SECCIÓN AL CAMPO CLARO ────────
 * Quinen venía en JPG y Destino Andino en WebP opaco: los dos con fondo blanco
 * propio. A 24px el rectángulo no se notaba; al agrandarlo sí, y en el JPG
 * encima con el ruido del fondo. Así que los dos son su original
 * **desmultiplicado sobre blanco** —`α = 1 − min(r,g,b)/255`, y el color se
 * recupera con `C = (c − 255(1−α))/α`—, que conserva el tono y el antialias en
 * vez de recortar con un umbral duro. En el de Destino Andino el escalado va
 * ANTES de la desmultiplicación, que es el orden correcto: el archivo ya viene
 * compuesto sobre blanco, así que el antialias del remuestreo entra en la misma
 * cuenta y no queda un halo.
 *
 * La contra, anotada porque es una trampa real: un logo desmultiplicado es
 * **semitransparente**, así que compone bien sobre el campo casi blanco del
 * sitio y NO sobre uno oscuro. **Esta sección no puede mudarse a la noche sin
 * conseguir antes los dos originales con alfa.**
 */

/**
 * Los tres, con el ALTO AL QUE SE MUESTRA cada uno escrito al lado del archivo.
 *
 * No es un descuido que sean tres números distintos: igualarlos por altura —que
 * es lo primero que se prueba— deja a Posada Quinen dominando la fila y a los
 * otros dos como estampillas, porque sus proporciones no se parecen en nada
 * (5,4:1 contra 2:1 y 2,2:1). Lo que tiene que quedar parejo es la MASA, no una
 * medida: un wordmark apaisado necesita menos alto que un escudo para pesar lo
 * mismo. Los tres números salen de mirarlos juntos, no de una cuenta.
 *
 * **El techo de cada uno lo pone su archivo, no el gusto.** Para que un logo se
 * vea nítido en pantalla retina necesita el DOBLE de píxeles nativos que su
 * alto de pantalla, así que el alto máximo honesto es `alto_nativo / 2`:
 * Destino Andino 200, Go By 161, Quinen 100. Pasarse de ahí es pedirle al
 * navegador que invente píxeles, y se nota justo en lo que esta sección vende.
 *
 * El de Quinen era 39 hasta que se rehízo el archivo (ver abajo): ése era el
 * techo que impedía agrandar la fila.
 */
const CLIENTES = [
  {
    nombre: "Destino Andino",
    archivo: "/clientes/destino-andino.png",
    ancho: 1103,
    alto: 400,
    /* El único apilado —isotipo arriba, wordmark abajo—, así que necesita más
       alto que los otros dos para que su tipografía mida lo mismo: el wordmark
       ocupa un tercio de su caja contra tres cuartos en Quinen. */
    muestra: 58,
  },
  {
    nombre: "Go By",
    archivo: "/clientes/goby.png",
    ancho: 702,
    alto: 322,
    muestra: 62,
  },
  {
    nombre: "Posada Quinen",
    archivo: "/clientes/quinen.png",
    ancho: 1074,
    alto: 200,
    /* Último por decisión del dueño (19/09/2026), y además es el que mejor
       cierra: es el más apaisado de los tres, así que de ese lado la fila
       termina en una horizontal larga en vez de en un bloque. */
    muestra: 42,
  },
];


export function Clientes() {
  return (
    <section
      className="i-seccion i-clientes"
      id="clientes"
      aria-labelledby="i-r-clientes"
    >
      <div className="i-marco">
        <p className="i-clientes-linea" id="i-r-clientes">
          Estas marcas ya reciben sus informes con Nuvlo.
        </p>

        <ul className="i-clientes-fila">
          {CLIENTES.map((c) => (
            <li key={c.nombre} className="i-cliente">
              {/* El nombre va en el `alt` y en ningún otro lado: el logo de un
                  negocio ya dice cómo se llama, y repetirlo abajo en texto es
                  el renglón que el dueño mandó sacar. */}
              {/* `unoptimized` no es pereza: sin él `next/image` los recomprime
                  a WebP con `q=75` —y en Next 16 `images.qualities` viene fijo
                  en `[75]`, así que un `quality={100}` se coerce de vuelta—.
                  En un logo de tonos planos y bordes duros eso deja anillos
                  alrededor de cada canto, que es la mitad de lo que el dueño
                  vio como «borrosos» el 19/09/2026. Los tres archivos ya están
                  al tamaño que esta fila pide y suman 100 KB: no hay nada que
                  optimizar, y sí algo que perder. */}
              <Image
                className="i-cliente-logo"
                src={c.archivo}
                alt={c.nombre}
                width={c.ancho}
                height={c.alto}
                unoptimized
                /* El alto va como VARIABLE y no como medida: el CSS lo
                   multiplica por un factor de fila que baja al angostarse la
                   pantalla. Si en cambio cada logo llevara su alto fijo, abajo
                   de 900 el `max-width` de la celda empezaba a recortarlos a
                   cada uno por su lado —el más apaisado primero— y el balance
                   entre los tres se rompía justo en tablet (medido: a 600, dos
                   de los tres quedaban con holgura cero). */
                style={{ "--alto-logo": c.muestra } as CSSProperties}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
