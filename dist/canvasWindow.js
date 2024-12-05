"use strict";
class canvasWindow {
    canvas;
    ctx;
    constructor() {
        const canvas = document.getElementById("gameCanvas");
        if (!canvas) {
            throw new Error("Canvas Element not found.");
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Canvas 2d Context unable to initialize.");
        }
        this.canvas = canvas;
        this.ctx = ctx;
    }
    /* unsafe for now, may cause unintended consequences + may need to reinitialize grid
    resize(): void {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
    */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
/*
proposed future code
zoomLevel: number = 1;

zoom(factor: number): void {
  this.zoomLevel *= factor;
  this.ctx.scale(this.zoomLevel, this.zoomLevel);
}

resetZoom(): void {
  this.ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset canvas transformation
  this.zoomLevel = 1;
}


*/
