import Dust from '../src/Dust.js';
import { test } from 'node:test';
import { strict as assert } from 'node:assert';

class Vector3 {
  x: number;
  y: number;
  z: number;
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  copy(v: any) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }
}

class Scene {
  add(_obj: any) {}
}

class BufferGeometry {
  setAttribute() {}
}

class BufferAttribute {
  constructor(_arr: any, _size: number) {}
}

class PointsMaterial {
  constructor(_opts: any) {}
}

class Points {
  position = new Vector3();
  visible = false;
  constructor(_g: any, _m: any) {}
}

const THREE_MOCK = {
  Vector3,
  Scene,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
};

test('poeira visível apenas ao derrapar', () => {
  const scene = new Scene();
  const dust = new Dust(THREE_MOCK, scene);
  const pos = new Vector3();

  dust.update(pos, true);
  assert(dust.particles.visible);

  dust.update(pos, false);
  assert(!dust.particles.visible);
});
