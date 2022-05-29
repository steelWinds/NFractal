import type {IFractalCreator} from '@/interfaces/IFractalCreator';
import type {ICanvasHelper, ICanvasItem} from 'ninja-canvashelper';
import type {ILSystem2D} from '@/interfaces/ILSystem2D';

import {CanvasHelper} from 'ninja-canvashelper';
import NotCreated from '@/errors/NotCreated';
import LSystem2D from '@/classes/LSystem2D';

class FractalCreator implements IFractalCreator {
  #canvasHelper: ICanvasHelper;
  #lSystem2D: ILSystem2D;
  #canvasInstance?: ICanvasItem;

  constructor() {
    this.#canvasHelper = new CanvasHelper();
    this.#lSystem2D = new LSystem2D();
  }

  public initCanvas(
    id: string,
    options:
    {
      iSize: number,
      bSize: number,
      parent?: string,
      styleClass?: string,
    },
  ): ReturnType<IFractalCreator['initCanvas']> {
    this.#canvasInstance = this.#canvasHelper.createCanvasField(id, options);

    return this.#canvasInstance;
  }

  get LSystem2D(): IFractalCreator['LSystem2D'] {
    if (!this.#canvasInstance) {
      throw new NotCreated('Canvas instance was not created!');
    }

    return this.#lSystem2D.setCanvasInstance(this.#canvasInstance);
  }
}

export default FractalCreator;
