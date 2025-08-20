import { describe, expect, it } from 'vitest';
import { Car } from '../src/Car';
import { World, Vec3 } from 'cannon-es';

describe('Car', () => {
  it('reduces health and detects destruction', () => {
    const world = new World();
    const car = new Car(world, 0x00ff00, new Vec3());
    car.applyDamage(50);
    expect(car.health).toBe(50);
    car.applyDamage(60);
    expect(car.health).toBe(0);
    expect(car.isDestroyed()).toBe(true);
  });
});
