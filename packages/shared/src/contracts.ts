/** Contratos preliminares para web y una futura aplicación móvil. */
export type VerificationStatus = 'ficticio' | 'no_verificado' | 'verificado' | 'retirado';
export type Discipline = 'NBA' | 'NFL' | 'MLB' | 'NHL' | 'MMA' | 'Boxeo' | 'Hípica';

export interface SourceReference {
  id: string;
  label: string;
  uri: string;
  retrievedAtUtc: string;
  licenseStatus: 'pendiente' | 'autorizada' | 'prohibida';
}

export interface MarketObservation {
  id: string;
  eventId: string;
  market: string;
  outcome: string;
  decimalOdds: number;
  book: string;
  observedAtUtc: string;
  verification: VerificationStatus;
  sourceId: string;
  popularity?: { metric: 'tickets_pct' | 'handle_pct' | 'volume'; value: number; sample?: string; observedAtUtc: string; sourceId: string };
}

export interface ResearchAssessment {
  eventId: string;
  /** Obligatorio para publicar: primero registrar mercado, luego evaluar datos deportivos. */
  marketObservationId?: string;
  /** Texto público de máximo 300 caracteres e incluye 'Sugerencia:'. */
  brief?: string;
  verification: 'verificado' | 'no_verificado';
  modelId?: string;
  modelVersion?: string;
  estimatedProbability?: number;
  uncertainty?: string;
  evidenceSourceIds: string[];
  publishedAtUtc?: string;
  disposition: 'publicable' | 'sin_seleccion' | 'pendiente';
}
