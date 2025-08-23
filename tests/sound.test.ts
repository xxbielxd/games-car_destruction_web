import test, { mock } from 'node:test';
import assert from 'node:assert';
import Sound from '../src/Sound.js';

test('Sound reproduz efeitos e música de fundo', () => {
  const playFn = mock.fn(() => Promise.resolve());

  class FakeAudio {
    currentTime = 0;
    loop = false;
    playbackRate = 1;
    play = playFn;
    pause = () => {};
    constructor(_src?: string) {}
  }

  const OriginalAudio = (globalThis as any).Audio;
  (globalThis as any).Audio = FakeAudio as any;

  const sound = new Sound('collision.wav', 'destruction.wav', 'bg.mp3');
  sound.playCollision();
  sound.playDestruction();
  sound.playBackground();
  sound.setBackgroundIntensity(1.5);

  assert.equal(playFn.mock.callCount(), 3);
  assert.equal((sound as any).backgroundAudio.playbackRate, 1.5);

  if (OriginalAudio) (globalThis as any).Audio = OriginalAudio;
});
