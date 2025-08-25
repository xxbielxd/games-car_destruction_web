import * as THREE from 'three';
import * as CANNON from './stubs/cannon-es.js';
import Car from './Car.js';
import Arena from './Arena.js';
import Physics from './Physics.js';
import Explosion from './Explosion.js';
import Sound from './Sound.js';
import { applyCarControls } from './Controls.js';
import { pursuePlayer } from './EnemyAI.js';
import { computeCameraOffset } from './Camera.js';
import Dust from './Dust.js';
import GameState from './GameState.js';
import { directionalDamage } from './Damage.js';
import { syncEntityMeshes } from './entitySync.js';

// Cena principal
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const menuEl = document.getElementById('menu') as HTMLElement;
const messageEl = document.getElementById('menu-message') as HTMLElement;
const buttonEl = document.getElementById('menu-button') as HTMLButtonElement;
const sound = new Sound();
const gameState = new GameState(menuEl, messageEl, buttonEl, () => sound.playBackground());

// Luzes
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

// Física
const physics = new Physics();
new Arena(scene, physics.world, 120);

// Tipagem
interface CarEntity {
  car: Car;
  mesh: any;
  body: any;
  lifeBar: any;
}

function createCarEntity(id: string, color: number, position: any): CarEntity {
  const car = new Car(id);

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
    [ 1, 0.25, -1.5],
    [-1, 0.25,  1.5],
    [ 1, 0.25,  1.5],
  ];
  wheelPositions.forEach((pos) => {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(pos[0], pos[1], pos[2]);
    group.add(wheel);
  });

  scene.add(group);

  // Física do carro
  const shape = new CANNON.Box(new CANNON.Vec3(1, 0.5, 2));
  const body = new CANNON.Body({ mass: 200 });
  body.addShape(shape);
  body.position.copy(position);

  // Damping / rotação (evita capote e vibrações)
  body.angularFactor.set(0, 1, 0);   // gira só no Y
  body.linearDamping = 0.20;         // arrasto linear
  body.angularDamping = 0.55;        // arrasto angular

  physics.world.addBody(body);

  // Barra de vida
  const barGeo = new THREE.PlaneGeometry(2, 0.2);
  const barMat = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
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
const explosions: Explosion[] = [];
const dust = new Dust(THREE, scene);
updateLifeBars();

// Controle de câmera com botão direito
let camYaw = 0;
let camPitch = 0;
let rotating = false;
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('mousedown', (e) => {
  if (e.button === 2) rotating = true;
});
document.addEventListener('mouseup', (e) => {
  if (e.button === 2) rotating = false;
});
document.addEventListener('mousemove', (e) => {
  if (!rotating) return;
  camYaw -= e.movementX * 0.003;
  camPitch -= e.movementY * 0.003;
  camPitch = Math.max(-1, Math.min(1, camPitch));
});

// Garante que os meshes comecem sincronizados com os corpos físicos
syncEntityMeshes([player, ...enemies]);
updateCamera();

// ================== Input (normalizado) ==================
const keys: Record<string, boolean> = {};
const normalizeKey = (k: string) => k.toLowerCase();
const mapArrow = (k: string) => {
  switch (k) {
    case 'arrowup':
    case 'arrowdown':
    case 'arrowleft':
    case 'arrowright':
      return k;
    default:
      return k;
  }
};

document.addEventListener('keydown', (e) => {
  const k = mapArrow(normalizeKey(e.key));
  if (k === 'enter' && !gameState.isPlaying()) {
    gameState.start();
    return;
  }
  keys[k] = true;
  if (k === 'u') {
    player.car.addUpgrade({ id: 'armor', bonusHealth: 20 });
    updateLifeBars();
  }
});
document.addEventListener('keyup', (e) => {
  const k = mapArrow(normalizeKey(e.key));
  keys[k] = false;
});
// =========================================================

// IA: inimigo persegue o jogador
function handleEnemyAI() {
  enemies.forEach((enemy) => pursuePlayer(enemy.body, player.body.position));
}

// Colisão/dano
player.body.addEventListener('collide', (event: any) => {
  const enemy = enemies.find((e) => e.body === event.body);
  if (enemy && gameState.isPlaying()) {
    const playerDmg = directionalDamage(player.body, enemy.body.position);
    const enemyDmg = directionalDamage(enemy.body, player.body.position);
    player.car.applyDamage(playerDmg);
    enemy.car.applyDamage(enemyDmg);
    updateLifeBars();
    sound.playCollision();
    checkDestroyed(player);
    checkDestroyed(enemy);
  }
});

function updateLifeBars() {
  [player, ...enemies].forEach((entity) => {
    const ratio = entity.car.health / entity.car.maxHealth;
    (entity.lifeBar.material as any).color.set(ratio > 0.3 ? 0x00ff00 : 0xff0000);
    entity.lifeBar.scale.x = ratio;
    entity.lifeBar.position.x = -1 + ratio;
  });
  const playerRatio = player.car.health / player.car.maxHealth;
  sound.setBackgroundIntensity(playerRatio < 0.3 ? 1.5 : 1);
}

function checkDestroyed(entity: CarEntity) {
  if (entity.car.isDestroyed()) {
    explosions.push(new Explosion(scene, entity.mesh.position.clone(), THREE));
    sound.playDestruction();
    scene.remove(entity.mesh);
    physics.world.removeBody(entity.body);
    const idx = enemies.indexOf(entity);
    if (idx !== -1) enemies.splice(idx, 1);
    if (entity === player) {
      gameState.gameOver();
    }
  }
}

function updateCamera() {
  const offset = computeCameraOffset(
    followOffset,
    camYaw,
    camPitch,
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
  if (!gameState.isPlaying()) {
    renderer.render(scene, camera);
    return;
  }

  // Passe o delta para controles (suavização consistente)
  applyCarControls(player.body, keys, delta);
  handleEnemyAI();

  physics.step(delta);

  // Explosões
  for (let i = explosions.length - 1; i >= 0; i--) {
    if (explosions[i].update(delta)) explosions.splice(i, 1);
  }

  // Sincroniza meshes com os corpos
  syncEntityMeshes([player, ...enemies]);

  dust.update(player.mesh.position, (player.body as any)._drifting);

  updateCamera();
  renderer.render(scene, camera);
}

animate();
