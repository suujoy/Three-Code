import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import gsap from "gsap";

const canvas = document.querySelector(".threeJs");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0f14);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
    60,
    sizes.width / sizes.height,
    0.1,
    1000,
);
camera.position.set(2.5, 1.5, 4);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;

const radius = 1;
const segments = 64;
const color = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];
const spheres = new THREE.Group();
spheres.position.x = 0.2;
spheres.position.z = -0.2;
spheres.position.y = -0.5;
spheres.rotation.y = Math.PI / 6.5;

for (let i = 0; i < 4; i++) {
    const geometry = new THREE.SphereGeometry(radius, segments, segments);
    const material = new THREE.MeshStandardMaterial({ color: color[i] });
    const sphere = new THREE.Mesh(geometry, material);

    const angle = (i / 4) * (Math.PI * 2);

    sphere.position.x = 3 * Math.cos(angle);
    sphere.position.z = 3 * Math.sin(angle);

    spheres.add(sphere);
}

scene.add(spheres);

gsap.to(spheres.rotation, {
    y: Math.PI * 2,
    duration: 2,
    repeat: -1,
    ease: "none"
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
directionalLight.position.set(3, 2, 1.5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffb86c, 1.1, 20, 2);
pointLight.position.set(-2, 1.5, 2);
scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const gui = new GUI({ width: 300 });

const ambientFolder = gui.addFolder("Ambient Light");
ambientFolder.add(ambientLight, "intensity", 0, 2, 0.01);
ambientFolder
    .addColor({ color: ambientLight.color.getHex() }, "color")
    .onChange((value) => {
        ambientLight.color.set(value);
    });

const directionalFolder = gui.addFolder("Directional Light");
directionalFolder.add(directionalLight, "intensity", 0, 3, 0.01);
directionalFolder.add(directionalLight.position, "x", -10, 10, 0.01);
directionalFolder.add(directionalLight.position, "y", -10, 10, 0.01);
directionalFolder.add(directionalLight.position, "z", -10, 10, 0.01);
directionalFolder
    .addColor({ color: directionalLight.color.getHex() }, "color")
    .onChange((value) => {
        directionalLight.color.set(value);
    });

const pointFolder = gui.addFolder("Point Light");
pointFolder.add(pointLight, "intensity", 0, 3, 0.01);
pointFolder.add(pointLight.position, "x", -10, 10, 0.01);
pointFolder.add(pointLight.position, "y", -10, 10, 0.01);
pointFolder.add(pointLight.position, "z", -10, 10, 0.01);
pointFolder
    .addColor({ color: pointLight.color.getHex() }, "color")
    .onChange((value) => {
        pointLight.color.set(value);
    });

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const clock = new THREE.Timer();

function animate() {
    const elapsedTime = clock.getElapsed();

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
