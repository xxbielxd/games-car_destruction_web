import { test } from 'node:test';
import assert from 'node:assert';
import GameState from '../src/GameState.js';

test('GameState inicia no menu e transiciona', () => {
  const menuEl: any = { style: { display: 'none' } };
  const msgEl: any = { textContent: '' };
  const btnEl: any = { textContent: '', addEventListener: () => {} };
  let started = false;
  const gs = new GameState(menuEl, msgEl, btnEl, () => {
    started = true;
  });
  assert.equal(gs.isPlaying(), false);
  gs.start();
  assert.equal(started, true);
  assert.equal(gs.isPlaying(), true);
  gs.gameOver();
  assert.equal(gs.isPlaying(), false);
  assert(msgEl.textContent.includes('Game Over'));
  assert.equal(btnEl.textContent, 'Reiniciar');
});
