class canvasWindow {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  constructor() {
    const canvas : HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement;
    if(!canvas){
      throw new Error("Canvas Element not found.");
    }
    const ctx : CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    if(!ctx){
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
  
  clear(): void {
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
  