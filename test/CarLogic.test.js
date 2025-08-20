import test from 'node:test';
import assert from 'node:assert/strict';
import { CarLogic } from '../src/CarLogic.js';

test('car takes damage and is destroyed', () => {
  const car = new CarLogic();
  car.applyDamage(30);
  assert.equal(car.health, 70);
  assert.equal(car.isDestroyed(), false);
  car.applyDamage(100);
  assert.equal(car.health, 0);
  assert.equal(car.isDestroyed(), true);
});
