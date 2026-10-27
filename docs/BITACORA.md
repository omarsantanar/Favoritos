## 2026-10-27 · Comprobación y cierre de corrección de interfaz pública

- **Corrección incorporada:** [PR #2](https://github.com/omarsantanar/Favoritos/pull/2) fusionado en `main`, commit `a5b8750b49b5df89760453e75c3225f2998fe169`.
- **CI del PR:** [40494963279](https://github.com/omarsantanar/Favoritos/actions/runs/40494963279) **success**: instalación, todas las pruebas, `typecheck` y `build`. Incluye cuatro pruebas nuevas de no exposición de páginas internas.
- **Verificación de código remoto:** `components/dashboard.tsx` solo incluye tres entradas públicas: Observatorio, Investigación de líneas y Resultados; no contiene los componentes de metodología o bitácora.
- **Intento de desplegar Pages:** [40495059878](https://github.com/omarsantanar/Favoritos/actions/runs/40495059878) prepara correctamente el artefacto, pero falla al configurar GitHub Pages (sitio todavía no habilitado). **No confirmar URL nueva ni actualización de un sitio alojado por terceros**.
- **CI de rama principal tras merge:** estado observado `completed`, resultado `success` a la consulta.
- **Exposición residual:** repositorio `Favoritos` es **público**; docs y código siguen visibles desde GitHub aun cuando el portal no los muestra. Para confidencialidad real, se necesita cambiar permisos/ubicación de la documentación interna.
- **Estado siguiente:** activar Pages en ajustes del repositorio o desplegar por Vercel vinculado y verificar el sitio servido; mantener datos ficticios identificados como tales.


## 2026-10-27 · v0.1.5 · Contenido interno separado del portal público

- **Motivo:** el usuario advirtió que la navegación pública exponía «Metodología» y «Bitácora» del proceso de desarrollo.
- **Cambios realizados:** Next.js y demos eliminan completamente vistas, paneles, botones y contenidos internos. Menú público: **Observatorio, Investigación de líneas y Resultados**. Historial de pronósticos permanece vacío hasta existir datos verificables.
- **Presentación:** ocultados identificadores de versión internos en sidebar/cabecera; permanece aviso de demostración y cifras ficticias.
- **Archivos:** `components/dashboard.tsx`, `preview/index.html`, `preview/demo.js`, `preview/standalone.html`, `tests/public-interface.test.mjs`, `docs/DECISIONES.md`, `docs/HOJA_DE_RUTA.md`, `README.md` y esta bitácora.
- **Separación:** documentación detallada sigue en GitHub para continuidad, no se sirve en el sitio por navegación o endpoints. **Advertencia:** el repositorio es público, y los archivos `docs/` siguen accesibles en GitHub. Para confidencialidad real, convertir repositorio en privado o separar documentación sensible en uno privado; ocultar menú no constituye control de acceso.
- **Pruebas:** nueva batería de pruebas de navegación y ausencia de contenido interno; revisar CI de PR (npm test, typecheck, build) antes de fusionar.
- **Estado de despliegue:** publicación depende de GitHub Pages habilitado o de Vercel. No afirmar sitio actualizado hasta verificar despliegue.

## 2026-10-27 · Ejecución de publicación Pages y resultado comprobado

- **Repositorio oficial:** `omarsantanar/Favoritos`.
- **Cambio aprobado:** PR [#1](https://github.com/omarsantanar/Favoritos/pull/1) fusionado en `main`, commit `09fb292e2d8f9e0dfebefca12cda75c2c859bb22`.
- **CI de PR:** [40493132972](https://github.com/omarsantanar/Favoritos/actions/runs/40493132972) **success**: npm install, tests, typecheck y build.
- **Preparación de sitio en rama principal:** [40493239211](https://github.com/omarsantanar/Favoritos/actions/runs/40493239211): trabajo `preparar` **success**; HTML autocontenido empaquetado y artefacto subido.
- **Bloqueo externo verificado:** trabajo `desplegar` **failure** en `actions/configure-pages@v5`: `Get Pages site failed`, HTTP 404 porque GitHub Pages aún no está habilitado. El paso `deploy-pages` quedó omitido. **No existe URL pública confirmada**.
- **Acción administrativa pendiente:** en https://github.com/omarsantanar/Favoritos/settings/pages, seleccionar Source → **GitHub Actions**; después volver a ejecutar [el workflow de publicación](https://github.com/omarsantanar/Favoritos/actions/workflows/pages.yml).
- **Restricción mantenida:** únicamente escenarios ficticios; sin líneas reales, sin APIs externas, sin transacciones de apuestas y sin servicios de pago.
- **Estado:** código y empaquetado ejecutables; publicación pública **bloqueada por configuración inicial de Pages**. Una vez habilitado, verificar URL y actualizar este registro.


## 2026-10-27 · v0.1.4 · Preparación de ejecución web (demostración GitHub Pages)

- **Objetivo:** hacer accesible una demostración interactiva de Favoritos sin requerir pago ni exponer escenarios como pronósticos reales.
- **Estado de partida comprobado:** repositorio `omarsantanar/Favoritos`, rama `main`, commit `24d93d16962d3e20707f29c103effb51e2412e02`, CI de dos ejecuciones anteriores completado satisfactoriamente. Ningún servicio de datos ni sitio web desplegado estaba verificado.
- **Decisión:** implementar `.github/workflows/pages.yml`, que publica únicamente el `preview/standalone.html` autocontenido y ficticio. No sustituye la app Next.js ni activa APIs reales.
- **Archivos:** nuevo workflow de Pages, `docs/DESPLIEGUE.md`; actualizar `README.md` y esta bitácora.
- **Verificación:** ejecutar CI de pull request y flujo de publicación una vez activada la opción Pages. Verificar URL pública y registrar resultado; **no declarar sitio activo antes**.
- **Limitación externa:** habilitación inicial de GitHub Pages en Settings → Pages → GitHub Actions requiere acceso de configuración no disponible mediante el conector.
- **Próximo hito:** comprobar que Pages esté activo, después conectar datos gratuitos autorizados en la app Next.js.


## 2026-10-26 · Verificación de publicación GitHub en Favoritos

**Resultado confirmado:** primera publicación de Radar Deportivo v0.1.4 en `https://github.com/omarsantanar/Favoritos`, rama `main`, con 43 archivos de código, pruebas y documentación. Commit de importación: `80fa2d2df789aa21b03c39d71adcd0aa8ec7b465`.

**Auditoría remota:** árbol GitHub verificado sin truncamiento, con `AGENTS.md`, `docs/BITACORA.md`, `components/dashboard.tsx` y `.github/workflows/ci.yml`. CI del commit de importación: **success**, ejecución [40433997282](https://github.com/omarsantanar/Favoritos/actions/runs/40433997282). Ello acredita las comprobaciones ejecutadas por el flujo; no equivale a despliegue web ni a alimentación de datos reales.

**Siguiente etapa:** configurar dominio/despliegue cuando sea solicitado y conectar fuentes gratuitas legítimas con validación editorial. Conservar línea de mercado como punto de partida y comentarios de máximo 300 caracteres.

## 2026-10-26 · v0.1.4 · Vinculación inicial con `omarsantanar/Favoritos`

**Solicitud:** publicar el desarrollo actual en GitHub. El usuario precisó que `Favoritos` es el repositorio correcto.

**Estado remoto antes de la operación:** cuenta `omarsantanar`, repositorio público `Favoritos`, rama predeterminada `main`, tamaño 0 y sin historial de archivos (API de contenidos: «This repository is empty»). Acceso de escritura confirmado.

**Cambios para portabilidad:** se corrigen `README.md`, `AGENTS.md` y `docs/GITHUB_PUBLICACION.md` para reconocer a `omarsantanar/Favoritos` como repositorio oficial; se conserva el código funcional v0.1.4, fuente gratuita, mercado primero y máximo 300 caracteres. No modificar repositorios ajenos.

**Pruebas de este paquete:** `npm test` antes de la publicación. Tipo y compilación pendientes hasta instalación de dependencias y ejecución de CI remoto.

**Publicación:** primer commit de importación en rama `main` del repositorio vacío, sin force push. Verificar hash y CI posteriormente.

**Limitaciones:** portal prototipo con demostraciones ficticias; sin ingestión, cuotas en vivo, modelo entrenado, despliegue ni app móvil.

# Bitácora de continuidad — Radar Deportivo

## Estado vigente

- **Fecha de apertura:** 26 de octubre de 2026
- **Producto:** observatorio estadístico e investigación de mercados deportivos.
- **Última versión del portal:** `v0.1.0` — prototipo con datos sintéticos; **política de datos:** `v0.1.2` (solo fuentes gratuitas); **laboratorio de investigación:** `v0.1.3` (NBA 2026-10-26, no publicable); **formato editorial:** `v0.1.4` (mercado primero y máximo 300 caracteres).
- **Publicación de datos reales:** no habilitada.
- **Integración GitHub remoto:** acceso comprobado a `omarsantanar`, pero `radar-deportivo` devuelve 404 (26 de octubre de 2026). Publicación pendiente; no modificar otros proyectos.
- **Principio:** plataforma informativa; nunca permite realizar apuestas ni mover dinero.

## 2026-10-26 · Intento de actualización remota (v0.1.4, bloqueo de acceso)

**Solicitud:** publicar/actualizar el desarrollo en el repositorio GitHub conectado.

**Verificación vía GitHub:** cuenta autenticada `omarsantanar`; listado accesible de seis repositorios: `Mapas-clase-multimedia`, `buzzlab-next`, `nodbbuzz`, `PruebaBuzz`, `Arcade`, `Favoritos`. No aparece Radar Deportivo. Consulta directa a `omarsantanar/radar-deportivo`: HTTP 404 (`NOT_FOUND`). Búsqueda de repositorios Radar Deportivo en el ámbito accesible: sin resultados.

**Resultado:** publicación remota **BLOQUEADA**. No hay commit, push, rama ni PR; ningún otro repositorio fue modificado. El conector disponible no expone creación de repositorios.

**Acción de desbloqueo:** crear `omarsantanar/radar-deportivo` en https://github.com/new si aún no existe; si ya existe como privado, conceder acceso al conector GitHub en la configuración de instalación para que aparezca en la lista. Después publicar el paquete v0.1.4 desde esta conexión, verificar archivos y registrar URL/hash/CI en esta bitácora.

**Integridad del paquete:** se conserva el código funcional v0.1.4 sin cambios. Se añade la evidencia de bloqueo y se actualiza la guía de publicación. Se ejecutó `npm test` nuevamente en este turno con **16/16 pruebas aprobadas**. No se ejecutó compilación completa de Next.js ni se verificó CI remoto.

## 2026-10-26 · Entrega para GitHub (base v0.1.4)

**Propósito:** preparar la transferencia de todos los desarrollos al repositorio independiente sin modificar otros proyectos.

**Comprobación real:** conexión GitHub autenticada como `omarsantanar`. Aparecen seis repositorios pertenecientes a otros proyectos. `omarsantanar/radar-deportivo` devuelve 404. El conector no tiene operación de creación de repositorios; por tanto, **no se ha publicado código ni creado commits remotos**.

**Cambios locales:** incorporados `AGENTS.md` y `docs/GITHUB_PUBLICACION.md`; actualizados encabezado del README y bitácora; excluido artefacto temporal `tsconfig.tsbuildinfo` del paquete. Sin cambio en lógica de pronósticos ni en el portal.

**Pruebas:** `npm test` ejecutado: **16/16 aprobadas**. Compilación y typecheck pendientes por falta de dependencias. No hay datos deportivos reales ni despliegue.

**Siguiente paso:** crear repositorio vacío `omarsantanar/radar-deportivo` (sugerido privado) en https://github.com/new, publicar estos archivos desde la conexión GitHub y registrar URL, hash y pruebas de CI.

## 2026-10-26 · v0.1.4 · Mercado primero y análisis de 300 caracteres

**Solicitud:** invertir el orden de investigación: explorar las líneas y las apuestas en tendencia antes de estudiar estadísticas. Reducir cada análisis publicado a un máximo de 300 caracteres, con sugerencia incluida.

**Archivos:** `lib/editorial.mjs`, `config/demo-briefs.json`, `lib/models.ts`, `lib/scenarios.ts`, `components/dashboard.tsx`, `preview/demo.js`, `preview/index.html`, `preview/standalone.html`, `app/globals.css`, `packages/shared/src/contracts.ts`, `tests/editorial.test.mjs`, `docs/METODOLOGIA.md`, `docs/DECISIONES.md`, `docs/MANUAL_OPERATIVO.md`, `README.md`, esta bitácora y ZIP actualizado.

**Decisiones:** (1) capturar selección, mercado, casa, cuota, fecha y fuente antes de cualquier diagnóstico; (2) comprobar estadísticas, lesiones y contexto solo para líneas relevantes; (3) prioridad de popularidad solo cuando se verifican boletos o dinero, nunca inferida de la cuota; (4) el análisis público contiene máximo 300 caracteres Unicode, incluida la sugerencia; (5) se permite «Sugerencia: sin selección respaldada»; (6) se retienen datos ampliados únicamente como soporte de auditoría.

**Alcance real:** solo modifica flujo editorial, validador y casos ficticios del prototipo. No crea una API de cuotas, no genera pronósticos reales, no autentica popularidad ni modifica GitHub.

**Pruebas:** `npm test`: **16/16 aprobadas**, incluidas cinco comprobaciones nuevas del límite editorial, la sugerencia y los campos mínimos de mercado. `node --check preview/demo.js`: aprobado. Transpilación sintáctica de cuatro archivos TS/TSX modificados: aprobada. `npm run typecheck`: no concluyó por dependencias de React/Next.js ausentes; compilación Next.js no ejecutada. Demostración HTML regenerada sin fuentes reales.

**Siguiente hito:** conectar un feed gratuito de líneas con procedencia comprobable y publicar únicamente textos validados al conectar fuentes y modelo suficientes.

## 2026-10-26 · v0.1.3 · Primera prueba de jornada NBA real

**Objetivo:** revisar los nueve encuentros del 26 de octubre con fuentes públicas gratuitas, computar probabilidades implícitas y EV hipotético sin atribuir a Radar Deportivo modelos ajenos.

**Cambios locales:** `docs/PRUEBA_NBA_2026-10-26.md`, `research/nba/2026-10-26-snapshot.json`, `scripts/evaluate-nba-snapshot.mjs`, `tests/nba-snapshot.test.mjs` y esta bitácora. No se cambió el portal ni se importó contenido a la base de datos.

**Decisiones editoriales:** (1) los porcentajes numberFire son externos; (2) líneas FanDuel documentadas por DunkAPI en captura 13:05 ET; (3) reportes oficiales de NBA corte 12:45 ET; (4) descartar diferencias extremas a favor de CHA y MIL como alertas de modelo, no oportunidades; (5) no fabricar datos de popularidad: VSiN no ofreció splits gratuitos para la jornada; (6) no publicar pronósticos propios sin un modelo calibrado y revisión de bajas; (7) el laboratorio concluye «SIN APUESTA RECOMENDABLE» pese a identificar favoritos probables.

**Verificaciones:** cálculos puros sobre snapshot local, test de nueve partidos únicos, moneyline, EV y detección de anomalías. **11/11 pruebas aprobadas** con `npm test`. No hay integración remota ni API nueva. Los enlaces son para revisión puntual, sin derechos de republicación masiva certificados.

**Limitaciones:** muestra actual de 2-3 juegos, ausencia de roster definitivo en varios equipos, modelo externo sin método/fecha de cálculo comprobables, cortes de mercado no equivalentes a cuotas ejecutables y falta de medición pública de popularidad. No se han hecho simulaciones ni un modelo propio.

**Siguiente hito:** desarrollar una rutina de pronósticos propia con datos libres y licencia adecuada, variables de disponibilidad, versión exacta de entradas, evaluación fuera de muestra y checklist de publicación; luego integrar feed autorizado en el portal.

## 2026-10-26 · v0.1.2 · Fuentes exclusivamente gratuitas

**Solicitud y objetivo:** eliminar del plan los proveedores y licencias de pago y adaptar la arquitectura a disponibilidad y límites reales de fuentes gratuitas.

**Archivos modificados:** `docs/FUENTES_Y_LICENCIAS.md` (reestructurado); `config/fuentes-gratuitas.json` (registro validable de fuentes y permisos); `docs/DECISIONES.md`, `docs/HOJA_DE_RUTA.md`, `docs/MANUAL_OPERATIVO.md`, `docs/ARQUITECTURA.md`, `README.md`, `.env.example`, `tests/free-sources.test.mjs` y esta bitácora.

**Decisiones:** (1) costo obligatorio 0 USD en todas las fuentes, sin compras ni trials; (2) candidatos a integración: nflverse, SABR/Lahman, NWS y Starter de The Odds API con 500 créditos/mes; (3) el resto solo investigación manual salvo autorización gratuita expresa; (4) nunca afirmar popularidad nacional sin tickets/handle verificables; (5) piloto recomendado NFL antes de NBA porque nflverse permite un flujo de datos licenciado y reproducible; (6) no construir scrapers que contravengan condiciones de las webs.

**Fuentes comprobadas:** nflverse (CC BY por conjunto), SABR Lahman (CC BY-SA 3.0), NWS (libre para cualquier uso), The Odds API Starter (500 créditos gratis, sin históricos), restricciones NBA Stats y MoneyPuck, límites de páginas públicas de MMA/boxeo/hípica/splits. Fecha de consulta documental: 2026-10-26.

**Verificación local:** `npm test` ejecutado: **7/7 pruebas aprobadas**, incluidas dos comprobaciones automatizadas del registro de fuentes; esquema JSON comprobado, todas las fuentes con costo cero. No se ejecutó ingestión externa.

**Pendiente:** configurar credencial gratuita para The Odds API si se autoriza; primer conector nflverse y API NWS; revisión de licencias por dataset y despliegue GitHub. **Ningún conector fue creado ni está operativo.**

## 2026-10-26 · v0.1.1 · Política de fuentes y licencias

**Objetivo:** decidir cuáles fuentes oficiales, analíticas, meteorológicas y de mercado sustentan la plataforma sin inventar cobertura.

**Cambios:** actualizado `docs/FUENTES_Y_LICENCIAS.md` con inventario por siete disciplinas; candidatos de APIs; fuentes de lesiones; separación de cuotas y popularidad; licencias y reglas de trazabilidad. Se revisaron documentos públicos de NBA, NFL, MLB, NHL, UFC, Equibase, NWS, The Odds API, SportsDataIO, VSiN y Action Network.

**Decisiones:** (1) priorizar NBA y luego NFL como piloto; (2) para cuotas evaluar The Odds API, sin contratar todavía; (3) popularidad se expresa como porcentaje de tickets y/o dinero con fuente, alcance y timestamp, no deducida de cambios de cuota; (4) fuentes estadísticas con consulta pública no implican permiso para extracción masiva; (5) ninguna nueva integración se declara operativa.

**Verificación:** documentación editada localmente; sin conexión nueva a APIs, sin compra de licencias, sin cambios de código o base de datos. Prototipo v0.1.0 permanece igual.

**Pendientes:** cotización y licencia comercial, prueba de feed NBA, versionado de lesiones/cuotas, prueba de pronósticos sin filtraciones temporales y confirmación de permisos de proveedores de splits y hípica.

## 2026-10-26 · v0.1.0 · Fundación y primer portal

**Objetivo:** iniciar el desarrollo con un portal web ejecutable y una estructura profesional preparada para GitHub y una aplicación móvil posterior.

**Cambios implementados:**

- Sitio Next.js/TypeScript con identidad «Radar Deportivo», panel de observatorio, navegación por NBA/NFL/MLB/NHL/MMA/boxeo/hípica, filtros por disciplina, búsqueda y ordenación.
- Vista de investigación de líneas y fichas individuales; separan `P(modelo)`, `P(mercado)` y `EV`.
- Modo de simulación con eventos, precios y probabilidades *deliberadamente ficticios*. Estado real vacío cuando se desactiva.
- Vistas de metodología, historial auditado aún vacío y bitácora de continuidad.
- Endpoints iniciales `GET /api/health` y `GET /api/research`, sin datos reales fabricados.
- Módulo de cálculos matemáticos, incluida normalización proporcional de probabilidades sin margen, pruebas automatizadas e integración continua.
- Documentación de arquitectura, decisiones, fuentes, metodología, hoja de ruta y operación; esquema SQL propuesto no ejecutado.

**Decisiones:**

1. Nunca casa de apuestas. No apuestas, saldos, pasarelas ni enlaces de ejecución.
2. No afirmar «tendencia popular» sin indicador de volumen/participación verificable.
3. No atribuir porcentajes ficticios a un modelo estadístico real.
4. No publicar un resultado ni evaluarlo retrospectivamente si no existe registro original sellado.
5. Construir web primero y reutilizar un API independiente para la futura app móvil.

**Pruebas y revisión:** ver sección de cierre al final de esta entrada (se actualiza tras ejecutar comandos y revisión visual).

**Limitaciones:** ausencia de licencias de datos, conectores, base de datos desplegada, modelos predictivos reales, autenticación y portal publicado. Es un prototipo tecnológico, no servicio de pronósticos activo.

**Siguiente hito:** configurar un repositorio independiente y CI; definir proveedor(es) de calendario, estadísticas, cuotas y clima; diseñar esquema de procedencia y fuentes con importación limitada a una disciplina piloto.

### Cierre de calidad 2026-10-26

- Pruebas automatizadas: **5/5 aprobadas** (`npm test`).
- Chequeo TypeScript: **no ejecutado**; las dependencias de React/Next.js no pudieron instalarse por falta de acceso del entorno a npm (`EAI_AGAIN`).
- Compilación de producción: **no ejecutada** por la misma restricción de red al instalar paquetes.
- Revisión visual de escritorio/móvil: **no completada**; Chromium bloquea navegación de pruebas en este entorno (`ERR_BLOCKED_BY_ADMINISTRATOR`). Se entrega previsualización estática funcional para inspección manual.
- Remote GitHub: **NO CONFIGURADO**. El conector accede a `omarsantanar`, pero no hay un repositorio específico creado para Radar Deportivo. No se modificaron repositorios existentes.
- Comprobación sintáctica del JavaScript de previsualización: **aprobada** (`node --check preview/demo.js`).
- Comprobación sintáctica de TypeScript/TSX (8 archivos): **aprobada** mediante transpilación local; no sustituye a `npm run typecheck`.
- Inspección estructural de HTML de demostración: **aprobada** (32 identificadores únicos y secciones esenciales presentes).
- Modo estático de demostración: **implementado** en `preview/` y como archivo HTML autocontenido.
