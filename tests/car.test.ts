import test from 'node:test';
import assert from 'node:assert';
import Car from '../src/Car.js';

test('Car perde vida ao receber dano', () => {
  const car = new Car('test', 100);
  car.applyDamage(30);
  assert.equal(car.health, 70);
});

test('Car é destruído quando a vida chega a zero', () => {
  const car = new Car('test', 50);
  car.applyDamage(60);
  assert.equal(car.isDestroyed(), true);
});
