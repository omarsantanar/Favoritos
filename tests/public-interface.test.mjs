import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = (p) => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');

test('No exponer bitácora ni metodología interna en interfaz pública', () => {
  for (const path of ['components/dashboard.tsx', 'preview/index.html', 'preview/demo.js', 'preview/standalone.html']) {
    const contents = read(path);
    assert.doesNotMatch(contents, /Bitácora|Metodología|panel-metodologia|panel-bitacora|CONTINUIDAD DEL PRODUCTO|docs\/BITACORA\.md/i, path);
    assert.match(contents, /Resultados/, path);
  }
});
test('Navegación pública solamente tres secciones', () => {
  assert.equal([...read('components/dashboard.tsx').matchAll(/\{id:'(?:radar|lineas|historial)',label:/g)].length, 3);
  assert.equal([...read('preview/index.html').matchAll(/<button class="side-link[^"]*" data-view="/g)].length, 3);
});
test('Mantener etiquetado de demostración y datos ficticios', () => {
  for (const path of ['components/dashboard.tsx','preview/index.html','preview/standalone.html']) {
    assert.match(read(path), /demostraci[oó]n/i, path);
    assert.match(read(path), /fictici/i, path);
  }
});
test('Demostración autocontenida sin enlaces a CSS/JS locales', () => {
  const html = read('preview/standalone.html');
  assert.match(html, /<style>[\s\S]*:root\{--bg:/);
  assert.match(html, /<script>[\s\S]*const sports/);
  assert.doesNotMatch(html, /src="demo\.js"|href="\.\.\/app\/globals\.css"/);
});
