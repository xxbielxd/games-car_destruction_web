import test, { mock } from 'node:test';
import assert from 'node:assert';
import Sound from '../src/Sound.js';

test('Sound reproduz áudio de colisão e destruição', () => {
  const playFn = mock.fn(() => Promise.resolve());

  class FakeAudio {
    currentTime = 0;
    play = playFn;
    constructor(_src?: string) {}
  }

  const OriginalAudio = (globalThis as any).Audio;
  (globalThis as any).Audio = FakeAudio as any;

  const sound = new Sound('collision.wav', 'destruction.wav');
  sound.playCollision();
  sound.playDestruction();

  assert.equal(playFn.mock.callCount(), 2);

  if (OriginalAudio) (globalThis as any).Audio = OriginalAudio;
});
