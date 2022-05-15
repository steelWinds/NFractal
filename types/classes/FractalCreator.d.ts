import type { IFractalCreator } from "../interfaces/IFractalCreator";
declare class FractalCreator implements IFractalCreator {
    #private;
    constructor();
    initCanvas(id: string, options: {
        iSize: number;
        bSize: number;
        parent: string;
        elClass: string;
    }): ReturnType<IFractalCreator['initCanvas']>;
    get LSystem2D(): IFractalCreator['LSystem2D'];
}
export default FractalCreator;
