import { test } from 'node:test';
import assert from 'node:assert';
import { directionalDamage } from '../src/Damage.js';

class StubVec3 {
  x: number; y: number; z: number;
  constructor(x=0,y=0,z=0){this.x=x;this.y=y;this.z=z;}
  vsub(o: StubVec3){return new StubVec3(this.x - o.x, this.y - o.y, this.z - o.z);} 
}

class IdentityQuat {
  vmult(v: any, target: any){ target.x=v.x; target.y=v.y; target.z=v.z; }
}

test('directionalDamage aplica menos dano frontal', () => {
  const body: any = { position: new StubVec3(0,0,0), quaternion: new IdentityQuat() };
  const front = directionalDamage(body, new StubVec3(0,0,-5));
  const side = directionalDamage(body, new StubVec3(5,0,0));
  assert.equal(front, 5);
  assert.equal(side, 15);
});
