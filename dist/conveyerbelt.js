export class ConveryerBeltTile {
    speed;
    capacity;
    output_direction;
    x;
    y;
    width; //x-length
    height; //y-length
    constructor(speed, output_direction, i, j, width, height, capacity = 1) {
        this.speed = speed;
        this.capacity = capacity;
        //[x, y], for example North is [0, -1], South is [0, 1], East is [1,0], West is [-1,0]
        this.output_direction = output_direction;
        this.x = i * width;
        this.y = j * height;
        this.width = width;
        this.height = height;
    }
    draw(ctx, borderColor = "green", fillColor = "black", conveyerColor = "yellow") {
        ctx.beginPath();
        ctx.strokeStyle = borderColor;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = fillColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = conveyerColor;
        //(find way to generalize this mathematically)
        ctx.moveTo(this.x + (this.output_direction[0] == -1 ? this.width : 0), this.y + (this.output_direction[1] == -1 ? this.height : 0));
        ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
        ctx.lineTo(this.x + (this.output_direction[0] == 1 ? 0 : this.width), this.y + (this.output_direction[1] == 1 ? 0 : this.height));
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
    }
}
