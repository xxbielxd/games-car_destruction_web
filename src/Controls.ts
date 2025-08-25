import * as CANNON from './stubs/cannon-es.js';

/**
 * Controles simples de aceleração, giro e freio de mão.
 */
export function applyCarControls(
  body: any,
  keys: Record<string, boolean>,
  dt = 1 / 60,
): void {
  if (!body) return;

  const forward = new CANNON.Vec3(0, 0, -1);
  const forwardWorld = new CANNON.Vec3();
  body.quaternion.vmult(forward, forwardWorld);

  const ACCEL = 8000;
  const force = new CANNON.Vec3();

  if (keys['w']) {
    forwardWorld.scale(ACCEL, force);
    body.applyForce(force, body.position);
  }
  if (keys['s']) {
    forwardWorld.scale(-ACCEL * 0.5, force);
    body.applyForce(force, body.position);
  }

  const TURN = 1500;
  if (keys['a']) body.torque.y += TURN;
  if (keys['d']) body.torque.y -= TURN;

  if (keys[' ']) {
    body.velocity.x *= 0.8;
    body.velocity.y *= 0.8;
    body.velocity.z *= 0.8;
    body.angularVelocity.y *= 0.5;
  }

  const v = body.velocity as any;
  const speedForward = v.dot(forwardWorld);
  const fwd = forwardWorld.scale(speedForward, new CANNON.Vec3());
  const lateral = v.vsub(fwd, new CANNON.Vec3());
  // Reduz um pouco a velocidade lateral para minimizar derrapagem
  v.vsub(lateral.scale(0.2, lateral), v);
  body._drifting = lateral.length() > 0.5;
}
