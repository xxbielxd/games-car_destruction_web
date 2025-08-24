import test from 'node:test';
import assert from 'node:assert';
import { computeCameraOffset } from '../src/Camera.js';

test('computeCameraOffset aplica yaw corretamente', () => {
  const base = { x: 0, y: 0, z: 10 };
  const offset = computeCameraOffset(base, Math.PI / 2, 0, {
    x: 0,
    y: 0,
    z: 0,
    w: 1,
  });
  assert(Math.abs(offset.x - 10) < 1e-6);
  assert(Math.abs(offset.z) < 1e-6);
});

