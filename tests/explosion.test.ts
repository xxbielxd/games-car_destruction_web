import test from 'node:test';
import assert from 'node:assert';

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
  equals(v: any) {
    return this.x === v.x && this.y === v.y && this.z === v.z;
  }
}

class Scene {
  children: any[] = [];
  add(obj: any) {
    this.children.push(obj);
    obj.parent = this;
  }
  remove(obj: any) {
    this.children = this.children.filter((o) => o !== obj);
  }
}

class SphereGeometry {}
class MeshBasicMaterial {
  opacity: number;
  constructor(opts: any) {
    this.opacity = opts.opacity ?? 1;
  }
}
class Mesh {
  position = new Vector3();
  material: any;
  scale = { addScalar() {} };
  parent: any;
  constructor(_g: any, material: any) {
    this.material = material;
  }
}

const ThreeMock = {
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
};

test('Explosion adiciona mesh na cena', async () => {
  const { default: Explosion } = await import('../src/Explosion.js');
  const scene = new Scene();
  const pos = new Vector3(1, 2, 3);
  const explosion = new Explosion(scene, pos, ThreeMock as any);
  assert.ok(scene.children.includes(explosion.mesh));
  assert.ok(explosion.mesh.position.equals(pos));
});

test('Explosion remove mesh após finalizar', async () => {
  const { default: Explosion } = await import('../src/Explosion.js');
  const scene = new Scene();
  const explosion = new Explosion(scene, new Vector3(), ThreeMock as any);
  let finished = false;
  let steps = 0;
  while (!finished && steps < 100) {
    finished = explosion.update(0.2);
    steps++;
  }
  assert.equal(finished, true);
  assert.ok(!scene.children.includes(explosion.mesh));
});
