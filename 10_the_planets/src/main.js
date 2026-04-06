import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
);
camera.position.set(0, 0, 12);

const loader = new THREE.TextureLoader();

const sunTexture = loader.load("/8k_sun.jpg");
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
scene.add(sun);

// Textures
const earthTexture = loader.load("/2k_earth_daymap.jpg");
const earthCloudsTexture = loader.load("/2k_earth_clouds.jpg");
const jupiterTexture = loader.load("/2k_jupiter.jpg");
const marsTexture = loader.load("/2k_mars.jpg");
const mercuryTexture = loader.load("/2k_mercury.jpg");
const neptuneTexture = loader.load("/2k_neptune.jpg");
const saturnTexture = loader.load("/2k_saturn.jpg");
const saturnRingsTexture = loader.load("/2k_saturn_ring_alpha.png");
const uranusTexture = loader.load("/2k_uranus.jpg");
const venusTexture = loader.load("/2k_venus_surface.jpg");
const venusAtmosphereTexture = loader.load("/2k_venus_atmosphere.jpg");
const milkyWayTexture = loader.load("/8k_stars_milky_way.jpg");
const moonEarthTexture = loader.load("/moon_earth.jpg");
const moon1Texture = loader.load("/moon_planet_1.jpg");
const moon2Texture = loader.load("/moon_planet_2.jpg");
const moon3Texture = loader.load("/moon_planet_3.jpg");

milkyWayTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = milkyWayTexture;

// Materials
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const earthCloudsMaterial = new THREE.MeshBasicMaterial({
    map: earthCloudsTexture,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
});
const jupiterMaterial = new THREE.MeshBasicMaterial({ map: jupiterTexture });
const marsMaterial = new THREE.MeshBasicMaterial({ map: marsTexture });
const mercuryMaterial = new THREE.MeshBasicMaterial({ map: mercuryTexture });
const neptuneMaterial = new THREE.MeshBasicMaterial({ map: neptuneTexture });
const saturnMaterial = new THREE.MeshBasicMaterial({ map: saturnTexture });
const saturnRingsMaterial = new THREE.MeshBasicMaterial({
    map: saturnRingsTexture,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide,
    depthWrite: false,
});
const uranusMaterial = new THREE.MeshBasicMaterial({ map: uranusTexture });
const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
const venusAtmosphereMaterial = new THREE.MeshBasicMaterial({
    map: venusAtmosphereTexture,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
});
const moonEarthMaterial = new THREE.MeshBasicMaterial({
    map: moonEarthTexture,
});
const moon1Material = new THREE.MeshBasicMaterial({ map: moon1Texture });
const moon2Material = new THREE.MeshBasicMaterial({ map: moon2Texture });
const moon3Material = new THREE.MeshBasicMaterial({ map: moon3Texture });

const planets = [
    {
        name: "Mercury",
        radius: 0.135,
        distance: 4.8,
        speed: 0.004,
        material: mercuryMaterial,
        clouds: null,
        atmosphere: null,
        rings: null,
        moons: [],
    },
    {
        name: "Venus",
        radius: 0.24,
        distance: 7.2,
        speed: 0.003,
        material: venusMaterial,
        clouds: null,
        atmosphere: venusAtmosphereMaterial,
        rings: null,
        moons: [],
    },
    {
        name: "Earth",
        radius: 0.2625,
        distance: 9.6,
        speed: 0.002,
        material: earthMaterial,
        clouds: earthCloudsMaterial,
        atmosphere: null,
        rings: null,
        moons: [
            {
                name: "Moon",
                radius: 0.04725,
                distance: 1.26,
                speed: 0.01,
                material: moonEarthMaterial,
            },
        ],
    },
    {
        name: "Mars",
        radius: 0.1875,
        distance: 12,
        speed: 0.0018,
        material: marsMaterial,
        clouds: null,
        atmosphere: null,
        rings: null,
        moons: [
            {
                name: "Phobos",
                radius: 0.0315,
                distance: 0.91,
                speed: 0.015,
                material: moon1Material,
            },
            {
                name: "Deimos",
                radius: 0.02625,
                distance: 1.26,
                speed: 0.012,
                material: moon2Material,
            },
        ],
    },
    {
        name: "Jupiter",
        radius: 0.6375,
        distance: 16,
        speed: 0.001,
        material: jupiterMaterial,
        clouds: null,
        atmosphere: null,
        rings: null,
        moons: [
            {
                name: "Io",
                radius: 0.0525,
                distance: 1.68,
                speed: 0.02,
                material: moon1Material,
            },
            {
                name: "Europa",
                radius: 0.04725,
                distance: 2.1,
                speed: 0.018,
                material: moon2Material,
            },
            {
                name: "Ganymede",
                radius: 0.063,
                distance: 2.66,
                speed: 0.015,
                material: moon3Material,
            },
        ],
    },
    {
        name: "Saturn",
        radius: 0.5625,
        distance: 20,
        speed: 0.0009,
        material: saturnMaterial,
        clouds: null,
        atmosphere: null,
        rings: saturnRingsMaterial,
        moons: [
            {
                name: "Titan",
                radius: 0.063,
                distance: 1.82,
                speed: 0.015,
                material: moon1Material,
            },
            {
                name: "Rhea",
                radius: 0.04725,
                distance: 2.38,
                speed: 0.012,
                material: moon2Material,
            },
        ],
    },
    {
        name: "Uranus",
        radius: 0.4125,
        distance: 24,
        speed: 0.0007,
        material: uranusMaterial,
        clouds: null,
        atmosphere: null,
        rings: null,
        moons: [
            {
                name: "Titania",
                radius: 0.0525,
                distance: 1.68,
                speed: 0.013,
                material: moon1Material,
            },
        ],
    },
    {
        name: "Neptune",
        radius: 0.4125,
        distance: 28,
        speed: 0.0006,
        material: neptuneMaterial,
        clouds: null,
        atmosphere: null,
        rings: null,
        moons: [
            {
                name: "Triton",
                radius: 0.0525,
                distance: 1.82,
                speed: 0.014,
                material: moon2Material,
            },
        ],
    },
];

const createPlanet = (planet) => {
    const orbitGroup = new THREE.Group();
    const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);

    planetMesh.scale.setScalar(planet.radius);
    planetMesh.position.x = planet.distance;

    if (planet.clouds) {
        const clouds = new THREE.Mesh(
            new THREE.SphereGeometry(planet.radius + 0.01, 32, 32),
            planet.clouds,
        );
        planetMesh.add(clouds);
    }

    if (planet.atmosphere) {
        const atmosphere = new THREE.Mesh(
            new THREE.SphereGeometry(planet.radius + 0.01, 32, 32),
            planet.atmosphere,
        );
        atmosphere.scale.set(1.05, 1.05, 1.05);
        planetMesh.add(atmosphere);
    }

    if (planet.rings) {
        const rings = new THREE.Mesh(
            new THREE.RingGeometry(planet.radius + 0.1, planet.radius + 0.6, 64),
            planet.rings,
        );
        rings.rotation.x = Math.PI / 2;
        planetMesh.add(rings);
    }

    orbitGroup.add(planetMesh);
    orbitGroup.userData.planetMesh = planetMesh;

    return orbitGroup;
};

const createMoon = (moon) => {
    const moonMesh = new THREE.Mesh(sphereGeometry, moon.material);
    moonMesh.scale.setScalar(moon.radius);
    moonMesh.position.x = moon.distance;
    moonMesh.userData.isMoon = true;
    moonMesh.userData.orbitAngle = Math.random() * Math.PI * 2;
    moonMesh.userData.orbitDistance = moon.distance;
    moonMesh.userData.orbitSpeed = moon.speed;
    return moonMesh;
};

const planetMeshes = planets.map((planet) => {
    const planetOrbit = createPlanet(planet);
    scene.add(planetOrbit);

    planet.moons.forEach((moon) => {
        const moonMesh = createMoon(moon);
        planetOrbit.userData.planetMesh.add(moonMesh);
    });

    return planetOrbit;
});

const canvas = document.querySelector(".threeJs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(3, 3, 2);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffd8a8, 1.2, 10);
pointLight.position.set(-2, 1, 3);
scene.add(pointLight);

function onWindowResize() {
    const { innerWidth, innerHeight } = window;
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

window.addEventListener("resize", onWindowResize);

function animate() {
    planetMeshes.forEach((planetOrbit, planetIndex) => {
        const planetData = planets[planetIndex];

        // Orbit around sun by rotating the orbit group.
        planetOrbit.rotation.y += planetData.speed;

        // Planet spin on its own axis.
        planetOrbit.userData.planetMesh.rotation.y += 0.01;

        // Moon orbit around each planet.
        planetOrbit.userData.planetMesh.children.forEach((child) => {
            if (!child.userData.isMoon) return;
            child.userData.orbitAngle += child.userData.orbitSpeed;
            child.position.x =
                Math.sin(child.userData.orbitAngle) * child.userData.orbitDistance;
            child.position.z =
                Math.cos(child.userData.orbitAngle) * child.userData.orbitDistance;
        });
    });

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
