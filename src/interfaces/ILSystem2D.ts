import type {ICanvasItem} from 'ninja-canvashelper';

interface ILSystem2D {
  setLRules(
    rules: Array<[string, string | Function]>,
  ): void

  setCanvasInstance(canvasItem: ICanvasItem): ILSystem2D;

  draw(
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
      color?: string,
      cap?: 'butt' | 'round' | 'square'
    },
  ): void
}

export type {ILSystem2D};
