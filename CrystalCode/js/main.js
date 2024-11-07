// Create a canvas for the asteroids
const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = '60px'; // Adjust this value to the height of your navbar
canvas.style.left = '0';
canvas.style.zIndex = '-1'; // Ensure it stays in the background
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - parseInt(canvas.style.top);
const ctx = canvas.getContext('2d');

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - parseInt(canvas.style.top);
});

// Asteroid properties
const asteroids = [];
function createAsteroid() {
  const size = Math.random() * 4 + 2;
  return {
    x: Math.random() * canvas.width,
    y: -size,
    size: size,
    speed: Math.random() * 2 + 1,
    trail: [],
    shimmerOffset: 0 // For controlling the shimmer effect
  };
}

// Update and draw asteroids with shimmering tail effect
function drawAsteroids() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < asteroids.length; i++) {
    const asteroid = asteroids[i];
    asteroid.y += asteroid.speed;
    asteroid.shimmerOffset += 0.1; // Adjust speed of shimmer

    // Add current position to the trail
    asteroid.trail.push({ x: asteroid.x, y: asteroid.y });
    if (asteroid.trail.length > 20) {
      asteroid.trail.shift(); // Maintain trail length
    }

    // Draw the trail with shimmer effect
    for (let j = 0; j < asteroid.trail.length; j++) {
      const pos = asteroid.trail[j];
      const opacity = (j + 1) / asteroid.trail.length;
      const gradient = ctx.createRadialGradient(
        pos.x, pos.y, 0,
        pos.x, pos.y, asteroid.size * 0.5
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.6})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, asteroid.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }

    // Draw the main asteroid
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.arc(asteroid.x, asteroid.y, asteroid.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    // Remove asteroid if it goes off screen
    if (asteroid.y > canvas.height) {
      asteroids.splice(i, 1);
      i--;
    }
  }
}

// Animate the scene
function animate() {
  drawAsteroids();
  requestAnimationFrame(animate);
}

// Create new asteroids at intervals
setInterval(() => {
  if (asteroids.length < 25) { // Control the number of asteroids
    asteroids.push(createAsteroid());
  }
}, 500); // Adjust interval for fewer or more frequent asteroids

animate();
