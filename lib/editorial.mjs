/** Validación editorial previa a publicación, independiente de la interfaz. */
export const MAX_BRIEF_CHARS = 300;
export const countCharacters = (text) => Array.from(text ?? '').length;

export function validateEditorialBrief(brief, marketObservation) {
  const errors = [];
  if (typeof brief !== 'string' || !brief.trim()) errors.push('Falta análisis editorial.');
  if (countCharacters(brief) > MAX_BRIEF_CHARS) errors.push('El análisis supera 300 caracteres.');
  if (typeof brief === 'string' && !/\bsugerencia\s*:/iu.test(brief)) errors.push('Falta sugerencia explícita.');
  if (!marketObservation || !marketObservation.market || !marketObservation.outcome ||
      !Number.isFinite(marketObservation.decimalOdds) || marketObservation.decimalOdds <= 1 ||
      !marketObservation.book || !marketObservation.observedAtUtc || !marketObservation.sourceId)
    errors.push('Primero debe existir una línea de mercado verificable con fuente, casa, precio y fecha.');
  return {valid: errors.length === 0, errors};
}
