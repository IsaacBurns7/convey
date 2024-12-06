import { Grid } from "./grid.js";
import { Controls } from "./controls.js";
const canvas = document.getElementById("gameCanvas");
if (!canvas) {
    throw new Error("Canvas Element not found.");
}
const ctx = canvas.getContext("2d");
if (!ctx) {
    throw new Error("Canvas 2d Context unable to initialize.");
}
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const w = canvas.width;
const h = canvas.height;
let paused = false;
const pauseButton = document.getElementById("pauseButton");
if (!pauseButton) {
    throw new Error("Pause Button Element not found.");
}
pauseButton.addEventListener("click", () => {
    paused = !paused;
});
let ticks = 0;
let grid = new Grid(w, h, 30, 30);
grid.initialize(ctx);
let controls = new Controls(canvas, ctx, grid);
function gameLoop() {
    if (paused) {
        requestAnimationFrame(gameLoop);
        return;
    }
    grid.drawGrid(ctx);
    return;
    requestAnimationFrame(gameLoop);
}
gameLoop();
