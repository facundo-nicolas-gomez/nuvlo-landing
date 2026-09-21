---
description: Corre la cadena de verificación del CI, en orden, parando en el primer fallo
argument-hint: "[rapido]"
allowed-tools: Bash(npm run lint), Bash(npm run typecheck), Bash(npm run build), Bash(npm --prefix ../nuvlo-panel run verificar-precios), Bash(npm --prefix ../nuvlo-panel run verificar-sistema), Bash(git status), Bash(git status:*)
---

Corré la cadena de verificación de este repo. Argumento recibido: `$ARGUMENTS`

## Qué corre

**Si el argumento es `rapido`** — el loop de trabajo, sin build:

1. `npm run lint`
2. `npm run typecheck`

**Si no hay argumento** — los pasos 1–3 son el job `verificar` de
`.github/workflows/verificar.yml`, en su mismo orden (el `npm ci` del CI no se repite
acá). No hay paso de tests: el repo no tiene suite, por decisión (`CLAUDE.md`).

1. `npm run lint`
2. `npm run typecheck`
3. `npm run build`

Los pasos 4 y 5 **no son de este CI**: son el job `cruza-repos` del panel, que lee este
repo pero corre sólo cuando se pushea el panel. Un precio en prosa en un `.md` de acá o
un cambio en `sistema/nuvlo.css` rompe **el CI del otro repo**, y sin estos pasos no se
ve hasta el próximo push allá:

4. `npm --prefix ../nuvlo-panel run verificar-precios`
5. `npm --prefix ../nuvlo-panel run verificar-sistema`

Los dos necesitan `../nuvlo-panel` en el disco. Si no está, decilo y no los des por
buenos.

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
