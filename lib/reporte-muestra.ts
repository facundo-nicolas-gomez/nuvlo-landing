/**
 * DATOS DEL REPORTE DE MUESTRA.
 *
 * ── SON FICTICIOS, Y ESO NO ES NEGOCIABLE ───────────────────────────────────
 * No hay clientes citables. La agencia y el anunciante de acá abajo no existen,
 * y la página los rotula como ejemplo a la vista del visitante. Nunca se
 * reemplazan por datos de una cuenta real, ni siquiera "para que se vea mejor".
 *
 * ── PERO SON COHERENTES ─────────────────────────────────────────────────────
 * El visitante es un comprador de medios: lee estas cifras como las lee todos
 * los días. Si el CPC no da inversión ÷ clics, o el CTR no da clics ÷
 * impresiones, lo nota en tres segundos y con eso pierde la confianza en todo
 * lo demás. Las relaciones que se cumplen, y que hay que preservar si alguien
 * toca un número:
 *
 *   CTR             = clics / impresiones
 *   CPC             = inversión / clics
 *   costo por conv. = inversión / conversaciones
 *   frecuencia      = impresiones / alcance
 *
 * ── EL COLOR LO DECIDE EL NEGOCIO, NO LA DIRECCIÓN ──────────────────────────
 * `sentido` no dice si el número subió: dice si lo que pasó es bueno. Que la
 * inversión suba no es verde. Que el costo por conversación baje, sí. Es la
 * misma regla que aplica `report-metrics.ts` en el panel.
 */

export type Sentido = "bueno" | "malo" | "neutro";

type Kpi = {
  etiqueta: string;
  valor: string;
  variacion: string;
  sentido: Sentido;
  /**
   * La derivación que el reporte REAL imprime debajo de la cifra. No es un
   * agregado de la landing: sale de `KpiCell.hint` en
   * `nuvlo-panel/src/lib/report-metrics.ts`, y la traen exactamente los dos KPI
   * que allá la tienen —conversaciones y costo por conversación—. Los otros dos
   * no la llevan porque Meta los devuelve tal cual y no hay cuenta que mostrar.
   */
  pista?: string;
};

type FilaMetrica = {
  metrica: string;
  actual: string;
  anterior: string;
  variacion: string;
  sentido: Sentido;
};

export const AGENCIA_MUESTRA = "Estudio Bravo";

/**
 * Las iniciales del sello de la banda de marca, DERIVADAS del nombre y no
 * escritas al lado: son el mismo dato y la regla de esta hoja prohíbe que un
 * dato del ejemplo se escriba dos veces.
 *
 * La regla de verdad vive en el panel (`agency-initials.ts`, 19/09/2026) y
 * contempla lo que un nombre real puede traer: una sola palabra, partículas,
 * símbolos, nombres sin ninguna letra. Acá alcanza con el caso simple, porque
 * el ejemplo es uno solo y son dos palabras. **Si un día la muestra cambia a un
 * nombre raro, esto se cambia por la función del panel, no se parchea.**
 */
export const INICIALES_MUESTRA = AGENCIA_MUESTRA.split(" ")
  .map((p) => p[0])
  .join("")
  .toLocaleUpperCase("es");
export const CLIENTE_MUESTRA = "Mueblería Lombardi";

/**
 * El destinatario del informe: el email del cliente del trafficker.
 *
 * Vive acá y no en el componente porque es el dato del ejemplo que aparece
 * impreso debajo del botón de aprobar —el detalle entero del argumento: quien
 * aprueba ve a quién le llega— y va a aparecer también donde se muestre el
 * envío. Estuvo tipeado a mano adentro de la sección del recorrido, que es
 * exactamente lo que la regla de la casa prohíbe: ningún dato del ejemplo que
 * salga en más de un componente se escribe a mano.
 */
export const EMAIL_CLIENTE_MUESTRA = "hola@muebleria-lombardi.com";

/**
 * ── EL TOKEN DEL REPORTE PÚBLICO (19/09/2026) ────────────────────────────
 * Estaba tipeado a mano en CUATRO archivos —el héroe, el navegador, Precios y la
 * tarjeta social—, que es exactamente lo que la regla de arriba prohíbe. Se
 * encontró revisando la tarjeta, y es el mismo defecto que el email del cliente
 * ya había tenido.
 *
 * **El HOST no vive acá, y es a propósito.** Cuál de los dos dominios sirve el
 * reporte lo decide el PLAN —`panel.nuvloapp.com` en Estándar,
 * `r.nuvloapp.com` en Marca Blanca (`report-public-url.ts` del panel)—, así que
 * es una afirmación sobre el producto y no un dato del ejemplo. Precios ya lo
 * modela con sus dos planes; centralizarlo acá invitaría a escribir un solo
 * host para los dos, que es la promesa de más que `PRODUCT.md` registra tres
 * veces.
 *
 * La ruta del borrador deriva del mismo token: el panel corta a ocho para la
 * URL privada, así que un token nuevo arrastra las dos sin tocar nada más.
 */
export const TOKEN_MUESTRA = "8f2c41a9e37b0d5c";
export const RUTA_REPORTE_MUESTRA = `/r/${TOKEN_MUESTRA}`;
export const RUTA_BORRADOR_MUESTRA = `/reportes/${TOKEN_MUESTRA.slice(0, 8)}/preview`;

/**
 * LAS CUENTAS PUBLICITARIAS DE META DEL CLIENTE DE MUESTRA.
 *
 * Son dos a propósito: `PRODUCT.md` dice que no hay tope de cuentas
 * publicitarias por cliente, y una sola no lo demostraría. Los identificadores
 * llevan el prefijo `act_` porque es la forma real del identificador de Meta, y
 * son ficticios como todo lo demás de este archivo — **nunca de una cuenta
 * real**.
 *
 * El modelo del panel guarda `metaAccountId` y nada más (`PRODUCT.md`), así que
 * esto es literalmente todo lo que Nuvlo tiene de la cuenta. Mostrar el dato
 * completo es parte del argumento del primer paso: lo que se conecta es el
 * acceso que el trafficker ya usa, y lo que queda guardado es un identificador.
 *
 * El alcance exacto del permiso de Meta NO está registrado en `PRODUCT.md`, así
 * que no se nombra ni se insinúa en ninguna parte de la ficha.
 */
export const CUENTAS_META_MUESTRA = [
  { nombre: "Mueblería Lombardi", id: "act_418260935172044" },
  { nombre: "Lombardi | Showroom Sur", id: "act_772019486351220" },
] as const;

/**
 * El nombre del documento tal como aparece en la barra de título de CUALQUIER
 * ventana del sitio.
 *
 * Vive acá y no en cada componente porque el héroe y las tres ventanas del
 * recorrido tienen que decir exactamente lo mismo: son el mismo informe. Cuando
 * cada uno lo escribía por su cuenta, el héroe decía "Borrador · Mueblería
 * Lombardi" y el recorrido "Mueblería Lombardi · julio 2026", y encima el héroe
 * repetía el estado —ya lo dice la chapa ámbar de al lado—.
 *
 * La regla del cromo: **la barra de título dice qué documento es; la chapa dice
 * en qué estado está.** Nunca los dos.
 */
export const DOCUMENTO_MUESTRA = `${CLIENTE_MUESTRA} · julio 2026`;
/**
 * Los rangos van con guion y no con raya.
 *
 * La raya queda RESERVADA a un solo trabajo en todo el reporte: el marcador de
 * dato faltante que emite el panel (`report-generator.ts`, `v ? v.display :
 * "—"`), que `PRODUCT.md` fija como regla de producto —sin dato se escribe —,
 * nunca un cero inventado—. Si además la usan los rangos y la prosa, el
 * marcador deja de ser inconfundible.
 */
export const PERIODO_MUESTRA = "1 jul 2026 - 31 jul 2026";
export const PERIODO_ANTERIOR_MUESTRA = "1 jun 2026 - 30 jun 2026";

/* ═══════════════════════════════════════════════════════════════════════════
   EL MAIL QUE RECIBE EL CLIENTE DEL TRAFFICKER

   Todo lo que sigue está copiado de `nuvlo-panel/src/lib/report-email.ts`
   (`buildReportEmailHtml`) y de `src/lib/email-from.ts`. No es una
   aproximación: son los strings que el producto manda de verdad, y la landing
   los muestra porque mostrar un mail inventado en la sección que promete marca
   blanca sería prometer un entregable que nadie recibe.

   Lo que decía la landing antes —«Hola, les dejamos el informe del período.
   Cualquier consulta, quedamos a disposición.»— no existe en ningún lado. La
   frase parecida que sí existe, «Quedamos disponibles para cualquier
   consulta», es el CIERRE DEL REPORTE, no del mail.

   ── LAS DOS FECHAS SUELTAS ─────────────────────────────────────────────────
   El mail no usa el rango armado sino las dos fechas por separado, porque en
   el cuerpo van en negrita cada una. `formatReportDate` del panel las escribe
   así, con mes de tres letras y sin cero a la izquierda.
   ═══════════════════════════════════════════════════════════════════════════ */

export const DESDE_MUESTRA = "1 jul 2026";
export const HASTA_MUESTRA = "31 jul 2026";

/**
 * ── ACÁ LA RAYA SÍ VA, Y NO CONTRADICE LA REGLA DE ARRIBA ──────────────────
 * En el asunto la raya no arma un rango: SEPARA TRES CAMPOS —agencia, qué es,
 * cuándo—. El rango que hay adentro se escribe con «a», no con raya. Así que
 * el marcador de dato faltante del reporte sigue siendo inconfundible: en el
 * reporte la raya nunca separa nada, sólo dice que el dato no vino.
 */
export const ASUNTO_MAIL_MUESTRA = `${AGENCIA_MUESTRA} — Reporte de Meta Ads — ${DESDE_MUESTRA} a ${HASTA_MUESTRA}`;

/** El nombre visible del remitente es el de la agencia, nunca «Nuvlo». La
 *  dirección sale de `REPORT_EMAIL_FROM`, con este valor por defecto. */
export const REMITENTE_MAIL_MUESTRA = "reportes@nuvloapp.com";

export const SALUDO_MAIL_MUESTRA = `Hola ${CLIENTE_MUESTRA},`;

/** El cuerpo va partido porque las dos fechas van en negrita adentro de la
 *  frase, que es como lo emite el template. */
export const CUERPO_MAIL_MUESTRA = {
  antes: "Tu reporte de Meta Ads del período ",
  entre: " a ",
  despues: " ya está listo.",
};

export const BOTON_MAIL_MUESTRA = "Ver reporte completo";

/* ═══════════════════════════════════════════════════════════════════════════
   EL PIE DEL INFORME, QUE ES LA ÚNICA DIFERENCIA VISIBLE ENTRE PLANES

   `nuvlo-panel/src/lib/report-footer.ts`. Es UNA línea con punto medio, no dos
   líneas apiladas. La otra diferencia real por plan es el dominio del link
   (`report-public-url.ts`), que no se ve en el pie.
   ═══════════════════════════════════════════════════════════════════════════ */

export const PIE_INFORME_ESTANDAR = `${AGENCIA_MUESTRA} · Generado con Nuvlo`;
export const PIE_INFORME_MARCA_BLANCA = AGENCIA_MUESTRA;

/**
 * LOS ESTADOS REALES DEL REPORTE.
 *
 * `ReportStatus` en `nuvlo-panel/prisma/schema.prisma`, con las etiquetas en
 * español del panel. La landing dibujaba tres chips —Borrador, Aprobado,
 * Enviado— y **«Aprobado» no existe**: aprobar es la ACCIÓN que mueve el
 * reporte de borrador a enviado, no un estado en el que el reporte se queda.
 *
 * `Pendiente` y `Procesando` están en el enum pero el código nunca los escribe,
 * así que la landing no los muestra: mostrar un estado que el producto no
 * alcanza sería inventar en la otra dirección.
 */
export const ESTADOS_MUESTRA = [
  { nombre: "Borrador", alcanzado: true },
  { nombre: "Enviado", alcanzado: false },
] as const;

export const KPIS_MUESTRA: Kpi[] = [
  {
    etiqueta: "Inversión",
    valor: "$ 486.250",
    variacion: "+6,0%",
    sentido: "neutro",
  },
  {
    etiqueta: "Conversaciones",
    valor: "312",
    variacion: "+18,6%",
    sentido: "bueno",
    pista: "Conversaciones por mensaje (7 d)",
  },
  {
    etiqueta: "Costo por conversación",
    valor: "$ 1.558",
    variacion: "−10,7%",
    sentido: "bueno",
    pista: "Inversión ÷ conversaciones",
  },
  { etiqueta: "CTR", valor: "1,84%", variacion: "+4,7%", sentido: "bueno" },
];


export const METRICAS_MUESTRA: FilaMetrica[] = [
  {
    metrica: "Impresiones",
    actual: "1.284.902",
    anterior: "1.190.455",
    variacion: "+7,9%",
    sentido: "neutro",
  },
  {
    metrica: "Alcance",
    actual: "402.118",
    anterior: "388.204",
    variacion: "+3,6%",
    sentido: "neutro",
  },
  {
    metrica: "Frecuencia",
    actual: "3,19",
    anterior: "3,07",
    variacion: "+4,1%",
    sentido: "neutro",
  },
  {
    metrica: "Clics",
    actual: "23.642",
    anterior: "20.918",
    variacion: "+13,0%",
    sentido: "neutro",
  },
  {
    metrica: "CPC",
    actual: "$ 20,57",
    anterior: "$ 21,94",
    variacion: "−6,2%",
    sentido: "bueno",
  },
];

/**
 * La prosa. Es lo ÚNICO que escribe la IA en el producto real, y por eso es lo
 * único de este archivo que se lee como texto redactado.
 *
 * ── LA REGLA, VERIFICADA CONTRA EL PANEL EL 06/09/2026 ─────────────────────
 * Sólo puede citar números que el prompt REALMENTE recibe, que no es lo mismo
 * que «números que el reporte imprime». Lo que entra al prompt lo arma
 * `metricsToText()` en `nuvlo-panel/src/lib/report-generator.ts`, y son dos
 * formatos distintos:
 *
 *   KPI     `- {etiqueta}: {display} ({variación})` → valor ACTUAL y variación.
 *           El valor anterior no entra: `computeReportMetrics` lo calcula como
 *           variable local para derivar la variación, pero `KpiCell` no lo
 *           lleva, así que no sale de la función.
 *   tabla   `- {etiqueta}: actual {X}, anterior {Y} ({variación})` → ahí sí
 *           entran los dos, y el informe imprime los dos.
 *
 * Y el sistema le prohíbe recalcular: «NO inventes ni recalcules números. Los
 * ÚNICOS números que podés citar son los de MÉTRICAS CALCULADAS».
 *
 * ── EL PRIMER PÁRRAFO CITABA UNA CIFRA IMPOSIBLE ───────────────────────────
 * Decía «312 contra 263». El 263 es conversaciones del mes anterior, y
 * conversaciones es un KPI, no una fila de la tabla: nunca entra al prompt. La
 * IA no podía escribir ese número ni deduciéndolo, porque deducirlo es
 * recalcular. Era prosa ficticia mostrando una salida que la máquina real no
 * produce, y encima en la página que existe para afirmar lo contrario.
 *
 * Se reescribió el párrafo, que es la salida barata: el texto es ficticio y se
 * cambia sin tocar producto. La otra salida —hacer que el informe imprima el
 * anterior de conversaciones— no arreglaba nada, porque el problema no es que
 * el número no se imprima: es que no entra al prompt.
 *
 * Hoy las cuatro cifras del párrafo —312, 18,6%, 10,7% y 6,0%— son el valor y
 * las variaciones de tres KPI, o sea exactamente lo que `metricsToText()` le
 * pasa a la IA y lo que el banco imprime.
 */
export const RESUMEN_MUESTRA = [
  "Julio cerró con más conversaciones y a menor costo que junio: 312, un 18,6% más, con el costo por conversación bajando 10,7%. El aumento de inversión fue moderado (6,0%) y no explica por sí solo la mejora: el rendimiento por clic mejoró en paralelo.",
  "El CTR subió a 1,84% y el CPC bajó a $ 20,57, lo que indica que los anuncios encontraron mejor audiencia que el mes anterior. La frecuencia se mantiene en un rango sano.",
];

export const ALERTA_MUESTRA =
  "La frecuencia subió a 3,19 en un alcance que creció menos que las impresiones. Si sigue en esa dirección, conviene ampliar audiencia antes de sumar presupuesto.";

/**
 * EL RECORRIDO DE ESTADOS.
 *
 * Los tres estados son REALES del panel: un reporte nace `DRAFT`, alguien lo
 * aprueba, y recién ahí sale. No es una simplificación para la landing.
 *
 * Las horas son parte del mismo ejemplo ficticio que el resto de este archivo,
 * y la sección las rotula como tales. Dicen algo igual: entre el borrador y la
 * aprobación pasan ocho minutos —una persona leyéndolo— y entre la aprobación y
 * el envío no pasa nada, porque aprobar ES enviar. Ese hueco de ocho minutos es
 * el argumento entero del producto.
 */
export const RECORRIDO_MUESTRA = [
  {
    estado: "Borrador",
    hora: "09:14",
    detalle:
      "Nuvlo trae las métricas de Meta, calcula y redacta. Nadie lo vio todavía.",
    tono: "abierto",
  },
  {
    estado: "Aprobado por vos",
    hora: "09:22",
    /**
     * Decía "el único paso que no es automático" y era inexacto: generar
     * tampoco lo es salvo que esté programado, y antes hay configuración
     * obligatoria (email del cliente, nombre de la agencia, modo de reporte).
     */
    detalle:
      "Lo leíste entero y apretaste el botón. Es el paso que Nuvlo no da solo.",
    tono: "decision",
  },
  {
    estado: "Enviado",
    hora: "09:22",
    /**
     * NO dice "sin marca de Nuvlo", y es a propósito.
     *
     * Eso sólo es cierto en Marca Blanca (USD 69): en Estándar (USD 39) el
     * informe cierra con "Generado con Nuvlo". Prometerlo acá sería vender el
     * entregable del plan caro en el recorrido de la prueba gratuita, que es el
     * plan en el que el visitante va a estar.
     *
     * La firma de la agencia sí es verdadera en los dos planes: el nombre es
     * requisito duro y sin él no se genera ni se envía. La diferencia entre
     * planes se DEMUESTRA en Precios, con el macro del pie del reporte con la
     * franja y sin ella, que es donde corresponde.
     */
    detalle: `Le llegó a ${CLIENTE_MUESTRA}, firmado por ${AGENCIA_MUESTRA}.`,
    tono: "cerrado",
  },
] as const;

/**
 * TEXTOS FIJOS DEL REPORTE REAL.
 *
 * No son copy de la landing: los emite buildReportHtml() en
 * nuvlo-panel/src/lib/report-generator.ts, y el copete y el cierre son
 * literales de ese archivo. La nota al pie la arma notaDeFuente() en
 * report-footer.ts contando los días del período anterior —acá son 30, del 1
 * al 30 de junio— y dice algo que la tabla no dice en ningún lado: QUÉ es la
 * columna «Anterior».
 *
 * Si alguno cambia allá, cambia acá. La landing afirma que esto es el reporte
 * real, así que la afirmación tiene que seguir siendo cierta.
 */
export const COPETE_MUESTRA = "Informe de gestión · Meta Ads";
export const NOTA_FUENTE_MUESTRA =
  "Datos de Meta Ads · período anterior: los 30 días previos";
export const CIERRE_MUESTRA = "Quedamos disponibles para cualquier consulta.";

/**
 * EL PLAN DE ACCIÓN.
 *
 * Sale de la misma llamada que el resumen y la alerta, así que le corre la
 * misma regla: sólo puede nombrar números que el prompt recibe, y el sistema le
 * prohíbe inventar y recalcular. La tercera acción decía «anuncios con más de
 * 45 días activos» y ese 45 no entra al prompt por ningún lado: no es una
 * métrica calculada, no está en la tabla y no sale del bloque de campañas. Era
 * el mismo defecto que el «312 contra 263» del resumen, sólo que en una
 * recomendación en vez de en un dato.
 *
 * Se puede discutir si un umbral operativo cae bajo «no inventes números». No
 * hace falta discutirlo: la frase dice lo mismo sin el número, así que el caso
 * dudoso se evita en vez de resolverse.
 */
export const ACCIONES_MUESTRA = [
  "Ampliar la audiencia de los conjuntos con mayor frecuencia para sostener el costo por conversación.",
  "Sostener el presupuesto en la campaña de mensajes, que concentró la mejora del mes.",
  "Revisar los anuncios más antiguos del conjunto: son los que empujan la frecuencia hacia arriba.",
];

/* ═══════════════════════════════════════════════════════════════════════════
   EL BLOQUE QUE ENTRA AL PROMPT

   Es lo que `campañasToText()` le pasa a la IA sobre las campañas del período
   (`nuvlo-panel/src/lib/report-campaigns.ts`). Tiene dos mitades de distinta
   naturaleza y conviene no confundirlas:

   - `encabezado` es un LITERAL DEL PRODUCTO, copiado carácter por carácter de
     la plantilla de esa función. Si cambia allá, cambia acá.
   - `campanas` es EJEMPLO FICTICIO, como todo el resto de este archivo. Los
     nombres no existen.

   ── LAS NOTAS NO SE ESCRIBEN: SE ELIGEN ────────────────────────────────────
   `resumirCampañas()` sólo puede emitir siete strings, y son exactamente
   éstos:

     «la de mayor inversión del período»
     «la de menor inversión del período»
     «el mejor costo por conversación del conjunto»
     «el peor costo por conversación del conjunto»
     «sin conversaciones registradas en el período»
     «CTR por encima del promedio de la cuenta»
     «CTR por debajo del promedio de la cuenta»

   No hay una octava, no se reescriben y no se abrevian. Si alguna vez hace
   falta decir otra cosa acá, lo que cambia es el panel, no este archivo.

   El ORDEN dentro de cada línea tampoco es libre: la función empuja las notas
   en un orden fijo —inversión, costo, conversaciones, CTR— y estas tres líneas
   lo respetan. Salteárselo mostraría una salida que el código no produce.

   ── POR QUÉ ESTAS TRES Y NO OTRAS ──────────────────────────────────────────
   Cada etiqueta de acá abajo está GANADA por una cuenta que el código haría con
   los datos de estas campañas, no elegida porque quedaba bien:

     Mensajes        1.ª por inversión → «la de mayor inversión». Es la campaña
                     que `ACCIONES_MUESTRA` manda sostener «porque concentró la
                     mejora del mes», así que también se lleva el mejor costo.
                     Su CTR queda cerca del promedio y por eso NO lleva etiqueta
                     de CTR: el umbral de la función es 15% y por debajo de eso
                     no marca nada, que es lo correcto —no hay nada que decir—.
     Remarketing     ni la primera ni la última, así que no lleva etiqueta de
                     inversión. Peor costo y CTR alto a la vez es el caso típico
                     de una audiencia chica y saturada, que es de lo que habla
                     `ALERTA_MUESTRA` cuando marca la frecuencia en 3,19.
     Reconocimiento  la última por inversión, sin conversaciones —y por eso su
                     costo es `null` y no entra en la comparación de costos— y
                     con el CTR bien abajo del promedio.

   Ninguna de esas cifras se muestra: se usaron para verificar que las etiquetas
   sean posibles. Que no se vean es, literalmente, el argumento de la sección.
   ═══════════════════════════════════════════════════════════════════════════ */

export const PROMPT_CAMPANAS_MUESTRA = {
  encabezado:
    "CAMPAÑAS DEL PERÍODO (ordenadas por inversión, de mayor a menor). Sin cifras a propósito: son contexto para saber DE QUÉ campaña hablar, no números para citar.",
  campanas: [
    {
      posicion: 1,
      nombre: "Mensajes | Julio",
      notas: [
        "la de mayor inversión del período",
        "el mejor costo por conversación del conjunto",
      ],
    },
    {
      posicion: 2,
      nombre: "Remarketing | Visitantes 30 días",
      notas: [
        "el peor costo por conversación del conjunto",
        "CTR por encima del promedio de la cuenta",
      ],
    },
    {
      posicion: 3,
      nombre: "Reconocimiento | Zona sur",
      notas: [
        "la de menor inversión del período",
        "sin conversaciones registradas en el período",
        "CTR por debajo del promedio de la cuenta",
      ],
    },
  ],
} as const;

/**
 * LAS CAMPAÑAS CON SUS CIFRAS — para el tablero de Meta del héroe.
 *
 * `PROMPT_CAMPANAS_MUESTRA` trae tres de estos nombres SIN cifras, y eso es a
 * propósito: ahí son contexto para que la IA sepa de qué campaña hablar, no
 * números para citar. Pero un Administrador de anuncios sí las muestra, y el
 * héroe lo reproduce.
 *
 * ── SIETE Y NO TRES (dueño, 19/09/2026) ─────────────────────────────────────
 * «Completá la tabla con filas hasta el borde inferior del panel.» Tres filas
 * dejaban media ventana vacía, y una cuenta de Meta con tres campañas no es una
 * cuenta que necesite el producto: el visitante es alguien que atiende cartera.
 * Las cuatro nuevas son literales porque el prompt nombra sólo las tres que la
 * IA tiene que poder citar — las que están en los extremos del período— y ése
 * es otro archivo, que esta tanda no toca.
 *
 * ── CIERRAN CONTRA LOS TOTALES, Y ESO NO ES DECORATIVO ──────────────────────
 * El visitante es un comprador de medios y lee estas cifras como las lee todos
 * los días. Si las campañas no suman el total del período, lo nota. Las siete
 * suman exacto —verificado al escribirlas, no a ojo—:
 *
 *   131.328 + 92.256 + 66.700 + 63.580 + 51.840 + 40.546 + 40.000 = 486.250
 *   96 + 62 + 46 + 44 + 36 + 28 + 0 = 312
 *
 * y cada costo por conversación es su propia división, no un número puesto.
 *
 * Y respetan lo que `PROMPT_CAMPANAS_MUESTRA` ya afirma de cada una, que es la
 * restricción que ordenó el reparto: «Mensajes | Julio» es la de MAYOR
 * inversión y el MEJOR costo (1.368); «Remarketing» va segunda en inversión y
 * tiene el PEOR costo (1.488), así que las cuatro nuevas caen entre esos dos
 * valores; y «Reconocimiento | Zona sur» es la de MENOR inversión y la única
 * sin conversaciones. El costo total de 1.558 sale MÁS ALTO que el de las seis
 * que convierten porque ésa gastó sin convertir — que es exactamente lo que el
 * reporte señala en su alerta.
 */
export const CAMPANAS_MUESTRA = [
  {
    nombre: PROMPT_CAMPANAS_MUESTRA.campanas[0].nombre,
    estado: "Activa",
    inversion: "$ 131.328",
    conversaciones: "96",
    costo: "$ 1.368",
  },
  {
    nombre: PROMPT_CAMPANAS_MUESTRA.campanas[1].nombre,
    estado: "Activa",
    inversion: "$ 92.256",
    conversaciones: "62",
    costo: "$ 1.488",
  },
  { nombre: "Tráfico | Catálogo primavera", estado: "Activa", inversion: "$ 66.700", conversaciones: "46", costo: "$ 1.450" },
  { nombre: "Mensajes | Retargeting carrito", estado: "Activa", inversion: "$ 63.580", conversaciones: "44", costo: "$ 1.445" },
  { nombre: "Interacción | Video showroom", estado: "Activa", inversion: "$ 51.840", conversaciones: "36", costo: "$ 1.440" },
  { nombre: "Alcance | Aniversario local", estado: "Pausada", inversion: "$ 40.546", conversaciones: "28", costo: "$ 1.448" },
  {
    nombre: PROMPT_CAMPANAS_MUESTRA.campanas[2].nombre,
    estado: "Pausada",
    inversion: "$ 40.000",
    /* La raya es el marcador de dato faltante que fija `PRODUCT.md`: sin dato se
       escribe raya, nunca un cero inventado. Acá no hubo conversaciones. */
    conversaciones: "—",
    costo: "—",
  },
] as const;

/* ═══════════════════════════════════════════════════════════════════════════
   LA GENERACIÓN, PASO POR PASO

   Lo que la pantalla del panel escribe mientras el reporte se arma, y los dos
   disparadores que pueden arrancarlo. Vive acá y no en el componente por la
   regla de la casa: ningún dato del ejemplo que se muestre en la landing se
   escribe a mano adentro de una sección.

   ── QUÉ ESTÁ VERIFICADO Y QUÉ NO ───────────────────────────────────────────
   Se fijaron el 07/09/2026 leyéndolos contra las pantallas del panel, y el
   08/09/2026 se verificaron **contra el código** de `nuvlo-panel`, archivo por
   archivo. El resultado no fue el esperado, y por eso conviene leerlo entero:

   VERIFICADOS, y son cita:
   - Los cuatro pasos, en `src/lib/pasos-generacion.ts` (`ETIQUETA_PASO`).
     **Cambiaron el 11/09/2026** y la landing siguió citando los viejos
     («Conectando con Meta Ads…» y los otros tres) hasta el 13/09: el diálogo
     dejó de avanzar con temporizadores y ahora cada paso aparece cuando el
     motor avisa que ese trabajo terminó, así que los nombres pasaron a decir
     el trabajo y no la espera. Los puntos suspensivos NO están en la
     constante del panel, los agrega su render (`{ETIQUETA_PASO[paso]}…`). Acá
     vienen incluidos en el string porque acá no hay render que los agregue.
   - `DISPARADOR_MANUAL_MUESTRA`, en el mismo diálogo.
   - «Aprobar y enviar» y «Se envía a …», en `src/components/send-report-button.tsx`.

   NO VERIFICADOS, y no eran cita aunque lo parecieran:
   - **«Completado» no existía en el panel.** Cero coincidencias en todo el repo.
     El panel marca el paso hecho con un tilde verde y el texto en gris, sin
     palabra, que es lo que esta lista ya dibujaba al lado. Había un
     `PASO_COMPLETADO_MUESTRA` acá y **se retiró el 08/09/2026** junto con la
     tercera columna que lo alojaba; queda el equivalente accesible del tilde,
     que es una alternativa textual y no una cita.
   - **`PISTAS_GENERACION_MUESTRA` es copy de la landing**, y se queda: dice algo
     verdadero y útil. Lo que cambia es cómo se la trata — el diálogo del panel
     renderiza sólo la etiqueta, así que si el panel cambia, esto no se rompe.

   La regla que sale de esto, y está en `PRODUCT.md`: un literal se verifica
   contra el código del panel antes de presentarlo como cita, no contra el
   recuerdo de haber visto la pantalla. Si cambian allá, cambian acá.

   `PREGUNTA_CONDICION_MUESTRA` es la excepción y conviene tenerlo claro: no es
   un string del panel, es la landing nombrando una rama que el producto sí
   tiene —`PRODUCT.md`: el envío automático «se autoinhibe si la IA cayó al
   texto de respaldo»—. Es argumento nuestro sobre una condición real, no una
   pantalla citada.
   ═══════════════════════════════════════════════════════════════════════════ */

export const DISPARADOR_MANUAL_MUESTRA = "Generar reporte";

/**
 * La cadencia, sin la fecha del próximo reporte. La cadencia es fija y cierta
 * —el panel ofrece cada 7 días, cada 14 o el día 1 del mes— y se renderiza en
 * el servidor. La fecha saldría de `Date.now()`, que no existe en el build de
 * un sitio estático: la escribía la pestaña automática de `Modos` después de
 * montar, y se fue con ella el 17/09/2026.
 */
export const CADENCIA_MUESTRA = "Cada 7 días";

/** La hora y la zona del envío automático, que el panel deja elegir por
 *  cliente (`Client.sendHour` / `Client.timezone`, desde el 12/09/2026). Son
 *  los valores por defecto del panel: 9 y Buenos Aires, escritos como los
 *  muestra su ficha («a las 09:00 de Buenos Aires»). */
export const HORA_ENVIO_MUESTRA = "09:00";
export const ZONA_ENVIO_MUESTRA = "Buenos Aires";

export const PASOS_GENERACION_MUESTRA = [
  "Pidiendo las métricas a Meta…",
  "Comparando contra el período anterior…",
  "Redactando el análisis…",
  "Armando el reporte…",
] as const;

/**
 * LA PROSA DE RESPALDO.
 *
 * Es lo que `report-generator.ts` escribe en el resumen ejecutivo cuando la
 * llamada a la IA no vuelve. No es un mensaje de error ni un estado vacío: el
 * reporte se genera igual, entero y con todos sus números, porque los números
 * nunca dependieron de la IA. Lo único que falta es el análisis.
 *
 * Por eso en la landing aparece de golpe y sin tipeo: no se está escribiendo
 * nada, es un texto fijo que ya estaba. Y por eso el reporte que sale de esa
 * rama se marca —`RESPALDO_ROTULO_MUESTRA`— y el envío automático se autoinhibe
 * (`PRODUCT.md`): mandarle prosa genérica al cliente de la agencia es peor que
 * no mandar nada.
 */
export const PROSA_RESPALDO_MUESTRA =
  "El reporte de rendimiento de tus campañas de Meta Ads del período está disponible. A continuación encontrás los resultados principales y las métricas detalladas.";

export const RESPALDO_ROTULO_MUESTRA = "Resumen genérico";

export const PREGUNTA_CONDICION_MUESTRA = "¿La IA respondió?";
export const RESPUESTA_SI_MUESTRA = "Sí";
export const RESPUESTA_NO_MUESTRA = "No";

/* ═══════════════════════════════════════════════════════════════════════════
   EL MODO DEL PANEL, QUE ES LO QUE CAMBIA EL CIRCUITO ENTERO

   Las dos formas en que un reporte puede salir. No son una simplificación de la
   landing: `PRODUCT.md` las registra como la decisión de producto que sostiene
   el diferencial —el flujo por defecto es MANUAL, el envío automático es opt-in
   y exige suscripción activa—.

   Lo que el modo cambia, y por eso Control dibuja los dos caminos lado a lado:

     el disparador   apretás un botón, o corre el cron cada 7 días.
     el final feliz  queda en borrador esperándote, o `decideAutoSend` manda el
                     email directo al cliente.
     el final malo   NO CAMBIA. Si la IA cayó al texto de respaldo, el reporte
                     queda en borrador sin enviar en los dos modos, porque el
                     envío automático se autoinhibe. Ése es el remate de la
                     sección y la razón por la que las dos ramas existen.
   ═══════════════════════════════════════════════════════════════════════════ */

export const MODOS_MUESTRA = [
  { id: "manual", nombre: "Revisar antes de enviar" },
  { id: "auto", nombre: "Enviar automáticamente" },
] as const;

export type ModoMuestra = (typeof MODOS_MUESTRA)[number]["id"];

/**
 * Las cuatro pistas de los pasos de generación: la línea en tinta media que va
 * debajo del título y dice qué hace de verdad ese paso. **Son copy de la
 * landing, no cita**: el diálogo del panel renderiza sólo la etiqueta.
 *
 * Se reescribieron el 13/09/2026 con los pasos nuevos, porque las viejas
 * repetían lo que las etiquetas pasaron a decir solas —«Se compara con el
 * período anterior» debajo de «Comparando contra el período anterior»—. Cada
 * una dice ahora lo que la etiqueta NO dice, y la segunda y la tercera siguen
 * siendo el argumento de la sección puesto adentro de los nodos: una dice que
 * ahí no hay IA y la otra, que la IA no calcula.
 *
 * Todas salen del motor (`generate-report.ts`): pide a Meta el período, el
 * anterior y el detalle por campaña; `computeReportMetrics` hace las cuentas;
 * la IA recibe las métricas ya hechas; el HTML se arma sin IA y el reporte se
 * guarda como borrador antes de cualquier envío.
 */
/*
 * La primera decía «3 llamadas a la API de Meta en paralelo» y la cuarta
 * nombraba al proveedor del modelo. Las dos se corrigieron el 08/09/2026: una
 * era un detalle de implementación sin respaldo en `PRODUCT.md` y la otra
 * ataba una superficie de marketing a un proveedor, además de romper el
 * registro del resto de la página, que dice «la IA» en todas sus apariciones.
 */
export const PISTAS_GENERACION_MUESTRA = [
  "El período que elegiste y el anterior, directo de Meta",
  "Sin IA: sólo aritmética sobre lo que devolvió Meta",
  "La IA escribe el resumen, la alerta y el plan; no calcula",
  "Se arma sin IA y se guarda como borrador",
] as const;

/* Los subtítulos de las tres salidas. El del borrador manual dice la regla de
   producto; el del enviado, a quién le llegó. */
export const SALIDA_BORRADOR_PISTA_MUESTRA = "Nada sale hasta que lo aprobás";

/** La pista del nodo de condición. Sale de `PRODUCT.md`: el envío automático
 *  «se autoinhibe si la IA cayó al texto de respaldo». */
export const CONDICION_PISTA_MUESTRA =
  "El envío automático se autoinhibe si cayó al respaldo";

/* ═══════════════════════════════════════════════════════════════════════════
   LA CHARLA DESPUÉS DEL MAIL

   Tres mensajes entre el trafficker y su cliente, después de que el reporte
   llegó. Es EJEMPLO FICTICIO, rotulado así en pantalla, y sigue la regla que
   fijó el dueño al aprobar el guion (07/09/2026): es demostración del ritual,
   no testimonio. Por eso el cliente no elogia el reporte ni cuenta resultados:
   pregunta por algo que el informe dice —la alerta de frecuencia— y el
   trafficker contesta con lo que el informe recomienda —la primera acción del
   plan—. Todo lo que se nombra existe arriba en este archivo.

   Las horas siguen al envío de las 09:22 de `RECORRIDO_MUESTRA`.
   ═══════════════════════════════════════════════════════════════════════════ */

export const CHARLA_MUESTRA = [
  {
    de: "trafficker",
    hora: "09:24",
    texto: "Te llegó el reporte de julio al mail. Lo aprobé recién.",
  },
  {
    de: "cliente",
    hora: "09:40",
    texto: "Lo vi. ¿Qué hacemos con lo de la frecuencia?",
  },
  {
    de: "trafficker",
    hora: "09:41",
    texto:
      "Está en el plan de acción: ampliar audiencia antes de sumar presupuesto. Lo armo esta semana.",
  },
] as const;

/**
 * LA PREGUNTA DEL CLIENTE, ANTES DEL REPORTE.
 *
 * El mensaje que dispara el ritual: el cliente pregunta cómo vienen las
 * campañas y el reporte es la respuesta. Es ejemplo ficticio, con la misma
 * regla que `CHARLA_MUESTRA`: pregunta, no elogia. La hora va antes del
 * borrador de las 09:14 de `RECORRIDO_MUESTRA`.
 */
/**
 * La hora en que el cliente abre el mail en el celular (el teléfono de El
 * entregable): después del envío de las 09:22 y antes de su primer mensaje
 * de la charla, a las 09:40. No es un dato del producto: es la escena.
 */
export const HORA_LECTURA_MAIL_MUESTRA = "09:36";

export const PREGUNTA_CLIENTE_MUESTRA = {
  hora: "09:02",
  texto: "¿Cómo vienen las campañas este mes?",
} as const;

/**
 * EL PERÍODO, COMO FECHAS.
 *
 * `PERIODO_MUESTRA` es el texto que imprime el informe; esto son las mismas
 * fechas en ISO para que el calendario de Tres pasos dibuje el rango sin
 * parsear prosa. Si cambia uno, cambia el otro. El tope de 92 días es regla
 * de producto (`PRODUCT.md`: «Rango máximo de 92 días»).
 */
export const PERIODO_RANGO_MUESTRA = {
  desde: "2026-07-01",
  hasta: "2026-07-31",
} as const;

/**
 * EL DÍA DE LA ESCENA.
 *
 * No es un dato del producto: es la escena, como `HORA_LECTURA_MAIL_MUESTRA`.
 * Hacía falta fijarla desde que la landing dibuja dos pantallas que dependen
 * de «hoy» (13/09/2026): el diálogo de generar apaga los días que todavía no
 * terminaron y muestra «Este mes» sólo después del día 1, y el tablero —que
 * salió de la página el 17/09/2026— contaba cuántos días llevaba esperando un
 * borrador. El 3 de agosto es el lunes en que
 * un trafficker manda los reportes de julio, que es el ritual que la página
 * cuenta.
 */
export const HOY_MUESTRA = "2026-08-03";

/* ═══════════════════════════════════════════════════════════════════════════
   EL DIÁLOGO «GENERAR REPORTE»

   Literales de `nuvlo-panel/src/components/generate-report-dialog.tsx` y de
   `selector-campanas.tsx`, verificados contra su código el 13/09/2026. Si
   cambian allá, cambian acá.

   - Los atajos, en el orden del panel. «Este mes» es condicional allá
     (`tieneEsteMes`: no existe el día 1) y el día de la escena lo muestra.
   - «Campañas» con «Toda la cuenta», que es lo que dice el campo cerrado
     cuando no se eligió ninguna.
   - «Cuándo sale» con «Ahora» y «Programar»: el dibujo deja elegido «Ahora»,
     que es la respuesta de siempre y la que no se saltea la revisión.
   - La ayuda del período, con las fechas como las escribe `labelFmt`
     (`day: 2-digit`, `month: short`, `year: numeric` en es-AR).
   ═══════════════════════════════════════════════════════════════════════════ */

export const ATAJOS_PERIODO_MUESTRA = [
  "Mes pasado",
  "Últimos 7 días",
  "Últimos 14 días",
  "Últimos 30 días",
  "Este mes",
  "Hoy",
] as const;

export const ATAJO_ELEGIDO_MUESTRA = "Mes pasado";

export const CAMPANAS_ROTULO_MUESTRA = "Campañas";
export const CAMPANAS_VALOR_MUESTRA = "Toda la cuenta";
export const CUANDO_ROTULO_MUESTRA = "Cuándo sale";
export const CUANDO_OPCIONES_MUESTRA = ["Ahora", "Programar"] as const;

/* Literal del panel (`generate-report-dialog.tsx`), que lo pone como `title` del
   botón y como línea de ayuda cuando `puedeProgramar` es falso. Va acá y no
   escrito a mano en el componente porque es una afirmación sobre el producto:
   si el plan deja de gatear la programación, esto miente. */
export const CUANDO_BLOQUEADO_MUESTRA =
  "Programar envíos requiere una suscripción activa.";

export const AYUDA_PERIODO_MUESTRA =
  "Del 01 de jul de 2026 al 31 de jul de 2026. Se compara con el período anterior del mismo largo.";
