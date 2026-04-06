import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertex from "../shaders/vertex.glsl";
import fragment from "../shaders/fragment.glsl";

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

// Renderer
const canvas = document.querySelector(".threeJs");

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Plane Geometry
const geometry = new THREE.PlaneGeometry(3, 3,100, 100);
const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: {
        uTime: { value: 0 },
        uTexture: {
            value: new THREE.TextureLoader().load(
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ),
        },
    },
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Resize Event
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animate Function
const timer = new THREE.Timer();
function animate() {
    requestAnimationFrame(animate);
    timer.update();
    material.uniforms.uTime.value = timer.getElapsed();

    controls.update();
    renderer.render(scene, camera);
}

animate();
