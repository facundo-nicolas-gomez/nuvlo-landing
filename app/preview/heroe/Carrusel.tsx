"use client";

import { useEffect, useRef, useState } from "react";
import "./carrusel.css";
import {
  CUENTAS_META_MUESTRA,
  EMAIL_CLIENTE_MUESTRA,
  KPIS_MUESTRA,
  PROMPT_CAMPANAS_MUESTRA,
  RESUMEN_MUESTRA,
} from "@/lib/reporte-muestra";

/**
 * EL CARRUSEL DEL HÉROE — TRES SLIDES (brief del dueño, 19/09/2026).
 *
 * Fórmula constante por slide, igual que en la referencia:
 *   1. mesh gradient saturado y desenfocado
 *   2. el tablero de Meta Ads translúcido, recortado por los bordes del panel
 *   3. UN elemento de IA flotante, blanco y nítido, que se superpone a la ventana
 *
 * Lo que cambia entre slides: el titular bitono, el CTA, el elemento de IA y la
 * paleta del gradiente. Cada slide dura 7s y el tab activo lleva su barra de
 * progreso.
 *
 * ── LOS TRES SLIDES SON LOS TRES PASOS DEL PRODUCTO ─────────────────────────
 * No son features inventadas: son los tres pasos que la sección «Tres pasos» ya
 * cuenta y que `PRODUCT.md` define como el recorrido —conectar, calcular y
 * redactar, aprobar—. El tercero es el único donde entra una persona, y es el
 * argumento de la página.
 *
 * ── LAS CIFRAS POR CAMPAÑA CIERRAN ──────────────────────────────────────────
 * `reporte-muestra.ts` trae los nombres de las campañas sin cifras a propósito.
 * Un tablero de Meta sí las muestra, así que se derivan de los totales que ya
 * existen: 291.750 + 145.875 + 48.625 = 486.250 y 214 + 98 + 0 = 312. Si esto
 * se promueve, se mudan a `lib/reporte-muestra.ts`.
 *
 * ── UNA CONSECUENCIA QUE NO ES DEL HÉROE ────────────────────────────────────
 * El `h1` cambia con el slide, que es lo que pide el brief. Eso significa que
 * la página no tiene UN titular estable: cambia lo que lee un lector de
 * pantalla y lo que indexa un buscador. Acá es un boceto y se banca; si se
 * promueve, la salida es que el `h1` quede fijo y lo que rote sea una segunda
 * línea. Queda dicho, no resuelto.
 */

const DURACION = 7000;

const CAMPANAS = [
  { nombre: PROMPT_CAMPANAS_MUESTRA.campanas[0].nombre, inv: "$ 291.750", conv: "214", costo: "$ 1.363", estado: "Activa" },
  { nombre: PROMPT_CAMPANAS_MUESTRA.campanas[1].nombre, inv: "$ 145.875", conv: "98", costo: "$ 1.488", estado: "Activa" },
  { nombre: PROMPT_CAMPANAS_MUESTRA.campanas[2].nombre, inv: "$ 48.625", conv: "—", costo: "—", estado: "Pausada" },
];

/**
 * ── EL TITULAR NO ROTA (dueño, 19/09/2026) ──────────────────────────────────
 * El brief pedía que el `h1` cambiara con el slide, y eso dejaba a la página
 * sin UN titular: cambiaba lo que lee un lector de pantalla y lo que indexa un
 * buscador, y el `h1` es el primer texto del documento. El dueño lo resolvió:
 * el titular queda fijo —el de la home, literal— y lo que rota es la línea de
 * abajo, que es donde cada paso dice lo suyo.
 *
 * Gana además el argumento: una afirmación que cambia cada siete segundos no es
 * una afirmación. La promesa es una sola y las tres líneas la sostienen.
 */
const SLIDES = [
  {
    tab: "Conectás",
    nota: "Tu cuenta de Meta, una vez",
    linea: "Conectás la cuenta de Meta una vez. De ahí en más, el período lo elegís vos.",
    cta: "Empezar gratis",
  },
  {
    tab: "Nuvlo calcula",
    nota: "Los números, antes de que la IA escriba",
    linea: "Las cuentas las hace el sistema: la IA recibe los números hechos y no calcula ninguno.",
    cta: "Ver cómo funciona",
  },
  {
    tab: "Aprobás vos",
    nota: "Nada sale sin que lo decidas",
    linea: "El informe queda en borrador esperándote. Sin enlace público y sin mail hasta que lo apruebes.",
    cta: "Empezar gratis",
  },
];

/** El tablero de Meta: la capa del medio. Igual en los tres slides — es el
 *  contexto, y el contexto no cambia porque cambie de qué se habla. */
function Tablero() {
  return (
    <div className="c-tablero" aria-hidden="true">
      <div className="c-tablero-barra">
        <span className="c-tablero-marca">Administrador de anuncios</span>
        <span className="c-tablero-cuenta">
          {CUENTAS_META_MUESTRA[0].nombre} · {CUENTAS_META_MUESTRA[0].id}
        </span>
      </div>
      <div className="c-tablero-cifras">
        {KPIS_MUESTRA.map((k) => (
          <div key={k.etiqueta} className="c-tablero-cifra">
            <span>{k.etiqueta}</span>
            <strong className="i-cifra">{k.valor}</strong>
          </div>
        ))}
      </div>
      <table className="c-tablero-tabla i-cifra">
        <thead>
          <tr>
            <th>Campaña</th>
            <th>Estado</th>
            <th>Inversión</th>
            <th>Conversaciones</th>
            <th>Costo por conv.</th>
          </tr>
        </thead>
        <tbody>
          {CAMPANAS.map((c) => (
            <tr key={c.nombre}>
              <td>{c.nombre}</td>
              <td>{c.estado}</td>
              <td>{c.inv}</td>
              <td>{c.conv}</td>
              <td>{c.costo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Slide 1 · la IA escribiendo el resumen, en streaming. */
function CardInsight({ corriendo }: { corriendo: boolean }) {
  const texto = RESUMEN_MUESTRA[0];
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!corriendo) return;
    // Sin `setN(0)` acá: la card se remonta con `key` al cambiar de slide, así
    // que el estado ya arranca en cero. Ponerlo sincrónicamente adentro del
    // efecto dispara un render en cascada.
    let t = 0;
    const id = window.setInterval(() => {
      t += 4;
      setN(t);
      if (t >= texto.length) window.clearInterval(id);
    }, 26);
    return () => window.clearInterval(id);
  }, [corriendo, texto.length]);

  return (
    <div className="c-card">
      <p className="c-card-rotulo">Resumen ejecutivo · escrito por la IA</p>
      <p className="c-card-texto">{corriendo ? texto.slice(0, n) : texto}</p>
    </div>
  );
}

/** Slide 2 · lo que la IA RECIBE: los números ya hechos. Un solo foco. */
function CardCalculo() {
  return (
    <div className="c-card">
      <p className="c-card-rotulo">Lo que recibe la IA · ya calculado</p>
      <ul className="c-calculo">
        {KPIS_MUESTRA.map((k) => (
          <li key={k.etiqueta}>
            <span>{k.etiqueta}</span>
            <strong className="i-cifra">{k.valor}</strong>
            <span className="c-calculo-var" data-sentido={k.sentido}>
              {k.variacion}
            </span>
          </li>
        ))}
      </ul>
      <p className="c-calculo-pie">
        La IA no computa ninguno: los recibe hechos y sólo los redacta.
      </p>
    </div>
  );
}

/** Slide 3 · el gesto. Un solo foco: el borrador esperando. */
function CardAprobacion() {
  return (
    <div className="c-card">
      <p className="c-card-rotulo">Pendiente de aprobación</p>
      <p className="c-aprobar-texto">
        El informe está listo y en borrador. Sin enlace público y sin mail hasta
        que lo apruebes.
      </p>
      <div className="c-aprobar-fila">
        <span className="c-aprobar-boton">Aprobar y enviar</span>
        <span className="c-aprobar-destino">{EMAIL_CLIENTE_MUESTRA}</span>
      </div>
    </div>
  );
}

export function Carrusel() {
  const [i, setI] = useState(0);
  const [corre, setCorre] = useState(true);
  const temporizador = useRef(0);

  useEffect(() => {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducido.matches) {
      /* Asincrónico a propósito. Apagar el carrusel sincrónicamente adentro del
         efecto dispara un render en cascada, y el linter lo marca con razón: el
         componente ya se pintó una vez con `corre` en true. El timeout lo deja
         para el próximo cuadro, que es cuando el navegador puede repintar sin
         volver atrás. */
      const apagar = window.setTimeout(() => setCorre(false), 0);
      return () => window.clearTimeout(apagar);
    }
    temporizador.current = window.setInterval(
      () => setI((x) => (x + 1) % SLIDES.length),
      DURACION,
    );
    return () => window.clearInterval(temporizador.current);
  }, []);

  const s = SLIDES[i];

  return (
    <div className="c-carrusel" data-slide={i}>
      <div className="p-fila">
        <div>
          <p className="i-rotulo i-portada-rotulo">
            Reportes de Meta Ads para quien atiende clientes
          </p>
          {/* Fijo, sin `key`: no se renueva ni se anima con el slide. Es el
              titular de la página y tiene que ser uno solo. */}
          <h1 className="i-portada">
            <span className="i-portada-frase">
              El reporte de tu cliente, hecho.
            </span>{" "}
            <span className="i-portada-frase">Sale cuando vos decís.</span>
          </h1>
          {/* Y esto es lo que rota: la línea del paso. Con `key` para que entre
              cada vez. */}
          <p className="c-linea" key={i}>
            {s.linea}
          </p>
          <div className="c-acciones">
            <span className="i-boton">{s.cta}</span>
            <a className="c-secundario" href="#precios">
              Ver precios <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="c-pieza">
          <div className="c-mesh" aria-hidden="true" />
          <div className="c-ventana">
            <Tablero />
          </div>
          {/* Un solo elemento de IA por slide: el foco no se comparte. */}
          <div className="c-card-lugar" key={i}>
            {i === 0 ? (
              <CardInsight corriendo={corre} />
            ) : i === 1 ? (
              <CardCalculo />
            ) : (
              <CardAprobacion />
            )}
          </div>
        </div>
      </div>

      <div className="c-tabs">
        {SLIDES.map((x, n) => (
          <button
            key={x.tab}
            type="button"
            className="c-tab"
            data-activo={n === i ? "" : undefined}
            onClick={() => {
              window.clearInterval(temporizador.current);
              setI(n);
            }}
          >
            {/* La barra de progreso del activo. Se reinicia con `key`. */}
            {n === i && corre ? (
              <span className="c-progreso" key={`${i}-${n}`} aria-hidden="true" />
            ) : null}
            <strong>{x.tab}</strong>
            <span>{x.nota}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
