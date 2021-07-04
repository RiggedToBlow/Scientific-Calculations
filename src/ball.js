import * as THREE from "three";
import * as CANNON from "cannon-es";
import { body2mesh } from "./body2mesh";

export class Ball {
  constructor(radius, position) {
    this.ballBody = new CANNON.Body({
      shape: new CANNON.Sphere(radius),
      mass: 100,
      linearDamping: 0.2,
    });
    this.ballMesh = body2mesh(this.ballBody);
    console.log(this.ballMesh, this.ballBody);
    this.position = position;
  }

  set position(pos) {
    const { x, y, z } = pos;
    if (!!this.ballMesh) {
      this.ballMesh.position.x = x;
      this.ballMesh.position.y = y;
      this.ballMesh.position.z = z;
    }
    if (!!this.ballBody) {
      this.ballBody.position.x = x;
      this.ballBody.position.y = y;
      this.ballBody.position.z = z;
    }
  }

  get position() {
    return this.ballBody.position;

    /* position getter */
  }

  set mass(mass) {
    this.ballBody.mass = mass;

    /* mass setter */
  }

  get mass() {
    return this.ballBody.mass;
  }

  set friction(fric) {
    this.ballBody.linearDamping = fric;
  }

  get friction() {
    return this.ballBody.linearDamping;
  }

  set velocity(fric) {
    this.ballBody.velocity = fric;
  }

  get velocity() {
    return this.ballBody.linearDamping;
  }

  weightFunction(mass, gravity) {
    /* weight formula W = m.g */
    this.weightForce = mass * gravity;
  }

  applyForce(vector) {
    /* F = m*a */
    /* vy = a*t + v0 */
    this.hitForce = this.mass * 80;
    this.weightFunction(this.mass, -9.8);
    this.ballBody.applyForce(vector);
    this.reactionForce;
  }

  applyImpulse(vector) {
    /* calculating speed using motion formula */
    /* x = vx.t + x0 */
    this.Dx -= this.position.x;
    this.Dy -= this.position.y;
    this.Dz -= this.position.z;

    this.speedOnX = this.Dx;
    this.speedOnY = this.Dy;
    this.speedOnZ = this.Dz;
    this.ballBody.applyImpulse(vector);
  }

  reactionForce() {
    /* R = W */
    /* Vector of (R) = -Vector of (W) */
    this.Reaction = -1 * this.weightForce;
  }

  keneticEnergy() {
    /* Ek = 0.5 m.v^2 */
    Ek = 0.5 * this.mass * Math.pow(this.velocity, 2);
    this.kenetic = Ek;
  }

  potentEnergy() {
    /* Ep = m.g.h */
    Ep = 9.8 * this.mass * this.position.y;
    this.potent = Ep;
  }

  energyCalculation() {
    /* E = Ek + Ep */
    E = this.kenetic + this.potent;
    this.energy = E;
  }
}
