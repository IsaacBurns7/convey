export class UndefinedTile {
    x;
    y;
    row;
    col;
    width;
    height;
    constructor(row, col, width, height) {
        this.row = row;
        this.col = col;
        this.x = col * width;
        this.y = row * height;
        this.width = width;
        this.height = height;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    ;
}
