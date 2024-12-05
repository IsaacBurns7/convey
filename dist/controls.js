/*broad concerns:
    - deal with player selecting menu, being in build mode, attack mode, ? etc these kinds of things
*/
export class Controls {
    mode;
    canvas;
    getTileAt;
    constructor(canvas, getTileAt, mode = "player_movement") {
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            console.error("canvas not detected or invalid");
        }
        this.getTileAt = getTileAt;
        this.canvas = canvas;
        this.mode = mode;
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
            }
        });
        canvas.addEventListener("click", (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const { row, col } = this.getTileAt(x, y);
            switch (this.mode) {
                case "build":
            }
            console.log(`Clicked at coordinates (${x},${y}), at row ${row}, and col ${col}`);
        });
    }
}
