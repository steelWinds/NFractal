import type {ICanvasItem} from 'ninja-canvashelper';
import type {ILSystem2D} from '@/interfaces/ILSystem2D';
import RealTurtle from 'real-turtle';

class LSystem2D implements ILSystem2D {
  #canvasInstance?: ICanvasItem;
  #turtlePoint?: InstanceType<typeof RealTurtle>;

  public setCanvasInstance(
    canvasItem: ICanvasItem,
  ): ReturnType<ILSystem2D['setCanvasInstance']> {
    this.#canvasInstance = canvasItem;
    this.#turtlePoint = new RealTurtle(this.#canvasInstance, {
      autoStart: true,
    });

    return this;
  }
}

export default LSystem2D;
