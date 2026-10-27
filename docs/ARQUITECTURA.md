# Arquitectura técnica

## v0.1: estado implementado

Next.js App Router + React + TypeScript. Renderizado inicial por servidor y panel interactivo del cliente. `lib/scenarios.ts` es una lista de casos **ficticios**. `lib/probability.mjs` realiza únicamente cálculos descriptivos transparentes; no aprende ni predice.

`/api/research` expone un contrato de respuesta **sin eventos**. No ofrece escenarios falsos como datos reales. `/api/health` comunica que opera en modo demostración.

## Arquitectura objetivo

```text
Fuentes GRATUITAS con permisos ──> Conectores/validación ──> PostgreSQL (proveniencia)
Calendario y lesiones  ───┤                           │
Cuotas por mercado     ───┤                           ├──> Motor Python reproducible
Clima/MMA/boxeo       ───┘                           │             │
                                                      ├<── P(modelo), método, versión
                                                      │
                                      API pública de investigación/consulta
                                                 ┌────┴────┐
                                           Next.js web   Expo móvil
```

## Regla de fuentes

Solo candidatos gratuitos, con cuota y derechos explícitos registrados en `config/fuentes-gratuitas.json`. No conectar fuentes de pago ni sites de consulta pública mediante scrapers no autorizados. En el piloto NFL se priorizan nflverse + NWS; precios se consultan con el plan gratuito limitado de The Odds API. Otros deportes admiten investigación manual sin fingir integración automática.

## Entidades planeadas

- `sources`: responsables, licencias, endpoints y uso permitido.
- `events`: disciplina, liga, participantes, sede, hora programada y estado.
- `markets`: tipo de línea y sus resultados mutuamente excluyentes.
- `odds_snapshots`: casa, hora, precio y procedencia; no modificar datos históricos.
- `research_notes`: hechos, dudas y evidencias sobre plantilla, lesiones, meteorología y rendimiento.
- `predictions`: modelo, versión, probabilidad, mercado, cuota observada, publicación y calidad de evidencia.
- `official_results`: cierre oficial y sello de resolución para evaluación posterior.
- `market_popularity`: volumen/participación cuando exista proveedor idóneo, con definición de denominador.

`database/schema.sql` es la propuesta inicial; aún no está conectada a producción.

## Limitaciones y principios

- Publicar hora de origen en UTC y mostrar eventos en `America/Santo_Domingo`.
- Marcar cotizaciones obsoletas y evitar precachear cuotas como vigentes.
- No mostrar datos de titulares o bajas cuando sean «probables» como confirmados.
- No atribuir efecto al clima al juego en recintos cerrados.
- Evitar modelado basado en información posterior al instante del pronóstico.
- No publicar datos sin licencia apropiada.
- Futura app Expo reutiliza contratos y API, no scraping desde teléfonos.

## v0.2.0 · Importación avanzada de investigación

`scripts/ingest_advanced.py` genera JSON **no público** a partir de descargas licenciadas NFL/MLB, bajo ejecución manual con controles. No se conecta a Next.js ni a una base de datos y no calcula probabilidades o cuotas. Las otras disciplinas mantienen el estado bloqueado a espera de derechos/insumos verificables. Ver `docs/ESTADISTICAS_AVANZADAS.md`.
