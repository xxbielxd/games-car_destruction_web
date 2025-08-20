// Physics.ts
// Módulo simplificado para detectar colisões entre carros.
import Car from './Car';

export function handleCollision(carA: Car, carB: Car) {
  const dx = carA.position.x - carB.position.x;
  const dz = carA.position.z - carB.position.z;
  const distance = Math.sqrt(dx * dx + dz * dz);
  if (distance < 2) {
    carA.takeDamage(20 + carB.upgrade.attack);
    carB.takeDamage(20 + carA.upgrade.attack);
  }
}
