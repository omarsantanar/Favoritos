# Puesta en marcha y despliegue de Favoritos

**Producto:** Radar Deportivo v0.1.4 · repositorio oficial `omarsantanar/Favoritos` · 27 de octubre de 2026.

## Dos modalidades, sin confundirlas

**1. Demostración estática gratuita (GitHub Pages).** El workflow `.github/workflows/pages.yml` publica el archivo autocontenido `preview/standalone.html` como `index.html`. Incluye HTML, CSS y JavaScript sin llamadas a cuotas reales, sin secretos y con marcaje explícito de **DATOS FICTICIOS**. Es una maqueta interactiva, no un servidor Next.js ni una plataforma con APIs operativas. El workflow instala un `robots.txt` para pedir a rastreadores que no indexen la demostración.

**2. Aplicación Next.js real (Vercel o hosting compatible).** El repositorio está listo para importarse en Vercel desde GitHub (`Root Directory: ./`, framework Next.js, comandos npm predeterminados). Es la opción que permitirá conectar APIs gratuitas y mostrar datos reales una vez que estén validados. Sin una conexión autorizada a Vercel, **el despliegue real no puede hacerse desde este entorno**. Nunca publicar claves API en GitHub ni en el navegador.

## Habilitar GitHub Pages (paso manual obligatorio)

1. Abrir https://github.com/omarsantanar/Favoritos/settings/pages con permisos de administrador.
2. En **Build and deployment → Source** elegir **GitHub Actions**.
3. Abrir https://github.com/omarsantanar/Favoritos/actions/workflows/pages.yml y ejecutar **Run workflow** en `main` (o repetir la ejecución si una acción anterior falló porque Pages no estaba habilitado).
4. Verificar que el workflow `Publicar demostración en GitHub Pages` termina en **success** y consultar la URL exacta desde el entorno `github-pages`. Una URL usual, no garantizada antes del primer despliegue, es https://omarsantanar.github.io/Favoritos/.
5. Comprobar navegación, botones, filtros y que todo siga etiquetado como ficticio; no declarar el sitio listo sin comprobar el endpoint web.

**Importante:** GitHub Pages necesita habilitarse en los ajustes del repositorio. Crear el workflow no activa por sí solo el sitio si Pages no estaba configurado.

## Alternativa: publicar Next.js en Vercel

1. Entrar en https://vercel.com/new con la cuenta adecuada.
2. Importar el GitHub repo **omarsantanar/Favoritos**.
3. Mantener Next.js como framework, directorio raíz `./` y ejecutar **Deploy**. Esta versión de demostración no requiere variables secretas.
4. Verificar que la compilación finaliza y que la URL sirve la página y `/api/health`.
5. No configurar claves externas hasta auditar términos de uso y límites de los proveedores gratuitos.

La app Next.js todavía presenta datos de demostración y `/api/research` devuelve colecciones vacías. Eso es deliberado y debe mantenerse hasta que se publiquen fuentes comprobadas.

## Comprobaciones obligatorias

- `npm test`: cálculos y política editorial.
- `npm run typecheck` y `npm run build`: verificación de Next.js en CI.
- Despliegue Pages: revisar la ejecución de `pages.yml` y la URL del entorno.
- Sin información de popularidad gratuita, indicar siempre «no verificable».
- Análisis público: no más de 300 caracteres e incluir «Sugerencia:».

## Advertencia de alcance

**El despliegue web del prototipo no implica integración de datos ni capacidad predictiva de un modelo propio.** La primera versión operativa de datos requerirá ingesta trazable y uso legítimo de fuentes gratuitas, modelo calibrado y revisión editorial.

## Resultado comprobado del primer intento (27-10-2026)

Se fusionó el PR #1 (`09fb292e2d8f9e0dfebefca12cda75c2c859bb22`). El workflow [40493239211](https://github.com/omarsantanar/Favoritos/actions/runs/40493239211) generó correctamente el artefacto, pero el trabajo de despliegue falló con **HTTP 404** en `actions/configure-pages@v5` porque **GitHub Pages no está habilitado** en el repositorio. La acción `enablement: true` no es alternativa con el token predeterminado `GITHUB_TOKEN`; requiere token privilegiado con administración y permisos Pages. No crearemos claves ni solicitaremos privilegios extra para evitar esta habilitación manual simple.

**Acción única:** abrir [Settings → Pages](https://github.com/omarsantanar/Favoritos/settings/pages), elegir **GitHub Actions** y repetir [Publicar demostración en GitHub Pages](https://github.com/omarsantanar/Favoritos/actions/workflows/pages.yml). Hasta entonces, no anunciar una URL pública como funcional.
