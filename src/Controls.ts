export function applyCarControls(
  body: any,
  keys: Record<string, boolean>,
  Vec3: any,
): void {
  const force = 200;
  if (keys['w']) body.applyForce(new Vec3(0, 0, -force), body.position);
  if (keys['s']) body.applyForce(new Vec3(0, 0, force), body.position);
  if (keys['a']) body.angularVelocity.y += 0.05;
  if (keys['d']) body.angularVelocity.y -= 0.05;
  if (keys[' ']) {
    body.velocity.scale(0.9, body.velocity);
    body.angularVelocity.scale(0.9, body.angularVelocity);
  }
}
