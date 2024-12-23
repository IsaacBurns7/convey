export class Tile {
    x;
    y;
    width;
    height;
    row;
    col;
    constructor(row, col, width, height) {
        this.row = row;
        this.col = col;
        this.width = width;
        this.height = height;
        this.x = row * width;
        this.y = col * height;
    }
    // abstract draw(): void;
    setRowCol(newRow, newCol) {
        this.y = newRow * this.height;
        this.x = newCol * this.width;
        this.row = newRow;
        this.col = newCol;
    }
}
export class UndefinedTile extends Tile {
    constructor(row, col, width, height) {
        super(row, col, width, height);
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    ;
}
