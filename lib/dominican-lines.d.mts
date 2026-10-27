export type LocalLine = {
  id:string; operator_id:string; operator_name:string; sport:string; event:string;
  market:string;selection:string;decimal_odds:number;p_mercado:number;
  observed_at_utc:string;starts_at_utc:string;certainty:'documented_manual';
  model_probability:null;popularity:null;ev:null;
};
export type LocalOperator = {
  id:string;name:string;sports_authorization:string;market_verified:boolean;verified_lines_count:number
};
export type LocalLinesView = {
  date_rd:string;operator_count:number;operators:LocalOperator[];
  lines:LocalLine[];rejected_count:number;live_feed:false;notice:string;
};
export function buildDailyPublicView(snapshot:unknown,registry:{operators:unknown[]},now?:Date):LocalLinesView;
export function validateObservation(row:unknown,operators:unknown[],now?:Date):{valid:boolean;errors:string[];operator?:unknown};
export function dateRD(date:Date):string;
export const MAX_AGE_MS:number;
export const SUPPORTED_SPORTS:readonly string[];
export const MARKETS:readonly string[];
