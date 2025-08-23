import * as THREE from 'three';
import { Body, Plane, World } from 'cannon-es';

/**
 * Creates the ground plane and arena limits.
 */
export class Arena {
  constructor(scene: THREE.Scene, world: World) {
    const groundGeo = new THREE.PlaneGeometry(50, 50);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    const groundShape = new Plane();
    const groundBody = new Body({ mass: 0, shape: groundShape });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(groundBody);
  }
}
