import * as CANNON from 'cannon-es';

/**
 * Faz o bot perseguir o jogador com estabilidade:
 * - Ignora componente Y (sem “decolar”).
 * - Torque proporcional para virar até o ângulo desejado.
 * - Força aplicada no centro do corpo (evita pitch/roll).
 * - Clamp de velocidade para não virar míssil.
 */
export function pursuePlayer(
  enemyBody: CANNON.Body,
  targetPos: CANNON.Vec3,
  rand: () => number = Math.random,
): void {
  // Direção até o player (só no plano XZ)
  const toPlayer = targetPos.vsub(enemyBody.position);
  toPlayer.y = 0;
  if (toPlayer.lengthSquared() < 1e-6) return; // já está em cima

  toPlayer.normalize();

  // Ângulo desejado no plano
  const desiredAngle = Math.atan2(toPlayer.x, -toPlayer.z);

  // Ângulo atual do corpo (usando toEuler com alvo Vec3)
  const euler = new CANNON.Vec3();
  enemyBody.quaternion.toEuler(euler);
  const currentAngle = euler.y;

  // Diferença normalizada [-PI, PI]
  let angleDiff = desiredAngle - currentAngle;
  if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
  if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

  // Vira com torque proporcional + ruído leve para não ficar robótico
  const TURN = 900;
  enemyBody.torque.y += angleDiff * TURN;
  enemyBody.torque.y += (rand() - 0.5) * 90;

  // Avança se estiver “apontado” de forma razoável
  const facingFactor = Math.max(0, Math.cos(angleDiff));
  const DRIVE = 4200 * facingFactor;

  const forwardLocal = new CANNON.Vec3(0, 0, -1);
  const forwardWorld = enemyBody.quaternion.vmult(forwardLocal, new CANNON.Vec3());
  const forceVec = forwardWorld.scale(DRIVE, new CANNON.Vec3());
  enemyBody.applyForce(forceVec, enemyBody.position);

  // Clamp de velocidade: mantém bots domáveis
  const MAX_SPEED = 24;
  const v = enemyBody.velocity;
  const speed = v.length();
  if (speed > MAX_SPEED) {
    v.scale(MAX_SPEED / (speed + 1e-6), v);
  }
}
