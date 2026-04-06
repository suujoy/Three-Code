import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import fragment from "../shaders/fragment.glsl";
import vertex from "../shaders/vertex.glsl";

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);
camera.position.z = 5;

const canvas = document.querySelector(".threeJs");

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Plane Geometry
const geometry = new THREE.PlaneGeometry(2, 2, 20, 20);
const material = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    side: THREE.DoubleSide,
    uniforms: {
        uTime: {
            value: 0,
        },
    },
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Resize Event
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});

// Animation Loop
const timer = new THREE.Timer();
function animate() {
    requestAnimationFrame(animate);
    timer.update();
    material.uniforms.uTime.value = timer.getElapsed();
    controls.update();

    renderer.render(scene, camera);
}

animate();
