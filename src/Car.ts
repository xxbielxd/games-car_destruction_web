/**
 * Representa um carro dentro da arena.
 * Responsável apenas pela lógica de vida do veículo.
 * A renderização e física são tratadas em outros módulos.
 */
export default class Car {
  id: string;
  maxHealth: number;
  health: number;

  constructor(id: string, maxHealth = 100) {
    this.id = id;
    this.maxHealth = maxHealth;
    this.health = maxHealth;
  }

  /**
   * Aplica dano ao carro.
   * @param amount Quantidade de dano recebido.
   * @returns Vida restante após o dano.
   */
  applyDamage(amount: number): number {
    this.health = Math.max(0, this.health - amount);
    return this.health;
  }

  /**
   * Verifica se o carro foi destruído.
   */
  isDestroyed(): boolean {
    return this.health <= 0;
  }

  /**
   * Restaura vida ao carro.
   * @param amount Quantidade de vida recuperada.
   * @returns Vida atual após a cura.
   */
  heal(amount: number): number {
    this.health = Math.min(this.maxHealth, this.health + amount);
    return this.health;
  }
}
