#!/usr/bin/env node
/**
 * Importación editorial: acepta un JSON de observaciones comprobadas y
 * actualiza el snapshot local. No solicita cuotas a ninguna banca.
 *
 * Uso: node scripts/import-domestic-lines.mjs /ruta/a/observaciones.json
 *
 * Entradas: array de lineas con id, operator_id, sport, event, market,
 * selection, decimal_odds, observed_at_utc, starts_at_utc, source_url,
 * reviewed_by, evidence_note.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { validateObservation, dateRD } from '../lib/dominican-lines.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const registry=JSON.parse(fs.readFileSync(path.join(root,'config/dominican-operators.json'),'utf8'));
const source=process.argv[2];
if(!source) {
  console.error('Uso: node scripts/import-domestic-lines.mjs /ruta/observaciones.json');
  process.exit(2);
}
let observations;
try {
  observations=JSON.parse(fs.readFileSync(source,'utf8'));
} catch(error) {
  console.error('No se pudieron leer observaciones:',error.message);
  process.exit(2);
}
if(!Array.isArray(observations)||observations.length>500){
  console.error('El JSON de entrada debe ser una lista de 0 a 500 registros.');
  process.exit(2);
}
const now=new Date(), errors=[], ids=new Set();
for(const row of observations){
  const v=validateObservation(row,registry.operators,now);
  if(!row?.id||typeof row.id!=='string'||row.id.length>130) v.errors.push('ID necesario');
  if(ids.has(row?.id))v.errors.push('ID duplicado');
  ids.add(row?.id);
  if(v.errors.length) errors.push({id:row?.id||null,errors:v.errors});
}
if(errors.length){
 console.error('Importación rechazada; no se modificó la captura:',JSON.stringify(errors,null,2));
 process.exit(1);
}
const snapshot={schema_version:1,edition_date_rd:dateRD(now),
  captured_at_utc:now.toISOString(),status:observations.length?'reviewed_manual':'unavailable_no_prices_verified',
  observations};
const target=path.join(root,'data/dominican-daily-lines.json');
const temporary=target+'.tmp';
try {
 fs.writeFileSync(temporary,JSON.stringify(snapshot,null,2)+'\n','utf8');
 fs.renameSync(temporary,target);
 console.log('Captura editorial actualizada:',observations.length,'líneas de',dateRD(now));
} catch(err){
  try{fs.unlinkSync(temporary);}catch{}
  console.error('No se pudo escribir la captura:',err.message);
  process.exit(1);
}
