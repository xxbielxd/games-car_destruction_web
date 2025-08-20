export class CarLogic {
  constructor(maxHealth = 100) {
    this.maxHealth = maxHealth;
    this.health = maxHealth;
  }

  applyDamage(amount) {
    this.health = Math.max(this.health - amount, 0);
  }

  isDestroyed() {
    return this.health <= 0;
  }
}
