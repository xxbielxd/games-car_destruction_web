import test from 'node:test';
import assert from 'node:assert';
import Car from '../src/Car.js';
import type { PowerUp } from '../src/PowerUp.js';

test('Power-up de armadura expira e remove bônus', () => {
  const car = new Car('test', 100);
  const power: PowerUp = { id: 'shield', duration: 5, bonusHealth: 50 };
  car.addPowerUp(power);
  assert.equal(car.maxHealth, 150);
  assert.equal(car.health, 150);
  car.updatePowerUps(3);
  assert.equal(car.maxHealth, 150);
  car.updatePowerUps(2);
  assert.equal(car.maxHealth, 100);
  assert.equal(car.health, 100);
});
