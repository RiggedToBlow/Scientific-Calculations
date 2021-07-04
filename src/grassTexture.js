import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const groundTexture = loader.load('textures/grass.jpg');
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(25, 25);
groundTexture.anisotropy = 16;
groundTexture.encoding = THREE.sRGBEncoding;
export const groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture });
