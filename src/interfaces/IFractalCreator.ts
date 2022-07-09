import type {ICanvasItem} from 'ninja-canvashelper';
import type {LSystem2DConstructor} from '@/classes/LSystem2D';

// Params types
type CanvasItemParams = {
  id: string,
  el?: HTMLCanvasElement | string,
}

type CanvasCreateParams = {
  iSize: number,
  bSize: number,
  parentSelector?: string,
  styleClass?: string,
}

type UseCreatorParams<T> = {
  type: T,
  canvas: CanvasItemParams,
  canvasOptions?: CanvasCreateParams,
}

interface IFractalCreator {
  LSystem2D: LSystem2DConstructor;

  initCanvas(
    canvasOptions: CanvasItemParams,
    options: CanvasCreateParams
  ): ICanvasItem;

  use<T extends new (...args: any) => any>(
    options: UseCreatorParams<T>
  ): InstanceType<T>;
}

export type {IFractalCreator};

export type {
  CanvasCreateParams,
  CanvasItemParams,
  UseCreatorParams,
};
