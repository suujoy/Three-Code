import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector(".threeJs");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
);
camera.position.set(0, 0, 3);
scene.add(camera);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(2, 2, 3);
scene.add(directionalLight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
    color: 0x4cc9f0,
    metalness: 0.25,
    roughness: 0.35,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxAzimuthAngle= Math.PI / 4;
controls.minAzimuthAngle= -Math.PI / 4;


const mouse = {
    x: 0,
    y: 0,
};

window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX / window.innerWidth;
    mouse.y = event.clientY / window.innerHeight;
});

const clock = new THREE.Timer();

const animate = () => {
    const elapsedTime = clock.getElapsed();
    sphere.rotation.y = elapsedTime * 0.4;

    sphere.lookAt(new THREE.Vector3(mouse.x - 0.5, -mouse.y + 0.5, 1));
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};

animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
