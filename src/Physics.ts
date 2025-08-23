import * as CANNON from 'cannon-es';

/**
 * Encapsula a configuração da física com Cannon-es.
 */
export default class Physics {
  world: any;

  constructor() {
    // Gravidade mais intensa para manter os carros firmes no chão
    this.world = new CANNON.World({ gravity: new CANNON.Vec3(0, -30, 0) });
    // Ajusta material padrão para maior atrito e colisões menos elásticas
    this.world.defaultContactMaterial.friction = 0.6;
    this.world.defaultContactMaterial.restitution = 0.3;
  }

  /**
   * Atualiza o mundo físico.
   * @param delta Tempo em segundos desde o último frame.
   */
  step(delta: number): void {
    const fixedTimeStep = 1 / 60;
    const maxSubSteps = 3;
    this.world.step(fixedTimeStep, delta, maxSubSteps);
  }
}
