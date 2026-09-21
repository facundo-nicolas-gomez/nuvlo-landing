import {
  PRECIO_ESTANDAR_LABEL,
  PRECIO_WHITE_LABEL_LABEL,
} from "@/lib/precios";

/**
 * BOCETOS · DIRECCIÓN "C · PIEZAS"
 *
 * Lo que se aprueba acá es la COMPOSICIÓN de cada sección y el sistema visual.
 * El sitio se construye después, con su propia hoja.
 *
 * Todos los hechos de producto que aparecen salen del repo del panel
 * (`ReportStatus`, `ReportingMode`, `ScheduleFrequency`, `send-report-button`,
 * `reporting-mode-select`, `schedule-config`, `report-generator`). Del panel se
 * toma SÓLO producto: funcionalidad, estados, flujos, textos y reglas. Nada de
 * su diseño, por decisión del dueño: el panel se acopla a esta landing después,
 * no al revés.
 */

type Pieza = { t: string; d?: string; clase?: string };

function P({ t, d, clase = "" }: Pieza) {
  return (
    <div className={`p ${clase}`}>
      <span className="p-t">{t}</span>
      {d ? <span className="p-d">{d}</span> : null}
    </div>
  );
}

const TONOS = [
  { n: "Hueso", v: "#f7f4f0", rol: "campo claro" },
  { n: "Carbón", v: "#17140f", rol: "campo oscuro" },
  { n: "Bermellón", v: "#d93a11", rol: "acción" },
  { n: "Ámbar", v: "#9a6b04", rol: "estado borrador" },
  { n: "Azul", v: "#1f5fbf", rol: "estado procesando" },
  { n: "Verde", v: "#0d6b4a", rol: "estado enviado" },
  { n: "Rojo", v: "#a32a1c", rol: "estado falló" },
  { n: "Gris", v: "#6b6357", rol: "estado pendiente" },
];

export default function Bocetos() {
  return (
    <main className="bo-marco">
      <header className="bo-cab">
        <p className="bo-kicker">Bocetos para aprobar</p>
        <h1 className="bo-titulo">C · Piezas</h1>
        <p className="bo-intro">
          La landing no muestra una captura del producto: muestra sus piezas.
          Cada componente real se dibuja a escala como objeto propio, con su
          borde, su fondo, su sombra y su plano, y se componen para hacer un
          argumento.
        </p>
        <p className="bo-aviso">
          Fidelidad media a propósito: proporciones, jerarquía y color son
          reales; el relleno es esquemático. Pasá el mouse por cualquier pieza
          para ver la interacción que va a tener el sitio.
        </p>
      </header>

      {/* ═══ EL SISTEMA ══════════════════════════════════════════════════════ */}
      <section className="bo-sistema">
        <h2 className="bo-h2">El sistema</h2>

        <div className="bo-bloques">
          <div>
            <h3 className="bo-h3">Tipografía</h3>
            <div className="bo-espec">
              <div className="bo-linea-tipo">
                <b className="bo-d1">Aprobás vos</b>
                <span className="bo-tipo-nota">Archivo 700, ancho 112</span>
              </div>
              <div className="bo-linea-tipo">
                <b className="bo-d2">Qué hace solo</b>
                <span className="bo-tipo-nota">Archivo 700, ancho 108</span>
              </div>
              <div className="bo-linea-tipo">
                <b className="bo-d3">
                  El informe nace borrador y sale cuando lo aprobás.
                </b>
                <span className="bo-tipo-nota">Archivo 400</span>
              </div>
              <div className="bo-linea-tipo">
                <b className="bo-d4 cifra">$ 486.250 · 1,84% · 09:14</b>
                <span className="bo-tipo-nota">JetBrains Mono</span>
              </div>
            </div>
            <p className="bo-nota">
              Una sola superfamilia con contraste de <b>ancho</b>, no dos
              familias peleando. No es Inter, que es el default de todos, ni la
              del panel, que no se hereda.
            </p>
          </div>

          <div>
            <h3 className="bo-h3">Color</h3>
            <div className="bo-paleta">
              {TONOS.map((t) => (
                <div className="bo-tono" key={t.n}>
                  <div
                    className="bo-tono-muestra"
                    style={{ background: t.v }}
                  />
                  <div className="bo-tono-pie">
                    <span className="bo-tono-nombre">{t.n}</span>
                    <span className="bo-tono-rol">{t.rol}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="bo-nota">
              El bermellón es lo único que empuja a hacer algo y no lo usa
              ningún estado, así que nunca se confunde con uno. Los otros cinco
              no son paleta: son <b>comportamiento real</b> del producto.
            </p>
          </div>

          <div>
            <h3 className="bo-h3">Piezas base</h3>
            <div className="bo-muestras">
              <button className="bo-btn" type="button">
                Empezar gratis
              </button>
              <button className="bo-btn bo-btn-2" type="button">
                Ver un informe
              </button>
            </div>
            <div className="bo-muestras" style={{ marginTop: 16 }}>
              <span className="bo-chip bo-chip-pendiente">
                <i /> Pendiente
              </span>
              <span className="bo-chip bo-chip-procesando">
                <i /> Procesando
              </span>
              <span className="bo-chip bo-chip-borrador">
                <i /> Borrador
              </span>
              <span className="bo-chip bo-chip-enviado">
                <i /> Enviado
              </span>
              <span className="bo-chip bo-chip-fallo">
                <i /> Falló
              </span>
            </div>
            <p className="bo-nota">
              Las cinco etiquetas son las de <b>ReportStatus</b>, textuales.
            </p>
          </div>

          <div>
            <h3 className="bo-h3">Forma, profundidad y movimiento</h3>
            <p className="bo-nota" style={{ marginTop: 0 }}>
              Radios: objeto 14, superficie 10, control 8, pastilla completa.
              Cuatro valores y una regla.
              <br />
              <br />
              Elevación en tres capas: contorno de 1px, contacto corto y una
              ambiental larga y muy diluida, siempre teñida al matiz del campo.
              <br />
              <br />
              Movimiento: <b>toda pieza responde al mouse</b> con 2px de
              elevación y el canto que se aviva. Entradas por scroll en los
              bloques grandes. Todo colapsa con movimiento reducido.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ LAS SECCIONES ═══════════════════════════════════════════════════ */}
      <section className="bo-secciones">
        <h2 className="bo-h2">Las secciones</h2>

        {/* 0 */}
        <div className="bo-sec">
          <div className="bo-sec-cab">
            <span className="bo-sec-n">00</span>
            <h3 className="bo-sec-nombre">Navbar</h3>
            <span className="bo-sec-fondo" data-t="oscuro">
              oscuro
            </span>
          </div>
          <p className="bo-sec-arg">
            Fija, 68px, hairline que aparece recién al scrollear. La navegación
            que falta hoy.
          </p>
          <div className="bo-lienzo" data-t="oscuro">
            <div className="g g-nav">
              <P t="Nuvlo" d="wordmark" clase="p-fuerte" />
              <P
                t="Cómo funciona · El reporte · Precios · Preguntas"
                d="4 anclas a secciones reales de esta misma página"
              />
              <P t="Iniciar sesión + Empezar gratis" clase="p-accion" />
            </div>
          </div>
        </div>

        {/* 1 */}
        <div className="bo-sec">
          <div className="bo-sec-cab">
            <span className="bo-sec-n">01</span>
            <h3 className="bo-sec-nombre">
              Héroe: el producto en piezas
            </h3>
            <span className="bo-sec-fondo" data-t="oscuro">
              oscuro
            </span>
          </div>
          <p className="bo-sec-arg">
            Acá muere la hoja única que flotaba en el medio. Cinco piezas reales
            del producto, superpuestas en planos distintos. Titular a la
            izquierda a 84px: <b>&ldquo;Tu cliente recibe el informe. Vos apretás el
            botón.&rdquo;</b>
          </p>
          <div className="bo-lienzo" data-t="oscuro">
            <div className="g g-heroe">
              <div>
                <span className="b b-xl" style={{ width: "92%" }} />
                <span className="b b-xl" style={{ width: "74%" }} />
                <span className="b b-l" style={{ width: "60%", marginTop: 18 }} />
                <div style={{ marginTop: 18 }}>
                  <P t="Empezar gratis" d="1 CTA, sin segundo botón" clase="p-accion" />
                </div>
              </div>
              <div className="escena">
                <P
                  t="Fila del listado"
                  d="Mueblería Lombardi · Borrador"
                  clase="e1"
                />
                <P
                  t="Recorrido de estados"
                  d="Pendiente, Procesando, Borrador, Enviado"
                  clase="e2 p-fuerte"
                />
                <P t="KPI" d="Costo por conversación · $ 1.558" clase="e3" />
                <P
                  t="Aprobar y Enviar"
                  d="Se envía a contacto@lombardi.com.ar"
                  clase="e4 p-accion"
                />
                <P t="Modo" d="Revisar antes de enviar" clase="e5" />
              </div>
            </div>
            <p className="bo-nota">
              Cada pieza tiene su plano, su sombra y su hover. <b>Necesita la
              imagen de fondo</b> que pido al final.
            </p>
          </div>
        </div>

        {/* 2 */}
        <div className="bo-sec">
          <div className="bo-sec-cab">
            <span className="bo-sec-n">02</span>
            <h3 className="bo-sec-nombre">Qué hace solo, qué hacés vos</h3>
            <span className="bo-sec-fondo">claro</span>
          </div>
          <p className="bo-sec-arg">
            La sección que faltaba. Dos carriles paralelos: arriba lo que hace
            Nuvlo sin vos, abajo los tres momentos que son tuyos. El corte entre
            los dos carriles es el argumento del producto.
          </p>
          <div className="bo-lienzo">
            <div className="g g-carriles">
              <P t="Trae las métricas" d="Meta Ads, período elegido" />
              <P t="Calcula" d="KPI y tabla, antes de la IA" />
              <P t="Redacta" d="resumen, alerta y 3 acciones" />
              <P t="Arma el entregable" d="email, página y PDF" />
            </div>
            <div className="g g-carriles" style={{ marginTop: 12 }}>
              <P t="Elegís el período" clase="p-accion" />
              <P t="Leés el borrador" clase="p-accion" />
              <P t="Apretás Aprobar y Enviar" clase="p-accion" />
              <P t="(nada más)" d="el resto ya está hecho" />
            </div>
            <p className="bo-nota">
              Hover en un hito: se expande con su detalle. Es <b>storytelling</b>,
              no adorno.
            </p>
          </div>
        </div>

        {/* 3 */}
        <div className="bo-sec">
          <div className="bo-sec-cab">
            <span className="bo-sec-n">03</span>
            <h3 className="bo-sec-nombre">Vos elegís cómo sale</h3>
            <span className="bo-sec-fondo">claro</span>
          </div>
          <p className="bo-sec-arg">
            El control real, con sus dos opciones textuales del panel. Al elegir
            automático aparece la programación con sus tres frecuencias y los dos
            frenos que igual quedan.
          </p>
          <div className="bo-lienzo">
            <div className="g g-modo">
              <div className="g">
                <P
                  t="Revisar antes de enviar"
                  d="el modo por defecto: nace borrador y te espera"
                  clase="p-fuerte"
                />
                <P
                  t="Enviar automáticamente"
                  d="opt-in, cuenta por cuenta"
                />
              </div>
              <div className="g">
                <P
                  t="Cada 7 días · Cada 14 días · El día 1 de cada mes"
                  d="las tres frecuencias reales"
                />
                <P t="Próximo reporte: 1 de agosto" />
                <P
                  t="Freno 1: exige suscripción activa"
                  d="sin ella no se activa"
                  clase="p-accion"
                />
                <P
                  t="Freno 2: si la IA no redactó, no sale"
                  d="queda borrador esperándote"
                  clase="p-accion"
                />
              </div>
            </div>
            <p className="bo-nota">
              Los dos modos son <b>piezas conmutables</b>: clic en una y la
              sección cambia. Es la interacción que más vende, porque muestra que
              vos elegís.
            </p>
          </div>
        </div>

        {/* 4 */}
        <div className="bo-sec">
          <div className="bo-sec-cab">
            <span className="bo-sec-n">04</span>
            <h3 className="bo-sec-nombre">Antes de que salga</h3>
            <span className="bo-sec-fondo">claro</span>
          </div>
          <p className="bo-sec-arg">
            El momento de aprobar, a tamaño grande. Es la última pantalla donde
            se puede frenar un mail que sale a un tercero, y el producto lo
            trata así.
          </p>
          <div className="bo-lienzo">
            <div className="g g-aprobar">
              <div className="g">
                <P
                  t="Aprobar y Enviar"
                  d="con el destinatario impreso debajo del botón"
                  clase="p-accion"
                />
                <P
                  t="Ver como cliente"
                  d="abre el informe tal como lo va a abrir él"
                />
              </div>
              <P
                t="Estado deshabilitado"
                d="Este cliente no tiene email cargado. El producto no te deja apretar un botón que iba a fallar."
              />
            </div>
          </div>
        </div>

        {/* 5 */}
        <div className="bo-sec">
          <div className="bo-sec-cab">
            <span className="bo-sec-n">05</span>
            <h3 className="bo-sec-nombre">El reporte, desarmado</h3>
            <span className="bo-sec-fondo">claro</span>
          </div>
          <p className="bo-sec-arg">
            Acá muere la hoja blanca con todo apilado adentro. Las seis partes
            del informe, cada una como objeto propio con su plano, en una
            cuadrícula con ritmo. El scroll enciende una por vez.
          </p>
          <div className="bo-lienzo">
            <div className="g g-desarmado">
              <P
                t="Encabezado"
                d="tu agencia arriba, no la nuestra"
                clase="d-cabeza p-fuerte"
              />
              <P
                t="4 KPI"
                d="inversión, conversaciones, costo por conversación, CTR"
                clase="d-kpis"
              />
              <P t="Alerta" d="sólo si la IA marcó una" clase="d-alerta" />
              <P
                t="Tabla de métricas"
                d="impresiones, alcance, frecuencia, clics, CPC"
                clase="d-tabla"
              />
              <P t="3 acciones" d="hasta tres, nunca diez" clase="d-acciones" />
              <P t="Pie" d="acá se ve la diferencia de plan" clase="d-pie" />
            </div>
          </div>
        </div>

        {/* 6 */}
        <div className="bo-sec">
          <div className="bo-sec-cab">
            <span className="bo-sec-n">06</span>
            <h3 className="bo-sec-nombre">Los números no los escribe la IA</h3>
            <span className="bo-sec-fondo" data-t="oscuro">
              oscuro
            </span>
          </div>
          <p className="bo-sec-arg">
            Tu argumento más fuerte, y hoy está en una línea de 15px. Es una
            invariante de arquitectura, y se muestra como un circuito de tres
            piezas con la regla citada literal del código.
          </p>
          <div className="bo-lienzo" data-t="oscuro">
            <div className="g g-ia">
              <P t="Meta Ads" d="datos crudos de la cuenta" />
              <P
                t="Nuvlo calcula"
                d="KPI, tabla y variaciones, antes de que el modelo intervenga"
                clase="p-fuerte"
              />
              <P
                t="La IA sólo redacta"
                d="recibe cifras ya calculadas y escribe la prosa"
                clase="p-accion"
              />
            </div>
            <p className="bo-nota">
              Citado del código: <b>&ldquo;Si un número no está ahí, no existe para
              vos.&rdquo;</b> Y de las campañas: puede nombrarlas, pero no
              atribuirles cifras, porque no las tiene.
            </p>
          </div>
        </div>

        {/* 7 */}
        <div className="bo-sec">
          <div className="bo-sec-cab">
            <span className="bo-sec-n">07</span>
            <h3 className="bo-sec-nombre">Y así le llega</h3>
            <span className="bo-sec-fondo" data-t="oscuro">
              oscuro
            </span>
          </div>
          <p className="bo-sec-arg">
            El email, reconstruido como pieza propia, con la captura real de
            Gmail al lado como prueba. Ahora se puede decir marca blanca sin
            asterisco: el remitente es el nombre de la agencia.
          </p>
          <div className="bo-lienzo" data-t="oscuro">
            <div className="g g-correo">
              <div className="g">
                <P
                  t="Asunto"
                  d="nombre de tu agencia y el rango del período"
                  clase="p-fuerte"
                />
                <P t="Cuerpo" d="saludo, período y un botón. Sin métricas." />
                <P
                  t="El enlace vence a los 90 días"
                  d="token aleatorio, sin indexar"
                />
              </div>
              <P t="Captura real" d="Gmail, teléfono, sin retocar" />
            </div>
          </div>
        </div>

        {/* 8 */}
        <div className="bo-sec">
          <div className="bo-sec-cab">
            <span className="bo-sec-n">08</span>
            <h3 className="bo-sec-nombre">Lo que Nuvlo no hace</h3>
            <span className="bo-sec-fondo">claro</span>
          </div>
          <p className="bo-sec-arg">
            El pasaje tranquilo, sin una sola superficie. Decir los límites de
            frente convierte al que dudaba en el que confía.
          </p>
          <div className="bo-lienzo">
            <div className="g g-limites">
              <P t="Sólo Meta Ads" d="y no está en camino" />
              <P t="El informe no se edita" d="se aprueba o no" />
              <P t="Permiso de sólo lectura" d="no puede gastar" />
              <P t="No hay reembolsos" d="por eso la prueba es real" />
              <P t="El cobro es de Paddle" d="figura a su nombre" />
              <P t="El enlace caduca" d="a los 90 días" />
            </div>
          </div>
        </div>

        {/* 9 */}
        <div className="bo-sec">
          <div className="bo-sec-cab">
            <span className="bo-sec-n">09</span>
            <h3 className="bo-sec-nombre">Precios</h3>
            <span className="bo-sec-fondo">claro</span>
          </div>
          <p className="bo-sec-arg">
            Dos planes de ancho distinto, no dos tarjetas gemelas. La diferencia
            se muestra con el pie del informe real, con la franja y sin ella.
          </p>
          <div className="bo-lienzo">
            <div className="g g-precios">
              <P
                t={`Estándar · ${PRECIO_ESTANDAR_LABEL} por cliente, al mes`}
                d="el pie dice Generado con Nuvlo"
              />
              <P
                t={`Marca Blanca · ${PRECIO_WHITE_LABEL_LABEL} por cliente, al mes`}
                d="el mismo informe sin ninguna mención a Nuvlo, y por tu propio host"
                clase="p-accion"
              />
            </div>
            <p className="bo-nota">
              El precio nunca va sin su unidad ni sin su moneda. Se importa de{" "}
              <b>lib/precios.ts</b>, que es lo que el CI del panel compara.
            </p>
          </div>
        </div>

        {/* 10 */}
        <div className="bo-sec">
          <div className="bo-sec-cab">
            <span className="bo-sec-n">10</span>
            <h3 className="bo-sec-nombre">Preguntas</h3>
            <span className="bo-sec-fondo">claro</span>
          </div>
          <p className="bo-sec-arg">
            Titular fijo a la izquierda, tres grupos pasando por la derecha.
            Acordeón nativo, sin JavaScript.
          </p>
          <div className="bo-lienzo">
            <div className="g g-faq">
              <P t="Titular fijo" d="acompaña mientras pasan los grupos" />
              <div className="g">
                <P t="Antes de conectar" d="2 preguntas" />
                <P t="Sobre el informe" d="3 preguntas" />
                <P t="Envío y plata" d="2 preguntas" />
              </div>
            </div>
          </div>
        </div>

        {/* 11 */}
        <div className="bo-sec">
          <div className="bo-sec-cab">
            <span className="bo-sec-n">11</span>
            <h3 className="bo-sec-nombre">Cierre y footer</h3>
            <span className="bo-sec-fondo" data-t="oscuro">
              oscuro
            </span>
          </div>
          <p className="bo-sec-arg">
            El wordmark gigante sangrando por el borde inferior, y debajo el
            footer completo que hoy no existe.
          </p>
          <div className="bo-lienzo" data-t="oscuro">
            <div className="g" style={{ maxWidth: 520 }}>
              <span className="b b-l" style={{ width: "88%" }} />
              <P t="Empezar gratis" d="3 reportes, sin tarjeta" clase="p-accion" />
            </div>
            <div className="g g-pie" style={{ marginTop: 20 }}>
              <P t="Nuvlo" d="wordmark y una línea de qué es" clase="p-fuerte" />
              <P t="Producto" d="cómo funciona, el reporte, precios" />
              <P t="Legal" d="términos, privacidad, reembolsos" />
              <P t="Cuenta" d="iniciar sesión, empezar gratis" />
            </div>
            <p className="bo-nota" aria-hidden="true">
              Y al pie de todo, sangrando:
            </p>
            <p className="bo-cierre-wm">Nuvlo</p>
          </div>
        </div>
      </section>
    </main>
  );
}
