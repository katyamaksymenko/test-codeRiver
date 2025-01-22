const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('canvas').replaceWith(renderer.domElement);

camera.position.z = 5;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 5, 10);
scene.add(pointLight);

const textureLoader = new THREE.CubeTextureLoader();
const environmentMap = textureLoader.load([]);
scene.background = environmentMap;

const bubbleMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x607dbf,
    roughness: 0.5, // Makes it shiny
    metalness: 0,
    transparent: false,
    opacity: 1,
    envMap: environmentMap,
    envMapIntensity: 1,
});

const bubbles = [];

for (let i = 0; i < 30; i++) {
    // Randomize bubble size
    const radius = Math.random() * 0.5 + 0.1;
    const geometry = new THREE.SphereGeometry(radius, 64, 64);
    const bubble = new THREE.Mesh(geometry, bubbleMaterial);

    bubble.position.set(
        (Math.random() + 1) * 2,
        (Math.random() - 0.5) * 8,
        Math.random() * 2
    );

    scene.add(bubble);
    bubbles.push(bubble);

    gsap.to(bubble.position, {
        y: bubble.position.y + Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
    });
}
const smallBubbleMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf3893d,
    roughness: 0.9,
    metalness: 0.2,
    transparent: true,
    opacity: 1,
    envMap: environmentMap,
    envMapIntensity: 0.8,
});

const smallBubbles = [];

for (let i = 0; i < 10; i++) {
    const radius = Math.random() * 0.2 + 0.02;
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const smallBubble = new THREE.Mesh(geometry, smallBubbleMaterial);

    smallBubble.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        Math.random() * 5 - 2.5
    );

    scene.add(smallBubble);
    smallBubbles.push(smallBubble);

    gsap.to(smallBubble.position, {
        y: smallBubble.position.y + Math.random() * 1 + 0.5,
        duration: Math.random() * 3 + 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
    });

    gsap.to(smallBubble.material, {
        opacity: Math.random() * 0.5 + 0.5, // Fading effect
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
    });
}

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();



const slider = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentPosition = 0;
const step = 185;

function moveSlider(direction) {
    if (direction === 'prev') {
        currentPosition += step;
    } else {
        currentPosition -= step;
    }
    slider.style.left = currentPosition + 'px';
}

prevBtn.addEventListener('click', function() {
    moveSlider('prev');
});

nextBtn.addEventListener('click', function() {
    moveSlider('next');
});