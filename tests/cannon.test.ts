import { test } from 'node:test';
import assert from 'node:assert';
import { Body } from '../src/stubs/cannon-es.js';

test('Body quaternion aceita setFromEuler', () => {
  const b = new Body();
  b.quaternion.setFromEuler(1, 2, 3);
  const e: any = { x: 0, y: 0, z: 0 };
  b.quaternion.toEuler(e);
  assert.deepStrictEqual(e, { x: 1, y: 2, z: 3 });
});
