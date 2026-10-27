# Manual operativo y continuidad

**Versión 1.0 · 26 de octubre de 2026**

Este archivo es el punto de entrada de cualquier sesión de desarrollo —humana o asistida por IA— de Radar Deportivo.

## 1. Al iniciar cada ejecución

1. Leer `README.md`, `docs/BITACORA.md`, `docs/ARQUITECTURA.md` y `docs/DECISIONES.md`.
2. Revisar código y estado real del repositorio. No deducir que una tarea fue completada por una intención anterior.
3. Delimitar cambios a la solicitud y comprobar que no afecten la independencia editorial.
4. Si se requieren datos deportivos, consultar únicamente fuentes gratuitas, verificando derechos para el modo de uso, origen y horario UTC.

## 2. Regla no negociable

**Nunca operar apuestas.** No recibir ni gestionar dinero, depósitos, retiros, cupones ni transacciones de juego. No incluir botones «Apostar», integraciones de checkout de casas ni mecanismos de ejecución de apuestas. Las líneas deportivas se investigan como datos públicos o licenciados.

Queda prohibida toda fuente de pago, suscripción o prueba temporal. Comprobar `config/fuentes-gratuitas.json` antes de crear conectores. La plataforma puede identificar líneas populares solo con métricas confiables del proveedor; sin ellas debe indicar «popularidad no verificada». Un pronóstico nunca se calificará de garantizado.

## 3. Flujo editorial obligatorio

**Partir del mercado:** captar líneas y tendencias gratuitas verificables; registrar proveedor, casa, fecha y precio. Solo después comprobar estadísticas, participantes, lesiones y clima. No confundir cuota movida con popularidad.

**Salida pública:** una lectura por mercado de **300 caracteres como máximo**, incluida la frase «Sugerencia: ...». Una selección sin evidencia suficiente se descarta. Validar con `validateEditorialBrief` y mantener documentación más amplia exclusivamente para auditoría.

## 4. Política de datos

Estados válidos: `ficticio`, `no_verificado`, `verificado`, `retirado`. No mezclar escenarios de demostración con feed real, ni dejar que entren al historial de aciertos. Guardar fuente, evento, mercado, cuota, consulta y hora del modelo. Registrar incertidumbre y sesgo de selección.

Una noticia sobre lesión no prueba baja confirmada. Una cuota movida no prueba dinero público. Un EV positivo depende de un P(modelo) legítimo y de la vigencia del precio.

## 5. Rutina de desarrollo

- Actualizar esquemas, tipos y documentación de cambios simultáneamente.
- Mantener protección ante valores numéricos imposibles.
- Ejecutar `npm test`, `npm run typecheck` y `npm run build`.
- Probar navegación, filtros y modal en viewport móvil y desktop; revisar consola.
- Registrar entrada con fecha, qué cambió, pruebas, pendientes y riesgos en `docs/BITACORA.md`.

## 6. Condición de publicación

No activar datos reales hasta tener conectores gratuitos y autorizados, validadores de fuente, histórico no reescribible, investigación trazable, política de correcciones y revisión editorial. Sin datos confiables, mostrar «Sin selección respaldada» en lugar de pronosticar.

## 7. Formato de registro

```text
### AAAA-MM-DD · Versión X.Y · Resumen
- Objetivo:
- Archivos modificados:
- Decisiones:
- Pruebas efectuadas y resultado:
- Limitaciones:
- Siguiente hito:
```

## 8. Importaciones avanzadas

Consultar `config/advanced-stats-sources.json` antes de activar cualquier extracción. Solo `nflverse_pbp` y `lahman_batting` están codificados para descarga con fuentes/licencias registradas; ejecución exclusivamente manual. Los otros cuatro deportes tienen veto de ingesta hasta revisión documental de derechos. No abrir endpoints genéricos de scraping ni usar cookies/proxies para superar bloqueos. No publicar agregados sin auditar su procedencia y contrastar mercados. Ver `docs/ESTADISTICAS_AVANZADAS.md`.

## 9. Bancas dominicanas y líneas diarias

Consultar `config/dominican-operators.json` y el directorio oficial DCJA. El estado regulatorio es independiente de la licencia para reutilizar cuotas. Capturar líneas exclusivamente cuando se vean realmente y sea legítimo registrarlas; `scripts/import-domestic-lines.mjs` valida evidencia, fuente HTTPS, fecha RD y edad máxima de dos horas antes de guardarlas. API `/api/domestic-lines` nunca crea pronósticos ni publica contenido de revisión interna. Ver `docs/LINEAS_DOMINICANAS.md`.
