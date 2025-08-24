import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Car from './Car.js';
import Arena from './Arena.js';
import Physics from './Physics.js';
import Explosion from './Explosion.js';
import Sound from './Sound.js';
import { applyCarControls } from './Controls.js';
import { pursuePlayer } from './EnemyAI.js';
import { computeCameraOffset } from './Camera.js';

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
sound.playBackground();

// Criação de carros
interface CarEntity {
  car: Car;
  mesh: any;
  body: any;
  lifeBar: any;
}

function createCarEntity(id: string, color: number, position: any): CarEntity {
  const car = new Car(id);

  // Grupo que representa o carro com corpo e rodas
  const group = new THREE.Group();
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color,
    metalness: 0.3,
    roughness: 0.6,
  });

  // Corpo principal
  const chassisGeo = new THREE.BoxGeometry(2, 0.5, 4);
  const chassis = new THREE.Mesh(chassisGeo, bodyMaterial);
  chassis.position.y = 0.5;
  group.add(chassis);

  // Cabine
  const cabinGeo = new THREE.BoxGeometry(1.5, 0.5, 1.5);
  const cabin = new THREE.Mesh(cabinGeo, bodyMaterial);
  cabin.position.set(0, 0.75, -0.5);
  group.add(cabin);

  // Rodas
  const wheelGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 16);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const wheelPositions = [
    [-1, 0.25, -1.5],
    [1, 0.25, -1.5],
    [-1, 0.25, 1.5],
    [1, 0.25, 1.5],
  ];
  wheelPositions.forEach((pos) => {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(pos[0], pos[1], pos[2]);
    group.add(wheel);
  });

  scene.add(group);

  const shape = new CANNON.Box(new CANNON.Vec3(1, 0.5, 2));
  const body = new CANNON.Body({ mass: 200 });
  body.addShape(shape);
  body.position.copy(position);
  body.linearDamping = 0.2;
  body.angularDamping = 0.4;
  physics.world.addBody(body);

  // Barra de vida simples
  const barGeo = new THREE.PlaneGeometry(2, 0.2);
  const barMat = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
  });
  const lifeBar = new THREE.Mesh(barGeo, barMat);
  lifeBar.position.set(0, 1.2, 0);
  group.add(lifeBar);

  return { car, mesh: group, body, lifeBar };
}

const player = createCarEntity('player', 0x0000ff, new CANNON.Vec3(-5, 0.5, 0));
const enemies: CarEntity[] = [
  createCarEntity('enemy1', 0xff0000, new CANNON.Vec3(5, 0.5, 0)),
  createCarEntity('enemy2', 0x00ff00, new CANNON.Vec3(0, 0.5, 5)),
];

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

// Controle de câmera com botão direito do mouse
let rightMouseDown = false;
let cameraYaw = 0;
let cameraPitch = 0;
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('mousedown', (e) => {
  if (e.button === 2) rightMouseDown = true;
});
document.addEventListener('mouseup', (e) => {
  if (e.button === 2) rightMouseDown = false;
});
document.addEventListener('mousemove', (e) => {
  if (rightMouseDown) {
    cameraYaw -= e.movementX * 0.005;
    cameraPitch -= e.movementY * 0.005;
    const limit = Math.PI / 4;
    if (cameraPitch > limit) cameraPitch = limit;
    if (cameraPitch < -limit) cameraPitch = -limit;
  }
});

// IA simples: inimigo persegue o jogador
function handleEnemyAI() {
  enemies.forEach((enemy) =>
    pursuePlayer(enemy.body, player.body.position),
  );
}

// Colisões para aplicar dano
player.body.addEventListener('collide', (event: any) => {
  const enemy = enemies.find((e) => e.body === event.body);
  if (enemy) {
    player.car.applyDamage(10);
    enemy.car.applyDamage(10);
    updateLifeBars();
    sound.playCollision();
    checkDestroyed(player);
    checkDestroyed(enemy);
  }
});

function updateLifeBars() {
  [player, ...enemies].forEach((entity) => {
    const ratio = entity.car.health / entity.car.maxHealth;
    (entity.lifeBar.material as any).color.set(
      ratio > 0.3 ? 0x00ff00 : 0xff0000,
    );
    entity.lifeBar.scale.x = ratio;
    entity.lifeBar.position.x = -1 + ratio;
  });
  const playerRatio = player.car.health / player.car.maxHealth;
  sound.setBackgroundIntensity(playerRatio < 0.3 ? 1.5 : 1);
}

function checkDestroyed(entity: CarEntity) {
  if (entity.car.isDestroyed()) {
    explosions.push(new Explosion(scene, entity.mesh.position.clone()));
    sound.playDestruction();
    scene.remove(entity.mesh);
    physics.world.removeBody(entity.body);
    const idx = enemies.indexOf(entity);
    if (idx !== -1) enemies.splice(idx, 1);
  }
}

function updateCamera() {
  const offset = computeCameraOffset(
    followOffset,
    cameraYaw,
    cameraPitch,
    player.mesh.quaternion as any,
  );
  const offsetVec = new THREE.Vector3(offset.x, offset.y, offset.z);
  camera.position.copy(player.mesh.position.clone().add(offsetVec));
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
  [player, ...enemies].forEach((entity) => {
    entity.mesh.position.copy(entity.body.position as any);
    entity.mesh.quaternion.copy(entity.body.quaternion as any);
  });

  updateCamera();

  renderer.render(scene, camera);
}

animate();
