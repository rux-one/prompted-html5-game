export class Carrot {
  constructor(planet, angle) {
    this.planet = planet;
    this.angle = angle; // angle on the planet surface
    this.radius = 10;
    this.collected = false;
    this.collectFrame = 0;
    // Position on surface
    this.x = planet.x + Math.cos(angle) * (planet.radius + this.radius);
    this.y = planet.y + Math.sin(angle) * (planet.radius + this.radius);
  }

  draw(ctx) {
    if (this.collected && this.collectFrame > 15) return;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle + Math.PI/2);
    let scale = 1;
    let alpha = 1;
    if (this.collected) {
      this.collectFrame++;
      scale = 1 + this.collectFrame * 0.07;
      alpha = 1 - this.collectFrame/16;
    }
    ctx.globalAlpha = alpha;
    ctx.scale(scale, scale);
    // Simple carrot shape
    ctx.fillStyle = '#ffb347';
    ctx.beginPath();
    ctx.ellipse(0, 0, 7, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    // Green top
    ctx.strokeStyle = '#3c5';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -11);
    ctx.lineTo(0, -17);
    ctx.stroke();
    ctx.restore();
  }
}
