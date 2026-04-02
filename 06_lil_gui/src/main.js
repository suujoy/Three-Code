import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

const canvas = document.querySelector(".threeJs");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1f2937);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    metalness: 0.7,
    roughness: 0.2,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 2, 3);
scene.add(directionalLight);

// GUI
const gui = new GUI();

const params = {
    width: 1,
    height: 1,
    depth: 1,
    color: "#3b82f6",
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    ambientLight: 0.7,
    directionalLight: 1,
    metalness: 0.7,
    roughness: 0.2,
};

// function to update geometry
function updateGeometry() {
    cube.geometry.dispose();
    cube.geometry = new THREE.BoxGeometry(
        params.width,
        params.height,
        params.depth,
    );
}

// size controls
gui.add(params, "width", 0.1, 3, 0.1).onChange(updateGeometry);
gui.add(params, "height", 0.1, 3, 0.1).onChange(updateGeometry);
gui.add(params, "depth", 0.1, 3, 0.1).onChange(updateGeometry);

// rotation controls
gui.add(params, "rotationX", -Math.PI, Math.PI, 0.01).onChange((value) => {
    cube.rotation.x = value;
});
gui.add(params, "rotationY", -Math.PI, Math.PI, 0.01).onChange((value) => {
    cube.rotation.y = value;
});
gui.add(params, "rotationZ", -Math.PI, Math.PI, 0.01).onChange((value) => {
    cube.rotation.z = value;
});

//Light controls
gui.add(params, "ambientLight", 0.1, 3, 0.1).onChange((value) => {
    ambientLight.intensity = value;
});

gui.add(params, "directionalLight", 0.1, 5, 0.1).onChange((value) => {
    directionalLight.intensity = value;
});

// color control
gui.addColor(params, "color").onChange((value) => {
    cube.material.color.set(value);
});

//Material
gui.add(params, "metalness", 0, 1, 0.01).onChange((value) => {
    cube.material.metalness = value;
});

gui.add(params, "roughness", 0, 1, 0.01).onChange((value) => {
    cube.material.roughness = value;
});

function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
