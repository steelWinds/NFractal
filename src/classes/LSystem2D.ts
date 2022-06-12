import type {ICanvasItem} from 'ninja-canvashelper';
import type {ILSystem2D} from '@/interfaces/ILSystem2D';
import type {ITurtlePoint} from '@/interfaces/ITurtlePoint';
import type {ILSystemCmdUnit} from '@/interfaces/ILSystemCmdUnit';

import TurtlePoint from './TurtlePoint';
import range from 'lodash-es/range';
import {useRadians} from '@/helpers/math/useRadians';
import {useLSystemParams} from '@/helpers/string/useLSystemParams';
import re from '@/helpers/regexp/r_list';
import LSystemCmdUnit from './LSystemCmdUnit';

type LSystemRules =
  Array<[string, string | { template: RegExp, fn: Function }]>;

class LSystem2D implements ILSystem2D {
  #lCommand: string;
  #turtleMoveStack: Array<{x: number, y: number, rotate: number}>;
  #lCommandsUnits?: ILSystemCmdUnit[];
  #canvasInstance?: ICanvasItem;
  #canvasContext?: CanvasRenderingContext2D | null;
  #turtlePoint?: ITurtlePoint;
  #lRules?: LSystemRules;

  constructor() {
    this.#lCommand = '';
    this.#turtleMoveStack = [];
  }

  #setLCommand(command: string, iterations: number): void {
    if (!this.#lRules) return;

    let strCommand = command;

    range(iterations).forEach(() => {
      this.#lRules?.forEach(([char, rule]) => {
        if (typeof rule === 'object') {
          console.log(1);

          strCommand = strCommand.replaceAll(
            rule.template,
            useLSystemParams.bind(this, rule.fn),
          );

          return;
        }

        strCommand = strCommand.replaceAll(
          char,
          rule.toLocaleLowerCase(),
        );

        return;
      });

      strCommand = strCommand.toLocaleUpperCase();

      this.#lCommandsUnits = strCommand.match(re.LSystemExp)?.map((cmd) => {
        return new LSystemCmdUnit(cmd);
      });
    });

    console.log(strCommand);
    console.log(this.#lCommandsUnits);
  }

  #drawByCommand(len: number, angle: number): void {
    if (!this.#canvasContext || !this.#turtlePoint || !this.#lCommandsUnits) {
      return;
    }

    const turtle = this.#turtlePoint;

    for (const unit of this.#lCommandsUnits) {
      let lenFactor = 1;

      if (unit?.params) {
        lenFactor = unit.params[0];
      }

      console.log(lenFactor);

      const xMove =
      turtle.coords.x + (len * lenFactor) * Math.cos(useRadians(turtle.rotate));
      const yMove =
      turtle.coords.y + (len * lenFactor) * Math.sin(useRadians(turtle.rotate));


      switch (unit.char) {
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
    rules: Array<[string, string | Function]>,
  ): void {
    const parseRules: LSystemRules = rules.map(
      ([key, rule]: [string, string | Function]) => {
        if (typeof rule === 'function') {
          let reTemplate = key;

          reTemplate = reTemplate.replace('(', '\\(');
          reTemplate = reTemplate.replace(')', '\\)');

          reTemplate = reTemplate.replace(/([a-z])/g, '(\\d+(?:\\.\\d+)?)');

          return [key, {template: new RegExp(reTemplate, 'g'), fn: rule}];
        }

        return [key, rule];
      });

    this.#lRules = parseRules;
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
