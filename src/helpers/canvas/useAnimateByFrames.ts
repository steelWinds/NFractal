import type {CoordsList} from '@/helpers/types/Canvas';

import {useSeparateOnFrames} from '@/helpers/canvas/useSeparateOnFrames';

const useAnimateByFrames = (
  coordsList: CoordsList,
  framerate: number,
  renderFn: (x: number, y: number, rotate?: number, move?: boolean) => void,
) => {
  const frames = useSeparateOnFrames(coordsList, framerate);
  const framesLength = frames.length;
  let renderedFrames = 1;

  const animate = () => {
    if (renderedFrames >= framesLength) {
      return;
    }

    const currentPoints = frames[renderedFrames];

    renderFn?.(
      currentPoints.x,
      currentPoints.y,
      currentPoints?.rotate,
      currentPoints?.move,
    );

    renderedFrames += 1;

    globalThis.requestAnimationFrame(animate);
  };

  globalThis.requestAnimationFrame(animate);
};

export {useAnimateByFrames};
