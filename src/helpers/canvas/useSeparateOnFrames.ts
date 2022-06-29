import type {CoordsList} from '@/helpers/types/Canvas';

const useSeparateOnFrames = (
  coordsList: CoordsList,
  framerate: number,
): CoordsList => {
  const frames: CoordsList = [];

  coordsList.forEach((points, idx) => {
    const prevPoints = coordsList[idx - 1];
    const currentPoints = points;

    if (!prevPoints) return;
    if (points?.move) {
      frames.push({x: points.x, y: points.y, move: points?.move});

      return;
    }

    const dx = currentPoints.x - prevPoints.x;
    const dy = currentPoints.y - prevPoints.y;

    for (let i = 0; i < framerate; i++) {
      const x = prevPoints.x + dx * i / framerate;
      const y = prevPoints.y + dy * i / framerate;

      frames.push({x, y});
    }
  });

  return frames;
};

export {useSeparateOnFrames};
