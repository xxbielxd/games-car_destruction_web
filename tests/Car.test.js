import assert from 'assert';
import Car from '../dist/Car.js';

function test(description, fn) {
  try {
    fn();
    console.log('✓', description);
  } catch (err) {
    console.error('✗', description);
    console.error(err);
    process.exitCode = 1;
  }
}

test('reduz a vida quando recebe dano', () => {
  const car = new Car();
  car.takeDamage(30);
  assert.strictEqual(car.health, 70);
});

test('considera defesa ao receber dano', () => {
  const car = new Car(100, { defense: 10, speed: 0, attack: 0 });
  car.takeDamage(30);
  assert.strictEqual(car.health, 80);
});

test('indica destruição quando a vida chega a zero', () => {
  const car = new Car();
  car.takeDamage(200);
  assert.ok(car.isDestroyed());
});
