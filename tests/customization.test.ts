import test from 'node:test';
import assert from 'node:assert';

import { setCarColor } from '../src/Customization.js';

test('setCarColor altera cor do material', () => {
  const entity = { material: { color: { value: 0, set(c: number) { this.value = c; } } } };
  setCarColor(entity as any, 0xff0000);
  assert.equal(entity.material.color.value, 0xff0000);
});
