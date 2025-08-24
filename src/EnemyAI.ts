import * as CANNON from './stubs/cannon-es.js';

/**
 * Faz o bot perseguir o jogador com estabilidade:
 * - Ignora componente Y (sem “decolar”).
 * - Torque proporcional para virar até o ângulo desejado.
 * - Força aplicada no centro do corpo (evita pitch/roll).
 * - Clamp de velocidade para não virar míssil.
 */
export function pursuePlayer(
  enemyBody: any,
  targetPos: any,
  rand: () => number = Math.random,
): void {
  enemyBody.wakeUp?.();
  // Direção até o player (só no plano XZ)
  const toPlayerRaw = targetPos.vsub(enemyBody.position);
  toPlayerRaw.y = 0;
  if (toPlayerRaw.lengthSquared() < 1e-6) return; // já está em cima

  const toPlayer = new CANNON.Vec3(toPlayerRaw.x, toPlayerRaw.y, toPlayerRaw.z);
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
  const DRIVE = 9000;

  const forceVec = toPlayer.scale(DRIVE, new CANNON.Vec3());
  enemyBody.applyForce(forceVec, enemyBody.position);

  // Clamp de velocidade: mantém bots domáveis
  const MAX_SPEED = 24;
  const v = enemyBody.velocity || new CANNON.Vec3();
  const speed = v.length();
  if (speed > MAX_SPEED) {
    v.scale(MAX_SPEED / (speed + 1e-6), v);
  }
}
