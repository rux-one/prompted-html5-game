import { Player } from './player.js';
import { Planet } from './planet.js';
import { Carrot } from './carrot.js';
import { UI } from './ui.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

// Set up planets (four planets)
const planets = [
  new Planet(width/2, height/2 + 170, 100, '#5a9', 0.7), // Home
  new Planet(width/2 - 320, height/2 - 120, 70, '#d66', 1.1), // Heavy
  new Planet(width/2 + 320, height/2 - 140, 60, '#6ad', 0.4), // Light
  new Planet(width/2, height/2 - 300, 90, '#fd6', 0.9) // Erratic
];
const player = new Player(planets[0].x, planets[0].y - planets[0].radius - 24);
const ui = new UI();

// Touch controls detection and setup
const touchControls = document.getElementById('touch-controls');
function showTouchControls() {
  touchControls.classList.remove('hidden');
}
function hideTouchControls() {
  touchControls.classList.add('hidden');
}
// Show controls on small screens or when touch is detected
function autoShowTouchControls() {
  if (window.innerWidth < 800 || ('ontouchstart' in window)) {
    showTouchControls();
  } else {
    hideTouchControls();
  }
}
autoShowTouchControls();
window.addEventListener('resize', autoShowTouchControls);
// Touch event listeners
let leftDown = false, rightDown = false;
document.getElementById('btn-left').addEventListener('touchstart', e => { e.preventDefault(); player.moveLeft = true; leftDown = true; });
document.getElementById('btn-left').addEventListener('touchend', e => { e.preventDefault(); player.moveLeft = false; leftDown = false; });
document.getElementById('btn-right').addEventListener('touchstart', e => { e.preventDefault(); player.moveRight = true; rightDown = true; });
document.getElementById('btn-right').addEventListener('touchend', e => { e.preventDefault(); player.moveRight = false; rightDown = false; });
document.getElementById('btn-jump').addEventListener('touchstart', e => { e.preventDefault(); player.startJumpCharge(); });
document.getElementById('btn-jump').addEventListener('touchend', e => { e.preventDefault(); player.releaseJump(); });

// Carrots
const carrots = [];
function spawnCarrots() {
  carrots.length = 0;
  // 5 carrots, randomly distributed on planet surfaces
  for (let i = 0; i < 5; ++i) {
    const planet = planets[Math.floor(Math.random() * planets.length)];
    const angle = Math.random() * Math.PI * 2;
    carrots.push(new Carrot(planet, angle));
  }
}
spawnCarrots();

let score = 0; // Carrots collected

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  // Responsywne rozmieszczanie i skalowanie planet
  // Bazuj promień planet na szerokości, by uniknąć problemów na wąskich ekranach
  const refDim = Math.min(width, height * 0.8);
  const planetRadii = [0.17, 0.12, 0.10, 0.15];
  const radii = planetRadii.map(f => Math.max(32, Math.floor(refDim * f)));
  // Zwiększony margines bezpieczeństwa
  const marginX = Math.max(0.14 * width, Math.max(...radii) + 12);
  const marginY = Math.max(0.13 * height, Math.max(...radii) + 12);
  // Elipsa na środku ekranu, mniejsza na wąskich ekranach
  let rx = (width - 2 * marginX) / 2.1;
  let ry = (height - 2 * marginY) / 2.1;
  // Jeśli ekran jest bardzo pionowy (wysoki), dodatkowo zmniejsz elipsę
  if (height > width * 1.35) {
    ry *= 0.82;
    rx *= 0.94;
  }
  const cx = width / 2, cy = height / 2;
  const angles = [Math.PI/2, Math.PI, -Math.PI/6, Math.PI*1.6];
  for (let i=0; i<4; ++i) {
    planets[i].radius = radii[i];
    planets[i].x = cx + Math.cos(angles[i]) * rx;
    planets[i].y = cy + Math.sin(angles[i]) * ry;
  }
  // Jeśli gracz istnieje, przesuń go na powierzchnię domowej planety po resize (jeśli był na niej)
  if (typeof player !== 'undefined' && player.currentPlanet === planets[0]) {
    player.x = planets[0].x;
    player.y = planets[0].y - planets[0].radius - player.radius - 2;
    player.grounded = true;
    player.vx = 0; player.vy = 0;
  }
}
window.addEventListener('resize', resize);

let gameOver = false;
// Starfield
let stars = [];
function spawnStars() {
  stars = [];
  for (let i=0; i<60; ++i) {
    stars.push({x: Math.random()*width, y: Math.random()*height, r: Math.random()*1.5+0.5, a: Math.random()});
  }
}
spawnStars();

function gameLoop() {
  if (gameOver) return;
  ctx.clearRect(0, 0, width, height);
  // Draw background
  ctx.fillStyle = '#181c2b';
  ctx.fillRect(0, 0, width, height);
  // Draw stars
  ctx.save();
  for (const s of stars) {
    ctx.globalAlpha = 0.4 + 0.5 * Math.sin(Date.now()/1000 + s.a);
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fillStyle = '#fff';
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  // Draw all planets
  for (const p of planets) p.draw(ctx);

  // Draw and check carrots
  let anyAnimating = false;
  for (const carrot of carrots) {
    carrot.draw(ctx);
    if (carrot.collected && carrot.collectFrame <= 15) anyAnimating = true;
    if (!carrot.collected && checkCarrotCollision(player, carrot)) {
      carrot.collected = true;
      score++;
      ui.setScore(score);
      if (score >= 5) {
        gameOver = true;
        setTimeout(() => ui.showPopup(), 500);
        return;
      }
    }
  }

  player.update(planets);
  player.draw(ctx);

  ui.draw();
  // Keep animating until all carrot animations are done
  if (!gameOver || anyAnimating) requestAnimationFrame(gameLoop);
}

// Re-spawn stars on resize
window.addEventListener('resize', () => { resize(); spawnStars(); });

function checkCarrotCollision(player, carrot) {
  const dx = player.x - carrot.x;
  const dy = player.y - carrot.y;
  const dist = Math.sqrt(dx*dx + dy*dy);
  return dist < player.radius + carrot.radius - 2;
}

gameLoop();

// Keyboard controls
window.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft') player.moveLeft = true;
  if (e.code === 'ArrowRight') player.moveRight = true;
  if (e.code === 'Space' && !player.jumpCharging) player.startJumpCharge();
});
window.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowLeft') player.moveLeft = false;
  if (e.code === 'ArrowRight') player.moveRight = false;
  if (e.code === 'Space') player.releaseJump();
});

// Replay button (for later)
document.getElementById('replayBtn').onclick = () => {
  // Reset state for replay
  score = 0;
  ui.setScore(score);
  for (const carrot of carrots) carrot.collected = false;
  player.x = planets[0].x;
  player.y = planets[0].y - planets[0].radius - 24;
  player.grounded = true;
  gameOver = false;
  ui.hidePopup();
  gameLoop();
};
