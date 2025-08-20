// Car.ts
// Representa um carro na arena com vida e controles básicos.
export interface Upgrade {
  defense: number;
  speed: number;
  attack: number;
}

export default class Car {
  public health: number;
  public maxHealth: number;
  public upgrade: Upgrade;
  public position = { x: 0, y: 0, z: 0 };

  constructor(maxHealth = 100, upgrade: Upgrade = { defense: 0, speed: 0, attack: 0 }) {
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.upgrade = upgrade;
  }

  // Aplica dano levando em conta defesa.
  takeDamage(amount: number) {
    const effective = Math.max(0, amount - this.upgrade.defense);
    this.health = Math.max(0, this.health - effective);
  }

  // Retorna true se o carro foi destruído.
  isDestroyed(): boolean {
    return this.health <= 0;
  }

  // Exemplo simples de movimento para frente.
  moveForward(delta: number) {
    this.position.z -= (1 + this.upgrade.speed) * delta;
  }
}
