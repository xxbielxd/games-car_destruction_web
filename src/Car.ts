import * as THREE from 'three';
import { Body, Box, Vec3, World } from 'cannon-es';
import { CarLogic } from './CarLogic';

/**
 * Car represents a controllable vehicle in the arena.
 * It combines rendering, physics and base health logic.
 */
export class Car extends CarLogic {
  public readonly mesh: THREE.Mesh;
  public readonly body: Body;
  private readonly healthBar: THREE.Mesh;

  constructor(initialPosition: THREE.Vector3, world: World, color = 0xff0000) {
    super(100);

    const geometry = new THREE.BoxGeometry(2, 1, 4);
    const material = new THREE.MeshStandardMaterial({ color });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(initialPosition);

    const shape = new Box(new Vec3(1, 0.5, 2));
    this.body = new Body({ mass: 1500 });
    this.body.addShape(shape);
    this.body.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
    world.addBody(this.body);

    this.healthBar = this.createHealthBar();
    this.mesh.add(this.healthBar);
  }

  private createHealthBar(): THREE.Mesh {
    const barGeometry = new THREE.BoxGeometry(2, 0.2, 0.2);
    const barMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const bar = new THREE.Mesh(barGeometry, barMaterial);
    bar.position.set(0, 1, 0);
    return bar;
  }

  /** Reduces car health and updates bar. */
  applyDamage(amount: number): void {
    super.applyDamage(amount);
    this.healthBar.scale.x = this.health / this.maxHealth;
  }

  /** Updates mesh transform from physics body. */
  update(): void {
    this.mesh.position.copy(this.body.position as unknown as THREE.Vector3);
    this.mesh.quaternion.copy(this.body.quaternion as unknown as THREE.Quaternion);
  }
}
