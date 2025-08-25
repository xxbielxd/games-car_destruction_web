import { test } from 'node:test';
import assert from 'node:assert';
import GameState from '../src/GameState.js';

test('iniciar imediatamente reinicia variáveis de câmera sem erro', () => {
  const menuEl: any = { style: { display: 'none' } };
  const msgEl: any = { textContent: '' };
  const btnEl: any = { textContent: '', addEventListener: () => {} };
  let camYaw = 5;
  let camPitch = 5;
  const gs = new GameState(menuEl, msgEl, btnEl, () => {
    camYaw = 0;
    camPitch = 0;
  });
  assert.doesNotThrow(() => gs.start());
  assert.equal(camYaw, 0);
  assert.equal(camPitch, 0);
});
