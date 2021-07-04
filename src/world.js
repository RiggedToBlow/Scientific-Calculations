import * as CANNON from "cannon-es";

/**
 * physics
 */
export const world = new CANNON.World();
world.gravity.set(0, -9.8, 0);
