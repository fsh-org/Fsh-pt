class Chart {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.points = 20;
    this.color = getComputedStyle(document.documentElement).getPropertyValue("--blue-1").trim();
    this.color_alt = getComputedStyle(document.documentElement).getPropertyValue("--yellow-1").trim();
  }
  draw(data, clear = true) {
    // Set canvas size
    const width = 300;
    const height = 200;
    if (clear) {
      this.canvas.setAttribute('width', width);
      this.canvas.setAttribute('height', height);
    }

    // Scale values
    let dataMin = Math.min(...data);
    let dataDif = Math.max(...data) - dataMin;
    data = data.map(num => (height - ((num - dataMin) / (dataDif<0.01?0.01:dataDif)) * height * 0.8) - height*0.1);

    // Clear
    if (clear) this.ctx.clearRect(0, 0, width, height);

    // Draw lines
    this.ctx.beginPath();
    this.ctx.strokeStyle = clear?this.color:this.color_alt;
    this.ctx.fillStyle = (clear?this.color:this.color_alt)+'4';
    this.ctx.lineWidth = 5;
    this.ctx.lineJoin = "round";
    this.ctx.moveTo(0, height);
    this.ctx.lineTo(0, data[0]);
    for (let i = 1; i < data.length; i++) {
      this.ctx.lineTo((width/this.points)*i, data[i]);
    }
    this.ctx.lineTo((width/this.points)*data.length, height);
    this.ctx.fill();
    this.ctx.stroke();
  }
}