"""Tests deterministas sin Internet para los importadores estadísticos."""
import gzip
import io
import json
from pathlib import Path
import tempfile
import unittest

from scripts.ingest_advanced import aggregate_nfl, aggregate_mlb, load_rows, make_snapshot, write_snapshot, _check_host

NFL = (
    "season,season_type,week,posteam,defteam,play_type,epa\n"
    "2026,REG,1,DAL,NYG,pass,0.3\n"
    "2026,REG,1,DAL,NYG,pass,0.1\n"
    "2026,REG,1,DAL,NYG,run,-0.2\n"
    "2026,REG,1,NYG,DAL,pass,-0.5\n"
    "2026,REG,1,DAL,NYG,kickoff,0.9\n"
    "2026,POST,19,DAL,NYG,pass,40.0\n"
    "2025,REG,1,DAL,NYG,pass,40.0\n"
).encode()
MLB = (
    "yearID,lgID,teamID,AB,H,2B,3B,HR,BB,HBP,SF\n"
    "2025,AL,ABC,100,30,5,0,3,10,1,2\n"
    "2025,AL,ABC,50,10,1,1,0,5,0,1\n"
    "2025,NL,DEF,100,20,3,0,2,10,0,1\n"
    "2024,AL,ABC,900,800,0,0,0,100,0,0\n"
).encode()

class TestIngestion(unittest.TestCase):
    def test_nfl_epa_filters_and_team_splits(self):
        d = aggregate_nfl(load_rows(gzip.compress(NFL), compressed=True), 2026)
        self.assertEqual(d["observations"], 4)
        teams = {r["team"]: r for r in d["teams"]}
        self.assertEqual(teams["DAL"]["plays"], 3)
        self.assertEqual(teams["DAL"]["epa_per_play"], 0.0667)
        self.assertEqual(teams["DAL"]["pass_epa_per_play"], 0.2)
        self.assertEqual(teams["DAL"]["run_epa_per_play"], -0.2)
        self.assertEqual(teams["NYG"]["epa_per_play"], -0.5)

    def test_mlb_derived_stats_and_year(self):
        d = aggregate_mlb(load_rows(MLB), 2025)
        self.assertEqual(d["observations"], 3)
        teams = {r["team"]: r for r in d["teams"]}
        self.assertEqual(teams["ABC"]["plate_stat_lines"], 2)
        self.assertEqual(teams["ABC"]["at_bats"], 150)
        self.assertAlmostEqual(teams["ABC"]["obp"], 51/169, places=4)
        # Singles = 30+10-(5+1+1+0+3+0) = 30; total bases = 40 +6+2+9=57
        self.assertAlmostEqual(teams["ABC"]["slg"], 57/150, places=4)

    def test_missing_year_rejected(self):
        with self.assertRaisesRegex(ValueError, "no presente"):
            aggregate_mlb(load_rows(MLB), 2026)

    def test_source_allowlist_and_fixture_label(self):
        with self.assertRaises(ValueError):
            _check_host("https://nba.com/stats")
        with self.assertRaises(ValueError):
            _check_host("http://github.com/nflverse/nflverse-data")
        with self.assertRaises(ValueError):
            _check_host("https://github.com.evil.example/x")
        snap = make_snapshot("nflverse_pbp", 2026, gzip.compress(NFL), is_fixture=True)
        self.assertEqual(snap["input_mode"], "fixture")
        self.assertIsNone(snap["source_retrieved_at_utc"])
        self.assertIsNone(snap["model_probability"])
        self.assertIsNone(snap["market_data"])
        self.assertFalse(snap["published_prediction"])
        self.assertEqual(len(snap["payload_sha256"]), 64)

    def test_snapshot_atomic_and_invalid_source(self):
        with tempfile.TemporaryDirectory() as tmp:
            filename = Path(tmp, "data.json")
            snap = make_snapshot("lahman_batting", 2025, MLB, is_fixture=True)
            write_snapshot(snap, filename)
            self.assertEqual(json.loads(filename.read_text())["source_id"], "lahman_batting")
        with self.assertRaisesRegex(ValueError, "autorizada"):
            make_snapshot("nba_site_scraping", 2026, b"", is_fixture=True)

if __name__ == "__main__":
    unittest.main()
