import * as THREE from 'three';
import { Body, Box, Vec3 } from 'cannon-es';
import { CarLogic } from './CarLogic.js';

export class Car extends CarLogic {
  constructor(initialPosition, world, color = 0xff0000) {
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

  createHealthBar() {
    const barGeometry = new THREE.BoxGeometry(2, 0.2, 0.2);
    const barMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const bar = new THREE.Mesh(barGeometry, barMaterial);
    bar.position.set(0, 1, 0);
    return bar;
  }

  applyDamage(amount) {
    super.applyDamage(amount);
    this.healthBar.scale.x = this.health / this.maxHealth;
  }

  update() {
    this.mesh.position.copy(this.body.position);
    this.mesh.quaternion.copy(this.body.quaternion);
  }
}
