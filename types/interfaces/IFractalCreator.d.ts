import type { ICanvasItem } from 'ninja-canvashelper';
import type { ILSystem2D } from "./ILSystem2D";
interface IFractalCreator {
    initCanvas(id: string, options: {
        iSize: number;
        bSize: number;
        parent: string;
        elClass: string;
    }): ICanvasItem;
    get LSystem2D(): ILSystem2D;
}
export type { IFractalCreator };
