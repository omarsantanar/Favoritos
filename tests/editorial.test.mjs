import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {validateEditorialBrief, countCharacters, MAX_BRIEF_CHARS} from '../lib/editorial.mjs';
const sample = {market:'Ganador', outcome:'Aurora gana', decimalOdds:1.88, book:'Casa simulada', observedAtUtc:'2026-10-26T19:00:00Z', sourceId:'demo'};
const briefs = JSON.parse(fs.readFileSync(new URL('../config/demo-briefs.json', import.meta.url), 'utf8'));
test('siete ejemplos solo ficticios cumplen límite y sugerencia',()=>{
  assert.equal(Object.keys(briefs).length,7);
  for (const [sport,brief] of Object.entries(briefs)) {
    const result=validateEditorialBrief(brief,sample);
    assert.ok(result.valid, `${sport}: ${result.errors.join('; ')}`);
    assert.ok(countCharacters(brief) <= MAX_BRIEF_CHARS);
  }
});
test('rechaza análisis mayor de 300 caracteres',()=>assert.equal(validateEditorialBrief('Línea: '+('x'.repeat(300))+' Sugerencia: no seleccionar.',sample).valid,false));
test('rechaza análisis sin sugerencia',()=>assert.equal(validateEditorialBrief('Línea: cuota 2.1. No hay datos.',sample).valid,false));
test('rechaza publicar sin cuota, casa y hora verificables',()=>assert.equal(validateEditorialBrief(briefs.nba,{market:'Ganador',outcome:'Aurora gana',decimalOdds:1.88}).valid,false));
test('cuenta caracteres Unicode en vez de unidades UTF-16',()=>assert.equal(countCharacters('🏀'),1));
