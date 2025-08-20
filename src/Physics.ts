import { NaiveBroadphase, World } from 'cannon-es';

/**
 * Initializes the physics world using Cannon-es.
 */
export function createPhysicsWorld(): World {
  const world = new World();
  world.gravity.set(0, -9.82, 0);
  world.broadphase = new NaiveBroadphase();
  return world;
}
