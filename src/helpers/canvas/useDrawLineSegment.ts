import {CoordsMoveUnit} from '@/helpers/types/Canvas';

type DrawLineParams = {
  ctx: CanvasRenderingContext2D,
  coords: CoordsMoveUnit,
  styleFn?: (coords: CoordsMoveUnit) => void,
  dropStyles?: boolean,
}

const useDrawLineSegment = (
  options: DrawLineParams,
): void => {
  const {
    ctx,
    coords,
    styleFn,
    dropStyles,
  } = options;

  const prevCap = ctx.lineCap;
  const prevISize = ctx.lineWidth;
  const prevStrokeStyle = ctx.strokeStyle;

  styleFn?.(coords);

  if (!coords?.move) {
    ctx.lineTo(coords.x, coords.y);
  } else {
    ctx.moveTo(coords.x, coords.y);
  }

  ctx.stroke();

  if (dropStyles) {
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);

    ctx.lineCap = prevCap;
    ctx.lineWidth = prevISize;
    ctx.strokeStyle = prevStrokeStyle;
  }
};

export {useDrawLineSegment};
export type {DrawLineParams};
