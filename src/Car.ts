import * as THREE from 'three';
import { Body, Box, Vec3, World } from 'cannon-es';

/**
 * Represents a car inside the arena. Handles physics body, health and rendering.
 */
export class Car {
  public mesh: THREE.Mesh;
  public body: Body;
  public maxHealth: number;
  public health: number;
  private healthBar: THREE.Mesh;

  constructor(world: World, color: number, position: Vec3 = new Vec3()) {
    this.maxHealth = 100;
    this.health = this.maxHealth;

    const geometry = new THREE.BoxGeometry(1, 0.5, 2);
    const material = new THREE.MeshStandardMaterial({ color });
    this.mesh = new THREE.Mesh(geometry, material);

    const shape = new Box(new Vec3(0.5, 0.25, 1));
    this.body = new Body({ mass: 1, shape });
    this.body.position.copy(position);
    world.addBody(this.body);

    // Simple health bar positioned above the car
    const barGeom = new THREE.PlaneGeometry(1, 0.1);
    const barMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.healthBar = new THREE.Mesh(barGeom, barMat);
    this.healthBar.position.set(0, 1, 0);
    this.mesh.add(this.healthBar);
  }

  /** Apply damage to the car */
  applyDamage(amount: number): void {
    this.health = Math.max(0, this.health - amount);
  }

  /** Check if the car is destroyed */
  isDestroyed(): boolean {
    return this.health <= 0;
  }

  /** Sync Three.js mesh with Cannon body and update health bar */
  update(): void {
    (this.mesh.position as unknown as Vec3).copy(this.body.position);
    (this.mesh.quaternion as unknown as any).copy(this.body.quaternion);

    const scale = this.health / this.maxHealth;
    this.healthBar.scale.set(scale, 1, 1);
    this.healthBar.position.x = (1 - scale) * -0.5;
  }
}
