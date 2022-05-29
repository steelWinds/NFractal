import FractalCreator from '@/classes/FractalCreator';

const cre = new FractalCreator();

cre.initCanvas(
  'canvas1',
  {
    iSize: 1200,
    bSize: 1500,
    parent: 'body',
    styleClass: 'fractal',
  },
);
const ls = cre.LSystem2D!;

ls.setLRules(
  [
    ['F', 'FF-[-F+F+F]+[+F-F-F]'],
  ],
);

ls.draw(
  'F',
  5,
  {
    startPoints: [600, 900],
    lenSegments: 20,
    angleSegments: 45,
    speed: -2,
    startAngle: -90,
    iSize: 1,
    color: 'black',
  },
);
