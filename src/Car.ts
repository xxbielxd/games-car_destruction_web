/**
 * Representa um carro dentro da arena.
 * Responsável apenas pela lógica de vida do veículo.
 * A renderização e física são tratadas em outros módulos.
 */
import type { Upgrade } from './Upgrade.js';
import type { PowerUp } from './PowerUp.js';

export default class Car {
  id: string;
  maxHealth: number;
  health: number;
  upgrades: Upgrade[];
  powerUps: { data: PowerUp; remaining: number }[];

  constructor(id: string, maxHealth = 200) {
    this.id = id;
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.upgrades = [];
    this.powerUps = [];
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

  /**
   * Aplica um upgrade ao carro aumentando sua vida máxima.
   * @param upgrade Upgrade a ser aplicado.
   * @returns Vida atual após o upgrade.
   */
  addUpgrade(upgrade: Upgrade): number {
    this.upgrades.push(upgrade);
    this.maxHealth += upgrade.bonusHealth;
    this.health += upgrade.bonusHealth;
    return this.health;
  }

  /**
   * Aplica um power-up temporário ao carro.
   * @param powerUp Power-up a ser aplicado.
   */
  addPowerUp(powerUp: PowerUp): void {
    this.powerUps.push({ data: powerUp, remaining: powerUp.duration });
    if (powerUp.bonusHealth) {
      this.maxHealth += powerUp.bonusHealth;
      this.health += powerUp.bonusHealth;
    }
  }

  /**
   * Atualiza a duração dos power-ups e remove os expirados.
   * @param delta Tempo decorrido em segundos.
   */
  updatePowerUps(delta: number): void {
    this.powerUps = this.powerUps.filter((active) => {
      active.remaining -= delta;
      if (active.remaining <= 0) {
        const { bonusHealth } = active.data;
        if (bonusHealth) {
          this.maxHealth -= bonusHealth;
          this.health = Math.min(this.health, this.maxHealth);
        }
        return false;
      }
      return true;
    });
  }
}
