export function applyCarControls(
  body: any,
  keys: Record<string, boolean>,
  Vec3: any,
): void {
  // Força aumentada para permitir aceleração mais responsiva
  const force = 12000;
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
  // Curvas mais suaves para um controle mais elegante
  if (keys['a']) body.angularVelocity.y += 0.05;
  if (keys['d']) body.angularVelocity.y -= 0.05;
  if (keys[' ']) {
    body.velocity.scale(0.9, body.velocity);
    body.angularVelocity.scale(0.9, body.angularVelocity);
  }
}
