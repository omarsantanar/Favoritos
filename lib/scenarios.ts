import type { Scenario } from "./models";
import demoBriefs from "../config/demo-briefs.json";

/** Escenarios totalmente FICTICIOS para comprobar la interfaz. No representan eventos programados. */
export const scenarios: Scenario[] = [
  {
    id: "demo-nba", sport: "NBA", matchup: "Aurora vs. Boreal", competition: "Escenario simulado · Baloncesto",
    selection: "Aurora gana", market: "Ganador", probability: 0.58, decimalOdds: 1.88, confidence: "Media",
    spark: [1.98, 1.97, 1.94, 1.96, 1.92, 1.9, 1.88],
    brief: demoBriefs.nba,
    summary: "Ejemplo de contraste entre una probabilidad estimada y una cuota hipotética. No es un pronóstico deportivo real.",
    favorable: ["Supuesto: eficiencia ofensiva superior", "Supuesto: descanso adicional"],
    adverse: ["Ausencias y quintetos no verificados", "La estimación es un parámetro sintético, no un modelo entrenado"],
    evidence: [{ label: "Rating", value: "Ilustrativo" }, {label:"Lesiones",value:"Sin verificar"}, {label:"Muestra",value:"Ficticia"}],
    sourceStatus: "Ficticia", marketPopularity: null
  },
  {
    id: "demo-nfl", sport: "NFL", matchup: "Pioneros vs. Titanes", competition: "Escenario simulado · Fútbol americano",
    selection: "Pioneros gana", market: "Ganador", probability: 0.55, decimalOdds: 1.92, confidence: "Baja",
    spark: [1.85, 1.87, 1.9, 1.91, 1.9, 1.93, 1.92],
    brief: demoBriefs.nfl,
    summary: "Muestra cómo se documentarán los factores de viento y protección del quarterback antes de publicar una selección.",
    favorable: ["Supuesto: mayor eficiencia por jugada", "Supuesto: mejores equipos especiales"],
    adverse: ["El viento y la alineación son desconocidos", "Popularidad del mercado no disponible"],
    evidence: [{label:"EPA",value:"Ilustrativo"},{label:"Clima",value:"Sin verificar"},{label:"QB",value:"Sin verificar"}],
    sourceStatus: "Ficticia", marketPopularity: null
  },
  {
    id: "demo-mlb", sport: "MLB", matchup: "Cometas vs. Marineros", competition: "Escenario simulado · Béisbol",
    selection: "Cometas gana", market: "Ganador", probability: 0.52, decimalOdds: 2.02, confidence: "Baja",
    spark: [2.14, 2.08, 2.1, 2.04, 2.02, 2.01, 2.02],
    brief: demoBriefs.mlb,
    summary: "Prototipo de evaluación de abridores, bullpen y parque. Ningún lanzador ni encuentro está confirmado.",
    favorable: ["Supuesto: buen rendimiento ante lanzadores zurdos"],
    adverse: ["Abridor y bullpen sin confirmar", "El viento podría alterar los totales"],
    evidence: [{label:"FIP",value:"Ilustrativo"},{label:"Abridor",value:"Sin verificar"},{label:"Parque",value:"Ficticio"}],
    sourceStatus: "Ficticia", marketPopularity: null
  },
  {
    id: "demo-nhl", sport: "NHL", matchup: "Glaciares vs. Lobos", competition: "Escenario simulado · Hockey",
    selection: "Glaciares gana", market: "Ganador", probability: 0.62, decimalOdds: 1.54, confidence: "Media",
    spark: [1.63, 1.61, 1.58, 1.59, 1.57, 1.55, 1.54],
    brief: demoBriefs.nhl,
    summary: "Ejemplo de favorito estadístico sin valor positivo: ser favorito no implica una buena línea.",
    favorable: ["Supuesto: mayor producción de goles esperados"],
    adverse: ["Cuota insuficiente frente a la probabilidad propuesta", "Portero titular no confirmado"],
    evidence: [{label:"xG",value:"Ilustrativo"},{label:"Portero",value:"Sin verificar"},{label:"Cuota",value:"Ficticia"}],
    sourceStatus: "Ficticia", marketPopularity: null
  },
  {
    id: "demo-mma", sport: "MMA", matchup: "Atleta Azul vs. Atleta Rojo", competition: "Escenario simulado · Artes marciales mixtas",
    selection: "Atleta Azul gana", market: "Ganador", probability: 0.56, decimalOdds: 1.94, confidence: "Baja",
    spark: [2.04, 2.0, 1.99, 1.97, 1.98, 1.95, 1.94],
    brief: demoBriefs.mma,
    summary: "Demostración del análisis de estilos, defensa de derribos y control de suelo. No hay competidores reales.",
    favorable: ["Supuesto: ventaja en defensa de derribos", "Supuesto: mejor volumen de golpeo"],
    adverse: ["Campamento, pesaje y lesiones no verificados", "Sin estadísticas contrastadas"],
    evidence: [{label:"SLpM",value:"Ilustrativo"},{label:"Def. TD",value:"Ilustrativo"},{label:"Pesaje",value:"Sin verificar"}],
    sourceStatus: "Ficticia", marketPopularity: null
  },
  {
    id: "demo-boxeo", sport: "Boxeo", matchup: "Púgil Norte vs. Púgil Sur", competition: "Escenario simulado · Boxeo",
    selection: "Púgil Norte gana", market: "Ganador", probability: 0.54, decimalOdds: 1.76, confidence: "Baja",
    spark: [1.72,1.75,1.77,1.78,1.75,1.76,1.76],
    brief: demoBriefs.boxeo,
    summary: "Demuestra cómo diferenciar favorabilidad deportiva de valor matemático y cómo registrar pesajes.",
    favorable: ["Supuesto: alcance superior"], adverse: ["Cuota demasiado corta", "Pesaje y oposición anteriores no comprobados"],
    evidence: [{label:"Alcance",value:"Ilustrativo"},{label:"Pesaje",value:"Sin verificar"},{label:"Cuota",value:"Ficticia"}],
    sourceStatus: "Ficticia", marketPopularity: null
  }
];
