export class Planet {
  constructor(x, y, radius, color, gravity, type = null) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.gravity = gravity;
    this.type = type || color;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    // Main body
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = '#22263a';
    ctx.shadowBlur = 24;
    ctx.fill();
    ctx.shadowBlur = 0;
    // Unique features by type
    if (this.type === '#5a9') { // Home: ring
      ctx.strokeStyle = '#fff7';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.radius+10, this.radius-6, 0.6, 0, Math.PI*2);
      ctx.stroke();
    } else if (this.type === '#d66') { // Heavy: craters
      ctx.fillStyle = '#a94444aa';
      for (let i=0;i<4;++i) {
        const a = Math.PI*2*i/4 + 0.8;
        ctx.beginPath();
        ctx.arc(Math.cos(a)*this.radius*0.55, Math.sin(a)*this.radius*0.55, 9, 0, Math.PI*2);
        ctx.fill();
      }
    } else if (this.type === '#6ad') { // Light: stripes
      ctx.strokeStyle = '#fff8';
      ctx.lineWidth = 3;
      for (let i=0;i<3;++i) {
        ctx.beginPath();
        ctx.arc(0, 0, this.radius-8-i*8, 0.2, Math.PI-0.2);
        ctx.stroke();
      }
    } else if (this.type === '#fd6') { // Erratic: spots
      ctx.fillStyle = '#fff8';
      for (let i=0;i<6;++i) {
        const a = Math.PI*2*i/6 + 0.5;
        ctx.beginPath();
        ctx.arc(Math.cos(a)*this.radius*0.7, Math.sin(a)*this.radius*0.7, 6, 0, Math.PI*2);
        ctx.fill();
      }
    }
    ctx.restore();
  }
}
