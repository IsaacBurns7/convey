import { Tile } from "./tiles.ts";
import { rotate } from "./utils.ts";
export class ConveryerBeltTile extends Tile {
    private speed:number;
    private capacity:number; 
    private input_direction: number;
    private output_direction: number;
    private straight: boolean;
    private offset: number;
    constructor(row:number, col:number, width:number, height:number, speed: number, input_direction: number, output_direction: number, capacity: number = 1){
        super(row, col, width, height);
        this.speed = speed;
        this.capacity = capacity;
        //1 is north, 2 is east, 3 is south, 4 is west
        //[0,1]
        this.input_direction = input_direction;
        this.output_direction = output_direction; 
        this.straight = input_direction == output_direction; 
        this.offset = 0;
    }
    //change row and col, used for overlay
    getSpeed(): number{
        return this.speed;
    }
    getOffset(): number{
        return this.offset;
    }
    setOffset(offset:number): void{
        this.offset = offset;
    }

    draw(ctx:CanvasRenderingContext2D, opacity:number = 1, borderColor = "white", fillColor = "black", conveyerColor = "yellow"){ //x,y are top left corner
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.strokeStyle = borderColor;
        ctx.strokeRect(this.x,this.y,this.width,this.height);
        ctx.fillStyle = fillColor;
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.strokeStyle = conveyerColor;
        //default east, rotate about middle 
        if(this.straight){
            this.drawStraight(ctx);
        }else{

        }
        /*
        (not curved)
        switch(){
            case north: // [0,-1]
                ctx.moveTo(this.x, this.y+this.height); //center now
                ctx.lineTo(this.x+this.width/2, this.y+this.height/2); //can do this.y for longer
                ctx.lineTo(this.x+this.width, this.y+this.height);
            case south: // [0, 1]
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x+this.width/2, this.y+this.height/2);
                ctx.lineTo(this.x+this.width, this.y);
            case east: // [1, 0]
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x+this.width/2, this.y+this.height/2);
                ctx.lineTo(this.x, this.y+this.height);
            case west: // [-1, 0]
                ctx.moveTo(this.x+this.width, this.y);
                ctx.lineTo(this.x+this.width/2, this.y+this.height/2);
                ctx.lineTo(this.x+this.width, this.y+this.height);
        }
        */
        /*
        (curved)
        switch(){
        
        }
        */
       ctx.globalAlpha = 1;
    }
    drawStraight(ctx: CanvasRenderingContext2D){
        let x1c = -1; 
        let y1c = 1;
        let x2c = -1;
        let y2c = -1;
        let dirs: number[][] = rotate([[x1c,y1c],[x2c,y2c]],(-1 * (this.input_direction-2) * (Math.PI/2))); // 0 rotation if 2 b/c default is east
        //rotates clockwise around center of tile, (0,0)
        let x1 = this.width/2 + dirs[0][0] * this.width/4; //(0,0) is midpoint, x increases left to right
        let x2 =  this.width/2 + dirs[1][0] * this.width/4;
        //y increases top to bottom in canvas, as opposed to bottom to top in cartesian grid
        let y1 = this.height/2 + dirs[0][1] * this.height/4 * -1; //(0,0) is midpoint
        let y2 = this.height/2 + dirs[1][1] * this.height/4 * -1;
        //offset if n is -y, e is +x, s is +y, w is -x  for 1,2,3,4
        let y_offset = this.input_direction % 2 == 0 ? 0 : this.input_direction - 2;//only if odd - n,s //s -> 3, should be +1
        let x_offset = this.input_direction % 2 == 0 ? ((this.input_direction % 3) * 2) - 3 : 0; //only if even - e,w //4(w) -> -1, 2(e) -> +1

        //now just how to draw these...

        ctx.moveTo(this.x + x1,this.y + y1); //[0,0]
        ctx.lineTo(this.x+this.width/2, this.y+this.height/2); 
        ctx.lineTo(this.x + x2, this.y + y2); //[0,1]
        ctx.stroke();
    }
}