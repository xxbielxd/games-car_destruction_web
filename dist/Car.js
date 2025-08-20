export default class Car {
  constructor(maxHealth = 100, upgrade = { defense: 0, speed: 0, attack: 0 }) {
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.upgrade = upgrade;
    this.position = { x: 0, y: 0, z: 0 };
  }
  takeDamage(amount) {
    const effective = Math.max(0, amount - this.upgrade.defense);
    this.health = Math.max(0, this.health - effective);
  }
  isDestroyed() {
    return this.health <= 0;
  }
  moveForward(delta) {
    this.position.z -= (1 + this.upgrade.speed) * delta;
  }
}
