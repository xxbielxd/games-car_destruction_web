import * as CANNON from './stubs/cannon-es.js';

export function directionalDamage(receiverBody: any, otherPos: any): number {
  const forward = new CANNON.Vec3(0, 0, -1);
  const forwardWorld = new CANNON.Vec3();
  receiverBody.quaternion.vmult(forward, forwardWorld);
  const raw = otherPos.vsub(receiverBody.position);
  raw.y = 0;
  const toOther = new CANNON.Vec3(raw.x, raw.y, raw.z);
  toOther.normalize();
  forwardWorld.normalize();
  const dot = forwardWorld.dot(toOther);
  return dot > 0.7 ? 5 : 15;
}
