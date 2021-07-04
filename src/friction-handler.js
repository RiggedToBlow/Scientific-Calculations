import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { body2mesh } from './body2mesh'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}


export class FrictionHandler {

	constructor() {
		this.world = new CANNON.World()
		this.gravity = -9.8
		this.initializeFriction()
	}


	initializeFriction() {
		const defaultMaterial = new CANNON.Material('default')

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
		)

		this.world.defaultContactMaterial = this.contactMaterial
	}


	initializeCamera() {
		this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000)
		this.camera.position.set(3, 15, 3)
		this.scene.add(this.camera)
	}

	set gravity(gr) {
		this.world.gravity.set(0, gr, 0)
	}
	get gravity() {
		return this.world.gravity.y
	}

	set friction(fr) {
		this.contactMaterial.friction=fr
	}

	set bounce(bo){
		this.contactMaterial.restitution=bo
	}
	get bounce(){return this.contactMaterial.restitution}


	addBody(body) {
		this.world.addBody(body)
	}


}