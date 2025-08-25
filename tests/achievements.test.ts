import { test } from 'node:test';
import assert from 'node:assert';
import Achievements from '../src/Achievements.js';

test('Desbloqueia Primeira Morte na primeira kill', () => {
  const ach = new Achievements();
  const title = ach.registerKill();
  assert.equal(title, 'Primeiro Abate');
  assert.equal(ach.has('first_blood'), true);
  assert.equal(ach.registerKill(), null);
});
