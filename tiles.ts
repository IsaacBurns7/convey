export class UndefinedTile{
    draw(): void { 
        console.log("cannot draw right now! my developer sucks dick!");
    }; 
}
export interface StoneTile{
    draw(): void;
}
export interface CoalTile{
    draw():void
}