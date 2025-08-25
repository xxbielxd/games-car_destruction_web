import * as CANNON from './stubs/cannon-es.js';

/**
 * Configuração do mundo físico com foco em estabilidade.
 */
export default class Physics {
  world: any;

  constructor() {
    this.world = new CANNON.World({ gravity: new CANNON.Vec3(0, -25, 0) });

    // Contatos mais “grudentos” (melhor tração) e menos elásticos
    this.world.defaultContactMaterial.friction = 0.7;
    this.world.defaultContactMaterial.restitution =  1e-3;

    // Solver mais estável

    this.world.solver.iterations = 15;
    this.world.solver.tolerance = 1e-3;

    // Permite dormir corpos parados (micro performance)
    this.world.allowSleep = true;
  }

  /**
   * Atualiza o mundo com timestep fixo.
   */
  step(delta: number): void {
    const fixedTimeStep = 1 / 60;
    const maxSubSteps = 3;
    this.world.step(fixedTimeStep, delta, maxSubSteps);
  }
}
