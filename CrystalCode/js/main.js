// main.js

// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 150, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
const crystalContainer = document.getElementById('crystal-container');

// Function to resize the renderer
function resizeRendererToDisplaySize() {
  const width = crystalContainer.clientWidth;
  const height = crystalContainer.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

// Initialize the renderer size and append to the container
renderer.setSize(crystalContainer.clientWidth, crystalContainer.clientHeight);
crystalContainer.appendChild(renderer.domElement);

// Create the crystal geometry and material
const geometry = new THREE.OctahedronGeometry(1.5, 0);
const material = new THREE.MeshStandardMaterial({
  color: 0xff69b4,
  roughness: 0.3,
  metalness: 1,
  emissive: 0x550033,
  transparent: true,
  opacity: 0.9,
});
const crystal = new THREE.Mesh(geometry, material);
scene.add(crystal);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Position the camera
camera.position.z = 3;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  crystal.rotation.x += 0.002;
  crystal.rotation.y += 0.002;
  resizeRendererToDisplaySize();
  renderer.render(scene, camera);
}
animate();

// Handle dragging interaction
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

renderer.domElement.addEventListener('mousedown', function (e) {
  isDragging = true;
});

renderer.domElement.addEventListener('mousemove', function (e) {
  if (isDragging) {
    const deltaMove = {
      x: e.clientX - previousMousePosition.x,
      y: e.clientY - previousMousePosition.y,
    };

    crystal.rotation.y += deltaMove.x * 0.005;
    crystal.rotation.x += deltaMove.y * 0.005;
  }

  previousMousePosition = {
    x: e.clientX,
    y: e.clientY,
  };
});

document.addEventListener('mouseup', function () {
  isDragging = false;
});

// Ensure the renderer resizes on window resize
window.addEventListener('resize', () => {
  resizeRendererToDisplaySize();
});
