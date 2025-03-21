import * as THREE from 'three'

import GUI from "lil-gui"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

//DEBUG

const gui = new GUI();
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();


// Textures 

const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load('./textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg');
const doorAmbientOcculusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('./textures/door/heigt.jpg');
const doorNormalTexture = textureLoader.load('./texture/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('./textures/door/matelness.jpg');
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg');

const matcapTexture = textureLoader.load('./textures/matcaps/8.png');
const gradientTexture = textureLoader.load('./textures/gradients/5.jpg');


doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;



// Objects
// MeshBasicMaterial

// const material = new THREE.MeshBasicMaterial();

// material.color = new THREE.Color(0xff0000)

// material.map = doorColorTexture;
// material.wireframe = true
// material.transparent = true

// material.opacity = 0.2

// material.alphaMap = doorAlphaTexture;

// material.side = THREE.DoubleSide

// MeshNormalMaterial

// const material = new THREE.MeshNormalMaterial()

// MeshMatCapMaterial 
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture


// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial()

// MeshLamberMaterial
// const material = new THREE.MeshLambertMaterial() // need light

// MeshPhonMaterial 
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 1000;
// material.specular = new THREE.Color(0x1188ff)

// MeshToonMaterial

// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture;
// material.side = THREE.DoubleSide;


// Mesh Normal Material

// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true


// MeshMatcapMaterial

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;
 

// MeshDepthMaterial

// const material = new THREE.MeshDepthMaterial();


// MeshLamberMaterial

// const material = new THREE.MeshLambertMaterial();
// material.side = THREE.DoubleSide;


// MeshPhongMaterial

// const material = new THREE.MeshPhongMaterial();

// material.shininess = 1000;
// material.specular = new THREE.Color(0x1188ff);


// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

// const material = new THREE.MeshStandardMaterial();
const material = new THREE.MeshPhysicalMaterial()
material.side =  THREE.DoubleSide

material.metalness = 1;
material.roughness = 1;
material.map = doorColorTexture;
material.aoMap = doorAmbientOcculusionTexture;
material.aoMapIntensity = 1;

material.displacementMap = doorHeightTexture;
material.displacementScale = 0.1;
material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
material.normalMap = doorNormalTexture;
material.normalScale.set(0.5,0.5);
material.alphaMap = doorAlphaTexture;
material.transparent = true;
material.alphaMap = doorAlphaTexture;


gui.add(material,'metalness').min(0).max(1).step(0.001);
gui.add(material,"roughness").min(0).max(1).step(0.001); 

// Clearcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;

// gui.add(material,"clearcoat").min(0).max(1).step(0.0001);
// gui.add(material, "clearcoatRoughness").min(0).max(1).step(0.0001);


// Sheen

// material.sheen = 1;
// material.sheenRoughness = 0.25;
// material.sheenColor.set(1,1,1);

// gui.add(material,"sheen").min(0).max(1).step(0.001);
// gui.add(material,'sheenRoughness').min(0).max(1).step(0.001);

// gui.add(material,"sheenColor");

// Iridescene

material.iridescence = 1;
material.iridescenceIOR = 1;

material.iridescenceThicknessRange = [100,100]

gui.add(material,'iridescence').min(0).max(1).step(0.001);
gui.add(material,'iridescenceIOR').min(1).max(2.333).step(0.0001);
gui.add(material.iridescenceThicknessRange,'0').min(1).max(1000).step(1);
gui.add(material.iridescenceThicknessRange,'1').min(1).max(1000).step(1);



const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5,64,64),
    material
);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.2,16,32),
    material
)

torus.position.x = 1.5

scene.add(sphere,plane,torus);


/**
 * 
 * Light
 */

const ambinetLight = new THREE.AmbientLight(0xffffff,1);
scene.add(ambinetLight);

const pointLight = new THREE.PointLight(0xffffff,30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight) 


// Environment Map

const rgbeLoader = new RGBELoader();
rgbeLoader.load("./textures/environmentMap/2k.hdr",(envnironmentMap)=>{
    console.log(envnironmentMap)
    envnironmentMap.mapping = THREE.EquirectangularRefractionMapping;
    scene.background = envnironmentMap;
    scene.environment = envnironmentMap;
});


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // update objects
    sphere.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;
    


    sphere.rotation.x = - 0.15 * elapsedTime;
    plane.rotation.x = - 0.15 * elapsedTime;
    torus.rotation.x = - 0.15 * elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()