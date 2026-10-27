# Instrucciones para desarrollo — Radar Deportivo

**Repositorio autorizado de continuidad:** `omarsantanar/Favoritos` (no `omarsantanar/radar-deportivo`).

Antes de cada ejecución leer `docs/MANUAL_OPERATIVO.md`, `docs/BITACORA.md`, `docs/DECISIONES.md` y `docs/FUENTES_Y_LICENCIAS.md`. Registrar cambios y comprobaciones en la bitácora antes de finalizar.

## Reglas no negociables
- Observatorio informativo, nunca casa de apuestas. No gestionar apuestas, depósitos ni saldos.
- Flujo: **mercado y líneas primero**, después análisis de resultados, lesiones, contexto y probabilidades.
- Cada análisis público: **máximo 300 caracteres Unicode e incluir sugerencia explícita** (`lib/editorial.mjs`).
- Solo fuentes gratuitas con derechos adecuados. No fabricar datos, cuotas, lesiones, tendencias, probabilidades ni resultados.
- Una línea requiere mercado, selección, cuota, casa, fuente y fecha/hora. Popularidad solo cuando existan datos verificables de boletos o dinero; nunca deducirla de la cuota.
- Los escenarios de demostración son **ficticios** y no son predicciones reales.
- Sin modelo calibrado no declarar valor estadístico como concluyente.

## Procedimiento
1. Crear entrada de objetivo en `docs/BITACORA.md` y rama de trabajo.
2. Implementar y documentar cambios; citar fuentes y contratos de datos.
3. Ejecutar `npm test`; si hay dependencias, `npm run typecheck` y `npm run build`.
4. Registrar pruebas, resultados reales y limitaciones.
5. Abrir pull request para revisión; no fusionar sin comprobar.

**Base al 26/10/2026:** v0.1.4, sitio prototipo con datos simulados. No hay ingestión externa operativa ni alojamiento. Publicación inicial en GitHub planificada en `omarsantanar/Favoritos`; verificar hash/CI antes de declararla finalizada.
