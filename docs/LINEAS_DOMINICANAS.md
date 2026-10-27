# Fuentes dominicanas y líneas deportivas diarias — Favoritos

**Fecha de verificación:** 27 de octubre de 2026. **Ámbito:** investigación de líneas, sin apuestas reales.

## Fuente regulatoria prioritaria

La [Dirección de Casinos y Juegos de Azar (DCJA)](https://www.casinos.gob.do/juegos-autorizados/juegos-de-azar-por-internet/) enumera siete operadores autorizados para juegos de azar por internet. Su listado **no es un ranking por ventas, tráfico ni volumen**. Hay cinco registros que señalan expresamente «Apuestas a los Deportes Profesionales». En **Betcris y SuperBets**, la tabla deja la modalidad sin especificar («–»); ambos publican oferta deportiva en sus portales comerciales, pero **no los clasificamos como modalidad deportiva expresamente comprobada por esa columna**.

| Operador / sociedad | Dominio identificado por DCJA | Modalidad deportiva explícita | Cuota actual capturada |
|---|---|---:|---|
| Juancito Sport / Juancito Sport SRL | juancitosport.com.do | Sí | No |
| Betcris RD / Betcris Banca de Apuesta SRL | betcris.do | Sin precisar en la tabla | No |
| Gogo Sport / Gogo Sport SRL | gogobanca.com | Sí | No |
| SuperBets / Game Technology International SRL | superbets.do | Sin precisar en la tabla | No |
| Orobet / Orobet SRL | orobet.do | Sí | No |
| VIP987 / Breeze Management Corp. | vip987.do | Sí | No |
| Appuesta / DRBets SRL | appuesta.do | Sí | No |

**Comprobaciones directas:**
- [Juancito Sport — Deportes](https://www.juancitosport.com.do/deportes/): inserta un iframe de cuotas en `deportes.juancitosport.com.do`. El iframe no entregó líneas legibles en la consulta.
- [Betcris — Deportes](https://www.betcris.do/deportes/): página de apuestas deportivas, pero no publicó cuotas de un evento verificable en el HTML consultado.
- [Gogo Banca](https://www.gogobanca.com/deportes.html): envía a `apuesta.gogobanca.com`, aplicación JavaScript que no entregó cuotas.
- [SuperBets](https://www.superbets.do/): se encontró oferta deportiva, no precios actuales verificables.
- [Orobet](https://orobet.do/en/sportsbook/search): sección de deportes en interfaz de tipo cliente; sin mercados específicos recuperables.
- VIP987: HTTP 403 en la consulta.
- Appuesta/DRBets: dominio no accesible desde la herramienta consultada.

Se consultaron sitios oficiales y el directorio regulatorio el 27 de octubre de 2026. **Ningún precio de los siete se ha verificado como cuota del día.** No se inventarán cuotas para completar la tabla.

## Precaución: otros operadores internacionales

La [lista oficial de dominios no autorizados](https://www.casinos.gob.do/juegos-autorizados/operadores-no-autorizados/) incluye, entre otros, `betsson.com`, `1xbet.com`, `bet365.com` y `starsport.do`. Esos nombres **no se incorporan como operadores locales autorizados**. La lista de marcas para comparar precios internacionales que existía en `config/casas-observacion.json` no acredita licencias dominicanas.

## Implementación

- Registro auditado: `config/dominican-operators.json`.
- Captura editorial actual: `data/dominican-daily-lines.json` (en este corte, vacía).
- Verificador con reglas de licencias y frescura: `lib/dominican-lines.mjs`.
- Importación **manual** revisada: `node scripts/import-domestic-lines.mjs /ruta/observaciones.json`.
- API de solo lectura: `GET /api/domestic-lines` (forzada dinámica, `Cache-Control: no-store`).
- Pantalla pública: subsección **Líneas diarias RD**, dentro de **Investigación de líneas**. Muestra disponibilidad por operadora, sin botones de apuesta, depósitos ni enlaces a sportsbook. La demostración estática solo enseña disponibilidad, no una cotización en vivo.

### Formato mínimo de un registro, sin proporcionar precios ficticios

Cada observación lleva estos campos:
`id`, `operator_id`, `sport`, `event`, `market`, `selection`, `decimal_odds`,
`observed_at_utc` (UTC ISO 8601), `starts_at_utc` (UTC ISO 8601),
`source_url` (HTTPS del dominio oficial), `reviewed_by` (revisor editorial)
y `evidence_note` (evidencia del precio visto). No publicar notas internas en API pública.

**Validaciones obligatorias:** operadora identificada en la DCJA, deporte y mercado admitidos, cuota decimal mayor de 1, precio observado en el día de Santo Domingo, máximo **120 minutos** desde la observación, fecha posterior a la consulta imposible, partido sin comenzar, coincidencia exacta del dominio registrado y nota/revisor de evidencia. Las líneas que no cumplan desaparecen automáticamente de la respuesta, aunque estén guardadas en el repositorio.

## Alcance real del sistema

**No se está realizando scraping automático** de siete casas: ningún proveedor ofreció una fuente gratuita y reutilizable de líneas confirmada durante esta revisión. Un sitio que se ve en navegador no equivale a una API con autorización para réplica. No eludir JS, inicio de sesión, robots, georrestricción ni anti-bots. Tampoco redirigir al usuario a apostar.

**El flujo completo exige primero ver una línea**, luego contrastar los datos deportivos, y por último generar una sugerencia de **máximo 300 caracteres** con evidencia. La API de líneas no crea probabilidades de modelo ni EV predictivo; la probabilidad implícita bruta es `1 / cuota_decimal`.

## Fuentes

- [DCJA: operadores de juegos por internet](https://www.casinos.gob.do/juegos-autorizados/juegos-de-azar-por-internet/)
- [DCJA: operadores no autorizados](https://www.casinos.gob.do/juegos-autorizados/operadores-no-autorizados/)
- [Juancito Sport / Deportes](https://www.juancitosport.com.do/deportes/)
- [Betcris Deportes](https://www.betcris.do/deportes/)
- [Gogo Deportes](https://www.gogobanca.com/deportes.html)
- [SuperBets](https://www.superbets.do/)
- [Orobet Sports](https://orobet.do/en/sportsbook/search)

**Estado del proyecto:** catálogo oficial integrado y mecanismo manual de cuotas implementado; sin cuotas reales, ingesta automatizada de apuestas, modelos locales calibrados ni despliegue web verificado. La validez de la licencia del operador y la reutilización de cuotas son asuntos distintos.
