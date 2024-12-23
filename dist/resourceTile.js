import { Tile } from "./tile.js";
export class ResourceTile extends Tile {
}
export class StoneTile extends ResourceTile {
    constructor(row, col, width, height) {
        super(row, col, width, height);
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "grey";
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.height / 4, 0, Math.PI * 2);
        ctx.fill();
    }
}
export class CoalTile extends ResourceTile {
    constructor(row, col, width, height) {
        super(row, col, width, height);
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.height / 4, 0, Math.PI * 2);
        ctx.fill();
    }
}
