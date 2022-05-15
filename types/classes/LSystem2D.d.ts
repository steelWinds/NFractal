import type { ICanvasItem } from 'ninja-canvashelper';
import type { ILSystem2D } from "../interfaces/ILSystem2D";
declare class LSystem2D implements ILSystem2D {
    #private;
    setCanvasInstance(canvasItem: ICanvasItem): void;
}
export default LSystem2D;
