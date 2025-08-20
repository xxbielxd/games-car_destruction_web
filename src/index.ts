// index.ts
// Exemplo mínimo de duas carros colidindo em uma arena.
import Car from './Car';
import Arena from './Arena';
import { handleCollision } from './Physics';

const arena = new Arena();
const player = new Car();
const enemy = new Car();

// Posiciona o inimigo à frente do jogador
enemy.position.z = -5;

function update() {
  // Move o jogador para frente simulando entrada do usuário
  player.moveForward(0.1);

  // Checa colisão
  handleCollision(player, enemy);

  // Loga a vida para demonstrar
  console.log(`Player: ${player.health} | Enemy: ${enemy.health}`);

  if (player.isDestroyed() || enemy.isDestroyed()) {
    console.log('Explosão! Um carro foi destruído.');
    return;
  }

  // Continua loop de atualização
  setTimeout(update, 100);
}

update();
