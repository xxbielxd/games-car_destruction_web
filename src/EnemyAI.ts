export function pursuePlayer(
  enemyBody: any,
  targetPos: any,
  rand: () => number = Math.random,
): void {
  const direction = targetPos.vsub(enemyBody.position);
  direction.normalize();
  // Força elevada para garantir que os bots se movimentem
  direction.scale(8000, direction);
  enemyBody.applyForce(direction, enemyBody.position);
  enemyBody.angularVelocity.y += (rand() - 0.5) * 0.2;
}
