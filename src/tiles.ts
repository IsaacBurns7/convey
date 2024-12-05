export abstract class Tile{
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;
    protected row: number;
    protected col: number;    
    constructor(row:number, col:number, width:number, height:number){
        this.row = row;
        this.col = col;
        this.width = width;
        this.height = height;
        this.x = row*width;
        this.y = col*height;
    }
    // abstract draw(): void;
    setRowCol(newRow: number, newCol: number){
        this.x = newRow*this.width;
        this.y = newCol*this.height;
    }
}

export class UndefinedTile extends Tile{
    constructor(row: number, col: number, width: number, height: number) {
        super(row, col, width, height);
    }
    draw(ctx: CanvasRenderingContext2D): void { 
        ctx.beginPath();
        ctx.strokeRect(this.x,this.y,this.width,this.height);
    }; 
}

export class StoneTile{
    draw(): void{

    }
}
export class CoalTile{
    draw():void{

    }
}