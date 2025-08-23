import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Car from './Car.js';
import Arena from './Arena.js';
import Physics from './Physics.js';
import Explosion from './Explosion.js';
import Sound from './Sound.js';
import { applyCarControls } from './Controls.js';

// Cena principal
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luzes
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

// Física
const physics = new Physics();
new Arena(scene, physics.world);
const sound = new Sound();

// Criação de carros
interface CarEntity {
  car: Car;
  mesh: any;
  body: any;
  lifeBar: any;
}

function createCarEntity(id: string, color: number, position: any): CarEntity {
  const car = new Car(id);
  const geometry = new THREE.BoxGeometry(2, 1, 4);
  const material = new THREE.MeshStandardMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const shape = new CANNON.Box(new CANNON.Vec3(1, 0.5, 2));
  const body = new CANNON.Body({ mass: 150 });
  body.addShape(shape);
  body.position.copy(position);
  physics.world.addBody(body);

  // Barra de vida simples
  const barGeo = new THREE.PlaneGeometry(2, 0.2);
  const barMat = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
  });
  const lifeBar = new THREE.Mesh(barGeo, barMat);
  lifeBar.position.set(0, 1, 0);
  mesh.add(lifeBar);

  return { car, mesh, body, lifeBar };
}

const player = createCarEntity('player', 0x0000ff, new CANNON.Vec3(-5, 0.5, 0));
const enemy = createCarEntity('enemy', 0xff0000, new CANNON.Vec3(5, 0.5, 0));

const followOffset = new THREE.Vector3(0, 5, 10);

// Explosões ativas
const explosions: Explosion[] = [];

// Controle do jogador
const keys: Record<string, boolean> = {};
document.addEventListener('keydown', (e) => {
  keys[e.key] = true;
  if (e.key === 'u') {
    player.car.addUpgrade({ id: 'armor', bonusHealth: 20 });
    updateLifeBars();
  }
});
document.addEventListener('keyup', (e) => (keys[e.key] = false));

// IA simples: inimigo persegue o jogador
function handleEnemyAI() {
  const direction = player.body.position.vsub(enemy.body.position);
  direction.normalize();
  direction.scale(150, direction);
  enemy.body.applyForce(direction, enemy.body.position);
}

// Colisões para aplicar dano
player.body.addEventListener('collide', (event: any) => {
  if (event.body === enemy.body) {
    player.car.applyDamage(10);
    enemy.car.applyDamage(10);
    updateLifeBars();
    sound.playCollision();
    checkDestroyed(player);
    checkDestroyed(enemy);
  }
});

enemy.body.addEventListener('collide', (event: any) => {
  if (event.body === player.body) {
    // já tratado no listener do player
  }
});

function updateLifeBars() {
  [player, enemy].forEach((entity) => {
    const ratio = entity.car.health / entity.car.maxHealth;
    (entity.lifeBar.material as any).color.set(
      ratio > 0.3 ? 0x00ff00 : 0xff0000,
    );
    entity.lifeBar.scale.x = ratio;
    entity.lifeBar.position.x = -1 + ratio;
  });
}

function checkDestroyed(entity: CarEntity) {
  if (entity.car.isDestroyed()) {
    explosions.push(new Explosion(scene, entity.mesh.position.clone()));
    sound.playDestruction();
    scene.remove(entity.mesh);
    physics.world.removeBody(entity.body);
  }
}

function updateCamera() {
  const offset = followOffset
    .clone()
    .applyQuaternion(player.mesh.quaternion as any);
  camera.position.copy(player.mesh.position.clone().add(offset));
  camera.lookAt(player.mesh.position);
}

// Loop principal
let lastTime = performance.now();
function animate() {
  requestAnimationFrame(animate);
  const now = performance.now();
  const delta = (now - lastTime) / 1000;
  lastTime = now;

  applyCarControls(player.body, keys, CANNON.Vec3);
  handleEnemyAI();

  physics.step(delta);

  // Atualiza explosões
  for (let i = explosions.length - 1; i >= 0; i--) {
    if (explosions[i].update(delta)) explosions.splice(i, 1);
  }

  // Sincroniza malha com corpo físico
  [player, enemy].forEach((entity) => {
    entity.mesh.position.copy(entity.body.position as any);
    entity.mesh.quaternion.copy(entity.body.quaternion as any);
  });

  updateCamera();

  renderer.render(scene, camera);
}

animate();
