-- Radar Deportivo: esquema PostgreSQL PROPUESTO, no desplegado (26-10-2026).
-- El esquema exige procedencia y separa claramente investigación de transacciones.
-- No contiene apuestas de usuarios, dinero, balances ni pasarelas de pago.

CREATE TABLE sources (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  homepage_url TEXT NOT NULL,
  license_status TEXT NOT NULL CHECK (license_status IN ('pendiente','autorizada','prohibida')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE events (
  id UUID PRIMARY KEY,
  sport TEXT NOT NULL CHECK (sport IN ('NBA','NFL','MLB','NHL','MMA','Boxeo','Hípica')),
  competition TEXT NOT NULL,
  participant_home TEXT,
  participant_away TEXT,
  venue TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  event_status TEXT NOT NULL CHECK (event_status IN ('programado','aplazado','en_curso','finalizado','cancelado')),
  verification TEXT NOT NULL CHECK (verification IN ('no_verificado','verificado','retirado')),
  source_id UUID NOT NULL REFERENCES sources(id),
  source_retrieved_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE markets (
  id UUID PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES events(id),
  market_type TEXT NOT NULL,
  line_value NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE odds_snapshots (
  id UUID PRIMARY KEY,
  market_id UUID NOT NULL REFERENCES markets(id),
  outcome TEXT NOT NULL,
  provider_name TEXT NOT NULL,
  decimal_odds NUMERIC(9,4) NOT NULL CHECK (decimal_odds > 1),
  observed_at TIMESTAMPTZ NOT NULL,
  source_id UUID NOT NULL REFERENCES sources(id),
  ingested_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX odds_market_observed_idx ON odds_snapshots(market_id, observed_at DESC);

CREATE TABLE market_popularity (
  id UUID PRIMARY KEY,
  market_id UUID NOT NULL REFERENCES markets(id),
  outcome TEXT NOT NULL,
  metric_name TEXT NOT NULL CHECK (metric_name IN ('tickets_pct','handle_pct','volume')),
  metric_value NUMERIC NOT NULL CHECK (metric_value >= 0),
  definition TEXT NOT NULL,
  denominator TEXT,
  provider_name TEXT NOT NULL,
  observed_at TIMESTAMPTZ NOT NULL,
  source_id UUID NOT NULL REFERENCES sources(id)
);

CREATE TABLE research_notes (
  id UUID PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES events(id),
  topic TEXT NOT NULL,
  claim TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('confirmado','probable','hipotesis','descartado')),
  source_id UUID REFERENCES sources(id),
  observed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE predictions (
  id UUID PRIMARY KEY,
  market_id UUID NOT NULL REFERENCES markets(id),
  outcome TEXT NOT NULL,
  model_name TEXT NOT NULL,
  model_version TEXT NOT NULL,
  probability NUMERIC(8,6) NOT NULL CHECK (probability >= 0 AND probability <= 1),
  model_cutoff_at TIMESTAMPTZ NOT NULL,
  odds_snapshot_id UUID NOT NULL REFERENCES odds_snapshots(id),
  uncertainty_notes TEXT NOT NULL,
  editorial_rationale TEXT NOT NULL,
  published_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (published_at >= model_cutoff_at)
);

CREATE TABLE official_results (
  id UUID PRIMARY KEY,
  event_id UUID NOT NULL UNIQUE REFERENCES events(id),
  result_json JSONB NOT NULL,
  source_id UUID NOT NULL REFERENCES sources(id),
  confirmed_at TIMESTAMPTZ NOT NULL
);

-- En producción: función/trigger o permisos de DB para impedir UPDATE/DELETE
-- de odds_snapshots, predictions y official_results; almacenamiento append-only
-- y auditoría externa, tras revisar la política de rectificaciones.
