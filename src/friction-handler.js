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
		this.scene = new THREE.Scene()
		this.canvas = document.querySelector('canvas.webgl')
		this.initializeCamera()
		// Controls
		this.controls = new OrbitControls(this.camera, this.canvas)
		this.controls.enableDamping = true
	}



	initializeCamera() {
		this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000)
		this.camera.position.set(3, 15, 3)
		this.scene.add(this.camera)
	}

	set gravity(gr) {
		this.world.gravity.set(0, gr, 0)
	}

	addBody(body) {
		this.world.addBody(body)
		const mesh = body2mesh(body)
		this.scene.add(mesh)
		return mesh
	}





}