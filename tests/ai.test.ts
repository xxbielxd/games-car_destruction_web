import test from 'node:test';
import assert from 'node:assert';
import { pursuePlayer } from '../src/EnemyAI.js';

class StubVec3 {
  x: number;
  y: number;
  z: number;
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  vsub(other: StubVec3) {
    return new StubVec3(this.x - other.x, this.y - other.y, this.z - other.z);
  }
  length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }
  normalize() {
    const len = this.length();
    if (len > 0) {
      this.x /= len;
      this.y /= len;
      this.z /= len;
    }
    return this;
  }
  scale(s: number, target: StubVec3 = this) {
    target.x *= s;
    target.y *= s;
    target.z *= s;
    return target;
  }
  clone() {
    return new StubVec3(this.x, this.y, this.z);
  }
}

test('pursuePlayer aplica força em direção ao player', () => {
  let applied: StubVec3 | null = null;
  const enemyBody: any = {
    position: new StubVec3(0, 0, 0),
    angularVelocity: { y: 0 },
    applyForce: (force: StubVec3) => {
      applied = force.clone();
    },
  };
  const playerPos = new StubVec3(10, 0, 0);
  pursuePlayer(enemyBody, playerPos, () => 0.5);
  assert(applied !== null);
  assert(applied!.x > 0);
  assert.equal(enemyBody.angularVelocity.y, 0);
});
