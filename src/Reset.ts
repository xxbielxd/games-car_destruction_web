import Car from './Car.js';

interface Vec3Like { x: number; y: number; z: number; }
interface ResettableEntity {
  car: Car;
  body: {
    position: { set(x: number, y: number, z: number): void };
    velocity: { set(x: number, y: number, z: number): void };
    angularVelocity: { set(x: number, y: number, z: number): void };
    quaternion: { set(x: number, y: number, z: number, w: number): void };
  };
  mesh: {
    position: { set(x: number, y: number, z: number): void };
    quaternion: { set(x: number, y: number, z: number, w: number): void };
  };
}

export function resetCarEntity(entity: ResettableEntity, position: Vec3Like): void {
  entity.car = new Car(entity.car.id, entity.car.maxHealth);
  entity.body.position.set(position.x, position.y, position.z);
  entity.body.velocity.set(0, 0, 0);
  entity.body.angularVelocity.set(0, 0, 0);
  entity.body.quaternion.set(0, 0, 0, 1);
  entity.mesh.position.set(position.x, position.y, position.z);
  entity.mesh.quaternion.set(0, 0, 0, 1);
}

export function clearKeys(keys: Record<string, boolean>): void {
  Object.keys(keys).forEach((k) => {
    keys[k] = false;
  });
}
