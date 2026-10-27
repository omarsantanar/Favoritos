# Política de fuentes gratuitas — Radar Deportivo

**Versión 0.1.2 · revisión: 26 de octubre de 2026.**

## Mandato operativo

La plataforma utiliza **exclusivamente fuentes de costo cero**, sin pruebas gratuitas que expiren, contratos de datos, suscripciones premium ni upgrades de pago. Una web de consulta gratuita no concede necesariamente derechos de extracción, redistribución o uso comercial. Tampoco significa datos completos o actualizaciones instantáneas. **No se eluden límites técnicos, registros, robots, derechos de autor o condiciones del proveedor.**

Radar Deportivo **no recibe ni ejecuta apuestas**, no administra dinero ni ofrece garantías de acierto. Sus análisis, probabilidades y comparativas de mercado son informativos. Cuando faltan datos se declara ausencia: nunca se inventa un porcentaje de público, una cuota o una probabilidad.

El inventario con estados de integración es `config/fuentes-gratuitas.json`. Los estados `candidate_*` no implican integración ya implementada.

## Capa A. Descargas y APIs gratuitas candidatas a integración

| Fuente | Uso prioritario | Acceso y límite | Condición de reutilización / cautela |
|---|---|---|---|
| [nflverse](https://github.com/nflverse/nflverse-data) | NFL: jugadas, históricos, rósters, estadísticas y EPA calculable | Descargas gratuitas | Mayoría de datasets CC BY 4.0; FTN CC BY-SA 4.0. Revisar licencia individual y dar atribución a nflverse y proveedor original. |
| [SABR/Lahman](https://sabr.org/lahman-database/) | MLB: históricos para modelos básicos | CSV/SQL gratis; actualización típicamente anual | CC BY-SA 3.0, atribución y compartir derivados en términos aplicables; verificar contenido de terceros. No reemplaza lineups ni estadísticas de hoy. |
| [NWS API](https://www.weather.gov/documentation/services-web-api) | Clima horario en estadios y pistas de EE. UU. | Gratis, sin cuota contractual; rate limits razonables | Datos públicos; atribuir claramente y no sugerir aval de NOAA/NWS. Pista de hípica se confirma con reporte del hipódromo. |
| [The Odds API — Starter](https://the-odds-api.com/) | Cuotas de mercado y observación de variaciones | **500 créditos/mes gratis**, sin históricos gratuitos; cobertura de deportes/mercados sujeta a disponibilidad | Términos [31 agosto 2026](https://the-odds-api.com/terms-and-conditions.html): se permite mostrar cuotas y usar en modelos, no revender/replicar un feed bruto. Cache y presupuesto de créditos estrictos. **No confundir con `theoddsapi.com`**, proveedor distinto. |

Para un MVP fiable, **NFL + nflverse + NWS** es el mejor piloto totalmente reproducible; las cuotas se añaden con The Odds API gratis y cadencia limitada. MLB históricos pueden estudiarse en paralelo. No afirmar cobertura universal diaria por utilizar un API gratuito.

## Capa B. Sitios gratuitos para investigación editorial, no para ingesta automática

| Deporte | Fuentes para consulta pública | Restricción o límite crítico |
|---|---|---|
| NBA | [NBA Stats](https://www.nba.com/stats), [lesiones oficiales](https://official.nba.com/) | [FAQ](https://www.nba.com/stats/help/faq) prohíbe descargas; [términos NBA](https://www.nba.com/termsofuse) restringen usos, incluidas conexiones con actividad de apuestas y productos con bases extensivas. Consulta editorial; **no crear un scraper ni una base NBA replicada**. |
| NFL | [NFL Injuries](https://www.nfl.com/injuries/), [Next Gen Stats](https://nextgenstats.nfl.com/) | Contrastar informes oficiales, sin asumir licencia para ingestión y reproducción automática. Históricos integrables preferiblemente de nflverse con licencia por dataset. |
| MLB | [Baseball Savant](https://baseballsavant.mlb.com/), [MLB](https://www.mlb.com/) | Consulta y contraste de abridores/Statcast; no asumir permiso para feed o republicación masiva. |
| NHL | [NHL EDGE](https://www.nhl.com/edge), [MoneyPuck](https://moneypuck.com/data.htm) | MoneyPuck permite datos gratis para uso no comercial y periodistas *ad hoc* con crédito; **no reutilizar como feed automático del portal comercial sin permiso**. |
| MMA | [UFCStats](http://ufcstats.com/), [UFC eventos](https://www.ufc.com/events) | Estadísticas para comprobación puntual; automatización y republicación sujetas a derechos. [UFC Terms](https://www.ufc.com/news/terms-use) prohíbe ciertos accesos automáticos a UFC.com. |
| Boxeo | [BoxRec](https://boxrec.com/), webs de comisiones y carteleras públicas | Acceso visible condicionado por cuentas/página; no usar módulos de pago ni scraping no autorizado. |
| Hípica | [Equibase](https://www.equibase.com/), hipódromos y autoridades de carrera | Solo entradas, resultados y scratches gratuitamente visibles; no asumir distribución libre ni feed público. |

**NBA, NHL, MMA, boxeo e hípica** no disponen todavía en el proyecto de una fuente integral gratuita con permiso comprobado para alimentar automáticamente todos los campos del análisis. El portal debe priorizar revisión manual y dejar los campos no disponibles en blanco.

## Capa C. Popularidad de líneas

- Consultar páginas públicamente visibles de [VSiN](https://vsin.com/betting-splits/) o [Action Network](https://www.actionnetwork.com/public-betting) **solo para investigación editorial**, sin automatizar captura y sin pagar por sus apartados premium.
- Los splits completos de VSiN pueden ser un servicio Pro. Una cifra atribuida a una casa y una muestra no representa todo Estados Unidos.
- Mostrar **«Popularidad del mercado no verificable»** sin `tickets_pct` o `handle_pct` documentados, con fuente, casa, hora y alcance. Nunca inferir popularidad de un desplazamiento en las cuotas.
- Si solo hay visitas o clics en Radar Deportivo, identificarlos como **popularidad dentro del portal**, nunca como apuestas realizadas o volumen de mercado.

## Prioridad de implementación gratuita

1. `nflverse` histórico/estaciones con licencia y atribución, más NWS horarios, en un piloto NFL.
2. The Odds API Starter: consultar presupuesto de créditos, realizar caché, almacenar `bookmaker`, `market`, `odds`, `observed_at` y no prometer precios siempre actuales. Si excede 500 créditos/mes, detener actualización en vez de cobrar o usar otra API sin verificar.
3. SABR Lahman para modelado histórico MLB; reunir datos actuales mediante investigación de consulta pública y verificación independiente.
4. NBA, NHL, MMA, boxeo e hípica con fichas de investigación manual hasta disponer de datasets gratuitos legítimamente utilizables.
5. Popularidad de mercado solo cuando haya datos públicos verificables que puedan citarse legítimamente; de lo contrario, declarar indisponible.

## Controles de desarrollo

- Todo conector deberá existir en `config/fuentes-gratuitas.json`, declarar costo cero, modo de acceso, derechos y actualización. No incorporar servicios de pago ni activar reintentos que excedan cuotas.
- Implementar pausas/caché/versionado y registrar fecha/hora UTC, fuente primaria, fecha del evento, cobertura, omisiones y correcciones.
- Sin acuerdos o derechos comprobados, no automatizar ni republicar fuentes de consulta pública.
- Con datos insuficientes, `P(modelo)=no_calculable`, `EV=no_calculable` y, si corresponde, **SIN APUESTA RECOMENDABLE** (referencia estadística; nunca invitación a apostar).
- Las cuotas de la API tampoco equivalen a porcentaje de boletos o dinero; no confundir líneas, predicción y popularidad.

## Referencias verificadas en esta revisión

- nflverse: https://github.com/nflverse ; datos y licencias https://github.com/nflverse/nflverse-data
- SABR/Lahman: https://sabr.org/lahman-database/ ; licencia incluida en `readme2025.txt`, CC BY-SA 3.0.
- NWS: https://www.weather.gov/documentation/services-web-api ; https://www.weather.gov/disclaimer
- The Odds API: https://the-odds-api.com/ ; https://the-odds-api.com/terms-and-conditions.html
- NBA: https://www.nba.com/stats/help/faq ; https://www.nba.com/termsofuse
- MoneyPuck: https://moneypuck.com/data.htm
- UFC: https://www.ufc.com/news/terms-use
- VSiN: https://vsin.com/sports/ ; https://vsin.com/betting-splits/

**Estado de ejecución:** fuentes investigadas/documentadas; ninguna API ni importación nueva conectada, ningún pronóstico real producido. La versión 0.1 continúa siendo una demostración con datos ficticios.
