import * as THREE from "three";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
);
camera.position.z = 4;

// Renderer
const canvas = document.querySelector("#canvas");

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Geometry (Icosahedron Sphere)
const geometry = new THREE.IcosahedronGeometry(2, 20);

// Material (Shader)
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    // wireframe: true,
    uniforms: {
        uTime: {
            value: 0,
        },
        uColor: {
            value: 0,
        },
    },
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

mesh.position.y = -3.3;
mesh.rotation.x = 0.4;
mesh.rotation.z = 0.2;

//GSAP Animation

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".landing",
        start: "top top",
        end: "bottom center",
        scrub: 2,
        markers: true,
    },
});

tl.to(
    mesh.position,
    {
        y: 0,
        z: -2,
        ease: "linear",
    },
    "a",
).to(
    material.uniforms.uColor,
    {
        value: 1,
        ease: "linear",
    },
    "a",
);

// Animate

const timer = new THREE.Timer();
const animate = () => {
    requestAnimationFrame(animate);
    timer.update();
    material.uniforms.uTime.value = timer.getElapsed();

    renderer.render(scene, camera);
};

animate();

// Resize
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
