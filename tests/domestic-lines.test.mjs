import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildDailyPublicView, validateObservation, dateRD } from '../lib/dominican-lines.mjs';
const file=(p)=>JSON.parse(fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const reg=file('config/dominican-operators.json');
const realSnapshot=file('data/dominican-daily-lines.json');
const now=new Date('2026-10-27T12:00:00Z');
const valid={id:'editorial-test-01',operator_id:'juancito',sport:'NBA',event:'Prueba Team A vs Team B',
  market:'ganador',selection:'Team A',decimal_odds:1.91,
  observed_at_utc:'2026-10-27T11:30:00Z',starts_at_utc:'2026-10-27T20:00:00Z',
  source_url:'https://deportes.juancitosport.com.do/partido/123',
  reviewed_by:'Redacción Favoritos',evidence_note:'Precio comprobado directamente en el mercado público de prueba.'};

test('Directorio oficial contiene siete operadores, cinco con modalidad deportiva expresa',()=>{
  assert.equal(reg.operators.length,7);
  assert.equal(reg.operators.filter(x=>x.sports_authorization==='explicit').length,5);
  assert.equal(reg.operators.filter(x=>x.sports_authorization==='not_specified_in_registry').length,2);
  assert.ok(reg.regulator.includes('casinos.gob.do'));
});
test('Sin cotizaciones comprobadas: las siete bancas aparecen sin precio',()=>{
  const result=buildDailyPublicView(realSnapshot,reg,now);
  assert.equal(result.operators.length,7);
  assert.equal(result.lines.length,0);
  assert.match(result.notice,/No hay cuotas/);
});
test('Validación de una observación documentada de ejemplo (no publicar fixture)',()=>{
  const testResult=validateObservation(valid,reg.operators,now);
  assert.equal(testResult.valid,true,testResult.errors.join('; '));
  const data=buildDailyPublicView({observations:[valid]},reg,now);
  assert.equal(data.lines.length,1);
  assert.equal(data.lines[0].operator_name,'Juancito Sport');
  assert.ok(data.lines[0].p_mercado>0.52);
  assert.equal(data.lines[0].ev,null);
  assert.equal(data.lines[0].model_probability,null);
  assert.equal(data.lines[0].popularity,null);
  assert.equal(Object.hasOwn(data.lines[0],'source_url'),false);
  assert.equal(Object.hasOwn(data.lines[0],'evidence_note'),false);
});
test('Rechaza cuotas antiguas, del futuro, eventos pasados y URLs de otro dominio',()=>{
  const stale={...valid,observed_at_utc:'2026-10-27T09:00:00Z'};
  const future={...valid,observed_at_utc:'2026-10-27T12:10:00Z'};
  const started={...valid,starts_at_utc:'2026-10-27T11:59:00Z'};
  const evil={...valid,source_url:'https://juancitosport.com.do.evil.test/match'};
  for(const row of [stale,future,started,evil]){
    assert.equal(validateObservation(row,reg.operators,now).valid,false);
  }
  assert.equal(buildDailyPublicView({observations:[stale]},reg,now).lines.length,0);
});
test('Rechaza casas ajenas, cuota absurda, evidencia insuficiente y disciplina eliminada',()=>{
  const bad=[{...valid,operator_id:'bet365'}, {...valid,decimal_odds:0.5},
     {...valid,evidence_note:'pendiente'}, {...valid,sport:'Hípica'}];
  for(const row of bad) assert.equal(validateObservation(row,reg.operators,now).valid,false);
});
test('La fecha de Santo Domingo rige incluso cuando UTC ya pasó medianoche',()=>{
  assert.equal(dateRD(new Date('2026-10-28T02:00:00Z')),'2026-10-27');
  assert.equal(dateRD(new Date('2026-10-28T05:00:00Z')),'2026-10-28');
});
test('No se presenta la oferta de apuestas ni enlaces transaccionales en cliente',()=>{
  const dash=fs.readFileSync(new URL('../components/dashboard.tsx',import.meta.url),'utf8');
  assert.match(dash,/Líneas diarias RD/);
  assert.doesNotMatch(dash,/juancitosport\.com\.do|betcris\.do|gogobanca\.com|superbets\.do|vip987\.do|appuesta\.do/i);
});
