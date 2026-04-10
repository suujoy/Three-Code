import * as THREE from "three";
import { Raycaster } from "three";
import Lenis from "lenis";
const lenis = new Lenis();
import vertex from "../shaders/vertex.glsl";
import fragment from "../shaders/fragment.glsl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Gsap animate
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");
const branding = document.querySelector(".branding");
const video = document.querySelector(".video .image2");
const scrollImages = document.querySelectorAll(".scroll-img");
const imageDiv = document.querySelectorAll(".image-div");

const tl = gsap.timeline();

gsap.from(navLinks, {
    y: -50,
    duration: 0.5,
    ease: "power4.out",
    opacity: 0,
    stagger: 0.2,
});
gsap.to(".branding", {
    y: 100,
    scrollTrigger: {
        trigger: ".branding",
        start: "top 80%",
        end: "top 50%",
        scrub: true,
    },
});

scrollImages.forEach((image) => {
    gsap.to(image, {
        y: 100,
        scrollTrigger: {
            trigger: image,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
        },
    });
});

imageDiv.forEach((img) => {
    gsap.from(img, {
        x: 300,
        scrollTrigger: {
            trigger: img,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
        },
    });
});

// Mouse and Raycaster
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
            uHover: {
                value: 0,
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

let currentPlane = null;

window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planes);

    if (intersects.length > 0) {
        const intersectPlane = intersects[0].object;

        if (currentPlane !== intersectPlane) {
            if (currentPlane) {
                gsap.to(currentPlane.material.uniforms.uHover, {
                    value: 0,
                    duration: 0.3,
                });
            }

            currentPlane = intersectPlane;

            gsap.to(currentPlane.material.uniforms.uHover, {
                value: 1,
                duration: 0.3,
            });
        }

        const uv = intersects[0].uv;
        currentPlane.material.uniforms.uMouse.value.set(uv.x, uv.y);
    } else {
        if (currentPlane) {
            gsap.to(currentPlane.material.uniforms.uHover, {
                value: 0,
                duration: 0.3,
            });
            currentPlane = null;
        }
    }
});
