import { test } from 'node:test';
import assert from 'node:assert';
import GameState from '../src/GameState.js';

test('GameState inicia no menu e transiciona', () => {
  const menuEl: any = { style: { display: 'none' } };
  const msgEl: any = { textContent: '' };
  const gs = new GameState(menuEl, msgEl);
  assert.equal(gs.isPlaying(), false);
  gs.start();
  assert.equal(gs.isPlaying(), true);
  gs.gameOver();
  assert.equal(gs.isPlaying(), false);
  assert(msgEl.textContent.includes('Game Over'));
});
