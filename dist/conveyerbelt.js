import { Tile } from "./tiles.js";
import { rotate } from "./utils.js";
export class ConveryerBeltTile extends Tile {
    speed;
    capacity;
    input_direction;
    output_direction;
    straight;
    constructor(row, col, width, height, speed, input_direction, output_direction, capacity = 1) {
        super(row, col, width, height);
        this.speed = speed;
        this.capacity = capacity;
        //1 is north, 2 is east, 3 is south, 4 is west
        //[0,1]
        this.input_direction = input_direction;
        this.output_direction = output_direction;
        this.straight = input_direction == output_direction;
    }
    //change row and col, used for overlay
    draw(ctx, opacity = 1, borderColor = "white", fillColor = "black", conveyerColor = "yellow") {
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.strokeStyle = borderColor;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = fillColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = conveyerColor;
        //default east, rotate about middle 
        if (this.straight) {
            this.drawStraight(ctx);
        }
        else {
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
    drawStraight(ctx) {
        let x1 = -1;
        let y1 = 1;
        let x2 = -1;
        let y2 = -1;
        let dirs = rotate([[x1, y1], [x2, y2]], (-1 * (this.input_direction - 2) * (Math.PI / 2))); // 0 rotation if 2 b/c default is east
        //rotates clockwise around center of tile, (0,0)
        let x1_offset = this.width / 2 + dirs[0][0] * this.width / 4; //(0,0) is midpoint, x increases left to right
        let x2_offset = this.width / 2 + dirs[1][0] * this.width / 4;
        //y increases top to bottom in canvas, as opposed to bottom to top in cartesian grid
        let y1_offset = this.height / 2 + dirs[0][1] * this.height / 4 * -1; //(0,0) is midpoint
        let y2_offset = this.height / 2 + dirs[1][1] * this.height / 4 * -1;
        ctx.moveTo(this.x + x1_offset, this.y + y1_offset); //[0,0]
        ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
        ctx.lineTo(this.x + x2_offset, this.y + y2_offset); //[0,1]
        ctx.stroke();
    }
}
