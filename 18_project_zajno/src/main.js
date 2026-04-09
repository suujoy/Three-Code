import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// 1. Scene
const scene = new THREE.Scene();

// 2. Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);
camera.position.z = 5;

// 3. Renderer
const canvas = document.querySelector(".threeJs");

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// 4. Geometry
const geometry = new THREE.BoxGeometry();

// 5. Material
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// 6. Mesh
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// 7. Animation loop
function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}

animate();

// 8. Resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
