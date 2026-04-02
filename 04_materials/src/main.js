import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

const canvas = document.querySelector(".threejs");

const scene = new THREE.Scene();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load("./8081_earthmap10k.jpg");
earthTexture.colorSpace = THREE.SRGBColorSpace;

const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100,
);
camera.position.z = 3;
scene.add(camera);

const geometry = new THREE.SphereGeometry(1, 100, 100);
const material = new THREE.MeshStandardMaterial({
    map: earthTexture,
});
const cube = new THREE.Mesh(geometry, material);

const hdri = new RGBELoader();
hdri.load(
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/ticknock_03_2k.hdr",
    (hdriTexture) => {
        hdriTexture.mapping = THREE.EquirectangularRefractionMapping;
        scene.environment = hdriTexture;
        scene.background = hdriTexture;
    },
);

scene.add(cube);



const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};

animate();
