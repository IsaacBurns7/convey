import { UndefinedTile } from "./tile.js";
import { ConveryerBeltTile } from "./conveyerbelt.js";
import { StoneTile, CoalTile } from "./resourceTile.js";
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
    draw(ctx) {
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
    async initialize(ctx) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let random_dir = 1;
                let random_dir2 = 2;
                this.map[i][j] = new ConveryerBeltTile(i, j, this.tileWidth, this.tileHeight, 1, random_dir, random_dir2);
            }
        }
        this.map[0][0] = new CoalTile(0, 0, this.tileWidth, this.tileHeight);
        this.map[0][1] = new StoneTile(0, 1, this.tileWidth, this.tileHeight);
    }
    getRowCol(x, y) {
        const row = Math.floor(y / this.tileHeight);
        const col = Math.floor(x / this.tileWidth);
        return { row, col };
    }
    getTileWidth() {
        return this.tileWidth;
    }
    // Setter for tileWidth
    setTileWidth(value) {
        if (value <= 0) {
            throw new Error("Tile width must be a positive number.");
        }
        this.tileWidth = value;
    }
    // Getter for tileHeight
    getTileHeight() {
        return this.tileHeight;
    }
    // Setter for tileHeight
    setTileHeight(value) {
        if (value <= 0) {
            throw new Error("Tile height must be a positive number.");
        }
        this.tileHeight = value;
    }
    updateTile(row, col, tile) {
        this.map[col][row] = tile;
    }
    drawProposed() {
    }
    updateConveyerBelt(row, col) {
        if (!(this.map[row][col] instanceof ConveryerBeltTile)) {
            console.error("Can only offset conveyer belts.");
            return;
        }
        let offset = this.map[row][col].getOffset();
        this.map[row][col].setOffset(offset + this.map[row][col].getSpeed());
    }
    async #updateTiles() {
        this.map.forEach((row_tiles, row) => {
            row_tiles.forEach((tile, col) => {
                if (tile instanceof ConveryerBeltTile) {
                    this.updateConveyerBelt(row, col);
                }
            });
        });
    }
    update(ctx) {
        this.#updateTiles();
        this.draw(ctx);
    }
}
