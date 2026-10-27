# Hoja de ruta

## v0.1 · Portal inicial — preparado
- Identidad y diseño desktop/móvil.
- Interfaz pública: Observatorio, Investigación de líneas y Resultados. Bitácora y metodología detallada permanecen como documentación interna del equipo, fuera del sitio.
- Filtros interactivos y fichas ficticias inequívocamente identificadas.
- Endpoints que impiden confundir demo con datos reales.
- Manual operativo, bitácora, esquema y automatización de pruebas.

## v0.2 · Plataforma de datos — siguiente
- Repositorio propio y CI.
- Seleccionar **solo fuentes gratuitas** con derechos comprobados; primer piloto NFL con nflverse + clima NWS.
- Crear ingesta NFL para una liga piloto y revisar licencia de cada dataset nflverse.
- Modelo de procedencia, eventos y estados verificados.
- Panel administrativo para revisión de datos, sin publicar pronósticos todavía.

## v0.3 · Observatorio de mercados
- Capturar cuotas con el plan Starter gratuito de The Odds API, dentro del máximo de 500 créditos/mes; guardar hora y antigüedad del precio.
- Documentar líneas y cambios, con criterio de volatilidad y expiración.
- Mostrar popularidad **solo si existe medición gratuita y legítimamente citada de volumen/participación**. Sin medición, mostrar «No verificable».

## v0.4 · Motor estadístico y evaluación
- Implementar modelos ejecutados, supuestos y validación fuera de muestra.
- Publicar pronósticos con registro original, incertidumbre y fuente.
- Medir calibración, cobertura y desempeño, incluyendo selecciones descartadas.

## v0.5 · Lanzamiento informativo
- Políticas editoriales, privacidad, licencias, accesibilidad, SEO, seguridad y supervisión.
- Auditoría de integridad del historial.

## v1.0 · Aplicación móvil (fase posterior)
- Contratos comunes con Expo + React Native.
- Guardados, eventos seguidos y avisos informativos sin incentivos a apuestas impulsivas.
