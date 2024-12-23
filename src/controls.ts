import { ConveryerBeltTile } from "./conveyerbelt.ts";
import { Grid } from "./grid.ts";
import { UndefinedTile } from "./tile.ts";

/*broad concerns:
    - deal with player selecting menu, being in build mode, attack mode, ? etc these kinds of things
*/
type BuildingBlock = UndefinedTile | ConveryerBeltTile;
/*
    modes: 
        - "player_movement": player is currently moving
        - "build": player is capable of selecting blocks
*/
type Mode = "build" | "player_movement";

export class Controls{
    private mode: string;
    private canvas: HTMLCanvasElement;
    private proposed: BuildingBlock; //currently proposed building block
    private grid: Grid;
    private ctx: CanvasRenderingContext2D;
    public mouseRow: number = 0;
    public mouseCol: number = 0;
    public building: boolean = false;

    constructor(canvas: HTMLCanvasElement, ctx:CanvasRenderingContext2D, grid: Grid, mode:Mode = "build")
    {
        if(!canvas || !(canvas instanceof HTMLCanvasElement)){
            console.error("canvas not detected or invalid")
        }
        this.grid = grid;
        this.canvas = canvas;
        this.mode = mode;
        this.ctx = ctx;
        this.proposed = new UndefinedTile(0, 0, this.grid.getTileWidth(), this.grid.getTileHeight());
        this.#initializeEventListeners(canvas);
    }
    #updateEventListeners(){ //when switching to menu

    }
    #initializeEventListeners(canvas: HTMLCanvasElement){
        canvas.addEventListener("keydown", (event) => {
            switch(event.key){
                case "b":
                case "B":
                    this.mode = "build";
                case "Escape":
                    this.mode = "player_movement";
                case "1":
                    if(this.mode == "build"){
                        this.proposed = new ConveryerBeltTile(0, 0, this.grid.getTileWidth(), this.grid.getTileHeight(), 1, 2, 1);
                    }

            }

        })
        canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
        canvas.addEventListener("mousedown", (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const {row, col} = this.grid.getRowCol(x,y);

            switch(this.mode){
                case "build":
                    if(this.proposed instanceof UndefinedTile){
                        console.log("proposed tile is UndefinedTile.");
                    }else if(this.proposed instanceof ConveryerBeltTile){
                        this.building = true;
                        this.proposed.input_direction = this.findDirection(this.proposed, event.x, event.y);
                    }
            }
        });
        canvas.addEventListener("mouseup", (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const {row, col} = this.grid.getRowCol(x,y);

            switch(this.mode){
                case "build":
                    if(this.proposed instanceof UndefinedTile){
                        console.log("proposed tile is UndefinedTile.");
                    }else if((this.proposed instanceof ConveryerBeltTile) && this.building){
                        this.proposed.output_direction = this.findDirection(this.proposed, event.x, event.y);
                        this.grid.updateTile(row, col, this.proposed);
                        this.proposed = new UndefinedTile(0,0,0,0);
                    }
            }
        })
    }
    private handleMouseMove(event: MouseEvent){
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.proposed.setRowCol(Math.floor(y / this.grid.tileHeight), Math.floor(x / this.grid.tileWidth));
    }
    getProposed(){
        return this.proposed;
    }
    findDirection(tile: ConveryerBeltTile, mouseX: number, mouseY: number){
        
    }
}