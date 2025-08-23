import * as THREE from 'three';
import { Vec3 } from 'cannon-es';
import { createPhysicsWorld } from './Physics';
import { Arena } from './Arena';
import { Car } from './Car';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 5, 10);

const ambient = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambient);
const dir = new THREE.DirectionalLight(0xffffff, 0.5);
dir.position.set(5, 10, 7.5);
scene.add(dir);

const world = createPhysicsWorld();
new Arena(scene, world);

const player = new Car(world, 0x00ff00, new Vec3(-2, 1, 0));
scene.add(player.mesh);
const enemy = new Car(world, 0xff0000, new Vec3(2, 1, 0));
scene.add(enemy.mesh);

function animate() {
  requestAnimationFrame(animate);
  world.step(1 / 60);

  // simple control: move player forward constantly
  player.body.applyForce(new Vec3(0, 0, -10), player.body.position);

  player.update();
  enemy.update();

  const dist = player.body.position.vsub(enemy.body.position).length();
  if (dist < 1.5) {
    player.applyDamage(1);
    enemy.applyDamage(1);
    if (player.isDestroyed()) scene.remove(player.mesh);
    if (enemy.isDestroyed()) scene.remove(enemy.mesh);
  }

  renderer.render(scene, camera);
}

animate();
