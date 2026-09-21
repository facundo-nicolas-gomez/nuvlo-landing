"use client";

import { useState } from "react";
import { ATAJOS_PERIODO_MUESTRA, HOY_MUESTRA } from "@/lib/reporte-muestra";

/**
 * EL PERÍODO — el calendario del diálogo «Generar reporte».
 *
 * ── DE DÓNDE VIENE ──────────────────────────────────────────────────────────
 * Nació como el «Range Select Calendar» (shadcnspace) que el dueño marcó en
 * 21st.dev, suelto al lado de la ficha. Desde el 13/09/2026 es la pieza de
 * adentro del diálogo real del panel (`Generar.tsx`), que usa el «Calendar» de
 * originui con una columna de atajos a la izquierda.
 *
 * ── Y AHORA SE TOCA (dueño, 18/09/2026) ─────────────────────────────────────
 * Era un dibujo: la crítica había contado **45 afordancias dibujadas y 0
 * funcionales**, y ese costo estaba escrito acá mismo —el visitante intenta
 * tocar una, no pasa nada, y aprende que los dibujos de esta página son fotos
 * 340px antes de que la máquina le pida el único click de verdad que hay—.
 * Se resolvió quitando afordancias (el segundo mes, la cruz, los botones del
 * pie). Ahora se resuelve al revés, que es la salida buena: **las que quedan
 * funcionan**.
 *
 * Se tocan los seis atajos, las dos flechas del mes y los días. Elegir un día
 * abre un rango nuevo; el siguiente click lo cierra, y si cae antes del
 * arranque se convierte en el arranque. Los días posteriores a `HOY_MUESTRA`
 * siguen apagados, porque el panel no deja elegir un período que no terminó
 * (`disabled: after hoy`), y ahora además están `disabled` de verdad.
 *
 * ── Y POR ESO DEJA DE SER UN DIBUJO ─────────────────────────────────────────
 * Se le fue el `aria-hidden`. Un control que se toca se anuncia: cada día es un
 * `<button>` con su fecha completa en el nombre accesible y `aria-pressed` si
 * está en el rango; los atajos dicen cuál está elegido. Antes el rango se leía
 * sólo en la ayuda del diálogo; ahora la ayuda **sigue estando y sigue siendo
 * la que manda**, porque dice en palabras lo que la grilla dice con forma.
 *
 * ── EL MES SE CALCULA, NO SE ESCRIBE ────────────────────────────────────────
 * Las grillas salen de fechas en UTC, así el render del servidor y el del
 * cliente coinciden. Semana de lunes a domingo, como en el país núcleo.
 */

const DIAS = ["lu", "ma", "mi", "ju", "vi", "sá", "do"];
const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export function utc(iso: string) {
  const [a, m, d] = iso.split("-").map(Number);
  return Date.UTC(a, m - 1, d);
}

const HOY = utc(HOY_MUESTRA);
const DIA = 86400000;

/** Los seis atajos del panel, resueltos contra el día de la escena. Son los
 *  mismos nombres y el mismo orden que `ATAJOS_PERIODO_MUESTRA`; acá se les
 *  agrega qué rango deja cada uno, que es lo que antes no hacían. */
function rangoDeAtajo(nombre: string): { desde: number; hasta: number } {
  const hoy = new Date(HOY);
  const a = hoy.getUTCFullYear();
  const m = hoy.getUTCMonth();
  switch (nombre) {
    case "Mes pasado":
      return { desde: Date.UTC(a, m - 1, 1), hasta: Date.UTC(a, m, 0) };
    case "Últimos 7 días":
      return { desde: HOY - 6 * DIA, hasta: HOY };
    case "Últimos 14 días":
      return { desde: HOY - 13 * DIA, hasta: HOY };
    case "Últimos 30 días":
      return { desde: HOY - 29 * DIA, hasta: HOY };
    case "Este mes":
      return { desde: Date.UTC(a, m, 1), hasta: HOY };
    default:
      return { desde: HOY, hasta: HOY };
  }
}

function Flecha({ derecha }: { derecha?: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d={derecha ? "M4.5 2.5 8 6l-3.5 3.5" : "M7.5 2.5 4 6l3.5 3.5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const LARGO = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export type Rango = { desde: number; hasta: number };

export function Periodo({
  rango,
  alElegir,
}: {
  rango: Rango;
  alElegir: (r: Rango) => void;
}) {
  const inicio = new Date(rango.desde);
  const [vista, setVista] = useState({
    anio: inicio.getUTCFullYear(),
    mes: inicio.getUTCMonth(),
  });
  // Mientras se está eligiendo: hay arranque y falta el cierre.
  const [abierto, setAbierto] = useState<number | null>(null);
  /* El día que el puntero está tocando. Sólo importa con un rango abierto, y
     ahí es lo que deja ver el tramo antes de cerrarlo. */
  const [sobre, setSobre] = useState<number | null>(null);
  const [atajo, setAtajo] = useState<string | null>("Mes pasado");

  const hoyVista = new Date(HOY);
  const enElFuturo =
    vista.anio > hoyVista.getUTCFullYear() ||
    (vista.anio === hoyVista.getUTCFullYear() && vista.mes >= hoyVista.getUTCMonth());

  const mover = (paso: number) =>
    setVista((v) => {
      const d = new Date(Date.UTC(v.anio, v.mes + paso, 1));
      return { anio: d.getUTCFullYear(), mes: d.getUTCMonth() };
    });

  const tocarAtajo = (nombre: string) => {
    const r = rangoDeAtajo(nombre);
    setAtajo(nombre);
    setAbierto(null);
    alElegir(r);
    const d = new Date(r.desde);
    setVista({ anio: d.getUTCFullYear(), mes: d.getUTCMonth() });
  };

  const tocarDia = (ts: number) => {
    setAtajo(null);
    setSobre(null);
    if (abierto === null) {
      // Arranca un rango nuevo: hasta que no se cierre, es un solo día.
      setAbierto(ts);
      alElegir({ desde: ts, hasta: ts });
      return;
    }
    setAbierto(null);
    alElegir(ts < abierto ? { desde: ts, hasta: abierto } : { desde: abierto, hasta: ts });
  };

  /* ── EL TRAMO SIGUE AL PUNTERO (19/09/2026) ────────────────────────────────
     Entre el primer click y el segundo no pasaba nada: el calendario mostraba
     un solo día elegido y el visitante tenía que adivinar qué iba a quedar. Es
     lo que hace el `react-day-picker` del panel de fábrica, y era lo único que
     le faltaba a esta pieza para comportarse como el control de verdad.

     El rango que se DIBUJA no es el elegido sino éste: con un arranque abierto
     y el puntero sobre un día, es el tramo que quedaría al soltar. Así toda la
     lógica de estados de abajo —dentro, extremo, los cantos de la semana— sirve
     igual para el tramo tentativo, sin una segunda familia de estados que
     mantener en paralelo. */
  const dibujado =
    abierto !== null && sobre !== null
      ? { desde: Math.min(abierto, sobre), hasta: Math.max(abierto, sobre) }
      : rango;

  const { anio, mes } = vista;
  const diasDelMes = new Date(Date.UTC(anio, mes + 1, 0)).getUTCDate();
  const corrimiento = (new Date(Date.UTC(anio, mes, 1)).getUTCDay() + 6) % 7;
  const celdas = Math.ceil((corrimiento + diasDelMes) / 7) * 7;
  const dias: { ts: number; fuera: boolean }[] = [];
  for (let i = 0; i < celdas; i++) {
    const ts = Date.UTC(anio, mes, 1 - corrimiento + i);
    dias.push({ ts, fuera: new Date(ts).getUTCMonth() !== mes });
  }

  return (
    <div className="i-periodo" role="group" aria-label="Período del reporte">
      <div className="i-periodo-atajos">
        {ATAJOS_PERIODO_MUESTRA.map((a) => (
          <button
            key={a}
            type="button"
            className="i-periodo-atajo"
            data-activo={a === atajo ? "" : undefined}
            aria-pressed={a === atajo}
            onClick={() => tocarAtajo(a)}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="i-periodo-meses">
        <div className="i-periodo-calendario">
          <div className="i-periodo-cabeza">
            <button
              type="button"
              className="i-periodo-flecha i-periodo-flecha-izq"
              onClick={() => mover(-1)}
              aria-label="Mes anterior"
            >
              <Flecha />
            </button>
            <span className="i-periodo-mes" aria-live="polite">
              {MESES[mes]} <span className="i-cifra">{anio}</span>
            </span>
            {/* El panel no deja elegir un período que no terminó, así que no hay
                nada que ver más adelante del mes de hoy. */}
            <button
              type="button"
              className="i-periodo-flecha i-periodo-flecha-der"
              onClick={() => mover(1)}
              disabled={enElFuturo}
              aria-label="Mes siguiente"
            >
              <Flecha derecha />
            </button>
          </div>

          <div className="i-periodo-semana" aria-hidden="true">
            {DIAS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          {/* Soltar el puntero fuera de la grilla cancela la previsualización:
              si no, el tramo se quedaría dibujado contra el último día tocado,
              que ya no dice nada. */}
          <div
            className="i-periodo-dias i-cifra"
            onMouseLeave={() => setSobre(null)}
          >
            {dias.map(({ ts, fuera }) => {
              const dentro = !fuera && ts >= dibujado.desde && ts <= dibujado.hasta;
              const extremo =
                !fuera && (ts === dibujado.desde || ts === dibujado.hasta);
              const futuro = ts > HOY;
              const estado = fuera
                ? "fuera"
                : extremo
                  ? "extremo"
                  : dentro
                    ? "dentro"
                    : futuro
                      ? "apagado"
                      : "normal";
              const diaSemana = new Date(ts).getUTCDay();
              const bordeIzq = dentro && (ts === dibujado.desde || diaSemana === 1);
              const bordeDer = dentro && (ts === dibujado.hasta || diaSemana === 0);
              return (
                <button
                  key={ts}
                  type="button"
                  className="i-periodo-dia"
                  data-estado={estado}
                  data-izq={bordeIzq ? "" : undefined}
                  data-der={bordeDer ? "" : undefined}
                  disabled={futuro || fuera}
                  aria-pressed={dentro}
                  aria-label={LARGO.format(new Date(ts))}
                  onClick={() => tocarDia(ts)}
                  onMouseEnter={() => setSobre(ts)}
                  onFocus={() => setSobre(ts)}
                >
                  <span aria-hidden="true">{new Date(ts).getUTCDate()}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
