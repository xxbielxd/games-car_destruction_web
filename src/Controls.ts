export function applyCarControls(
  body: any,
  keys: Record<string, boolean>,
  Vec3: any,
): void {
  const force = 1000;
  if (keys['w']) {
    const forward = new Vec3(0, 0, -force);
    body.quaternion.vmult(forward, forward);
    body.applyForce(forward, body.position);
  }
  if (keys['s']) {
    const back = new Vec3(0, 0, force);
    body.quaternion.vmult(back, back);
    body.applyForce(back, body.position);
  }
  if (keys['a']) body.angularVelocity.y += 0.1;
  if (keys['d']) body.angularVelocity.y -= 0.1;
  if (keys[' ']) {
    body.velocity.scale(0.9, body.velocity);
    body.angularVelocity.scale(0.9, body.angularVelocity);
  }
}
