import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertex from "../shaders/vertex.glsl";
import browVertex from "../shaders/browVertex.glsl";
import fragment from "../shaders/fragment.glsl";
import browFragment from "../shaders/browFragment.glsl";

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#222");

// camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);
camera.position.z = 3;

// renderer
const canvas = document.querySelector(".threeJs");

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// geometry
const geometry = new THREE.PlaneGeometry(2, 2, 100, 100);
const material = new THREE.ShaderMaterial({
    vertexShader: browVertex,
    fragmentShader: browFragment,
    side: THREE.DoubleSide,
    uniforms: {
        uTime: { value: 0 },
    },
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// resize event
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});

// animation loop
const timer = new THREE.Timer();

function animate() {
    requestAnimationFrame(animate);

    timer.update();
    material.uniforms.uTime.value = timer.getElapsed();

    controls.update();
    renderer.render(scene, camera);
}

animate();
