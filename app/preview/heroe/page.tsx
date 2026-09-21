"use client";

import { useState } from "react";
import Link from "next/link";
import "./heroe.css";
import { Reporte } from "@/components/iris/Reporte";
import { Navegador } from "@/components/iris/Navegador";
import { Telefono } from "@/components/iris/Telefono";
import { Aprobacion } from "@/components/iris/Aprobacion";
import { Boton } from "@/components/iris/Piezas";
import { Capas } from "./Capas";
import { Carrusel } from "./Carrusel";

/**
 * TRES HÉROES, PARA ELEGIR (18/09/2026).
 *
 * El dueño pidió «diseños diferentes» después de seis vueltas sobre la misma
 * composición. Estas tres no son variantes de un layout: son tres respuestas
 * distintas a «qué es el héroe de esta página».
 *
 *   1. El documento es la página     — el entregable, sin marco que lo cite.
 *   2. Como lo abre el cliente       — el momento en que el informe llega.
 *   3. El gesto                      — lo único que ninguna otra herramienta
 *                                      puede mostrar: que no sale sin vos.
 *
 * El titular y la bajada son los de la home, literales, para que lo que se
 * compare sea la composición y no el texto. Los datos salen de
 * `lib/reporte-muestra.ts` como en todos lados: ficticios y consistentes.
 */

const TITULAR = (
  <h1 className="i-portada">
    <span className="i-portada-frase">El reporte de tu cliente, hecho.</span>{" "}
    <span className="i-portada-frase">Sale cuando vos decís.</span>
  </h1>
);

const ROTULO = (
  <p className="i-rotulo i-portada-rotulo">
    Reportes de Meta Ads para quien atiende clientes
  </p>
);

function Barra() {
  return (
    <div className="p-barra">
      <span className="p-rotulo">
        Tres héroes · material de comparación, no la página
      </span>
      <a href="#uno">1 · El documento</a>
      <a href="#dos">2 · El cliente</a>
      <a href="#tres">3 · El gesto</a>
      <a href="#cuatro">4 · El escenario</a>
      <a href="#cinco">5 · Tres capas</a>
      <a href="#seis">6 · Carrusel</a>
      <Link href="/">Volver a la home</Link>

    </div>
  );
}

function Ficha({ n, titulo, tesis }: { n: string; titulo: string; tesis: string }) {
  return (
    <div className="p-ficha">
      <h2>
        {n} · {titulo}
      </h2>
      <p>{tesis}</p>
    </div>
  );
}

export default function TresHeroes() {
  const [aprobado, setAprobado] = useState(false);

  return (
    <div className="iris">
      <Barra />

      {/* ── 1 ──────────────────────────────────────────────────────────── */}
      <section id="uno" data-var="1">
        <Ficha
          n="1"
          titulo="El documento es la página"
          tesis="Se va el marco de navegador. Lo que se vende es el entregable, así que el entregable ocupa el héroe en vez de una ilustración de la ventana que lo contiene. La URL pública baja a una línea debajo del CTA, que es donde se puede leer."
        />
        <div className="p-heroe">
          <div className="p-fila">
            <div>
              {ROTULO}
              {TITULAR}
              <p className="i-bajada i-portada-bajada">
                No es un tablero al que tu cliente entra: es el informe escrito
                que le llega, firmado por vos y aprobado por vos.
              </p>
              <div className="i-accion">
                <Boton>Empezar gratis</Boton>
              </div>
              <p className="p-url i-cifra">
                Tu cliente lo abre en panel.nuvloapp.com/r/8f2c41a9e37b0d5c
              </p>
            </div>
            <div className="p-papel">
              <Reporte />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 ──────────────────────────────────────────────────────────── */}
      <section id="dos" data-var="2">
        <Ficha
          n="2"
          titulo="Como lo abre el cliente"
          tesis="El héroe no muestra la herramienta: muestra el momento en que el informe llega. Es literal la promesa del titular, y es la única dirección donde aparece la persona del otro lado."
        />
        <div className="p-heroe">
          <div className="p-fila">
            <div>
              {ROTULO}
              {TITULAR}
              <p className="i-bajada i-portada-bajada">
                Le llega a su mail, con tu nombre arriba. Vos decidís cuándo.
              </p>
              <div className="i-accion">
                <Boton>Empezar gratis</Boton>
                <p className="i-chico">
                  <span className="i-cifra">3</span> reportes gratis, sin
                  tarjeta.
                </p>
              </div>
            </div>
            <div className="p-telefono">
              <Telefono />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 ──────────────────────────────────────────────────────────── */}
      <section id="tres" data-var="3">
        <Ficha
          n="3"
          titulo="El gesto"
          tesis="Lo único que ninguna otra herramienta puede mostrar es que nada sale sin que una persona lo apruebe. El informe pasa al fondo —legible, porque juzgarlo es el argumento— y la aprobación es el objeto. Apretá el botón y mirá la barra de direcciones."
        />
        <div className="p-heroe">
          {ROTULO}
          {TITULAR}
          <div className="p-escena">
            <div className="p-detras">
              <Navegador aprobado={aprobado}>
                <Reporte />
              </Navegador>
            </div>
            <div className="p-gesto">
              <Aprobacion
                className="i-aprobacion-columna"
                aprobado={aprobado}
                onAprobar={() => setAprobado(true)}
                onVolver={() => setAprobado(false)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 ──────────────────────────────────────────────────────────── */}
      <section id="cuatro" data-var="4">
        <Ficha
          n="4"
          titulo="El escenario (Superhuman)"
          tesis="Medido en su página: el body es blanco y el héroe es un bloque acotado con fondo oscuro, argumento a la izquierda y producto a la derecha sangrando por abajo. El héroe es un objeto sobre la página, no la página. Acá el escenario es la noche que el sistema ya tiene, y adentro va el documento de la 1: blanco sobre noche es el máximo escalón de valor que existe."
        />
        <div className="p-heroe">
          <div className="p-escenario i-noche">
            <div className="p-fila">
              <div>
                {ROTULO}
                {TITULAR}
                <p className="i-bajada i-portada-bajada">
                  No es un tablero al que tu cliente entra: es el informe escrito
                  que le llega, firmado por vos y aprobado por vos.
                </p>
                <div className="i-accion">
                  <Boton hoja>Empezar gratis</Boton>
                </div>
                <p className="p-url i-cifra">
                  Tu cliente lo abre en panel.nuvloapp.com/r/8f2c41a9e37b0d5c
                </p>
              </div>
              {/* `i-hoja-clara`: el documento es blanco adentro de una superficie de
                  noche, y sin esto las reglas de tinta de `.i-noche` se le filtran
                  —el rótulo «Resumen ejecutivo» quedaba en hueso sobre blanco, o
                  sea invisible—. El sistema ya tiene la salida. */}
              <div className="p-papel i-hoja-clara">
                {/* El resplandor que sostiene la ventana: dos flores de luz
                    detrás del objeto, como el campo desenfocado sobre el que
                    Superhuman apoya su captura. Va detrás y no toca nada. */}
                <div className="p-resplandor" aria-hidden="true" />
                {/* Vuelve el marco de navegador (dueño, 19/09/2026): sin él el
                    informe no era coherente con el resto de la página, donde
                    siempre se muestra adentro de la ventana. */}
                <div className="p-ventana">
                  <Navegador aprobado={aprobado}>
                    <Reporte />
                  </Navegador>
                </div>
                {/* La pieza que flota encima, que es el segundo plano de la
                    escena: Superhuman pisa su documento con el panel de «Docs
                    AI». Acá la que pisa es la aprobación, que además es lo
                    único de la página que se toca. */}
                <div className="p-flota">
                  <Aprobacion
                    className="i-aprobacion-columna"
                    aprobado={aprobado}
                    onAprobar={() => setAprobado(true)}
                    onVolver={() => setAprobado(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5 ──────────────────────────────────────────────────────────── */}
      <section id="cinco" data-var="5">
        <Ficha
          n="5"
          titulo="Tres capas (brief del dueño)"
          tesis="Boceto de composición: mesh gradient saturado y desenfocado atrás; el tablero de Meta Ads lavado y recortado en el medio, sangrando por la derecha y por abajo; y una card nítida con sombra grande que ROMPE el canto de la ventana y se sale hacia el gradiente. La jerarquía sale del contraste entre capas, no del tamaño."
        />
        <div className="p-heroe">
          <div className="p-escenario">
            <div className="p-fila">
              <div>
                {ROTULO}
                {TITULAR}
                <div className="c-acciones">
                  <Boton hoja>Empezar gratis</Boton>
                  <a className="c-secundario" href="#precios">
                    Ver precios →
                  </a>
                </div>
              </div>
              <Capas />
            </div>
            {/* Las pestañas de features, pegadas al borde de abajo. */}
            <div className="c-tabs" aria-hidden="true">
              <div className="c-tab" data-activo>
                <strong>Conectás</strong>
                <span>Tu cuenta de Meta, una vez</span>
              </div>
              <div className="c-tab">
                <strong>Nuvlo calcula</strong>
                <span>Los números, antes de que la IA escriba</span>
              </div>
              <div className="c-tab">
                <strong>Aprobás vos</strong>
                <span>Nada sale sin que lo decidas</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── 6 ──────────────────────────────────────────────────────────── */}
      <section id="seis" data-var="6">
        <Ficha
          n="6"
          titulo="El carrusel · tres slides con motion"
          tesis="Los tres pasos del producto, uno por slide, 7s cada uno. Cambian el titular bitono, el CTA, el elemento de IA y la paleta del gradiente; la fórmula de tres capas no cambia. El tab activo lleva su barra de progreso y se puede tocar para saltar. Con movimiento reducido no avanza solo."
        />
        <div className="p-heroe">
          <div className="p-escenario">
            <Carrusel />
          </div>
        </div>
      </section>

    </div>
  );
}
