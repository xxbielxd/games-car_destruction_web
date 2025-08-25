import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { normalizeKey, mapArrow } from '../src/Input.js';

test('mapArrow converte setas para WASD', () => {
  assert.equal(mapArrow(normalizeKey('ArrowUp')), 'w');
  assert.equal(mapArrow(normalizeKey('ArrowDown')), 's');
  assert.equal(mapArrow(normalizeKey('ArrowLeft')), 'a');
  assert.equal(mapArrow(normalizeKey('ArrowRight')), 'd');
});
