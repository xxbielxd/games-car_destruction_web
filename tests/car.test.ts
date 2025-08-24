import test from 'node:test';
import assert from 'node:assert';
import Car from '../src/Car.js';

test('Car inicia com vida base aumentada', () => {
  const car = new Car('test');
  assert.equal(car.maxHealth, 200);
  assert.equal(car.health, 200);
});

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

test('Car recebe upgrade de armadura aumentando vida', () => {
  const car = new Car('test', 100);
  car.applyDamage(30);
  car.addUpgrade({ id: 'armor', bonusHealth: 50 });
  assert.equal(car.maxHealth, 150);
  assert.equal(car.health, 120);
  assert.equal(car.upgrades.length, 1);
});
