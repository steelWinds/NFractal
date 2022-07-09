import type {ITurtlePoint} from '@/interfaces/ITurtlePoint';
import type {DrawLineParams} from '@/helpers/canvas/useDrawLineSegment';

// Options types
type LineOptions = {
  iSize?: number,
  color?: string,
  cap?: 'butt' | 'round' | 'square',
};

type CoordsOptions = {
  startPoints?: [number, number],
  startAngle?: number,
};

type FractalOptions = {
  axiom: string,
  iterations: number,
  lenSegments: number,
  angleSegments: number,
};

type AnimateOptions = {
  framerate: number,
};

// Params types
type DrawParams = {
  fractal: FractalOptions,
  coords?: CoordsOptions,
  line?: LineOptions
  animate?: AnimateOptions,
};

type LFunctionParams = {
  ctx: CanvasRenderingContext2D,
  drawLine: (options: DrawLineParams) => void,
  turtle: ITurtlePoint,
  rotates: {x: number, y: number},
  len: number,
  angle: number,
  params: number[],
};

// Additional types

type LSystemParamsFunction = (...params: number[]) => string

type LSystemRuleChanceUnit = Array<{rule: string, chance: number}>;

type LSystemRuleFnUnit = { template: RegExp, fn: Function };

type LSystemRuleUnit =
  Array<[string, string | LSystemParamsFunction | LSystemRuleChanceUnit]>;

type LSystemCmdFunctions = Map<string, (
  obj: LFunctionParams
) => void>;

type LSystemRules =
  Array<[string, string | LSystemRuleFnUnit | LSystemRuleChanceUnit]>;

interface ILSystem2D {
  setLCommandFunctions(
    fnMap: Array<[string, (obj: LFunctionParams) => void]>
  ): void;

  setLRules(
    rules: LSystemRuleUnit,
  ): void

  draw(
    options: DrawParams
  ): void
}

export type {
  ILSystem2D,
};

export type {
  LSystemCmdFunctions,
  LFunctionParams,
  LSystemRuleUnit,
  LSystemRuleChanceUnit,
  LSystemRuleFnUnit,
  LSystemRules,
};

export type {
  LineOptions,
  CoordsOptions,
  FractalOptions,
};

export type {
  DrawParams,
};

