import type {CoordsUnit} from '@/helpers/types/Canvas';

interface ITurtlePoint {
  setPosition(x: number, y: number): void;
  setRotate(angle: number): void;
  setMovePoint(params: CoordsUnit): void;

  get coords(): {x: number, y: number};
  get rotate(): number;
  get moveStack(): CoordsUnit[];
}

export type {ITurtlePoint};
