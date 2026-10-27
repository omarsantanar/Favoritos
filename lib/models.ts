export const sports = ["Todos", "NBA", "NFL", "MLB", "NHL", "MMA", "Boxeo"] as const;
export type Sport = Exclude<(typeof sports)[number], "Todos">;
export type SportFilter = (typeof sports)[number];

export type Confidence = "Alta" | "Media" | "Baja";

export interface Scenario {
  id: string;
  sport: Sport;
  matchup: string;
  competition: string;
  selection: string;
  market: string;
  probability: number;
  decimalOdds: number;
  confidence: Confidence;
  spark: number[];
  summary: string;
  brief: string;
  favorable: string[];
  adverse: string[];
  evidence: {label: string; value: string}[];
  sourceStatus: "Ficticia";
  marketPopularity: null;
}
