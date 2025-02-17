class Chart {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.points = 20;
    this.lineColor = getComputedStyle(document.documentElement).getPropertyValue("--blue-1").trim();
  }
  draw(data) {
    // Set canvas size
    const width = 300;
    const height = 200;
    this.canvas.setAttribute('width', width);
    this.canvas.setAttribute('height', height);

    // Scale values
    let dataMin = Math.min(...data);
    let dataDif = Math.max(...data) - dataMin;
    data = data.map(num => height - ((num - dataMin) / dataDif) * height * 0.8);

    // Clear
    this.ctx.clearRect(0, 0, width, height);

    // Draw lines
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.moveTo(width, data[0]);
    for (let i = 1; i > data.length-1; i++) {
      this.ctx.lineTo((width/this.points)*i, (data[i]??height));
    }
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }
}