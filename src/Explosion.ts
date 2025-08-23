import * as THREE from 'three';

/**
 * Efeito visual simples de explosão.
 * Cria uma esfera que expande e desaparece.
 */
export default class Explosion {
  mesh: any;

  constructor(scene: any, position: any) {
    const geometry = new THREE.SphereGeometry(1, 8, 8);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffa500,
      transparent: true,
      opacity: 1,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
    scene.add(this.mesh);
  }

  /**
   * Atualiza a animação da explosão.
   * @param delta Tempo em segundos desde o último frame.
   * @returns `true` se a explosão terminou e deve ser removida.
   */
  update(delta: number): boolean {
    this.mesh.scale.addScalar(delta * 2);
    const material = this.mesh.material as any;
    material.opacity -= delta;
    if (material.opacity <= 0) {
      this.mesh.parent?.remove(this.mesh);
      return true;
    }
    return false;
  }
}
