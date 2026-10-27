/** Cálculos transparentes de presentación. No son un modelo deportivo predictivo. */
export function impliedProbability(decimalOdds) {
  if (typeof decimalOdds !== 'number' || !Number.isFinite(decimalOdds) || decimalOdds <= 1) throw new RangeError('La cuota decimal debe ser mayor que 1');
  return 1 / decimalOdds;
}

/** Retira proporcionalmente el margen cuando se dispone del mercado completo.
 * No aplicar sobre selecciones de casas o momentos diferentes.
 */
export function noVigProbabilities(decimalOdds) {
  if (!Array.isArray(decimalOdds) || decimalOdds.length < 2) throw new RangeError('Se necesitan al menos dos resultados de un mismo mercado');
  const implied = decimalOdds.map(impliedProbability);
  const total = implied.reduce((sum, p) => sum + p, 0);
  if (!Number.isFinite(total) || total <= 0) throw new RangeError('Mercado no válido');
  return implied.map(p => p / total);
}

export function expectedValue(modelProbability, decimalOdds) {
  if (typeof modelProbability !== 'number' || !Number.isFinite(modelProbability) || modelProbability < 0 || modelProbability > 1) throw new RangeError('P(modelo) debe estar entre 0 y 1');
  return modelProbability * decimalOdds - 1;
}

export function percentage(n, decimals = 1) {
  return `${(100 * n).toFixed(decimals)}%`;
}
