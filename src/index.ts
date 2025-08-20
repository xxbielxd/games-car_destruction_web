import * as THREE from 'three';
import { Vec3 } from 'cannon-es';
import { Car } from './Car';
import { Arena } from './Arena';
import { Physics } from './Physics';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const light = new THREE.DirectionalLight(0xffffff, 0.8);
light.position.set(5, 10, 7.5);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 15, 25);
camera.lookAt(0, 0, 0);

const physics = new Physics();
new Arena(scene, physics);

const car1 = new Car(new THREE.Vector3(-5, 1, 0), physics.world, 0xff0000);
const car2 = new Car(new THREE.Vector3(5, 1, 0), physics.world, 0x0000ff);
scene.add(car1.mesh);
scene.add(car2.mesh);

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  physics.step(delta);
  car1.update();
  car2.update();

  // Simple collision damage check
  const dist = car1.body.position.vsub(car2.body.position).length();
  if (dist < 4) {
    car1.applyDamage(1);
    car2.applyDamage(1);
    if (car1.isDestroyed()) {
      scene.remove(car1.mesh);
      physics.world.removeBody(car1.body);
    }
    if (car2.isDestroyed()) {
      scene.remove(car2.mesh);
      physics.world.removeBody(car2.body);
    }
  }

  renderer.render(scene, camera);
}

animate();

// basic keyboard controls for car1
window.addEventListener('keydown', (e) => {
  const force = 500;
  switch (e.key) {
    case 'ArrowUp':
      car1.body.applyForce(new Vec3(0, 0, -force), car1.body.position);
      break;
    case 'ArrowDown':
      car1.body.applyForce(new Vec3(0, 0, force), car1.body.position);
      break;
    case 'ArrowLeft':
      car1.body.angularVelocity.y += 0.5;
      break;
    case 'ArrowRight':
      car1.body.angularVelocity.y -= 0.5;
      break;
  }
});
