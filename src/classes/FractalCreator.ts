import type {
  IFractalCreator,
  CanvasCreateParams,
  CanvasItemParams,
  UseCreatorParams,
} from '@/interfaces/IFractalCreator';
import type {ICanvasHelper, ICanvasItem} from 'ninja-canvashelper';

import {CanvasHelper} from 'ninja-canvashelper';
import LSystem2D from '@/classes/LSystem2D';

class FractalCreator implements IFractalCreator {
  LSystem2D: IFractalCreator['LSystem2D'];

  #canvasHelper: ICanvasHelper;

  constructor() {
    this.#canvasHelper = new CanvasHelper();

    this.LSystem2D = LSystem2D;
  }

  public initCanvas(
    canvasOptions: CanvasItemParams,
    options?: CanvasCreateParams,
  ): ReturnType<IFractalCreator['initCanvas']> | never {
    const {id, el} = canvasOptions;

    let canvasItem: ICanvasItem | null = null;

    if (el) {
      canvasItem = this.#canvasHelper.addCanvasField(id, el);
    } else if (options && id) {
      canvasItem = this.#canvasHelper.createCanvasField(id, options);
    } else {
      canvasItem = <never>canvasItem;
    }

    return canvasItem;
  }

  public use<T extends new(...args: any) => any>(
    options: UseCreatorParams<T>,
  ): InstanceType<T> {
    const {type: Type, canvas, canvasOptions} = options;

    return new Type(this.initCanvas(canvas, canvasOptions));
  }
}

export default FractalCreator;
