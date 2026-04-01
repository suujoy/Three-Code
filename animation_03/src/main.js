import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    1000,
);

camera.position.z = 5;
scene.add(camera);

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array(3000);

for (let i = 0; i <= 1000 * 3; i++) {
    vertices[i] = (Math.random()*4) - 2;
}

geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const canvas = document.querySelector(".threeJs");

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Timer();

const animate = () => {
    window.requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};
animate();
