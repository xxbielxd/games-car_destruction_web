/**
 * Core car logic extracted for easier unit testing without rendering/physics.
 */
export class CarLogic {
  public health: number;
  public readonly maxHealth: number;

  constructor(maxHealth = 100) {
    this.maxHealth = maxHealth;
    this.health = maxHealth;
  }

  applyDamage(amount: number): void {
    this.health = Math.max(this.health - amount, 0);
  }

  isDestroyed(): boolean {
    return this.health <= 0;
  }
}
