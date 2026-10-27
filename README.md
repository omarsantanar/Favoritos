# Radar Deportivo · motor de datos v0.2.0 (interfaz v0.1.6)

**Observatorio de investigación deportiva, líneas de mercado y probabilidades.**

> **Regla constitutiva:** Radar Deportivo **no es y no será una casa de apuestas**. No acepta depósitos, no ofrece boletos, no administra saldos, no procesa transacciones de apuestas y no enlaza a formularios para apostar. Investiga qué líneas existen y cuáles son populares **solo cuando ese dato está documentado**; formula lecturas estadísticas verificables, no resultados garantizados.

## Flujo de publicación v0.1.4: mercado primero

La búsqueda arranca **en las líneas disponibles y las tendencias verificadas**, no en una lista de favoritos deportivos. Se registra el mercado, cuota, casa, fecha y fuente; luego se contrastan estadísticas, lesiones y contexto. Cada evaluación visible se reduce a **300 caracteres como máximo, incluyendo una sugerencia explícita**; puede ser «sin selección respaldada». No se inventa popularidad ni se venden resultados ganadores.

La validación reutilizable se encuentra en `lib/editorial.mjs`; `config/demo-briefs.json` contiene seis demostraciones inequívocamente ficticias. Esta versión no publica líneas reales ni dispone de feed automático.

## Política permanente de fuentes

**Costo de datos: 0 USD/mes.** Se prohíben suscripciones, pruebas con vencimiento y servicios premium. Se utilizan exclusivamente descargas abiertas, APIs gratuitas (respetando límites y condiciones) y consulta editorial a fuentes públicas, sin scraping no autorizado. `config/fuentes-gratuitas.json` registra cada candidata y sus derechos; `docs/FUENTES_Y_LICENCIAS.md` detalla la política vigente.

El piloto técnico recomendado pasa a **NFL (nflverse + NWS)**; The Odds API Starter proporciona un cupo mensual gratuito para líneas. NBA, NHL, MMA, boxeo exigirán investigación manual o datasets gratuitos expresamente permitidos. La cobertura y la popularidad no se inventarán para llenar vacíos.

## Estado actual

Versión **0.1 — prototipo navegable**. Incluye navegación por NBA, NFL, MLB, NHL, MMA, boxeo; filtros, ordenación, búsqueda, fichas detalladas, vista de líneas, resultados públicos vacíos, API de investigación con respuesta vacía y pruebas para cálculos de probabilidad implícita y valor esperado.

**NO HAY DATOS DEPORTIVOS REALES.** Los equipos, contendientes, probabilidades y cuotas de las tarjetas de demostración son ficticios y aparecen rotulados como tales. Al desactivar «Demostración», el portal muestra correctamente que las fuentes aún no están conectadas. Ninguna tarjeta constituye un pronóstico real o una oportunidad de mercado comprobada.

## Previsualización sin instalar dependencias

La carpeta `preview/` contiene una **versión de demostración independiente** (HTML/CSS/JavaScript), que no requiere instalar paquetes. Para visualizarla, abre `preview/index.html` directamente o ejecuta:

```bash
python3 -m http.server 8000
```

Y abre http://localhost:8000/preview/index.html. También se distribuye un HTML autocontenido fuera de la carpeta de código. La maqueta HTML es una demostración del mismo diseño; la implementación principal y ampliable está en Next.js.

## Requisitos y ejecución

Node.js 20.9+ (recomendado 22) y npm.

```bash
npm install
npm run dev
```

Abrir http://localhost:3000. Para verificar el proyecto:

```bash
npm test
npm run typecheck
npm run build
npm start
```

Se puede desplegar con Vercel o con infraestructura Node compatible con Next.js. No hacen falta llaves API para la v0.1. En fases siguientes solo se admitirán claves de planes gratuitos. No publicar llaves en Git ni con el prefijo `NEXT_PUBLIC_`.

## Secciones y archivos

```text
app/                 Next.js App Router y rutas API
components/          Interfaz interactiva del portal
lib/                 Tipos, escenarios 100 % ficticios y cálculos verificables
packages/shared/     Contrato común para futura aplicación móvil
services/            Diseño de motor de investigación y modelos en Python
database/            Esquema PostgreSQL inicial (no desplegado)
tests/               Pruebas automatizadas
.github/workflows/    Integración continua
docs/                Manual, bitácora, decisiones, metodología y hoja de ruta
```

## API

- `GET /api/health`: estado de la versión de demostración.
- `GET /api/research`: **siempre devuelve listas vacías en v0.1**, porque todavía no hay fuentes verificadas conectadas. Los escenarios ficticios permanecen únicamente en el cliente.

## Cómo continúa el desarrollo

1. Leer `docs/MANUAL_OPERATIVO.md` y `docs/BITACORA.md` antes de cambiar código.
2. Crear rama de trabajo y documentar objetivo, archivos y verificaciones.
3. Ejecutar pruebas, compilación y revisión visual desktop/móvil.
4. Registrar resultados y limitaciones en la bitácora **antes de cerrar**.
5. Nunca rellenar vacíos con alineaciones, tendencias o cuotas inventadas.

## Repositorio oficial de continuidad

**GitHub:** `https://github.com/omarsantanar/Favoritos` (rama `main`). El nombre del repositorio es **Favoritos**, aunque el producto se llama **Radar Deportivo**. No cambiar el destino a `radar-deportivo` en futuras sesiones.

Para dar continuidad: leer `AGENTS.md`, `docs/MANUAL_OPERATIVO.md` y `docs/BITACORA.md`, revisar el estado remoto y trabajar preferiblemente en rama con PR. Registrar archivos, pruebas, limitaciones y commits en la bitácora.

## Alcance y límites

- **La popularidad** de las líneas requiere datos de participación o volumen con fuente y metodología. No se infiere de un movimiento de cuota.
- **P(modelo)** solo se mostrará en producción tras ejecutar y documentar un modelo reproducible.
- **P(mercado)** inicial es `1 / cuota decimal`; para probabilidades netas de margen hace falta el mercado completo.
- **EV** es `P(modelo) × cuota decimal − 1` por unidad y **no garantiza** rentabilidad.
- Usar únicamente proveedores gratuitos con derechos adecuados, atribución y restricciones verificadas antes de mostrar datos reales públicamente.

Uso informativo y recreativo para adultos, conforme a la normativa pertinente.


## Ejecución pública del prototipo

Para publicar **gratuitamente la demostración interactiva, sin datos reales**, se incluye el workflow `.github/workflows/pages.yml`. El administrador debe habilitar **Settings → Pages → GitHub Actions** y ejecutar el workflow en `main`. Instrucciones y limitaciones: [docs/DESPLIEGUE.md](docs/DESPLIEGUE.md).

Para publicar la aplicación Next.js completa con sus endpoints se recomienda importar este repositorio en Vercel, que requiere autorizar el acceso de la plataforma de hosting al repositorio. **Ni GitHub Actions ni un build exitoso prueban por sí solos que exista una URL de producción accesible.**

## Sitios oficiales y líneas de mercado

Favoritos cubre **NBA, NFL, MLB, NHL, MMA y boxeo**. La hípica fue eliminada del código y catálogos activos en v0.1.6.

Consulta [el directorio editorial](docs/DIRECTORIO_DE_FUENTES.md), `config/portales-oficiales.json` y `config/casas-observacion.json`. Son fuentes para **consulta manual** sin conexión automática, licencia de scraping ni promociones de apuestas. Los análisis públicos conservan el límite de 300 caracteres con sugerencia.

## Ingesta avanzada de investigación (v0.2)

La ingesta **manual y restringida** de datos con licencia se implementa para NFL (nflverse EPA por jugada) y MLB (SABR/Lahman histórico OBP/SLG/OPS). No es scraping de HTML, ni está habilitada la ingesta de NBA/NHL/MMA/boxeo sin revisar derechos. El JSON resultante es solo de investigación: no modifica el portal ni entrega pronósticos.

Ejecutar `python3 -m unittest discover -s tests -p 'test_ingest_*.py' -v`. Para descargar conjuntos permitidos: `python3 scripts/ingest_advanced.py --source nflverse_pbp --season 2026` o `--source lahman_batting --season 2025`. También disponible en GitHub Actions mediante `workflow_dispatch`. Consultar [la guía de estadísticas avanzadas](docs/ESTADISTICAS_AVANZADAS.md) y [el registro de permisos](config/advanced-stats-sources.json).
