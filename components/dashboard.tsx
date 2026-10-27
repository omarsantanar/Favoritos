'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, BarChart3, BookOpen, CalendarDays,
  ChevronDown, ChevronRight, CircleAlert, Clock3, Database, FlaskConical, History,
  Info, LayoutDashboard, Menu, Radar, Search, ShieldCheck, SlidersHorizontal, Target,
  TrendingUp, X
} from 'lucide-react';
import { scenarios } from '@/lib/scenarios';
import { sports, type Scenario, type SportFilter } from '@/lib/models';
import { expectedValue, impliedProbability, percentage } from '@/lib/probability.mjs';

type View = 'radar' | 'lineas' | 'historial' | 'metodologia' | 'bitacora';
type Sort = 'mercado' | 'valor' | 'probabilidad' | 'deporte';
const mainNav: {id: View; label: string; Icon: typeof Radar}[] = [
  {id:'radar',label:'Observatorio',Icon:LayoutDashboard},
  {id:'lineas',label:'Investigación de líneas',Icon:TrendingUp},
  {id:'historial',label:'Historial auditado',Icon:History},
  {id:'metodologia',label:'Metodología',Icon:BookOpen},
  {id:'bitacora',label:'Bitácora',Icon:Database},
];
const viewHeadings: Record<View, {eyebrow:string; title:string; description:string}> = {
  radar: {eyebrow:'INTELIGENCIA DEPORTIVA', title:'Primero las líneas. Después los datos.',description:'Identificamos mercados y tendencias verificables; contrastamos cada línea con estadísticas antes de publicar una sugerencia de 300 caracteres como máximo.'},
  lineas: {eyebrow:'ANÁLISIS DE MERCADOS',title:'Las líneas, bajo la lupa.',description:'Una cuota es un precio, no una certeza. El observatorio contrasta probabilidades, movimientos y datos de popularidad documentados.'},
  historial: {eyebrow:'TRAZABILIDAD DEL MODELO',title:'Transparencia, sin atajos.',description:'Todos los análisis publicados deberán conservar su cuota original, fecha, supuestos y resultado oficial para auditoría.'},
  metodologia: {eyebrow:'CÓMO INVESTIGAMOS',title:'El mercado es el punto de partida.',description:'Primero precio y tendencia; después evidencia deportiva y, por último, una sugerencia breve con incertidumbre explícita.'},
  bitacora: {eyebrow:'CONTINUIDAD DEL PRODUCTO',title:'Cada cambio, documentado.',description:'Registro cronológico del desarrollo, las decisiones editoriales y las tareas pendientes del observatorio.'}
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
function Methodology(){return <div className="essay-grid">
  <section className="essay-panel"><span className="panel-kicker">01 / FLUJO EDITORIAL</span><h2>Mercado → contraste → sugerencia.</h2><p>Partimos de líneas y apuestas en tendencia, únicamente con popularidad verificable. Identificamos selección, cuota, casa y fecha; después revisamos estadísticas, lesiones y contexto. Cerramos con un análisis de máximo 300 caracteres que contenga una sugerencia concreta.</p><div className="rule-stack"><div><ShieldCheck size={18}/><span>No publicamos estadísticas ni titulares sin verificación.</span></div><div><CircleAlert size={18}/><span>No usamos porcentajes sintéticos para eventos reales.</span></div><div><Target size={18}/><span>Si no hay ventaja defendible, la conclusión es «sin selección».</span></div></div></section>
  <section className="essay-panel soft"><span className="panel-kicker">02 / MATEMÁTICA</span><h2>Probabilidad ≠ precio.</h2><div className="formula"><span>Probabilidad implícita</span><strong>1 / cuota decimal</strong></div><div className="formula"><span>Valor esperado por unidad</span><strong>P(modelo) × cuota − 1</strong></div><p>El margen de una casa debe ajustarse cuando puedan verificarse todos los resultados mutuamente excluyentes. Un EV positivo no garantiza aciertos ni rentabilidad.</p></section>
  <section className="essay-panel"><span className="panel-kicker">03 / TENDENCIAS</span><h2>Popularidad no es movimiento.</h2><p>Una variación en cuotas puede reflejar múltiples factores. Para afirmar que una línea es popular requerimos volumen, proporción de apuestas u otra medida explícita, con método y fuente comprobables.</p><p>Sin cifras de participación contrastadas, el campo «Popularidad» se mostrará como «No disponible».</p></section>
  <section className="essay-panel"><span className="panel-kicker">04 / CONDUCTA</span><h2>Nunca una casa de apuestas.</h2><p>El portal no tramita apuestas, no administra saldos, no acepta depósitos ni ofrece enlaces para apostar en esta versión. Presenta investigación deportiva, escenarios y probabilidades sujetas a incertidumbre.</p><p>El informe incluirá fuentes, horario dominicano, lesiones y clima cuando correspondan.</p></section>
  </div>}
function AuditHistory(){return <div className="history-box"><div className="history-symbol"><History size={31}/></div><h2>Todavía no hay pronósticos publicados</h2><p>El historial permanecerá vacío hasta que existan pronósticos originales fechados y respaldados por fuentes verificables. Los escenarios del modo demostración no se contabilizan como aciertos, errores ni resultados de un modelo.</p><div className="history-labels"><span><ShieldCheck size={15}/> Registro inalterable</span><span><BarChart3 size={15}/> Calibración</span><span><Clock3 size={15}/> Hora de publicación</span></div></div>}
function Changelog(){return <div className="log-box"><div className="log-date"><span>26 OCT 2026</span><span className="version-pill">v0.1.4 · Mercado primero</span></div><h2>Investigación basada en líneas</h2><p>Se crea el diseño inicial, la navegación por deportes, el motor de cálculos descriptivos, los escenarios ficticios, las vistas de metodología e historial, un contrato de API y la documentación de continuidad.</p><div className="log-entry"><div><span className="log-dot"/></div><div><strong>Regla editorial innegociable</strong><p>Nunca procesar apuestas ni gestionar dinero; investigar mercados y formular lecturas estadísticas verificables.</p></div></div><div className="log-entry"><div><span className="log-dot"/></div><div><strong>Separación estricta de datos</strong><p>La API de investigación real devuelve registros vacíos; los escenarios inventados solo funcionan dentro de la demostración.</p></div></div><div className="log-entry"><div><span className="log-dot"/></div><div><strong>Próxima fase</strong><p>Conectar fuentes autorizadas, implementar validaciones, ingesta, persistencia y revisión editorial antes del primer pronóstico público.</p></div></div><p className="file-note">Registro detallado: <code>docs/BITACORA.md</code></p></div>}

export default function Dashboard(){
  const [view,setView]=useState<View>('radar');
  const [sport,setSport]=useState<SportFilter>('Todos');
  const [demo,setDemo]=useState(true);
  const [search,setSearch]=useState('');
  const [sort,setSort]=useState<Sort>('mercado');
  const [onlyPositive,setOnlyPositive]=useState(false);
  const [selected,setSelected]=useState<string|null>(null);
  const [mobileMenu,setMobileMenu]=useState(false);
  const [date,setDate]=useState('Hora de Santo Domingo · UTC−4');
  useEffect(()=>setDate(dateInSantoDomingo()+' · UTC−4'),[]);
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
      <div className="sidebar-bottom"><div className="compliance"><ShieldCheck size={18}/><div><strong>Investigación independiente</strong><span>Sin apuestas ni depósitos</span></div></div><p>EDICIÓN DE DESARROLLO <strong>0.1.0</strong></p></div>
    </aside>
    <div className="main-area">
      <header className="topbar"><div className="topbar-left"><button className="mobile-menu" aria-label="Abrir menú" onClick={()=>setMobileMenu(!mobileMenu)}>{mobileMenu?<X size={23}/>:<Menu size={23}/>}</button><span className="desktop-path">OBSERVATORIO</span><ChevronRight size={15} className="desktop-path"/><strong>{mainNav.find(x=>x.id===view)?.label}</strong></div><div className="topbar-right"><span className="timezone"><Clock3 size={15}/>{date}</span><span className="prototype-pill"><span/> PROTOTIPO v0.1</span></div></header>
      <main className="content">
        <div className="notice-banner"><FlaskConical size={19}/><p><strong>Entorno de demostración.</strong> El portal todavía no tiene proveedores conectados. Todos los encuentros y números visibles al activar la demostración son ficticios y no son sugerencias deportivas reales.</p></div>
        <section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"/>{header.eyebrow}</div><h1>{header.title}</h1><p>{header.description}</p><div className="hero-tags"><span><ShieldCheck size={14}/> Fuentes auditables</span><span><BarChart3 size={14}/> Probabilidades explicadas</span><span><Target size={14}/> Sin apuestas</span></div></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="orbit-dot"/><Radar size={90} strokeWidth={0.7}/><span>RESEARCH / 0.1</span></div></section>
        {view==='radar'&&<>
          <Metrics demo={demo}/>
          <section className="section-content"><div className="section-heading"><div><span className="section-overline">CENTRO DE ANÁLISIS</span><h2>Radar de líneas deportivas</h2><p>Primero observamos mercados; después contrastamos estadísticas. Cada sugerencia, máximo 300 caracteres.</p></div><label className="demo-toggle"><span>Demostración</span><input type="checkbox" checked={demo} onChange={e=>setDemo(e.target.checked)}/><span className="switch"/></label></div>
            <div className="filters"><div className="sports-scroll">{sports.map(s=><button key={s} onClick={()=>setSport(s)} className={`chip ${sport===s?'selected':''}`}>{s}</button>)}</div><div className="filters-secondary"><label className="search-field"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar escenario..." aria-label="Buscar escenario"/></label><label className="sort-field"><SlidersHorizontal size={16}/><select value={sort} onChange={e=>setSort(e.target.value as Sort)} aria-label="Ordenar por"><option value="mercado">Mercado primero</option><option value="valor">Valor esperado*</option><option value="probabilidad">Probabilidad*</option><option value="deporte">Deporte</option></select><ChevronDown size={14}/></label><button onClick={()=>setOnlyPositive(!onlyPositive)} className={`value-filter ${onlyPositive?'on':''}`}>EV positivo*</button></div></div>
            {demo?<><div className="results-note"><span><FlaskConical size={15}/> {filtered.length} escenarios ficticios · ningún evento real</span><span>* Números sintéticos</span></div>{filtered.length?<div className="scenario-grid">{filtered.map(x=><ScenarioCard key={x.id} data={x} onOpen={()=>setSelected(x.id)}/>)}</div>:<div className="no-matches">No hay casos ficticios que coincidan con estos filtros. Prueba otra búsqueda.</div>}</>:<NoData/>}
          </section>
          <section className="insight-grid"><div className="insight-card"><div className="insight-symbol"><TrendingUp size={20}/></div><span>LECTURA DE MERCADO</span><h3>Una línea que se mueve no revela por sí sola la tendencia del público.</h3><p>Para identificar apuestas populares se necesitan métricas de volumen o distribución verificables. Sin esos datos, no afirmamos popularidad.</p><button onClick={()=>changeView('metodologia')}>Conocer el criterio <ArrowRight size={16}/></button></div><div className="insight-card quote"><span>CRITERIO EDITORIAL</span><h3>“Un favorito no siempre representa una oportunidad de valor”.</h3><p>El resultado más probable y el precio ofrecido son preguntas distintas. Ambas deben investigarse por separado.</p><button onClick={()=>changeView('lineas')}>Examinar las líneas <ArrowRight size={16}/></button></div></section>
        </>}
        {view==='lineas'&&<section className="section-content"><div className="section-heading"><div><span className="section-overline">TABLA COMPARATIVA</span><h2>Observación de precios y probabilidades</h2><p>Las cifras siguientes solo aparecen en modo demostración; no corresponden a ninguna casa.</p></div><label className="demo-toggle"><span>Demostración</span><input type="checkbox" checked={demo} onChange={e=>setDemo(e.target.checked)}/><span className="switch"/></label></div>
          {demo?<><div className="table-scroll"><table className="market-table"><thead><tr><th>ESCENARIO FICTICIO</th><th>SELECCIÓN</th><th>P(MODELO)*</th><th>P(MERCADO)*</th><th>EV*</th><th>POPULARIDAD</th><th></th></tr></thead><tbody>{scenarios.map(x=><tr key={x.id}><td><SportBadge sport={x.sport}/><strong>{x.matchup}</strong></td><td>{x.selection}</td><td>{percentage(x.probability)}</td><td>{percentage(impliedProbability(x.decimalOdds))}</td><td><EvLabel scenario={x}/></td><td className="availability">No disponible</td><td><button className="table-arrow" onClick={()=>setSelected(x.id)} aria-label={`Abrir ${x.matchup}`}><ArrowUpRight size={18}/></button></td></tr>)}</tbody></table></div><p className="table-note">* Valores totalmente inventados para ensayar la representación visual y la fórmula de EV. La P(mercado) no está ajustada por margen en estos ejemplos.</p></>:<NoData section="La tabla permanecerá vacía hasta disponer de líneas identificadas por casa, mercado y hora de consulta."/>}
          </section>}
        {view==='historial'&&<AuditHistory/>}
        {view==='metodologia'&&<Methodology/>}
        {view==='bitacora'&&<Changelog/>}
        <footer className="footer"><span>© 2026 Radar Deportivo · Producto informativo en desarrollo</span><span>No procesamos apuestas · No se garantizan resultados</span></footer>
      </main>
    </div>
    {current&&<Detail data={current} onClose={()=>setSelected(null)}/>}
  </div>;
}
