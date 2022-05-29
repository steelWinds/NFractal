import type {ICanvasItem} from 'ninja-canvashelper';
import type {ILSystem2D} from '@/interfaces/ILSystem2D';
import type {ITurtlePoint} from '@/interfaces/ITurtlePoint';

import TurtlePoint from './TurtlePoint';
import range from 'lodash-es/range';
import {useRadians} from '@/helpers/math/useRadians';

class LSystem2D implements ILSystem2D {
  #lCommand: string;
  #turtleMoveStack: Array<{x: number, y: number, rotate: number}>;
  #canvasInstance?: ICanvasItem;
  #canvasContext?: CanvasRenderingContext2D | null;
  #turtlePoint?: ITurtlePoint;
  #lRules?: Array<[string, string]>;

  constructor() {
    this.#lCommand = '';
    this.#turtleMoveStack = [];
  }

  #setLCommand(command: string, iterations: number): void {
    if (!this.#lRules) return;

    this.#lCommand = command;

    range(iterations).forEach(() => {
      this.#lRules?.map(([char, rule]) => {
        this.#lCommand = this.#lCommand!.replaceAll(
          char,
          rule.toLocaleLowerCase(),
        );
      });

      this.#lCommand = this.#lCommand?.toLocaleUpperCase();
    });
  }

  #drawByCommand(len: number, angle: number): void {
    if (!this.#canvasContext || !this.#turtlePoint) {
      return;
    }

    const turtle = this.#turtlePoint;

    for (const char of this.#lCommand!) {
      const xMove = turtle.coords.x + len * Math.cos(useRadians(turtle.rotate));
      const yMove = turtle.coords.y + len * Math.sin(useRadians(turtle.rotate));

      switch (char) {
      case 'F':
        this.#canvasContext.lineTo(xMove, yMove);

        turtle.setPosition(xMove, yMove);
        break;

      case '+':
        turtle.rotate += angle;
        break;

      case '-':
        turtle.rotate -= angle;
        break;

      case '[':
        this.#turtleMoveStack.push({
          x: turtle.coords.x,
          y: turtle.coords.y,
          rotate: turtle.rotate,
        });
        break;

      case ']':
        const lastPos = this.#turtleMoveStack.pop();

        if (!lastPos) {
          return;
        }

        const {x, y, rotate} = lastPos;

        this.#canvasContext.moveTo(x, y);

        turtle.setPosition(x, y);
        turtle.rotate = rotate;
        break;
      }
    }
  }

  public setLRules(
    rules: Array<[string, string]> | {[axiom: string]: string},
  ): void {
    if (Array.isArray(rules)) {
      this.#lRules = rules;

      return;
    }

    this.#lRules = Object.entries(rules);
  }

  public draw(
    lCommand: string,
    iterations: number,
    {
      lenSegments,
      angleSegments,
      startPoints,
      startAngle,
      iSize,
      color,
      cap,
    }:
    {
      lenSegments: number,
      angleSegments: number,
      startPoints?: [number, number],
      startAngle?: number,
      iSize?: number,
      speed?: number,
      color?: string,
      cap?: 'butt' | 'round' | 'square'
    },
  ): void {
    if (!this.#turtlePoint || !this.#canvasContext || !this.#canvasInstance) {
      return;
    }

    const ctx = this.#canvasContext;

    ctx.lineCap = cap ?? 'butt';
    ctx.lineWidth = iSize ?? 1;
    ctx.strokeStyle = color ?? '#000';

    if (startPoints) {
      this.#turtlePoint.setPosition(...startPoints);
    }

    this.#turtlePoint.rotate = startAngle ?? 0;

    ctx.save();

    ctx.beginPath();
    ctx.moveTo(
      this.#turtlePoint.coords.x,
      this.#turtlePoint.coords.y,
    );

    this.#setLCommand(lCommand, iterations);
    this.#drawByCommand(lenSegments, angleSegments);

    this.#canvasContext.stroke();

    ctx.restore();
  }

  public setCanvasInstance(
    canvasItem: ICanvasItem,
  ): ReturnType<ILSystem2D['setCanvasInstance']> {
    this.#canvasInstance = canvasItem;
    this.#canvasContext = this.#canvasInstance.context2D;
    this.#turtlePoint = new TurtlePoint();

    return this;
  }
}

export default LSystem2D;
