import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const registry = JSON.parse(readFileSync(new URL('../config/fuentes-gratuitas.json', import.meta.url), 'utf8'));

test('todas las fuentes catalogadas son de costo cero', () => {
  assert.equal(registry.publication_policy.no_paid_feeds, true);
  assert.ok(registry.sources.length >= 10);
  for (const source of registry.sources) {
    assert.equal(source.cost_usd_month, 0, `${source.id} no es gratuita`);
    assert.ok(source.rights, `${source.id} no documenta derechos`);
    assert.ok(source.integration, `${source.id} no documenta tipo de integración`);
    assert.match(source.url, /^https?:\/\//, `${source.id} no tiene URL`);
  }
});

test('las fuentes restringidas no están habilitadas para ingesta automática', () => {
  for (const source of registry.sources.filter(x => x.integration.startsWith('manual_'))) {
    assert.ok(source.access.includes('web_') || source.access.includes('condicionados') || source.access.includes('parcial'), `${source.id}: estado de consulta inconsistente`);
  }
  assert.equal(registry.publication_policy.no_unapproved_scraping, true);
  assert.equal(registry.publication_policy.show_missing_instead_of_guessing, true);
});
