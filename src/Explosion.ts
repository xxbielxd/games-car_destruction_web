/**
 * Efeito visual simples de explosão.
 * Cria uma esfera que expande e desaparece.
 */
export default class Explosion {
  mesh: any;

  constructor(scene: any, position: any, threeLib: any = (globalThis as any).THREE) {
    if (!threeLib) throw new Error('Three.js não disponível');
    const geometry = new threeLib.SphereGeometry(1, 8, 8);
    const material = new threeLib.MeshBasicMaterial({
      color: 0xffa500,
      transparent: true,
      opacity: 1,
    });
    this.mesh = new threeLib.Mesh(geometry, material);
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
