const canvas : HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement;
if(!canvas){
    throw new Error("Canvas Element not found.");
}
const ctx : CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
if(!ctx){
    throw new Error("Canvas 2d Context unable to initialize.");
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const w = canvas.width;
const h = canvas.height;

let paused = false;

const pauseButton : HTMLButtonElement = document.getElementById("pauseButton") as HTMLButtonElement;
if(!pauseButton){
    throw new Error("Pause Button Element not found.")
}
pauseButton.addEventListener("click", () => {
    paused = !paused;
});

let ticks = 0;

function gameLoop(){
    if(paused){
        requestAnimationFrame(gameLoop);
        return;
    }
    if(ticks == 25){
        
    }
    ticks++;
    requestAnimationFrame(gameLoop);
}

gameLoop();
