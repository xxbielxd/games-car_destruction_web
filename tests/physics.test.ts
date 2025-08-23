import { test } from 'node:test';
import assert from 'node:assert';

let Physics: any;
try {
  Physics = (await import('../src/Physics.js')).default;
} catch {
  test('Physics aplica gravidade e atrito customizados', {
    skip: 'cannon-es não disponível',
  }, () => {});
}

if (Physics) {
  test('Physics aplica gravidade e atrito customizados', () => {
    const physics = new Physics();
    assert.equal(physics.world.gravity.y, -30);
    assert(
      Math.abs(physics.world.defaultContactMaterial.friction - 0.6) < 0.001,
    );
  });
}
