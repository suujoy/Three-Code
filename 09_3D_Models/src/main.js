import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { HDRLoader } from "three/examples/jsm/Addons.js";

const app = document.querySelector("#app");

// Scene + camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    200,
);
camera.position.set(1.8, 1.4, 2.8);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
app.appendChild(renderer.domElement);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0.9, 0);
controls.update();

// HDRI environment lighting
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

new HDRLoader().load(
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/rural_evening_road_4k.hdr",
    (hdrTexture) => {
        const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;
        scene.environment = envMap;
        scene.background = envMap;
        hdrTexture.dispose();
        pmremGenerator.dispose();
    },
);

// Extra fill light
const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
fillLight.position.set(2, 4, 2);
scene.add(fillLight);

// GLB model
const loader = new GLTFLoader();
loader.load("/girl_model.glb", (gltf) => {
    scene.add(gltf.scene);
});

const clock = new THREE.Timer();

// Render loop
function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Resize handling
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onResize);
