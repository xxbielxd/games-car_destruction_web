import { test } from 'node:test';
import assert from 'node:assert';
import { syncEntityMeshes } from '../src/entitySync.js';

test('syncEntityMeshes copia posicao e orientacao', () => {
  let pos: any = null;
  let quat: any = null;
  const mesh = {
    position: { copy: (p: any) => { pos = p; } },
    quaternion: { copy: (q: any) => { quat = q; } },
  };
  const body = { position: { x: 1 }, quaternion: { y: 2 } };
  syncEntityMeshes([{ mesh, body }]);
  assert.strictEqual(pos, body.position);
  assert.strictEqual(quat, body.quaternion);
});
