export function applyCarControls(
  body: any,
  keys: Record<string, boolean>,
  Vec3: any,
): void {
  // Força ajustada para uma aceleração mais controlável
  const force = 8000;
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
  const turnSpeed = 0.03;
  if (keys['a']) body.angularVelocity.y += turnSpeed;
  if (keys['d']) body.angularVelocity.y -= turnSpeed;
  // Limita a rotação para evitar derrapagens exageradas
  if (body.angularVelocity.y > 1) body.angularVelocity.y = 1;
  if (body.angularVelocity.y < -1) body.angularVelocity.y = -1;
  if (keys[' ']) {
    body.velocity.scale(0.9, body.velocity);
    body.angularVelocity.scale(0.9, body.angularVelocity);
  }
}
