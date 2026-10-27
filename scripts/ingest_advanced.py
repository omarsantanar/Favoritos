#!/usr/bin/env python3
"""Importación restringida de datasets expresamente publicados para reutilización.

No extrae HTML ni interactúa con casas de apuestas, NBA.com, NHL.com, UFCStats o BoxRec.
Solo descargas concretas de nflverse (CC BY 4.0) y SABR/Lahman (CC BY-SA 3.0).
Los resultados se conservan para revisión; nunca activan pronósticos públicos.
"""
import argparse
import csv
import datetime as dt
import gzip
import io
import json
import math
import os
from pathlib import Path
import tempfile
from urllib.parse import urlparse
from urllib.request import HTTPRedirectHandler, Request, build_opener

MAX_DOWNLOAD_BYTES = 30_000_000
MAX_ROWS = 450_000
ALLOWED_HOSTS = frozenset({
    "github.com", "release-assets.githubusercontent.com",
    "objects.githubusercontent.com", "raw.githubusercontent.com",
})
USER_AGENT = "FavoritosResearch/0.2 (open data importer; GitHub omarsantanar/Favoritos)"
SOURCES = {
    "nflverse_pbp": {
        "sport": "NFL", "licensed": "CC BY 4.0",
        "credit": "nflverse (and upstream providers as applicable)",
        "url": "https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_{season}.csv.gz",
        "seasons": range(1999, 2027),
        "freshness": "La actualización real depende del release; fecha de consulta no es fecha de juego.",
    },
    "lahman_batting": {
        "sport": "MLB", "licensed": "CC BY-SA 3.0",
        "credit": "Sean Lahman y SABR; réplica no oficial cbwinslow, versión 2025",
        "url": "https://raw.githubusercontent.com/cbwinslow/lahman-database-csv/main/data/Batting.csv",
        "seasons": range(1871, 2026),
        "freshness": "Históricos solo hasta 2025; no incluye alineaciones actuales ni Statcast.",
    },
}

def _check_host(url):
    p = urlparse(url)
    if p.scheme != "https" or p.username or p.password or p.hostname not in ALLOWED_HOSTS:
        raise ValueError("Destino de extracción no autorizado")

class SafeRedirects(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        _check_host(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)

def download(url):
    _check_host(url)
    with build_opener(SafeRedirects()).open(
        Request(url, headers={"User-Agent": USER_AGENT, "Accept": "text/csv,application/gzip,application/octet-stream"}),
        timeout=40,
    ) as response:
        _check_host(response.geturl())
        if int(response.headers.get("Content-Length", 0)) > MAX_DOWNLOAD_BYTES:
            raise ValueError("Archivo supera límite máximo de descarga")
        parts = []
        size = 0
        while True:
            block = response.read(65536)
            if not block:
                break
            size += len(block)
            if size > MAX_DOWNLOAD_BYTES:
                raise ValueError("Descarga excede límite permitido")
            parts.append(block)
    return b"".join(parts)

def load_rows(payload, compressed=False):
    stream = gzip.GzipFile(fileobj=io.BytesIO(payload)) if compressed else io.BytesIO(payload)
    csv.field_size_limit(100_000)
    with io.TextIOWrapper(stream, encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        if not reader.fieldnames:
            raise ValueError("CSV sin cabecera")
        for i, row in enumerate(reader):
            if i >= MAX_ROWS:
                raise ValueError("Demasiadas filas: detener ingesta")
            yield row

def number(row, col, default=None):
    value = row.get(col)
    if value in (None, "", "NA", "NULL"):
        return default
    try:
        n = float(value)
        return n if math.isfinite(n) else default
    except (ValueError, TypeError):
        return default

def aggregate_nfl(rows, season):
    by_team = {}
    total = 0
    for row in rows:
        if int(number(row, "season", -1)) != season:
            continue
        if str(row.get("play_type", "")).strip().lower() not in ("pass", "run"):
            continue
        if str(row.get("season_type", "REG")) != "REG":
            continue
        team = str(row.get("posteam") or "").strip()
        epa = number(row, "epa")
        if not team or epa is None:
            continue
        play_type = str(row["play_type"]).lower()
        bucket = by_team.setdefault(team, {"plays": 0, "epa_sum": 0.0, "pass_plays": 0,
                                            "pass_epa": 0.0, "run_plays": 0, "run_epa": 0.0})
        bucket["plays"] += 1
        bucket["epa_sum"] += epa
        bucket[play_type + "_plays"] += 1
        bucket[play_type + "_epa"] += epa
        total += 1
    if total < 1:
        raise ValueError("No hay jugadas válidas para temporada NFL solicitada")
    teams = []
    for name, x in sorted(by_team.items()):
        teams.append({"team": name, "plays": x["plays"],
                      "epa_per_play": round(x["epa_sum"] / x["plays"], 4),
                      "pass_epa_per_play": round(x["pass_epa"] / x["pass_plays"], 4) if x["pass_plays"] else None,
                      "run_epa_per_play": round(x["run_epa"] / x["run_plays"], 4) if x["run_plays"] else None})
    return {"aggregation": "offensive EPA per pass/run, regular season, team; no adjustment for opponents",
            "observations": total, "teams": teams}

def aggregate_mlb(rows, season):
    by_team = {}
    observations = 0
    for row in rows:
        if int(number(row, "yearID", -1)) != season or row.get("lgID") not in ("AL", "NL"):
            continue
        team = str(row.get("teamID") or "").strip()
        if not team:
            continue
        vals = [number(row, key, 0) for key in ("AB", "H", "2B", "3B", "HR", "BB", "HBP", "SF")]
        if any(v < 0 for v in vals):
            continue
        bucket = by_team.setdefault(team, {key: 0 for key in ("AB", "H", "2B", "3B", "HR", "BB", "HBP", "SF")})
        for key, value in zip(bucket, vals):
            bucket[key] += value
        observations += 1
    if not by_team:
        raise ValueError("Temporada MLB no presente en el archivo histórico")
    teams = []
    for team, x in sorted(by_team.items()):
        at_bats = x["AB"]
        obp_den = at_bats + x["BB"] + x["HBP"] + x["SF"]
        bases = x["H"] + x["2B"] + 2 * x["3B"] + 3 * x["HR"]
        obp = (x["H"] + x["BB"] + x["HBP"]) / obp_den if obp_den else None
        slg = bases / at_bats if at_bats else None
        teams.append({"team": team, "plate_stat_lines": observations, "at_bats": int(at_bats),
                      "obp": round(obp, 4) if obp is not None else None,
                      "slg": round(slg, 4) if slg is not None else None,
                      "ops": round(obp + slg, 4) if obp is not None and slg is not None else None})
    return {"aggregation": "historical team OBP, SLG and OPS; AL/NL only, not live or Statcast",
            "observations": observations, "teams": teams}

def make_snapshot(source_id, season, payload, retrieved_at=None):
    if source_id not in SOURCES:
        raise ValueError("Fuente no autorizada")
    spec = SOURCES[source_id]
    if season not in spec["seasons"]:
        raise ValueError("Temporada fuera de la cobertura licenciada; no usar datos inexistentes")
    content = aggregate_nfl(load_rows(payload, compressed=True), season) if source_id == "nflverse_pbp" else aggregate_mlb(load_rows(payload), season)
    return {
        "schema_version": 1, "status": "research_only", "published_prediction": False,
        "source_id": source_id, "sport": spec["sport"], "season": season,
        "source_url": spec["url"].format(season=season), "license": spec["licensed"],
        "attribution": spec["credit"], "source_retrieved_at_utc": retrieved_at or dt.datetime.now(dt.timezone.utc).isoformat(),
        "source_data_updated_at_utc": None, "freshness_caveat": spec["freshness"],
        "market_data": None, "market_popularity": None, "model_probability": None,
        **content,
    }

def write_snapshot(snapshot, path):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile("w", encoding="utf-8", dir=path.parent, delete=False) as f:
        staging = f.name
        json.dump(snapshot, f, ensure_ascii=False, indent=2, allow_nan=False)
        f.write("\n")
    os.replace(staging, path)

def main():
    parser = argparse.ArgumentParser(description="Importación aprobada de datos deportivos: uso de investigación, no publicación")
    parser.add_argument("--source", choices=sorted(SOURCES), required=True)
    parser.add_argument("--season", type=int, required=True)
    parser.add_argument("--out", default="research/stats", help="Carpeta de salida del snapshot no publicado")
    parser.add_argument("--fixture", help="Ruta CSV local para probar sin red")
    args = parser.parse_args()
    spec = SOURCES[args.source]
    if args.season not in spec["seasons"]:
        parser.error("Temporada no disponible; no inventar registros.")
    payload = Path(args.fixture).read_bytes() if args.fixture else download(spec["url"].format(season=args.season))
    snapshot = make_snapshot(args.source, args.season, payload)
    path = Path(args.out) / f"{args.source}_{args.season}.json"
    write_snapshot(snapshot, path)
    print(f"OK: {args.source} temporada={args.season}, equipos={len(snapshot['teams'])}, filas={snapshot['observations']}")
    print(f"Artefacto para investigación: {path}. No habilita predicciones públicas.")

if __name__ == "__main__":
    main()
