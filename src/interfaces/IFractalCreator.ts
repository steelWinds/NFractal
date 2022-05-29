import type {ICanvasItem} from 'ninja-canvashelper';
import type {ILSystem2D} from '@/interfaces/ILSystem2D';

interface IFractalCreator {
  initCanvas(
    id: string,
    options:
    {
      iSize: number,
      bSize: number,
      parent?: string,
      styleClass?: string,
    },
  ): ICanvasItem;

  get LSystem2D(): ILSystem2D | null;
}

export type {IFractalCreator};
