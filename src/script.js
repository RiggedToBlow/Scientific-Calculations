import * as CANNON from 'cannon-es'
import * as dat from 'dat.gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Ball } from './ball'
import { body2mesh } from './body2mesh'
import './style.css'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()


// raycaster

const rayCaster = new THREE.Raycaster()



/**
 * Textures
 */
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
	'/textures/environmentMaps/0/px.png',
	'/textures/environmentMaps/0/nx.png',
	'/textures/environmentMaps/0/py.png',
	'/textures/environmentMaps/0/ny.png',
	'/textures/environmentMaps/0/pz.png',
	'/textures/environmentMaps/0/nz.png'
])



/**
 * physics
 */


const world = new CANNON.World()
world.gravity.set(0, -9.8, 0)

/**
 *  add default contactMaterial
 */

const defaultMaterial = new CANNON.Material('default')

const contactMaterial = new CANNON.ContactMaterial(
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



world.defaultContactMaterial = contactMaterial



/**
 * physics sphere
 */


const ball = new Ball(0.5,new CANNON.Vec3(-10, 20, 0) )
console.log(ball)
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body({
	mass: 0,
	shape: floorShape,
})

floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
world.addBody(floorBody)
world.addBody(ball.ballBody)
scene.add(ball.ballMesh)

/***
 * loading Donut
 */
const torusShape = CANNON.Trimesh.createTorus(3, 3.5, 16, 16)
const torusBody = new CANNON.Body({ mass: 0 })
torusBody.addShape(torusShape)
torusBody.position.set(5, 3.3, 0)
torusBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
/*torusBody.angularVelocity.set(0, -1, 0)*/
world.addBody(torusBody)


const groundShape = new CANNON.Box(new CANNON.Vec3(20, 3, 20))
const groundBody = new CANNON.Body({
	shape: groundShape,
	position: new CANNON.Vec3(0, 6, 0),
	mass: 100000
})
world.addBody(groundBody)
const groundMesh = body2mesh(groundBody)
scene.add(groundMesh)

/**
 * Torus Mesh
 */

const torusMesh = new THREE.Mesh(
	new THREE.TorusGeometry(3, 3.5, 16, 16),
	new THREE.MeshStandardMaterial({
		metalness: 0.1,
		roughness: 0.1,
		envMap: environmentMapTexture
	})
)

/*torusMesh.position.set(0.01, 0.01, 0.01)
torusMesh.quaternion.setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0, 'xzy'))*/
scene.add(torusMesh)

/**
 * Floor
 */
const floor = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(50, 50),
	new THREE.MeshStandardMaterial({
		color: '#777777',
		metalness: 0.3,
		roughness: 0.4,
		envMap: environmentMapTexture
	})
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

	// Update camera
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()

	// Update renderer
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000)
camera.position.set(3, 15, 3)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Util functions
 */

const mouseCoords = new THREE.Vector2()

window.addEventListener('pointerdown', (event) => {
	mouseCoords.set((
		event.clientX / window.innerWidth) * 2 - 1,
		-(event.clientY / window.innerHeight) * 2 + 1
	)
})


const applyForceOnBall = () => {
	rayCaster.setFromCamera(mouseCoords, camera)
	const { x, z } = rayCaster.ray.direction
	console.log(x, z)
	const { y } = debugObject
	const mu = +debugObject.Force
	const windMu = 20
	const force = new CANNON.Vec3(x * mu, y * mu, z * mu)
	ball.applyImpulse(force)
}


window.addEventListener('keydown', (event) => {
	console.log(event)
	if (event.code === 'Space') {
		applyForceOnBall()
	}
})



const animate = (mesh, body) => {
	mesh.position.copy(body.position)
	mesh.quaternion.copy(body.quaternion)
}

const animatables = []

const addToAnimatable = (mesh, body) => {
	animatables.push({ mesh, body })
}

addToAnimatable(ball.ballMesh, ball.ballBody)
addToAnimatable(torusMesh, torusBody)
addToAnimatable(groundMesh, groundBody)


const gui = new dat.GUI()

const debugObject = {
	Force: 150,
	y: 1,
	resetBall: () => {
		ball.position = new CANNON.Vec3(-10, 20, 0)
		ball.velocity = new CANNON.Vec3(0, 0, 0)
	},
	windX: 0,
	windZ: 0
}

gui.add(debugObject, 'Force', 150, 800, 10)
gui.add(debugObject, 'y', 0, 1, 0.1)
gui.add(debugObject, 'resetBall',)
gui.add(debugObject, 'windX', -100, 100, 1)
gui.add(debugObject, 'windZ', -100, 100, 1)
gui.add(world.gravity, 'y', -20, 0, 0.1)

/**
 * Balls input
 */
const ballFolder = gui.addFolder('Ball')
ballFolder.add(ball, 'mass', 10, 500, 1)
ballFolder.add(ball, 'friction', -0.75, 0.75, 0.01)
ballFolder.open()

const contactMaterialFolder = gui.addFolder('Utils')
contactMaterialFolder.add(contactMaterial, 'restitution', 0, 1, 0.01)



/**
 * Animate
 */
const clock = new THREE.Clock()
let oldElapsedTime = 0
const tick = () => {
	const elapsedTime = clock.getElapsedTime()
	const deltaTime = elapsedTime - oldElapsedTime
	oldElapsedTime = elapsedTime
	// update physics world
	world.step(1 / 60, deltaTime, 3)
	animatables.forEach(({ mesh, body }) => animate(mesh, body))

	ball.applyForce(new CANNON.Vec3(debugObject.windX, 0, debugObject.windZ))

	// Update controls
	controls.update()

	// Render
	renderer.render(scene, camera)

	// Call tick again on the next frame
	window.requestAnimationFrame(tick)
}

tick()
