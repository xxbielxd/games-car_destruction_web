/**
 * Sistema simples de partículas de poeira exibido ao derrapar.
 * Recebe o módulo THREE por injeção para facilitar testes.
 */
export default class Dust {
  particles: any;
  private THREE: any;

  constructor(three: any, scene: any, count = 100) {
    this.THREE = three;
    const positions = new Float32Array(count * 3);
    const geometry = new three.BufferGeometry();
    geometry.setAttribute('position', new three.BufferAttribute(positions, 3));
    const material = new three.PointsMaterial({ color: 0xaaaaaa, size: 0.2 });
    this.particles = new three.Points(geometry, material);
    this.particles.visible = false;
    scene.add(this.particles);
  }

  update(origin: any, drifting: boolean): void {
    if (!drifting) {
      this.particles.visible = false;
      return;
    }
    this.particles.visible = true;
    this.particles.position.copy(origin);
  }
}
