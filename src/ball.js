import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { body2mesh } from './body2mesh'
import { currentMaterial } from './defaultTexture'

export class Ball {

	constructor(radius, position) {
		this.ballBody= new CANNON.Body({
			shape: new CANNON.Sphere(radius),
			mass: 100,
			linearDamping: 0.2
		})
		this.ballMesh = body2mesh(this.ballBody, currentMaterial)
		console.log(this.ballMesh, this.ballBody)
		this.position = position
	}

	set position(pos) {
		const { x, y, z } = pos
		if (!!this.ballMesh) {
			this.ballMesh.position.x = x
			this.ballMesh.position.y = y
			this.ballMesh.position.z = z
		}
		if (!!this.ballBody) {
			this.ballBody.position.x = x
			this.ballBody.position.y = y
			this.ballBody.position.z = z
		}
	}

	get position() {
		return this.ballBody.position

		/* position getter */
	}

	set mass(mass) {
		this.ballBody.mass = mass

		/* mass setter */
	}

	get mass() {
		return this.ballBody.mass
	}

	set friction(fric) {
		this.ballBody.linearDamping = fric
	}

	get friction() {
		return this.ballBody.linearDamping
	}

	set velocity(fric) {
		this.ballBody.velocity = fric
	}

	get velocity() {
		return this.ballBody.linearDamping
	}

	applyForce(vector) {
		this.ballBody.applyForce(vector)

		/* F = m*a */
		/* vy = a*t + v0 */
		this.hitForce = (this.mass)*80
	}

	applyImpulse(vector) {
		this.ballBody.applyImpulse(vector)

		/* calculating speed using motion formula */
		/* x = vx*t + x0 */
		this.speed = this.velocity
	}

}