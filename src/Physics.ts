import { World } from 'cannon-es';

/**
 * Physics wrapper around cannon-es world.
 */
export class Physics {
  public readonly world: World;

  constructor() {
    this.world = new World({ gravity: { x: 0, y: -9.82, z: 0 } });
  }

  step(delta: number): void {
    this.world.step(1 / 60, delta);
  }
}
