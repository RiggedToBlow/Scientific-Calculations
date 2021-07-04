import * as THREE from "three";
import * as CANNON from "cannon-es";
import { body2mesh } from "./body2mesh";
import { Ball } from "./ball";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export class FrictionHandler {
  constructor() {
    this.world = new CANNON.World();
    this.y = 20;
    this.gravity = -9.8;
    this.initializeFriction();
  }

  initializeFriction() {
    const defaultMaterial = new CANNON.Material("default");

    this.generalFriction();
    this.FriForce = this.frictionDirection();
    /* initialize friction of geometry shapes */

    this.reactionBounce();
	/* initialize bounce constants and energy loss */

    this.contactMaterial = new CANNON.ContactMaterial(
      defaultMaterial,
      defaultMaterial,
      {
        friction: 1e9,
        restitution: 0.4,
        contactEquationStiffness: 1e8,
        contactEquationRelaxation: 3,
        frictionEquationStiffness: 1e8,
        frictionEquationRegularizationTime: 10,
      }
    );
    this.world.defaultContactMaterial = this.contactMaterial;
  }

  initializeCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      2000
    );
    this.camera.position.set(3, 15, 3);
    this.scene.add(this.camera);
  }

  set gravity(gr) {
    this.world.gravity.set(0, gr, 0);
  }

  get gravity() {
    return this.world.gravity.y;
  }

  set friction(fr) {
    this.contactMaterial.friction = fr;
  }

  generalFriction() {
    /* Fr = 0.5 k.Cd.p.(v)^2 */
    if (this.y > 1) this.Fri = 0.5 * this.shapeConst * Math.pow(Ball.speed, 2);
    else this.Fri = this.mu * Ball.weightForce;
    /* Fs = u.N */
  }

  frictionDirection() {
    /* friction is always in the opposite direction of the velocity of an Object */
    return this.force * -Ball.speedProjection;
  }

  reactionBounce() {
    /* every action has an equal and oppoiste reaction */
    this.reactionForce = -this.weightForce;
    this.velocity *= this.bouncePercentage;
    /* bounce percentage is a number between 0 - 1 that reduces
	the speed of the ball for every contact with any object */
    this.energyLoss();
  }

  energyLoss() {
    /* energy lost by heat , sound and light
	Eh = m.Cp.dT */
    this.lostEnergy = Ball.mass * this.lossConstant;
  }

  set bounce(bo) {
    this.contactMaterial.restitution = bo;
  }

  get bounce() {
    return this.contactMaterial.restitution;
  }

  addBody(body) {
    this.world.addBody(body);
  }
}
