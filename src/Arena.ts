import * as THREE from 'three';
import { Body, Box, Vec3 } from 'cannon-es';
import { Physics } from './Physics';

/**
 * Arena builds the ground and basic boundaries for the game.
 */
export class Arena {
  public readonly mesh: THREE.Mesh;

  constructor(scene: THREE.Scene, physics: Physics) {
    const geometry = new THREE.PlaneGeometry(50, 50);
    const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    this.mesh = ground;

    // Physics ground
    const groundBody = new Body({ mass: 0 });
    const groundShape = new Box(new Vec3(25, 0.1, 25));
    groundBody.addShape(groundShape);
    groundBody.position.set(0, 0, 0);
    physics.world.addBody(groundBody);
  }
}
