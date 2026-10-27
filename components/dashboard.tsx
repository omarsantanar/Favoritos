'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, BarChart3, CalendarDays,
  ChevronDown, ChevronRight, Clock3, Database, FlaskConical, History,
  Info, LayoutDashboard, Menu, Radar, Search, ShieldCheck, SlidersHorizontal, Target,
  TrendingUp, X
} from 'lucide-react';
import { scenarios } from '@/lib/scenarios';
import { sports, type Scenario, type SportFilter } from '@/lib/models';
import { expectedValue, impliedProbability, percentage } from '@/lib/probability.mjs';

type RdLine = {id:string; operator_name:string; sport:string; event:string; market:string; selection:string; decimal_odds:number; p_mercado:number; observed_at_utc:string; starts_at_utc:string;};
type RdOperators = {id:string; name:string; sports_authorization:string; market_verified:boolean; verified_lines_count:number};
type RdResponse = { date_rd:string; operator_count:number; operators:RdOperators[]; lines:RdLine[]; rejected_count:number; live_feed:boolean; notice:string; };

function DominicanMarkets({data,loading,error}:{data:RdResponse|null;loading:boolean;error:boolean}) {
  const fmt=(timestamp:string)=>new Intl.DateTimeFormat('es-DO',{timeZone:'America/Santo_Domingo',day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}).format(new Date(timestamp));
  return <section className="rd-markets" aria-label="Líneas dominicanas verificadas">
    <div className="section-heading"><div><span className="section-overline">OBSERVACIÓN EN REPÚBLICA DOMINICANA</span><h2>Líneas diarias RD</h2><p>Operadores identificados en el registro de la DCJA. Las cuotas solo aparecen tras revisión editorial, con hora y casa verificadas. Sin enlaces para apostar.</p></div></div>
    {loading?<p className="rd-status">Consultando registro de observaciones...</p>:error||!data?<p className="rd-status">No fue posible consultar las líneas. No se mostrarán precios sin verificación.</p>:<>
      <p className="rd-status"><strong>{data.lines.length} líneas verificadas vigentes</strong> · {data.operator_count} operadores identificados · Fecha RD: {data.date_rd}. Consulta editorial, no transmisión en vivo.</p>
      <div className="rd-provider-list">{data.operators.map(operator=><div className="rd-provider" key={operator.id}>
        <span>{operator.name}</span><small>{operator.market_verified?operator.verified_lines_count+' línea(s) documentada(s)':'Sin cuota verificada'}</small>
      </div>)}</div>
      {data.lines.length?<div className="table-scroll"><table className="market-table"><thead><tr><th>BANCA / DEPORTE</th><th>EVENTO</th><th>MERCADO / SELECCIÓN</th><th>CUOTA</th><th>P. IMPLÍCITA</th><th>OBSERVADA · RD</th></tr></thead><tbody>{data.lines.map(line=><tr key={line.id}>
        <td><strong>{line.operator_name}</strong><span className="rd-small">{line.sport}</span></td>
        <td>{line.event}</td><td>{line.market} · {line.selection}</td>
        <td>{line.decimal_odds.toFixed(2)}</td><td>{(line.p_mercado*100).toFixed(1)} %</td><td>{fmt(line.observed_at_utc)}</td>
      </tr>)}</tbody></table></div>:<div className="rd-no-lines"><Database size={22}/><p>{data.notice}</p><small>No hay un precio local confirmado para mostrar hoy. La ausencia de datos no equivale a una cuota de cero.</small></div>}
      <p className="rd-disclaimer">El directorio oficial no representa un ranking por volumen. Las líneas tienen una vigencia máxima de dos horas y solo se muestran antes del evento. Popularidad, ventaja matemática y pronóstico: no calculables sin evidencias adicionales.</p>
    </>}
  </section>;
}

type View = 'radar' | 'lineas' | 'historial';
type Sort = 'mercado' | 'valor' | 'probabilidad' | 'deporte';
const mainNav: {id: View; label: string; Icon: typeof Radar}[] = [
  {id:'radar',label:'Observatorio',Icon:LayoutDashboard},
  {id:'lineas',label:'Investigación de líneas',Icon:TrendingUp},
  {id:'historial',label:'Resultados',Icon:History},
];
const viewHeadings: Record<View, {eyebrow:string; title:string; description:string}> = {
  radar: {eyebrow:'INTELIGENCIA DEPORTIVA', title:'Primero las líneas. Después los datos.',description:'Identificamos mercados y tendencias verificables; contrastamos cada línea con estadísticas antes de publicar una sugerencia de 300 caracteres como máximo.'},
  lineas: {eyebrow:'ANÁLISIS DE MERCADOS',title:'Las líneas, bajo la lupa.',description:'Una cuota es un precio, no una certeza. El observatorio contrasta probabilidades, movimientos y datos de popularidad documentados.'},
  historial: {eyebrow:'PRONÓSTICOS Y RESULTADOS',title:'Resultados con contexto.',description:'Cuando existan pronósticos verificados, aquí se podrán consultar las selecciones originales y sus resultados.'}
};

function dateInSantoDomingo() {
  return new Intl.DateTimeFormat('es-DO',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'America/Santo_Domingo'}).format(new Date());
}
function Sparklines({data,positive = true,large=false}:{data:number[],positive?:boolean,large?:boolean}) {
  const min=Math.min(...data),max=Math.max(...data),delta=(max-min)||1;
  const points=data.map((n,i)=>`${7+i*(176/(data.length-1))},${11+(1-(n-min)/delta)*34}`).join(' ');
  return <svg className={large?'spark large':'spark'} viewBox="0 0 190 58" aria-label="Variación ilustrativa de una cuota ficticia" role="img">
    <path d="M7 46H183" stroke="currentColor" strokeOpacity=".12" strokeWidth="1"/>
    <polyline points={points} fill="none" stroke={positive?'#75e6bd':'#e4b577'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    {data.map((n,i)=><circle key={i} cx={7+i*176/(data.length-1)} cy={11+(1-(n-min)/delta)*34} r={i===data.length-1?3.4:1.1} fill={positive?'#75e6bd':'#e4b577'}/>)}
  </svg>;
}
function SportBadge({sport}:{sport:Scenario['sport']}){return <span className={`sportbadge sport-${sport.toLowerCase().replace('í','i')}`}>{sport}</span>}
function ConfidenceLabel({value}:{value:Scenario['confidence']}){return <span className={`confidence confidence-${value.toLowerCase()}`}><span className="bullet"/>{value}</span>}
function EvLabel({scenario}:{scenario:Scenario}) {
  const ev=expectedValue(scenario.probability,scenario.decimalOdds);
  return <span className={`ev-label ${ev>0?'positive':'negative'}`}>{ev>0?'+':''}{percentage(ev)}</span>;
}
function ScenarioCard({data,onOpen}:{data:Scenario;onOpen:()=>void}) {
  const ev=expectedValue(data.probability,data.decimalOdds);
  return <button className="scenario-card" onClick={onOpen} aria-label={`Ver ficha de ${data.matchup}`}>
    <div className="scenario-head"><SportBadge sport={data.sport}/><span className="scenario-more">FICHA DE INVESTIGACIÓN <ArrowUpRight size={14}/></span></div>
    <div className="scenario-meta">{data.competition}</div>
    <h3>{data.matchup}</h3>
    <p className="market-line">{data.market} <span className="dot-separator">·</span> {data.selection}</p>
    <p className="market-brief">{data.brief}</p>
    <div className="scenario-numbers">
      <div><span className="mini-label">CUOTA*</span><strong>{data.decimalOdds.toFixed(2)}</strong></div>
      <div><span className="mini-label">P. MERCADO*</span><strong>{percentage(impliedProbability(data.decimalOdds),0)}</strong></div>
      <div><span className="mini-label">VALOR ESP.*</span><strong className={ev>0?'green-number':'muted-number'}>{ev>0?'+':''}{percentage(ev)}</strong></div>
    </div>
    <div className="scenario-footer"><span>Cuota ilustrativa</span><Sparklines data={data.spark} positive={ev>0}/></div>
    <div className="scenario-last"><ConfidenceLabel value={data.confidence}/><span>Popularidad: sin dato verificado</span></div>
  </button>;
}
function NoData({section}:{section?:string}) {
  return <div className="no-data"><div className="no-data-icon"><Database size={24}/></div><h3>No hay información verificada disponible</h3>
    <p>Las fuentes deportivas y de cuotas todavía no están conectadas. {section||'No se mostrarán eventos ni líneas como reales hasta confirmar origen, fecha y calidad de los datos.'}</p>
    <span className="no-data-note"><ShieldCheck size={15}/> Integridad de la información activada</span>
  </div>;
}
function Detail({data,onClose}:{data:Scenario;onClose:()=>void}) {
  const implied=impliedProbability(data.decimalOdds), ev=expectedValue(data.probability,data.decimalOdds);
  useEffect(()=>{
    function onEsc(e:KeyboardEvent){if(e.key==='Escape')onClose()}
    window.addEventListener('keydown',onEsc);
    return ()=>window.removeEventListener('keydown',onEsc);
  },[onClose]);
  return <div className="modal-backdrop" onMouseDown={onClose} role="presentation"><section className="detail-modal" role="dialog" aria-modal="true" aria-label={`Ficha de ${data.matchup}`} onMouseDown={e=>e.stopPropagation()}>
    <div className="detail-top"><div><span className="eyebrow">CASO FICTICIO · INVESTIGACIÓN</span><h2>{data.matchup}</h2><p>{data.competition}</p></div><button className="icon-button" aria-label="Cerrar ficha" onClick={onClose}><X size={20}/></button></div>
    <div className="warning-line"><FlaskConical size={17}/> Demostración de diseño: competidores, probabilidades, cotizaciones y argumentos son ficticios.</div>
    <div className="detail-stat-grid">
      <div><small>P(MODELO)*</small><strong>{percentage(data.probability)}</strong></div>
      <div><small>P(MERCADO)*</small><strong>{percentage(implied)}</strong></div>
      <div><small>CUOTA*</small><strong>{data.decimalOdds.toFixed(2)}</strong></div>
      <div><small>EV*</small><strong className={ev>=0?'green-number':'muted-number'}>{ev>=0?'+':''}{percentage(ev)}</strong></div>
    </div>
    <h3>Lectura de línea y sugerencia · máximo 300 caracteres</h3><p className="detail-paragraph">{data.brief}</p><small className="brief-count">{Array.from(data.brief).length}/300 caracteres · ejemplo ficticio</small>

    <h3>Calidad de la evidencia</h3><div className="evidence-row">{data.evidence.map(item=><div key={item.label}><small>{item.label}</small><strong>{item.value}</strong></div>)}</div>
    <div className="detail-bottom"><span><Info size={15}/> Popularidad de mercado: no disponible</span><span>Sin fuentes oficiales asociadas</span></div>
    <p className="modal-disclaimer">* Valores sintéticos para comprobar cálculos y presentación; no constituyen pronósticos ni recomendaciones reales.</p>
  </section></div>;
}
function Metrics({demo}:{demo:boolean}) {
  const metrics = [
    {label:'EVENTOS VERIFICADOS',value:'0',meta:'Fuentes sin conectar',Icon:CalendarDays},
    {label:demo?'ESCENARIOS FICTICIOS':'PRONÓSTICOS PUBLICADOS',value:demo?String(scenarios.length):'0',meta:demo?'Solo demostración':'Sin publicar',Icon:Activity},
    {label:'TENDENCIAS CERTIFICADAS',value:'0',meta:'Sin datos de volumen',Icon:TrendingUp},
    {label:'FUENTES ACTIVAS',value:'0 / 4',meta:'Integración pendiente',Icon:Database},
  ];
  return <div className="metric-grid">{metrics.map(({label,value,meta,Icon})=><div className="metric" key={label}>
    <div className="metric-top"><span>{label}</span><Icon size={18}/></div><div className="metric-value">{value}</div><div className="metric-meta"><span className="tiny-circle"/>{meta}</div>
  </div>)}</div>;
}
function AuditHistory(){return <div className="history-box"><div className="history-symbol"><History size={31}/></div><h2>Todavía no hay pronósticos publicados</h2><p>El historial permanecerá vacío hasta que existan pronósticos originales fechados y respaldados por fuentes verificables. Los escenarios del modo demostración no se contabilizan como aciertos, errores ni resultados de un modelo.</p><div className="history-labels"><span><ShieldCheck size={15}/> Registro inalterable</span><span><BarChart3 size={15}/> Calibración</span><span><Clock3 size={15}/> Hora de publicación</span></div></div>}
export default function Dashboard(){
  const [view,setView]=useState<View>('radar');
  const [rdData,setRdData]=useState<RdResponse|null>(null);
  const [rdLoading,setRdLoading]=useState(true);
  const [rdError,setRdError]=useState(false);
  const [sport,setSport]=useState<SportFilter>('Todos');
  const [demo,setDemo]=useState(true);
  const [search,setSearch]=useState('');
  const [sort,setSort]=useState<Sort>('mercado');
  const [onlyPositive,setOnlyPositive]=useState(false);
  const [selected,setSelected]=useState<string|null>(null);
  const [mobileMenu,setMobileMenu]=useState(false);
  const [date,setDate]=useState('Hora de Santo Domingo · UTC−4');
  useEffect(()=>setDate(dateInSantoDomingo()+' · UTC−4'),[]);
  useEffect(()=>{let active=true;fetch('/api/domestic-lines',{cache:'no-store'}).then(response=>{if(!response.ok)throw Error('Fuentes no disponibles');return response.json() as Promise<RdResponse>;}).then(result=>{if(active){setRdData(result);setRdLoading(false);}}).catch(()=>{if(active){setRdError(true);setRdLoading(false);}});return ()=>{active=false};},[]);
  const current=selected?scenarios.find(x=>x.id===selected):undefined;
  const filtered=useMemo(()=>{
    if(!demo)return [];
    return scenarios.filter(x=>(sport==='Todos'||x.sport===sport)&&(!search||`${x.matchup} ${x.sport} ${x.market} ${x.selection}`.toLowerCase().includes(search.toLowerCase()))&&(!onlyPositive||expectedValue(x.probability,x.decimalOdds)>0))
      .sort((a,b)=>sort==='valor'?expectedValue(b.probability,b.decimalOdds)-expectedValue(a.probability,a.decimalOdds):sort==='probabilidad'?b.probability-a.probability:sort==='deporte'?a.sport.localeCompare(b.sport):a.market.localeCompare(b.market)||a.matchup.localeCompare(b.matchup));
  },[sport,search,sort,onlyPositive,demo]);
  function changeView(id:View){setView(id);setMobileMenu(false);window.scrollTo({top:0,behavior:'smooth'});}
  const header=viewHeadings[view];
  return <div className="shell">
    <aside className={`sidebar ${mobileMenu?'open':''}`}>
      <div className="brand"><div className="brand-icon"><Radar size={27} strokeWidth={2.1}/></div><div><div className="brand-name">RADAR<span>DEPORTIVO</span></div><div className="brand-tag">OBSERVATORIO ESTADÍSTICO</div></div></div>
      <div className="side-section-label">PLATAFORMA</div>
      <nav className="side-nav" aria-label="Navegación principal">{mainNav.map(({id,label,Icon})=><button key={id} className={`side-link ${view===id?'active':''}`} onClick={()=>changeView(id)}><Icon size={18}/><span>{label}</span>{view===id&&<span className="active-mark"/>}</button>)}</nav>
      <div className="side-section-label sports-title">DISCIPLINAS</div>
      <div className="sport-nav">{sports.filter(s=>s!=='Todos').map((s)=><button key={s} onClick={()=>{setSport(s);changeView('radar')}} className={`sport-nav-item ${sport===s&&view==='radar'?'chosen':''}`}><span className="sport-dot"/>{s}<ChevronRight size={15}/></button>)}</div>
      <div className="sidebar-bottom"><div className="compliance"><ShieldCheck size={18}/><div><strong>Investigación independiente</strong><span>Sin apuestas ni depósitos</span></div></div></div>
    </aside>
    <div className="main-area">
      <header className="topbar"><div className="topbar-left"><button className="mobile-menu" aria-label="Abrir menú" onClick={()=>setMobileMenu(!mobileMenu)}>{mobileMenu?<X size={23}/>:<Menu size={23}/>}</button><span className="desktop-path">OBSERVATORIO</span><ChevronRight size={15} className="desktop-path"/><strong>{mainNav.find(x=>x.id===view)?.label}</strong></div><div className="topbar-right"><span className="timezone"><Clock3 size={15}/>{date}</span><span className="prototype-pill"><span/> DEMOSTRACIÓN</span></div></header>
      <main className="content">
        <div className="notice-banner"><FlaskConical size={19}/><p><strong>Entorno de demostración.</strong> El portal no dispone de conexión automática a cuotas de bancas. Los escenarios de demostración son ficticios; las líneas RD solo aparecen cuando están documentadas por una revisión editorial.</p></div>
        <section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"/>{header.eyebrow}</div><h1>{header.title}</h1><p>{header.description}</p><div className="hero-tags"><span><ShieldCheck size={14}/> Fuentes auditables</span><span><BarChart3 size={14}/> Probabilidades explicadas</span><span><Target size={14}/> Sin apuestas</span></div></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="orbit-dot"/><Radar size={90} strokeWidth={0.7}/><span>RADAR DE LÍNEAS</span></div></section>
        {view==='radar'&&<>
          <Metrics demo={demo}/>
          <section className="section-content"><div className="section-heading"><div><span className="section-overline">CENTRO DE ANÁLISIS</span><h2>Radar de líneas deportivas</h2><p>Primero observamos mercados; después contrastamos estadísticas. Cada sugerencia, máximo 300 caracteres.</p></div><label className="demo-toggle"><span>Demostración</span><input type="checkbox" checked={demo} onChange={e=>setDemo(e.target.checked)}/><span className="switch"/></label></div>
            <div className="filters"><div className="sports-scroll">{sports.map(s=><button key={s} onClick={()=>setSport(s)} className={`chip ${sport===s?'selected':''}`}>{s}</button>)}</div><div className="filters-secondary"><label className="search-field"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar escenario..." aria-label="Buscar escenario"/></label><label className="sort-field"><SlidersHorizontal size={16}/><select value={sort} onChange={e=>setSort(e.target.value as Sort)} aria-label="Ordenar por"><option value="mercado">Mercado primero</option><option value="valor">Valor esperado*</option><option value="probabilidad">Probabilidad*</option><option value="deporte">Deporte</option></select><ChevronDown size={14}/></label><button onClick={()=>setOnlyPositive(!onlyPositive)} className={`value-filter ${onlyPositive?'on':''}`}>EV positivo*</button></div></div>
            {demo?<><div className="results-note"><span><FlaskConical size={15}/> {filtered.length} escenarios ficticios · ningún evento real</span><span>* Números sintéticos</span></div>{filtered.length?<div className="scenario-grid">{filtered.map(x=><ScenarioCard key={x.id} data={x} onOpen={()=>setSelected(x.id)}/>)}</div>:<div className="no-matches">No hay casos ficticios que coincidan con estos filtros. Prueba otra búsqueda.</div>}</>:<NoData/>}
          </section>
          <section className="insight-grid"><div className="insight-card"><div className="insight-symbol"><TrendingUp size={20}/></div><span>LECTURA DE MERCADO</span><h3>Una línea que se mueve no revela por sí sola la tendencia del público.</h3><p>Para identificar apuestas populares se necesitan métricas de volumen o distribución verificables. Sin esos datos, no afirmamos popularidad.</p><button onClick={()=>changeView('lineas')}>Examinar líneas <ArrowRight size={16}/></button></div><div className="insight-card quote"><span>CRITERIO EDITORIAL</span><h3>“Un favorito no siempre representa una oportunidad de valor”.</h3><p>El resultado más probable y el precio ofrecido son preguntas distintas. Ambas deben investigarse por separado.</p><button onClick={()=>changeView('lineas')}>Examinar las líneas <ArrowRight size={16}/></button></div></section>
        </>}
        {view==='lineas'&&<><DominicanMarkets data={rdData} loading={rdLoading} error={rdError}/><section className="section-content"><div className="section-heading"><div><span className="section-overline">TABLA COMPARATIVA</span><h2>Observación de precios y probabilidades</h2><p>Las cifras siguientes solo aparecen en modo demostración; no corresponden a ninguna casa.</p></div><label className="demo-toggle"><span>Demostración</span><input type="checkbox" checked={demo} onChange={e=>setDemo(e.target.checked)}/><span className="switch"/></label></div>
          {demo?<><div className="table-scroll"><table className="market-table"><thead><tr><th>ESCENARIO FICTICIO</th><th>SELECCIÓN</th><th>P(MODELO)*</th><th>P(MERCADO)*</th><th>EV*</th><th>POPULARIDAD</th><th></th></tr></thead><tbody>{scenarios.map(x=><tr key={x.id}><td><SportBadge sport={x.sport}/><strong>{x.matchup}</strong></td><td>{x.selection}</td><td>{percentage(x.probability)}</td><td>{percentage(impliedProbability(x.decimalOdds))}</td><td><EvLabel scenario={x}/></td><td className="availability">No disponible</td><td><button className="table-arrow" onClick={()=>setSelected(x.id)} aria-label={`Abrir ${x.matchup}`}><ArrowUpRight size={18}/></button></td></tr>)}</tbody></table></div><p className="table-note">* Valores totalmente inventados para ensayar la representación visual y la fórmula de EV. La P(mercado) no está ajustada por margen en estos ejemplos.</p></>:<NoData section="La tabla permanecerá vacía hasta disponer de líneas identificadas por casa, mercado y hora de consulta."/>}
          </section></>}
        {view==='historial'&&<AuditHistory/>}
        <footer className="footer"><span>© 2026 Radar Deportivo · Información deportiva</span><span>No procesamos apuestas · No se garantizan resultados</span></footer>
      </main>
    </div>
    {current&&<Detail data={current} onClose={()=>setSelected(null)}/>}
  </div>;
}
