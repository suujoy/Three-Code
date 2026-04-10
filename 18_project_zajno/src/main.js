import Lenis from "lenis";
// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll

import vertex from "../shaders/vertex.glsl";
import fragment from "../shaders/fragment.glsl";
import * as THREE from "three";

// Mouse and Raycaster
import { Raycaster } from "three";
const mouse = new THREE.Vector2();
const raycaster = new Raycaster();

// Scene
const scene = new THREE.Scene();

// Camera
const distance = 600;
const fov = 2 * Math.atan(window.innerHeight / 2 / distance) * (180 / Math.PI);

const camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);
camera.position.z = distance;

// Renderer
const canvas = document.querySelector(".threeJs");

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Cube
const geometry = new THREE.PlaneGeometry(100, 100);
const material = new THREE.MeshBasicMaterial({ color: "red" });

const images = document.querySelectorAll("img");

const planes = [];
images.forEach((image) => {
    const imageBound = image.getBoundingClientRect();
    const texture = new THREE.TextureLoader().load(image.src);
    const material = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
            uTexture: { value: texture },

            uMouse: {
                value: new THREE.Vector2(0.5, 0.5),
            },
        },
    });
    const geometry = new THREE.PlaneGeometry(
        imageBound.width,
        imageBound.height,
    );
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(
        imageBound.left - window.innerWidth / 2 + imageBound.width / 2,
        -imageBound.top + window.innerHeight / 2 - imageBound.height / 2,
        0,
    );
    planes.push(plane);
    scene.add(plane);
});

const updatePlanePosition = () => {
    planes.forEach((plane, index) => {
        const image = images[index];
        const imgBound = image.getBoundingClientRect();
        plane.position.set(
            imgBound.left - window.innerWidth / 2 + imgBound.width / 2,
            -imgBound.top + window.innerHeight / 2 - imgBound.height / 2,
            0,
        );
    });
};

// Animate (ES6)
const animate = (time) => {
    requestAnimationFrame(animate);

    lenis.raf(time);
    updatePlanePosition();
    renderer.render(scene, camera);
};

animate();

// Resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updatePlanePosition();
});

window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planes);

    planes.forEach((plane) => {
        plane.material.uniforms.uMouse.value.set(0);
    })

    if (intersects.length > 0) {
        const intersectPlane = intersects[0];
        const uv = intersectPlane.uv;
        intersectPlane.object.material.uniforms.uMouse.value.set(uv.x, uv.y);
    }
});
