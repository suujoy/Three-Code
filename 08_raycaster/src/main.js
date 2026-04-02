import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector(".threeJs");

const scene = new THREE.Scene();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
    60,
    sizes.width / sizes.height,
    0.1,
    100,
);
camera.position.set(3, 2, 6);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x0b0e13, 1);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 32, 32),
    new THREE.MeshStandardMaterial({
        color: 0x4f8cff,
        roughness: 0.3,
        metalness: 0.1,
    }),
);
sphere.position.x = -1.4;
scene.add(sphere);

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
        color: 0xff7a59,
        roughness: 0.4,
        metalness: 0.2,
    }),
);
cube.position.x = 1.4;
scene.add(cube);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.9, 0, 2);
pointLight.position.set(3, 3, 3);
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(-4, 4, 2);
scene.add(directionalLight);

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -((event.clientY / window.innerWidth) * 2) + 1;

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
       intersects[0].object.material.color.set(0xff0000);
    }

    if(intersects.length === 0){
        sphere.material.color.set(0x4f8cff);
        cube.material.color.set(0xff7a59);
    }
});

const clock = new THREE.Timer();
const animate = () => {
    clock.update();
    const elapsed = clock.getElapsed();

    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};

animate();
