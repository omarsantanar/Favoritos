import test from 'node:test';
import assert from 'node:assert/strict';
import {input, rows, americanToDecimal} from '../scripts/evaluate-nba-snapshot.mjs';
test('nueve eventos confirmados, sin duplicados de jornada',()=>{
  assert.equal(rows.length,9);
  assert.equal(new Set(rows.map(x=>`${x.away}@${x.home}`)).size,9);
  assert.equal(input.status,'laboratorio_no_publicable');
});
test('probabilidad moneyline y valor esperado auditables',()=>{
  assert.equal(americanToDecimal(-200),1.5);
  assert.equal(americanToDecimal(150),2.5);
  const heat=rows.find(x=>x.home==='MIA');
  assert.ok(Math.abs(heat.p_market - 295/395) < 1e-12);
  assert.ok(Math.abs(heat.ev_third_party - (0.812*(1+100/295)-1)) < 1e-12);
});
test('alerta diferencias extremas contra mercado sin vig',()=>{
  const anomalies=rows.filter(x=>x.model_anomaly).map(x=>x.selected);
  assert.deepEqual(anomalies,['CHA','MIL']);
});
test('el snapshot no inventa rendimiento ni popularity',()=>{
  assert.ok(rows.every(x=>x.source_probability>0 && x.source_probability<1));
  assert.ok(rows.every(x=>!('probability_own_model' in x)));
  assert.ok(rows.every(x=>!('popularity_pct' in x)));
});
