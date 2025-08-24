/**
 * Calcula o deslocamento da câmera em relação ao carro utilizando
 * rotações simples em torno dos eixos X e Y seguidas por rotação
 * do quaternion do jogador.
 */
export function computeCameraOffset(
  base: { x: number; y: number; z: number },
  yaw: number,
  pitch: number,
  playerQuat: { x: number; y: number; z: number; w: number },
): { x: number; y: number; z: number } {
  // Rotação em torno do eixo X (pitch)
  const cosP = Math.cos(pitch);
  const sinP = Math.sin(pitch);
  let y = base.y * cosP - base.z * sinP;
  let z = base.y * sinP + base.z * cosP;
  let x = base.x;

  // Rotação em torno do eixo Y (yaw)
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);
  const x2 = x * cosY + z * sinY;
  const z2 = -x * sinY + z * cosY;

  // Aplica rotação do quaternion do jogador
  const qx = playerQuat.x;
  const qy = playerQuat.y;
  const qz = playerQuat.z;
  const qw = playerQuat.w;
  const ix = qw * x2 + qy * z2 - qz * y;
  const iy = qw * y + qz * x2 - qx * z2;
  const iz = qw * z2 + qx * y - qy * x2;
  const iw = -qx * x2 - qy * y - qz * z2;

  return {
    x: ix * qw + iw * -qx + iy * -qz - iz * -qy,
    y: iy * qw + iw * -qy + iz * -qx - ix * -qz,
    z: iz * qw + iw * -qz + ix * -qy - iy * -qx,
  };
}
