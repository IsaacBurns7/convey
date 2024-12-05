import { UndefinedTile } from "./tiles.js";
import { ConveryerBeltTile } from "./conveyerbelt.js";
//glorified 2d array, not sure if this is needed
export class Grid {
    width;
    height;
    tileWidth;
    tileHeight;
    cols;
    rows;
    map; //[rows][cols]
    output_directions;
    constructor(width, height, tileWidth = 30, tileHeight = 30) {
        this.width = width;
        this.height = height;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.cols = Math.floor(width / tileWidth); //x = width
        this.rows = Math.floor(height / tileHeight); //y = height
        this.map = Array.from({ length: this.rows }, (_, i) => Array.from({ length: this.cols }, (_, j) => new UndefinedTile(i, j, this.tileWidth, this.tileHeight)));
        console.log(this.map);
        this.output_directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    }
    //use # to make private
    drawGrid(ctx) {
        // const temp = ctx.fillStyle;
        // ctx.fillStyle = "black";
        // ctx.lineWidth = 3;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.map[i][j].draw(ctx);
            }
        }
        // ctx.fillStyle = temp;
    }
    initialize(ctx) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.map[i][j] = new ConveryerBeltTile(1, this.output_directions[Math.floor(Math.random() * 4) % 4], i, j, this.tileWidth, this.tileHeight);
            }
        }
    }
    getTileAt(x, y) {
        const row = Math.floor(y / this.tileHeight);
        const col = Math.floor(x / this.tileWidth);
        return { row, col };
    }
}
