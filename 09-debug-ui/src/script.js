import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'



// Debug

const gui = new GUI({
    width:300,
    title:"Nice debug UI",
    closeFolders:false
});

// gui.close()

// gui.hide();


window.addEventListener('keydown',(event)=>{
    if(event.key == 'h'){
        gui.show(gui._hidden)
    }
})
const debugObject = {}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

debugObject.color = '#00bce1';


const geometry = new THREE.BoxGeometry(1,1,1,2,2,2);
const material = new THREE.MeshBasicMaterial({color:debugObject.color,wireframe:true})
const mesh = new THREE.Mesh(geometry,material);

scene.add(mesh);

const cubeTweaks = gui.addFolder('Cube');

cubeTweaks.add(mesh.position,'y').min(-3).max(3).step(0.01).name('elevation');


cubeTweaks.add(mesh,'visible');
cubeTweaks.add(material,'wireframe');
cubeTweaks.addColor(debugObject,'color').onChange((value)=>{
  material.color.set(debugObject.color)
});

debugObject.spin = ()=>{
    gsap.to(mesh.rotation,{y:mesh.rotation.y + Math.PI*2})
}
cubeTweaks.add(debugObject,'spin');

debugObject.fly = ()=>{
    gsap.to(mesh.position, {
     duration:5,
     x:(t)=>Math.cos(t*Math.PI * 2) * 5,
     z:(t)=>Math.sin(t*Math.PI * 2) * 5,
     ease:'sine.inOut',
     y:'+=10',
     yoyo:true,
     repeat:1
})
}
cubeTweaks.add(debugObject,'fly')

debugObject.subdivision = 2;
cubeTweaks.add(debugObject,'subdivision')
.min(1)
.max(20)
.step(1).onFinishChange(()=>{
    mesh.geometry.dispose()
    mesh.geometry = new THREE.BoxGeometry(
        1,1,1,
        debugObject.subdivision,debugObject.subdivision,debugObject.subdivision
    )
})

const sizes = {
    width:window.innerWidth,
    height:window.innerHeight
}

window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth;
    sizes.height = width.innerHeight;

    // camera 

    camera.aspect = sizes.width/ sizes.height;
    camera.updateProjectionMatrix();


    // renderer
    renderer.setSize(sizes.width,sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
})

const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100);

camera.position.x = 1
camera.position.y = 1
camera.position.z = 2

scene.add(camera);


const controls = new OrbitControls(camera,canvas);
console.enableDamping = true


const renderer = new THREE.WebGLRenderer({
    canvas:canvas
});

renderer.setSize(sizes.width,sizes.height);

const tick =() =>{

    controls.update();

    renderer.render(scene,camera)
    window.requestAnimationFrame(tick);
}

tick()