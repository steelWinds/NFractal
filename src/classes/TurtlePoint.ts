import type {ITurtlePoint} from '@/interfaces/ITurtlePoint';
import type {CoordsUnit} from '@/helpers/types/Canvas';

class TurtlePoint implements ITurtlePoint {
  #coords: ITurtlePoint['coords'];
  #rotate: ITurtlePoint['rotate'];
  #moveStack: ITurtlePoint['moveStack'];

  constructor() {
    this.#coords = {x: 0, y: 0};
    this.#rotate = 0;
    this.#moveStack = [];
  }

  get coords(): ITurtlePoint['coords'] {
    return this.#coords;
  }

  get rotate(): ITurtlePoint['rotate'] {
    return this.#rotate;
  }

  get moveStack(): ITurtlePoint['moveStack'] {
    return this.#moveStack;
  }

  setMovePoint(point: CoordsUnit) {
    this.#moveStack.push(point);
  }

  setPosition(x: number, y: number): ReturnType<ITurtlePoint['setPosition']> {
    this.#coords.x = x;
    this.#coords.y = y;
  }

  setRotate(angle: number) {
    this.#rotate = angle;
  }
}

export default TurtlePoint;
