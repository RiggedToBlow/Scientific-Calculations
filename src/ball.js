import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { body2mesh } from './body2mesh'

export class Ball {


	constructor(radius, position) {
		this.ballBody= new CANNON.Body({
			shape: new CANNON.Sphere(radius),
			mass: 100,
			linearDamping: 0.2
		})
		this.ballMesh = body2mesh(this.ballBody)
		console.log(this.ballMesh, this.ballBody)
		this.position = position
	}

	set position(pos) {
		const { x, y, z } = pos
		if (!!this.ballMesh){jfjyfjyfj
			this.ballMesh.position.x = x
			this.ballMesh.position.y = y
			this.ballMesh.position.z = z
		}
		if(!!this.ballBody){
			this.ballBody.position.x = x
			this.ballBody.position.y = y
			this.ballBody.position.z = z
		}
	}
	get position() {
		return this.ballBody.position
	}


	set mass(mass) {
		this.ballBody.mass = mass
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
		/* TODO habid here */
	}

	applyImpulse(vector) {
		this.ballBody.applyImpulse(vector)
		/* TODO more habid here please */
	}


}