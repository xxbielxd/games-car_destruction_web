import * as THREE from 'three';
import * as CANNON from './stubs/cannon-es.js';

/**
 * Responsável por montar a arena básica de destruição.
 */
export default class Arena {
  size: number;

  constructor(scene: any, world: any, size = 50) {
    this.size = size;

    // Chão
    const groundGeo = new THREE.PlaneGeometry(size, size);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    scene.add(groundMesh);

    const groundBody = new CANNON.Body({ mass: 0, shape: new CANNON.Plane() });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(groundBody);

    // Paredes
    const half = size / 2;
    const wallHeight = 5;
    const wallThickness = 1;
    const wallShape = new CANNON.Box(new CANNON.Vec3(half, wallHeight, wallThickness));
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });

    const wallPositions = [
      { x: 0, y: wallHeight / 2, z: -half },
      { x: 0, y: wallHeight / 2, z: half },
    ];
    wallPositions.forEach((pos) => {
      const wallGeo = new THREE.BoxGeometry(size, wallHeight, wallThickness * 2);
      const wallMesh = new THREE.Mesh(wallGeo, wallMaterial);
      wallMesh.position.set(pos.x, pos.y, pos.z);
      scene.add(wallMesh);

      const wallBody = new CANNON.Body({ mass: 0, shape: wallShape });
      wallBody.position.set(pos.x, pos.y, pos.z);
      world.addBody(wallBody);
    });

    const sideWallShape = new CANNON.Box(new CANNON.Vec3(wallThickness, wallHeight, half));
    const sidePositions = [
      { x: -half, y: wallHeight / 2, z: 0 },
      { x: half, y: wallHeight / 2, z: 0 },
    ];
    sidePositions.forEach((pos) => {
      const wallGeo = new THREE.BoxGeometry(wallThickness * 2, wallHeight, size);
      const wallMesh = new THREE.Mesh(wallGeo, wallMaterial);
      wallMesh.position.set(pos.x, pos.y, pos.z);
      scene.add(wallMesh);

      const wallBody = new CANNON.Body({ mass: 0, shape: sideWallShape });
      wallBody.position.set(pos.x, pos.y, pos.z);
      world.addBody(wallBody);
    });
  }
}
