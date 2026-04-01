import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";

import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    100,
);
camera.position.z = 5;

const geometry = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array([
    -1.0,
    -1.0,
    1.0, // v0
    1.0,
    -1.0,
    .3, // v1
    .0,
    1.0,
    1.0, // v2
    1.0,
    1.0,
    1.0, // v3
    -1.0,
    1.0,
    1.0, // v4
    -1.0,
    -1.0,
    1.0, // v5
]);
// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const canvas = document.querySelector(".threeJs");

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const controll = new OrbitControls(camera, canvas);

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Timer();
const animate = () => {
    window.requestAnimationFrame(animate);
    controll.update();
    clock.update();
    mesh.rotation.y = clock.getElapsed();
    renderer.render(scene, camera);
};

animate();
