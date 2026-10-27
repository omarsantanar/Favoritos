/**
 * Control editorial de cuotas de operadores identificados por la DCJA.
 * NUNCA descarga páginas ni ofrece enlaces para apostar.
 * Requiere prueba manual y rechaza líneas futuras, expiradas o no atribuibles.
 */
export const SUPPORTED_SPORTS = Object.freeze(['NBA','NFL','MLB','NHL','MMA','Boxeo']);
export const MARKETS = Object.freeze(['ganador','handicap','total','metodo','duracion','jugador']);
export const MAX_AGE_MS = 120 * 60 * 1000;

export function dateRD(date) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone:'America/Santo_Domingo',year:'numeric',month:'2-digit',day:'2-digit'
  }).format(date);
}
function validIso(s) {
  return typeof s==='string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(s) &&
    Number.isFinite(Date.parse(s)) && new Date(s).toISOString().startsWith(s.slice(0,19));
}
function sourceMatches(raw, domain) {
  try {
    const uri=new URL(raw);
    if(uri.protocol!=='https:'||uri.username||uri.password||uri.port) return false;
    const host=uri.hostname.toLowerCase();
    return host===domain || host.endsWith('.'+domain);
  } catch {return false;}
}
export function validateObservation(row, operators, now=new Date()) {
  const errors=[];
  if(!row || typeof row!=='object'||Array.isArray(row))return {valid:false,errors:['Registro no es objeto']};
  const op=operators.find(o=>o.id===row.operator_id);
  if(!op) errors.push('Operador no listado por DCJA');
  if(!SUPPORTED_SPORTS.includes(row.sport))errors.push('Deporte fuera del alcance');
  if(!MARKETS.includes(row.market))errors.push('Mercado no reconocido');
  if(typeof row.event!=='string'||row.event.trim().length<5||row.event.length>160)errors.push('Evento no identificable');
  if(typeof row.selection!=='string'||row.selection.trim().length<2||row.selection.length>100)errors.push('Selección no identificable');
  if(!Number.isFinite(row.decimal_odds)||row.decimal_odds<=1.001||row.decimal_odds>1000)errors.push('Cuota inválida');
  if(!validIso(row.observed_at_utc))errors.push('Falta hora UTC válida de observación');
  if(!validIso(row.starts_at_utc))errors.push('Falta hora UTC válida de inicio');
  if(op && !sourceMatches(row.source_url,op.domain))errors.push('URL de cuota no pertenece al operador');
  if(typeof row.reviewed_by!=='string'||row.reviewed_by.trim().length<3||row.reviewed_by.length>90)errors.push('Revisor editorial obligatorio');
  if(typeof row.evidence_note!=='string'||row.evidence_note.trim().length<12||row.evidence_note.length>500)errors.push('Evidencia descriptiva obligatoria');
  const observed=Date.parse(row.observed_at_utc),starts=Date.parse(row.starts_at_utc);
  const age=now.getTime()-observed;
  if(Number.isFinite(observed)){
    if(age<0)errors.push('Cuota observada en el futuro');
    if(age>MAX_AGE_MS)errors.push('Cuota caducada (>120 minutos)');
    if(dateRD(new Date(observed))!==dateRD(now))errors.push('Cuota de otro día en Santo Domingo');
  }
  if(Number.isFinite(starts) && starts<=now.getTime())errors.push('Mercado prepartido ya iniciado o terminado');
  if(Number.isFinite(starts) && Number.isFinite(observed) && starts<=observed)errors.push('Observación después del inicio');
  return {valid:errors.length===0,errors,operator:op};
}
export function buildDailyPublicView(snapshot, registry, now=new Date()) {
  const operators=registry.operators||[];
  const today=dateRD(now);
  const rejected=[];
  const lines=[];
  const entries=Array.isArray(snapshot?.observations)?snapshot.observations:[];
  if(entries.length>500) return {date_rd:today,operator_count:operators.length,operators:operators.map(o=>({id:o.id,name:o.name,market_verified:false})),lines:[],rejected_count:entries.length,notice:'Demasiados registros; revisión requerida',live_feed:false};
  for(const entry of entries){
    const v=validateObservation(entry,operators,now);
    if(!v.valid){rejected.push({id:entry?.id||null,reasons:v.errors});continue;}
    lines.push({
      id:String(entry.id||''),
      operator_id:v.operator.id,
      operator_name:v.operator.name,
      sport:entry.sport,event:entry.event.trim(),market:entry.market,
      selection:entry.selection.trim(),decimal_odds:entry.decimal_odds,
      p_mercado:+(1/entry.decimal_odds).toFixed(5),
      observed_at_utc:entry.observed_at_utc,starts_at_utc:entry.starts_at_utc,
      certainty:'documented_manual',model_probability:null,
      popularity:null,ev:null
    });
  }
  return {
    date_rd:today,operator_count:operators.length,
    operators:operators.map(o=>({
      id:o.id,name:o.name,
      sports_authorization:o.sports_authorization,
      market_verified:lines.some(l=>l.operator_id===o.id),
      verified_lines_count:lines.filter(l=>l.operator_id===o.id).length
    })),
    lines:lines.sort((a,b)=>a.starts_at_utc.localeCompare(b.starts_at_utc)||a.operator_name.localeCompare(b.operator_name)),
    rejected_count:rejected.length,live_feed:false,
    notice:lines.length?'Líneas documentadas por revisión editorial; los precios pueden cambiar.':'No hay cuotas dominicanas verificadas y vigentes para esta fecha. No se mostrarán números inventados.'
  };
}
