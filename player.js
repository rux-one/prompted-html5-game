export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 18;
    this.angle = 0;
    this.planetDist = 0; // Distance from planet center
    this.vx = 0;
    this.vy = 0;
    this.gravity = 0.7;
    this.jumpStrength = 12;
    this.isJumping = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.speed = 2.1;
    this.grounded = true;
    this.currentPlanet = null;
    // Moderacja siły skoku
    this.jumpCharging = false;
    this.jumpCharge = 0;
    this.jumpPower = 0;
    this.maxJumpCharge = 22; // max klatek ładowania
    this.minJumpStrength = 8;
    this.maxJumpStrength = 18;
  }

  update(planets) {
    // Ładowanie siły skoku
    if (this.jumpCharging && this.grounded) {
      if (this.jumpCharge < this.maxJumpCharge) this.jumpCharge++;
    }

    // Sum gravitational vectors from all planets
    let gx = 0, gy = 0;
    let nearest = null;
    let minDist = Infinity;
    for (const p of planets) {
      const dx = p.x - this.x;
      const dy = p.y - this.y;
      const distSq = dx*dx + dy*dy;
      const dist = Math.sqrt(distSq);
      // Siła maleje z kwadratem odległości
      const force = p.gravity * p.radius * 1200 / (distSq + 1);
      gx += (dx / (dist+0.01)) * force;
      gy += (dy / (dist+0.01)) * force;
      // Najbliższa planeta do lądowania
      if (dist - (p.radius + this.radius) < minDist) {
        minDist = dist - (p.radius + this.radius);
        nearest = p;
      }
    }
    this.currentPlanet = nearest;
    // Kąt względem najbliższej planety
    const dx = this.x - nearest.x;
    const dy = this.y - nearest.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    this.angle = Math.atan2(dy, dx);
    this.planetDist = dist;

    // Walking around planet
    if (this.grounded) {
      // Poruszanie się po powierzchni najbliższej planety
      if (this.moveLeft) this.angle -= 0.035;
      if (this.moveRight) this.angle += 0.035;
      // Aktualizacja pozycji na powierzchni
      this.x = nearest.x + Math.cos(this.angle) * (nearest.radius + this.radius);
      this.y = nearest.y + Math.sin(this.angle) * (nearest.radius + this.radius);
      this.vx = 0; this.vy = 0;
    } else {
      // Airborne: apply sum of gravity vectors
      this.vx += gx * 0.016; // dt ~16ms
      this.vy += gy * 0.016;
      this.x += this.vx;
      this.y += this.vy;
      // Sprawdź lądowanie na najbliższej planecie
      const toSurface = dist - (nearest.radius + this.radius);
      // Warunek: blisko powierzchni i porusza się w stronę planety
      const towardSurface = (dx*this.vx + dy*this.vy) < 0;
      if (toSurface < 1.5 && towardSurface) {
        this.grounded = true;
        // Snap to surface
        this.x = nearest.x + Math.cos(this.angle) * (nearest.radius + this.radius);
        this.y = nearest.y + Math.sin(this.angle) * (nearest.radius + this.radius);
        this.vx = 0; this.vy = 0;
      }
    }
  }

  startJumpCharge() {
    // Rozpocznij ładowanie skoku (przytrzymanie klawisza/przycisku)
    if (this.grounded) {
      this.jumpCharging = true;
      this.jumpCharge = 0;
    }
  }

  releaseJump() {
    // Skok następuje po puszczeniu klawisza/przycisku
    if ((this.grounded || this.planetDist - (this.currentPlanet ? this.currentPlanet.radius + this.radius : 0) < 3) && this.jumpCharging) {
      // Siła zależna od długości ładowania
      const chargeRatio = Math.min(1, this.jumpCharge / this.maxJumpCharge);
      const jumpStrength = this.minJumpStrength + (this.maxJumpStrength - this.minJumpStrength) * chargeRatio;
      const angle = this.angle;
      this.vx = Math.cos(angle) * jumpStrength;
      this.vy = Math.sin(angle) * jumpStrength;
      this.grounded = false;
    }
    this.jumpCharging = false;
    this.jumpCharge = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle + Math.PI/2);
    // Animation state
    if (!this.frame) this.frame = 0;
    if (!this.lastGrounded) this.lastGrounded = true;
    if (this.grounded) {
      if (this.moveLeft || this.moveRight) this.frame += 1;
      else this.frame = 0;
    } else {
      this.frame = 0;
    }
    // Squash/stretch for jump
    let sy = this.grounded ? 1 : 0.85;
    let sx = this.grounded ? 1 : 1.15;
    ctx.scale(sx, sy);
    // Body
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();
    // Feet (simple walk cycle)
    if (this.grounded) {
      const footAngle = Math.sin(this.frame/7) * 0.6;
      ctx.save();
      ctx.rotate(footAngle);
      ctx.fillStyle = '#ffb347';
      ctx.beginPath();
      ctx.ellipse(-8, this.radius-2, 5, 6, 0, 0, Math.PI*2);
      ctx.ellipse(8, this.radius-2, 5, 6, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    }
    // Face
    ctx.fillStyle = '#22263a';
    ctx.beginPath();
    ctx.arc(0, -5, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
