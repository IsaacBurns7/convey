import { Tile } from "./tile.ts";
export abstract class ResourceTile extends Tile{
}
export class StoneTile extends ResourceTile{
    constructor(row:number, col: number, width: number, height:number){
        super(row, col, width, height);

    }
    draw(ctx: CanvasRenderingContext2D): void{
        ctx.beginPath();
        ctx.fillStyle = "grey";
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.height / 4, 0, Math.PI * 2);
        ctx.fill();
    }
}
export class CoalTile extends ResourceTile{
    constructor(row:number, col: number, width: number, height:number){
        super(row, col, width, height);
        
    }
    draw(ctx: CanvasRenderingContext2D):void{
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.height / 4, 0, Math.PI * 2);
        ctx.fill();
    }
}