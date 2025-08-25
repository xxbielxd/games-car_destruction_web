import { applyCarControls } from '../src/Controls.js';
import { test } from 'node:test';
import { strict as assert } from 'node:assert';

class StubVec3 {
  x: number;
  y: number;
  z: number;
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  clone() {
    return new StubVec3(this.x, this.y, this.z);
  }
  scale(s: number, target: StubVec3 = this) {
    target.x = this.x * s;
    target.y = this.y * s;
    target.z = this.z * s;
    return target;
  }
  dot(v: StubVec3) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  vsub(v: StubVec3, target: StubVec3) {
    target.x = this.x - v.x;
    target.y = this.y - v.y;
    target.z = this.z - v.z;
    return target;
  }
  length() {
    return Math.hypot(this.x, this.y, this.z);
  }
}

class IdentityQuat {
  vmult(v: StubVec3, target: StubVec3) {
    target.x = v.x;
    target.y = v.y;
    target.z = v.z;
  }
}

test('applyCarControls aplica força para frente com W', () => {
  let applied: any = null;
  const body: any = {
    applyForce: (force: any) => {
      applied = force.clone ? force.clone() : { ...force };
    },
    position: new StubVec3(),
    angularVelocity: new StubVec3(),
    velocity: new StubVec3(),
    quaternion: new IdentityQuat(),
  };
  applyCarControls(body, { w: true });
  assert(applied !== null);
  assert(applied.z < 0);
});

test('força de aceleração é suficientemente alta', () => {
  let applied: any = null;
  const body: any = {
    applyForce: (force: any) => {
      applied = force.clone ? force.clone() : { ...force };
    },
    position: new StubVec3(),
    angularVelocity: new StubVec3(),
    velocity: new StubVec3(),
    quaternion: new IdentityQuat(),
  };
  applyCarControls(body, { w: true });
  assert(applied !== null);
  assert(Math.abs(applied.z) >= 8000);
});

test('aplica freio de mão com espaço', () => {
  const body: any = {
    applyForce: () => {},
    position: new StubVec3(),
    angularVelocity: new StubVec3(1, 1, 1),
    velocity: new StubVec3(1, 0, 0),
    quaternion: new IdentityQuat(),
  };
  applyCarControls(body, { ' ': true });
  assert(Math.abs(body.velocity.x) < 1);
  assert(Math.abs(body.angularVelocity.y) < 1);
});

class FlipQuat {
  vmult(v: StubVec3, target: StubVec3) {
    target.x = v.x;
    target.y = v.y;
    target.z = -v.z;
  }
}

test('usa orientação do corpo ao aplicar força', () => {
  let applied: any = null;
  const body: any = {
    applyForce: (force: any) => {
      applied = force.clone ? force.clone() : { ...force };
    },
    position: new StubVec3(),
    angularVelocity: new StubVec3(),
    velocity: new StubVec3(),
    quaternion: new FlipQuat(),
  };
  applyCarControls(body, { w: true });
  assert(applied !== null);
  assert(applied.z > 0);
});

test('atribui flag de derrapagem no corpo', () => {
  const body: any = {
    applyForce: () => {},
    position: new StubVec3(),
    angularVelocity: new StubVec3(),
    velocity: new StubVec3(5, 0, 0),
    quaternion: new IdentityQuat(),
  };
  applyCarControls(body, {});
  assert.equal(body._drifting, true);

  body.velocity = new StubVec3(0, 0, -5);
  applyCarControls(body, {});
  assert.equal(body._drifting, false);
});

test('reduz velocidade lateral para evitar derrapagem', () => {
  const body: any = {
    applyForce: () => {},
    position: new StubVec3(),
    angularVelocity: new StubVec3(),
    velocity: new StubVec3(5, 0, 0),
    quaternion: new IdentityQuat(),
  };
  applyCarControls(body, {});
  assert(body.velocity.x < 5);
});
