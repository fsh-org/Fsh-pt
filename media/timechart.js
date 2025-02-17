class Chart {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.points = 19; // 0 Indexed
  }
  draw(data) {
    // Set canvas size
    this.canvas.setAttribute('width', 300);
    this.canvas.setAttribute('height', 150);

    // Clear
    this.ctx.clearRect(0, 0, 300, 150)

    // Draw lines
    this.ctx.beginPath();
    this.ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--blue-1").trim();
    this.ctx.moveTo(data[points].x, data[points].y);
    for (let i = points-1; i > 0; i--) {
      this.ctx.lineTo(data[i].x, data[i].y);
    }
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }
}