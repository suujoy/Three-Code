import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import fragment from "../shader/fragment.glsl";
import vertex from "../shader/vertex.glsl";

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

// Canvas
const canvas = document.querySelector(".threeJs");

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Object
const geometry = new THREE.PlaneGeometry(1,1,30,34);
const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: {
        uTime: {
            value: 0,
        },
    },
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animate
const timer = new THREE.Timer();
function animate() {
    requestAnimationFrame(animate);

    timer.update();

    material.uniforms.uTime.value = timer.getElapsed();

    controls.update();
    renderer.render(scene, camera);
}

animate();
