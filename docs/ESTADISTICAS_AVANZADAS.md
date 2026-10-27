# Extracción avanzada gratuita · alcance y ejecución (27-10-2026)

## Regla general

Se habilita un **motor de descargas licenciadas e importaciones controladas**, no scraping indiscriminado de HTML. Esto puede cumplir el objetivo estadístico sin infringir políticas de sitios ni confundir consulta pública con permiso de reproducción. Los conectores son **internos, manuales y no conectados al dashboard ni a `/api/research`**. La fecha de descarga es distinta de la vigencia del partido. Solo el equipo editorial puede contrastar y aprobar datos para un modelo futuro; ningún JSON aquí es pronóstico.

## Matriz por disciplina

| Deporte | Portal de estadística avanzada | Situación | Motivo |
|---|---|---|---|
| NFL | [nflverse](https://github.com/nflverse/nflverse-data) | **Implementado, importación manual** | Releases CSV.GZ de jugadas, principalmente CC BY 4.0, atribución obligatoria. Se excluye explícitamente FTN (CC BY-SA). |
| MLB | [SABR Lahman](https://sabr.org/lahman-database/) / [mirror de datos CSV](https://github.com/cbwinslow/lahman-database-csv) | **Implementado, importación manual** | Histórico bajo CC BY-SA 3.0. Usa espejo público de versión 2025; confirmar versión y procedencia con SABR. No son Statcast ni datos diarios de 2026. |
| NBA | [hoopR NBA Data](https://github.com/sportsdataverse/hoopR-nba-data) | **Bloqueado** | El repositorio ofrece CC BY 4.0, pero los registros pueden derivarse de proveedores con restricciones: se necesita evaluar derechos de origen antes de integrarlos. NBA Stats [prohíbe descargas](https://www.nba.com/stats/help/faq). |
| NHL | [MoneyPuck](https://moneypuck.com/data.htm) | **Bloqueado** | Fuente gratuita para uso no comercial y periodistas de forma puntual; no se puede asumir permiso de importación automática periódica a una plataforma. |
| MMA | [UFC Data histórico](https://github.com/nlbair/ufc-data) | **Bloqueado** | Dataset atribuido CC BY 4.0 pero fuentes originales (UFCStats, etc.) exigen análisis adicional de términos y atribuciones antes de republicar/scrapear. |
| Boxeo | [Open Boxing](https://www.openboxing.org/data/) | **Bloqueado** | CSV y API abiertos para consulta, pero licencia aplicable/permiso de automatización sin confirmar; no es un feed completo de métricas de combate. |

**Prohibidos como scraping automático:** NBA.com Stats, Basketball-Reference sin autorización, BoxRec, UFC.com, UFCStats, NHL EDGE y webs de casas. No cambiar esto por la existencia de scripts de terceros ni por una página que permita lectura gratuita.

## Código implementado

- `scripts/ingest_advanced.py`: dos conectores con URL fija y hosts limitados, tope de 30 MB por descarga, máximo 450,000 filas, sin reintentos agresivos ni secretos.
- `config/advanced-stats-sources.json`: registro por deporte con licencia y estado real.
- `.github/workflows/advanced-stats.yml`: ejecución **manual** (`workflow_dispatch`) por fuente y temporada, produce un artefacto JSON agregado con retención de 14 días (no publica en la aplicación).
- `.github/workflows/advanced-stats-smoke.yml`: comprobación por PR de las descargas de NFL (2026) y MLB (2025); puede fallar por disponibilidad de fuentes, señal para revisar.
- `tests/test_ingest_advanced.py`: batería de pruebas sintéticas sin red; `.github/workflows/ci.yml` la ejecuta.
- `research/stats/` ignorado por Git: archivos agregados nunca se comprometen de forma accidental.

### Ejecución CLI sin red (para desarrollar)

```bash
python3 -m unittest discover -s tests -p 'test_ingest_*.py' -v
```

### Ejecución real autorizada bajo demanda

```bash
python3 scripts/ingest_advanced.py --source nflverse_pbp --season 2026 --out research/stats
python3 scripts/ingest_advanced.py --source lahman_batting --season 2025 --out research/stats
```

También puede ejecutarse desde [GitHub Actions → Importación manual](https://github.com/omarsantanar/Favoritos/actions/workflows/advanced-stats.yml), eligiendo la fuente y temporada. **No hay ejecución programada por horas ni acceso directo desde el público**. Desactivar el uso de la fuente si cambia su licencia o estructura.

### Campos de las salidas

- Identificador y temporada; URL de archivo licenciado.
- Licencia y atribución obligatoria; hash SHA-256 de la carga exacta recibida.
- Fecha real de acceso, distinta del campo `source_data_updated_at_utc` (desconocido => `null`).
- NFL: EPA ofensivo por jugada, EPA pase/carrera por equipo durante temporada regular.
- MLB: OBP, SLG y OPS por equipo y año histórico, limitados a AL/NL.
- `published_prediction=false`, `market_data=null`, `model_probability=null`; **NO APTO PARA PUBLICACIÓN DIRECTA**.

## Limitaciones matemáticas

El EPA ofensivo no se ajusta por calidad de los rivales y no supone probabilidad de ganar. OPS, OBP y SLG no son FIP ni métricas actuales de Statcast. Faltan alineaciones, lesiones, descansos y todos los mercados de cuotas. El análisis de valor solo procede después de observar una línea documentada, un modelo calibrado y una revisión editorial. Las sugerencias públicas mantienen un máximo de 300 caracteres.

## Evidencia de licencias y restricciones

- nflverse datos y alcance: https://github.com/nflverse/nflverse-data · https://github.com/nflverse
- SABR/Lahman: https://sabr.org/lahman-database/ · https://github.com/cbwinslow/lahman-database-csv
- NBA: https://www.nba.com/stats/help/faq · https://github.com/sportsdataverse/hoopR-nba-data/blob/main/LICENSE.md
- NHL: https://www.moneypuck.com/data.htm
- MMA: https://github.com/nlbair/ufc-data · https://www.ufc.com/news/terms-use
- Boxeo: https://www.openboxing.org/data/

**Nota operativa:** una licencia declarada por un repositorio secundario no garantiza derechos de fuentes originales de terceros. Por eso permanecen cuatro disciplinas bloqueadas para automatización, aunque figuren en el catálogo.
