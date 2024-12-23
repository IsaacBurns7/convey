import { ConveryerBeltTile } from "./conveyerbelt.js";
import { UndefinedTile } from "./tile.js";
export class Controls {
    mode;
    canvas;
    proposed; //currently proposed building block
    grid;
    ctx;
    mouseRow = 0;
    mouseCol = 0;
    constructor(canvas, ctx, grid, mode = "build") {
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            console.error("canvas not detected or invalid");
        }
        this.grid = grid;
        this.canvas = canvas;
        this.mode = mode;
        this.ctx = ctx;
        this.proposed = new UndefinedTile(0, 0, this.grid.getTileWidth(), this.grid.getTileHeight());
        this.#initializeEventListeners(canvas);
    }
    #updateEventListeners() {
    }
    #initializeEventListeners(canvas) {
        canvas.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "b":
                case "B":
                    this.mode = "build";
                case "Escape":
                    this.mode = "player_movement";
                case "1":
                    if (this.mode == "build") {
                        this.proposed = new ConveryerBeltTile(0, 0, this.grid.getTileWidth(), this.grid.getTileHeight(), 1, 2, 1);
                    }
            }
        });
        canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
        canvas.addEventListener("click", (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const { row, col } = this.grid.getRowCol(x, y);
            switch (this.mode) {
                case "build":
                    if (this.proposed instanceof UndefinedTile) {
                        console.log("proposed tile is UndefinedTile.");
                    }
                    else if (this.proposed instanceof ConveryerBeltTile) {
                        this.grid.updateTile(row, col, this.proposed);
                        this.proposed = new UndefinedTile(0, 0, 0, 0);
                    }
            }
        });
    }
    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.proposed.setRowCol(Math.floor(y / this.grid.tileHeight), Math.floor(x / this.grid.tileWidth));
    }
    getProposed() {
        return this.proposed;
    }
}
