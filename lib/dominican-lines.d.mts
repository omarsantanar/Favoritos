declare module '@/lib/dominican-lines.mjs' {
  export function buildDailyPublicView(snapshot:unknown,registry:unknown, now?:Date):{
    date_rd:string;operator_count:number;
    operators:{id:string;name:string;sports_authorization:string;market_verified:boolean;verified_lines_count:number}[];
    lines:{id:string;operator_id:string;operator_name:string;sport:string;event:string;market:string;selection:string;decimal_odds:number;p_mercado:number;observed_at_utc:string;starts_at_utc:string;certainty:string;model_probability:null;popularity:null;ev:null}[];
    rejected_count:number;live_feed:boolean;notice:string;
  };
}
