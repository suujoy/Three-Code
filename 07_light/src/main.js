import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

const canvas = document.querySelector(".threeJs");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.physicallyCorrectLights = true;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhysicalMaterial({
    color: 0x9ad6ff,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 2, 2);
scene.add(directionalLight);

const helper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(helper);

const clock = new THREE.Clock();

const gui = new GUI();
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.1);
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.1);
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.1);

gui.add(directionalLight.position, "x")
    .min(-5)
    .max(5)
    .step(0.1)
    .onChange(() => {
        helper.update();
    });

gui.add(directionalLight.position, "y")
    .min(-5)
    .max(5)
    .step(0.1)
    .onChange(() => {
        helper.update();
    });

gui.add(directionalLight.position, "z")
    .min(-5)
    .max(5)
    .step(0.1)
    .onChange(() => {
        helper.update();
    });

const mouse = {
    x: 0,
    y: 0,
};

window.addEventListener("mousemove", (event) => {
    mouse.y = event.clientX / window.innerWidth - 0.5;
    mouse.x = event.clientY / window.innerHeight - 0.5;
});

function animate() {
    const elapsed = clock.getElapsedTime();

    cube.rotation.set(mouse.x * 0.5, mouse.y * 0.5, 0);

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
