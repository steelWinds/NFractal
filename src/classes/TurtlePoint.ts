import type {ITurtlePoint} from '@/interfaces/ITurtlePoint';

class TurtlePoint implements ITurtlePoint {
  #coords: ITurtlePoint['coords'];
  #rotate: ITurtlePoint['rotate'];

  constructor() {
    this.#coords = {x: 0, y: 0};
    this.#rotate = 0;
  }

  get coords(): ITurtlePoint['coords'] {
    return this.#coords;
  }

  get rotate(): ITurtlePoint['rotate'] {
    return this.#rotate;
  }

  set rotate(angle: number) {
    this.#rotate = angle;
  }

  setPosition(x: number, y: number): ReturnType<ITurtlePoint['setPosition']> {
    this.#coords.x = x;
    this.#coords.y = y;
  }
}

export default TurtlePoint;
