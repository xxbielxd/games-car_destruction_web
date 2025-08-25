import { test } from 'node:test';
import assert from 'node:assert';
import Car from '../src/Car.js';
import { resetCarEntity } from '../src/Reset.js';

class Vec {
  x = 0;
  y = 0;
  z = 0;
  set(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
class Quat {
  x = 0;
  y = 0;
  z = 0;
  w = 1;
  set(x: number, y: number, z: number, w: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
}

test('resetCarEntity restaura vida e transforma', () => {
  const entity: any = {
    car: new Car('p', 100),
    body: { position: new Vec(), velocity: new Vec(), angularVelocity: new Vec(), quaternion: new Quat() },
    mesh: { position: new Vec(), quaternion: new Quat() },
  };
  entity.car.applyDamage(50);
  resetCarEntity(entity, { x: 10, y: 1, z: -5 });
  assert.equal(entity.car.health, 100);
  assert.equal(entity.body.position.x, 10);
  assert.equal(entity.body.velocity.y, 0);
  assert.equal(entity.mesh.position.z, -5);
});
