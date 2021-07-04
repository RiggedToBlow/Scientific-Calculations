import * as THREE from "three";
import * as CANNON from "cannon-es";
import { body2mesh } from "./body2mesh";
import { currentMaterial } from "./defaultTexture";

export class Ball {
  constructor(radius, position) {
    this.ballBody = new CANNON.Body({
      shape: new CANNON.Sphere(radius),
      mass: 100,
      linearDamping: 0.2,
    });
    this.ballMesh = body2mesh(this.ballBody, currentMaterial);
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
    const Dx = this.position.x2 - this.position.x1;
    const Dy = this.position.y2 - this.position.y1;
    const Dz = this.position.z2 - this.position.z1;

    this.speedOnX = Dx;
    this.speedOnY = Dy;
    this.speedOnZ = Dz;
		const ve = new CANNON.Vec3(0,0,0)
		ve.dot(new CANNON.Vec3(10,10,10))
		console.log(vector)
		const v = vector.vmul(new CANNON.Vec3(10,10,10))
		console.log(v)
    this.ballBody.applyImpulse(v);
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
