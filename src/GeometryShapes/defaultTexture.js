import * as THREE from 'three';

/**
 * Textures
 */
const cubeTextureLoader = new THREE.CubeTextureLoader();
export const environmentMapTexture = cubeTextureLoader.load([
	'/textures/environmentMaps/0/px.png',
	'/textures/environmentMaps/0/nx.png',
	'/textures/environmentMaps/0/py.png',
	'/textures/environmentMaps/0/ny.png',
	'/textures/environmentMaps/0/pz.png',
	'/textures/environmentMaps/0/nz.png'
]);
export const currentMaterial = new THREE.MeshStandardMaterial({
	metalness: 0.3,
	roughness: 0.4,
	envMap: environmentMapTexture
})
