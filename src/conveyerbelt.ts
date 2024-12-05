import { Tile } from "./tiles.ts";
export class ConveryerBeltTile extends Tile {
    private speed:number;
    private capacity:number; 
    private input_direction: number;
    private output_direction: number;
    constructor(row:number, col:number, width:number, height:number, speed: number, input_direction: number, output_direction: number, capacity: number = 1){
        super(row, col, width, height);
        this.speed = speed;
        this.capacity = capacity;
        //1 is north, 2 is east, 3 is south, 4 is west
        //[0,1]
        this.input_direction = input_direction;
        this.output_direction = output_direction; 
    }
    //change row and col, used for overlay

    draw(ctx:CanvasRenderingContext2D, opacity:number = 1, borderColor = "white", fillColor = "black", conveyerColor = "yellow"){ //x,y are top left corner
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.strokeStyle = borderColor;
        ctx.strokeRect(this.x,this.y,this.width,this.height);
        ctx.fillStyle = fillColor;
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.strokeStyle = conveyerColor;
        //(find way to generalize this mathematically)
        ctx.moveTo(this.x + (this.output_direction == 4 ? this.width : 0), 
        this.y + (this.output_direction == 1 ? this.height : 0));
        ctx.lineTo(this.x+this.width/2, this.y+this.height/2);
        ctx.lineTo(this.x + (this.output_direction == 2 ? 0: this.width),
        this.y + (this.output_direction == 3 ? 0: this.height));
        ctx.stroke();
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
}