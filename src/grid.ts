import { Tile, UndefinedTile } from './tile.ts';
import { ConveryerBeltTile } from './conveyerbelt.ts';
import { StoneTile, CoalTile } from './resourceTile.ts';

type GridItem = ConveryerBeltTile | UndefinedTile | CoalTile | StoneTile; //horrifying to scale
//glorified 2d array, not sure if this is needed
export class Grid{
    private width: number;
    private height: number;
    public tileWidth: number;
    public tileHeight: number;
    private cols: number;
    private rows: number;
    private map: GridItem[][]; //[rows][cols]
    private output_directions: number[][];

    constructor(width: number, height: number, tileWidth: number = 30, tileHeight: number = 30){
        this.width = width;
        this.height = height;
        this.tileWidth = tileWidth; 
        this.tileHeight = tileHeight;
        this.cols = Math.floor(width/tileWidth); //x = width
        this.rows = Math.floor(height/tileHeight); //y = height
        this.map = Array.from( {length: this.rows}, (_, i:number) => 
            Array.from( {length: this.cols}, (_, j:number) => new UndefinedTile(i, j,this.tileWidth,this.tileHeight))
        ); 
        
        console.log(this.map);

        this.output_directions = [[1,0],[-1,0],[0,1],[0,-1]];
    }
    //use # to make private
    draw(ctx: CanvasRenderingContext2D){
        // const temp = ctx.fillStyle;
        // ctx.fillStyle = "black";
        // ctx.lineWidth = 3;
        for(let i = 0;i<this.rows;i++){
            for(let j = 0;j<this.cols;j++){
                this.map[i][j].draw(ctx);
            }
        }
        // ctx.fillStyle = temp;
    }
    async initialize(ctx: CanvasRenderingContext2D){
        for(let i = 0;i<this.rows;i++){
            for(let j = 0;j<this.cols;j++){
                let random_dir = 1;
                let random_dir2 = 2;
                this.map[i][j] = new ConveryerBeltTile(i, j, this.tileWidth, this.tileHeight, 1, random_dir, random_dir2);
            }
        }
        this.map[0][0] = new CoalTile(0, 0, this.tileWidth, this.tileHeight);
        this.map[0][1] = new StoneTile(0, 1, this.tileWidth, this.tileHeight);
    }
    getRowCol(x:number, y:number): {row: number, col: number}{
        const row = Math.floor(y / this.tileHeight);
        const col = Math.floor(x / this.tileWidth);
        return { row, col };
    }
    getTileWidth(): number {
        return this.tileWidth;
    }

    // Setter for tileWidth
    setTileWidth(value: number) {
        if (value <= 0) {
            throw new Error("Tile width must be a positive number.");
        }
        this.tileWidth = value;
    }

    // Getter for tileHeight
    getTileHeight(): number {
        return this.tileHeight;
    }

    // Setter for tileHeight
    setTileHeight(value: number) {
        if (value <= 0) {
            throw new Error("Tile height must be a positive number.");
        }
        this.tileHeight = value;
    }
    updateTile(row:number, col:number, tile:GridItem){
        this.map[col][row] = tile;
    }
    drawProposed(){

    }
    updateConveyerBelt(row: number, col: number){
        if(!(this.map[row][col] instanceof ConveryerBeltTile)){
            console.error("Can only offset conveyer belts.")
            return;
        }
        let offset = this.map[row][col].getOffset();
        this.map[row][col].setOffset(offset + this.map[row][col].getSpeed());
    }
    async #updateTiles(){
        this.map.forEach((row_tiles, row) => {
            row_tiles.forEach((tile, col) => {
                if(tile instanceof ConveryerBeltTile){
                    this.updateConveyerBelt(row, col);
                }
            });
        });
    }
    update(ctx:CanvasRenderingContext2D){
        this.#updateTiles();
        this.draw(ctx);
    }
}