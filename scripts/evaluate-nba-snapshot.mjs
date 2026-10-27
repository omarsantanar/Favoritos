/** Evaluación matemática de un snapshot manual. NO es un modelo predictivo. */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { expectedValue, impliedProbability, noVigProbabilities } from '../lib/probability.mjs';
const here = dirname(fileURLToPath(import.meta.url));
const input = JSON.parse(readFileSync(resolve(here, '../research/nba/2026-10-26-snapshot.json'), 'utf8'));
const americanToDecimal = ml => {
  if (!Number.isInteger(ml) || ml === 0) throw new RangeError('moneyline inválido');
  return ml > 0 ? 1 + ml / 100 : 1 + 100 / -ml;
};
const rows = input.games.map(game => {
  const decimal = americanToDecimal(game.fanduel_selected_moneyline);
  const opposite = americanToDecimal(game.fanduel_opponent_moneyline);
  const p_market = impliedProbability(decimal);
  const p_no_vig = noVigProbabilities([decimal, opposite])[0];
  const ev_third_party = expectedValue(game.source_probability, decimal);
  return {...game, decimal, p_market, p_no_vig, ev_third_party,
    divergence_pp: 100 * (game.source_probability - p_no_vig),
    model_anomaly: Math.abs(game.source_probability - p_no_vig) >= .15
  };
});
export { input, rows, americanToDecimal };
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify({disclaimer:'EV hipotético usando modelo de un tercero, no validado', odds_snapshot_local:input.odds_snapshot_local, rows},null,2));
}
