import { test } from 'node:test';
import assert from 'node:assert';
import { Body, World } from '../src/stubs/cannon-es.js';

test('Body quaternion aceita setFromEuler', () => {
  const b = new Body();
  b.quaternion.setFromEuler(1, 2, 3);
  const e: any = { x: 0, y: 0, z: 0 };
  b.quaternion.toEuler(e);
  assert.deepStrictEqual(e, { x: 1, y: 2, z: 3 });
});

test('Body quaternion aceita set', () => {
  const b = new Body();
  b.quaternion.set(1, 2, 3, 4);
  assert.deepStrictEqual(
    { x: b.quaternion.x, y: b.quaternion.y, z: b.quaternion.z, w: b.quaternion.w },
    { x: 1, y: 2, z: 3, w: 4 },
  );
});

test('World gerencia array bodies', () => {
  const world = new World();
  const body = new Body();
  world.addBody(body);
  assert.ok(world.bodies.includes(body));
  world.removeBody(body);
  assert.ok(!world.bodies.includes(body));
});
