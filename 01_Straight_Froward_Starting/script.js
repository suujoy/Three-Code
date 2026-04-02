const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    20,
);

const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: "green" });
const boxMesh = new THREE.Mesh(boxGeo, boxMaterial);

scene.add(boxMesh);

const canvas = document.querySelector('.threeJs')

const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)

camera.position.z = 5


function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})