import { CoalTile, StoneTile, UndefinedTile } from './tiles';

type GridItem = CoalTile | StoneTile | UndefinedTile;
//glorified 2d array, not sure if this is needed
class Grid{
    private width: number;
    private height: number;
    private tileWidth: number;
    private tileHeight: number;
    private cols: number;
    private rows: number;
    private map: GridItem[][];

    constructor(width: number, height: number, tileWidth: number = 30, tileHeight: number = 30){
        this.width = width;
        this.height = height;
        this.tileWidth = tileWidth; 
        this.tileHeight = tileHeight;
        this.cols = Math.floor(width/tileWidth); //x = width
        this.rows = Math.floor(height/tileHeight); //y = height
        this.map = Array.from( {length: this.rows}, () => 
            Array.from( {length: this.cols}, () => new UndefinedTile())
        ); 
        
        console.log(this.map);
    }
    //use # to make private
    drawGrid(ctx: CanvasRenderingContext2D){
        const temp = ctx.fillStyle;
        ctx.fillStyle = "black";
        ctx.lineWidth = 3;
    
        for(let i = 0;i<this.width;i+=this.tileWidth){
            ctx.beginPath();
            ctx.moveTo(i,0);
            ctx.lineTo(i,this.height);
            ctx.stroke();
        }
        for(let i = 0;i<this.height;i+=this.tileHeight){
            ctx.beginPath();
            ctx.moveTo(0,i);
            ctx.lineTo(this.width,i);
            ctx.stroke();
        }
        ctx.fillStyle = temp;
    }
    //
}