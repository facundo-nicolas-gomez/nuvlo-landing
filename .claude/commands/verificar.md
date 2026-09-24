---
description: Corre la cadena de verificación del CI, en orden, parando en el primer fallo
argument-hint: "[rapido]"
allowed-tools: Bash(npm run lint), Bash(npm run typecheck), Bash(npm run verificar-tarjeta), Bash(npm run verificar-iconos), Bash(npm run build), Bash(npm --prefix ../nuvlo-panel run verificar-precios), Bash(npm --prefix ../nuvlo-panel run verificar-sistema), Bash(git status), Bash(git status:*)
---

Corré la cadena de verificación de este repo. Argumento recibido: `$ARGUMENTS`

## Qué corre

**Si el argumento es `rapido`** — el loop de trabajo, sin build. Los dos chequeos de
consistencia entran igual porque son instantáneos y son lo que más calladamente se
rompe:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run verificar-tarjeta`
4. `npm run verificar-iconos`

**Si no hay argumento** — los pasos 1–5 son el job `verificar` de
`.github/workflows/verificar.yml`, en su mismo orden (el `npm ci` del CI no se repite
acá). No hay paso de tests: el repo no tiene suite, por decisión (`CLAUDE.md`).

1. `npm run lint`
2. `npm run typecheck`
3. `npm run verificar-tarjeta`
4. `npm run verificar-iconos`
5. `npm run build`

Los pasos 6 y 7 **no son de este CI**: son el job `cruza-repos` del panel, que lee este
repo pero corre sólo cuando se pushea el panel. Un precio en prosa en un `.md` de acá o
un cambio en `sistema/nuvlo.css` rompe **el CI del otro repo**, y sin estos pasos no se
ve hasta el próximo push allá:

6. `npm --prefix ../nuvlo-panel run verificar-precios`
7. `npm --prefix ../nuvlo-panel run verificar-sistema`

Los dos necesitan `../nuvlo-panel` en el disco. Si no está, decilo y no los des por
buenos.

`verificar-iconos` también mira el otro repo, pero al revés: compara los tres íconos de
`app/` contra sus copias en `../nuvlo-panel/src/app/`, que tienen que ser el mismo
archivo. En el CI el panel no está en el disco y ese pedazo se saltea diciéndolo; no
queda descubierto igual, porque el panel corre su propio `verificar-iconos` en
`cruza-repos` y ése sí clona este repo. Correrlo local sigue sirviendo para verlo
**antes** de pushear, en vez de enterarte por el CI del otro repo.

## Reglas

- **Parar en el primer fallo.** No sigas al paso siguiente ni intentes arreglarlo por tu
  cuenta: mostrá la salida del paso que falló y esperá instrucciones.
- **No inventes el resultado.** Si un paso no se pudo correr, decilo explícitamente en
  vez de darlo por bueno.
- **No toques código.** Este comando verifica; no arregla.
- Al terminar, un resumen de una línea por paso con su resultado real.

## Por qué existe

El CI corre esta cadena en push a `main` y en PR, pero recién después de pushear, y
`publicar` sólo sale en verde. Correr lo mismo en local antes de commitear es lo que
hace que "pasa en local" deje de ser una promesa.
