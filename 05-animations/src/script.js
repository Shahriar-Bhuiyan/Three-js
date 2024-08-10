import * as THREE from 'three'

const canvas = document.querySelector('canvas.webgl');


const scene = new THREE.Scene();


const geometry = new THREE.BoxGeometry(1,1,1);

const material = new THREE.MeshBasicMaterial({color:0xff0000});

const mesh = new THREE.Mesh(geometry,material);


scene.add(mesh);

const sizes = {
    width:800,
    height:500
}

const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height);

camera.position.z = 3;


const renderer = new THREE.WebGLRenderer({
    canvas:canvas
});

renderer.setSize(sizes.width,sizes.height);

const clock = new THREE.Clock();


const animation =()=>{
//    clock
    const elapsedTime =  clock.getElapsedTime();

    mesh.rotation.y = elapsedTime 
    console.log(elapsedTime)
    renderer.render(scene,camera);
    window.requestAnimationFrame(animation)

};

animation()