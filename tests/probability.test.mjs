import test from 'node:test';
import assert from 'node:assert/strict';
import { expectedValue, impliedProbability, noVigProbabilities, percentage } from '../lib/probability.mjs';

test('probabilidad implícita sin margen', () => {
  assert.equal(impliedProbability(2), 0.5);
  assert.ok(Math.abs(impliedProbability(1.8) - 0.555555555555) < 1e-9);
});

test('valor esperado positivo y negativo', () => {
  assert.ok(Math.abs(expectedValue(0.58, 1.88) - 0.0904) < 1e-9);
  assert.ok(Math.abs(expectedValue(0.62, 1.54) + 0.0452) < 1e-9);
});

test('rechazar entradas invalidas', () => {
  assert.throws(() => impliedProbability(1), RangeError);
  assert.throws(() => expectedValue(1.2, 2), RangeError);
  assert.throws(() => expectedValue(NaN, 2), RangeError);
});

test('formateo de porcentajes', () => {
  assert.equal(percentage(0.58), '58.0%');
});

test('mercado completo ajustado por margen', () => {
  const adjusted = noVigProbabilities([1.8, 2.0]);
  assert.ok(Math.abs(adjusted.reduce((a,b)=>a+b,0)-1)<1e-12);
  assert.ok(adjusted[0]>adjusted[1]);
  assert.throws(()=>noVigProbabilities([2]),RangeError);
  assert.throws(()=>noVigProbabilities([1.5,0]),RangeError);
});
