import type {ICanvasItem} from 'ninja-canvashelper';
import type {
  ILSystem2D,
  LSystemCmdFunctions,
  LFunctionParams,
  LSystemRuleUnit,
  LSystemRules,
  DrawParams,
} from '@/interfaces/ILSystem2D';
import type {ITurtlePoint} from '@/interfaces/ITurtlePoint';
import type {ILSystemCmdUnit} from '@/interfaces/ILSystemCmdUnit';
import type {CoordsList} from '@/helpers/types/Canvas';
import type {DrawLineParams} from '@/helpers/canvas/useDrawLineSegment';

import TurtlePoint from './TurtlePoint';
import range from 'lodash-es/range';
import {useRadians} from '@/helpers/math/useRadians';
import {useSelectByChance} from '@/helpers/math/useSelectByChance';
import {useLSystemParams} from '@/helpers/string/useLSystemParams';
import {useAnimateByFrames} from '@/helpers/canvas/useAnimateByFrames';
import {useDrawLineSegment} from '@/helpers/canvas/useDrawLineSegment';
import re from '@/helpers/regexp/r_list';
import LSystemCmdUnit from './LSystemCmdUnit';

type LSystem2DConstructor = typeof LSystem2D

class LSystem2D implements ILSystem2D {
  #coordsList: CoordsList;
  #turtlePoint: ITurtlePoint;
  #canvasInstance: ICanvasItem;
  #canvasContext: CanvasRenderingContext2D;
  #onlySetCoords?: boolean;
  #lCommandsUnits?: ILSystemCmdUnit[];
  #lCmdFunctions?: LSystemCmdFunctions;
  #lRules?: LSystemRules;

  constructor(canvasItem: ICanvasItem) {
    this.#coordsList = [];
    this.#turtlePoint = new TurtlePoint();

    this.#canvasInstance = canvasItem;
    this.#canvasContext = this.#canvasInstance.context2D!;
  }

  #drawLine(options: DrawLineParams): void {
    this.#coordsList.push(options.coords);

    if (this.#onlySetCoords) {
      this.#turtlePoint.setPosition(options.coords.x, options.coords.y);
      this.#turtlePoint.setRotate(
        options.coords?.rotate ?? this.#turtlePoint.rotate,
      );

      return;
    }

    useDrawLineSegment(options);
  }

  #applyParamsFunction(
    unit: ILSystemCmdUnit,
    {xRotate, yRotate, len, angle, onNonParams = () => null}: {
      xRotate: number,
      yRotate: number,
      len: number,
      angle: number,
      onNonParams?: () => void,
    },
  ) {
    if (!this.#lCmdFunctions?.has(unit.char) || !unit?.params) {
      onNonParams();

      return;
    }

    this.#lCmdFunctions.get(unit.char)?.(
      {
        ctx: this.#canvasContext,
        drawLine: this.#drawLine.bind(this),
        turtle: this.#turtlePoint,
        rotates: {x: xRotate, y: yRotate},
        len,
        angle,
        params: unit.params,
      },
    );
  }

  #setLCommand(command: string, iterations: number): void {
    if (!this.#lRules) return;

    let strCommand = command;

    range(iterations).forEach(() => {
      this.#lRules?.forEach(([char, rule]) => {
        if (typeof rule === 'string') {
          strCommand = strCommand.replaceAll(
            char,
            rule.toLocaleLowerCase(),
          );
        } else if (Array.isArray(rule)) {
          const selectRule = useSelectByChance(rule);

          strCommand = strCommand.replaceAll(
            char,
            selectRule.rule.toLocaleLowerCase(),
          );
        } else if (rule?.fn && rule?.template) {
          strCommand = strCommand.replaceAll(
            rule.template,
            useLSystemParams.bind(this, rule.fn),
          );
        }

        return;
      });

      strCommand = strCommand.toLocaleUpperCase();

      this.#lCommandsUnits = strCommand.match(re.LSystemExp)?.map((cmd) => {
        return new LSystemCmdUnit(cmd);
      });
    });
  }

  #drawByCommand(len: number, angle: number): void {
    if (!this.#canvasContext || !this.#lCommandsUnits) {
      return;
    }

    for (const unit of this.#lCommandsUnits) {
      const xRotate = Math.cos(useRadians(this.#turtlePoint.rotate));
      const yRotate = Math.sin(useRadians(this.#turtlePoint.rotate));

      const x = this.#turtlePoint.coords.x + len * xRotate;
      const y = this.#turtlePoint.coords.y + len * yRotate;

      switch (unit.char) {
      case 'F': {
        this.#applyParamsFunction(
          unit,
          {
            xRotate,
            yRotate,
            len,
            angle,
            onNonParams: () => {
              this.#drawLine({
                ctx: this.#canvasContext,
                coords: {x, y},
                styleFn: (coords) => {
                  this.#turtlePoint.setPosition(coords.x, coords.y);
                },
              });
            },
          },
        );
        break;
      }

      case 'A': {
        this.#applyParamsFunction(
          unit,
          {
            xRotate,
            yRotate,
            len,
            angle,
          },
        );
        break;
      }

      case '+': {
        this.#applyParamsFunction(
          unit,
          {
            xRotate,
            yRotate,
            len,
            angle,
            onNonParams: () => {
              this.#turtlePoint.setRotate(this.#turtlePoint.rotate + angle);
            },
          },
        );
        break;
      }

      case '-': {
        this.#applyParamsFunction(
          unit,
          {
            xRotate,
            yRotate,
            len,
            angle,
            onNonParams: () => {
              this.#turtlePoint.setRotate(this.#turtlePoint.rotate - angle);
            },
          },
        );
        break;
      }

      case '[': {
        this.#turtlePoint.setMovePoint({
          x: this.#turtlePoint.coords.x,
          y: this.#turtlePoint.coords.y,
          rotate: this.#turtlePoint.rotate,
        });
        break;
      }

      case ']': {
        const lastPos = this.#turtlePoint.moveStack.pop();

        if (!lastPos) {
          return;
        }

        const {x: xLast, y: yLast, rotate} = lastPos;

        this.#drawLine({
          ctx: this.#canvasContext,
          coords: {x: xLast, y: yLast, rotate, move: true},
          styleFn: (coords) => {
            this.#turtlePoint.setPosition(coords.x, coords.y);
            this.#turtlePoint.setRotate(
              coords?.rotate ?? this.#turtlePoint.rotate,
            );
          },
        });
        break;
      }
      }

      this.#canvasContext.stroke();
    }
  }

  #animate(framerate: number) {
    useAnimateByFrames(this.#coordsList, framerate, (x, y, rotate, move) => {
      if (!this.#canvasContext) {
        return;
      }

      this.#onlySetCoords = false;

      this.#drawLine({
        ctx: this.#canvasContext,
        coords: {x, y, rotate, move},
      });
    });
  }

  public setLCommandFunctions(
    fnMap: [string, (obj: LFunctionParams) => void][],
  ): void {
    this.#lCmdFunctions = new Map(fnMap);
  }

  public setLRules(
    rules: LSystemRuleUnit,
  ): void {
    const parseRules: LSystemRules = rules.map(
      ([key, rule]: LSystemRuleUnit[1]) => {
        let reTemplate = key;

        reTemplate = reTemplate.replace('(', '\\(');
        reTemplate = reTemplate.replace(')', '\\)');
        reTemplate = reTemplate.replace('+', '\\+');
        reTemplate = reTemplate.replace('-', '\\-');

        if (typeof rule === 'function') {
          reTemplate = reTemplate.replace(/([a-z])/g, '(\\d+(?:\\.\\d+)?)');

          return [key, {template: new RegExp(reTemplate, 'gi'), fn: rule}];
        }

        return [key, rule];
      });

    this.#lRules = parseRules;
  }

  public draw(options: DrawParams): void {
    if (!this.#turtlePoint || !this.#canvasContext || !this.#canvasInstance) {
      return;
    }

    const {
      fractal,
      line,
      coords,
      animate,
    } = options;

    this.#onlySetCoords = Boolean(animate);

    this.#canvasContext.lineCap = line?.cap ?? 'butt';
    this.#canvasContext.lineWidth = line?.iSize ?? 1;
    this.#canvasContext.strokeStyle = line?.color ?? '#000';

    this.#turtlePoint.setPosition(
      coords?.startPoints?.[0] ?? 0,
      coords?.startPoints?.[1] ?? 0,
    );
    this.#turtlePoint.setRotate(coords?.startAngle ?? 0);

    this.#canvasContext.save();

    this.#canvasContext.beginPath();
    this.#canvasContext.moveTo(
      this.#turtlePoint.coords.x,
      this.#turtlePoint.coords.y,
    );

    this.#setLCommand(fractal.axiom, fractal.iterations);
    this.#drawByCommand(fractal.lenSegments, fractal.angleSegments);

    this.#canvasContext.stroke();

    if (animate) {
      this.#animate(animate.framerate);
    }

    this.#canvasContext.restore();
  }
}

export default LSystem2D;

export type {LSystem2DConstructor};
