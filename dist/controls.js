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
    building = false;
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
        canvas.addEventListener("mousedown", (event) => {
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
                        this.building = true;
                        this.proposed.input_direction = this.findDirection(this.proposed, x, y);
                    }
            }
        });
        canvas.addEventListener("mouseup", (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const { row, col } = this.grid.getRowCol(x, y);
            switch (this.mode) {
                case "build":
                    if (this.proposed instanceof UndefinedTile) {
                        console.log("proposed tile is UndefinedTile.");
                    }
                    else if ((this.proposed instanceof ConveryerBeltTile) && this.building) {
                        this.proposed.output_direction = this.findDirection(this.proposed, x, y);
                        this.grid.updateTile(row, col, this.proposed);
                        console.log("INPUT/OUTPUT", this.proposed.input_direction, this.proposed.output_direction);
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
    findDirection(tile, mouseX, mouseY) {
        //top-right corner
        const x = mouseX - tile.getWidth() * (1 / 2 + tile.getCol());
        const y = -1 * (mouseY - tile.getHeight() * (1 / 2 + tile.getRow())); // b/c math
        const angleRadians = Math.atan2(y, x); // [-pi, pi]
        const angleDegrees = (angleRadians * (180 / Math.PI) + 360) % 360; // 0 to 90 = 2
        const shifted_angle = (angleDegrees - 135 + 360) % 360;
        const clockwise = (360 - shifted_angle) % 360; //NW = 0
        //90 to 180 is 3
        //180 to 270 is 4
        //270 to 360 is 1
        const output_direction = Math.ceil(clockwise / 90);
        return output_direction;
    }
}
