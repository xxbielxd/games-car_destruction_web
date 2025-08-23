import * as CANNON from 'cannon-es';

/**
 * Encapsula a configuração da física com Cannon-es.
 */
export default class Physics {
  world: any;

  constructor() {
    this.world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });
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
