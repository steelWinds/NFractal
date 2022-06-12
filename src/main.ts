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
    ['A', 'F(1)[+A][-A]'],
    ['F(x)', (x) => `F(${1.5*x})`],
  ],
);

ls.draw(
  'A',
  8,
  {
    startPoints: [600, 900],
    lenSegments: 20,
    angleSegments: 66,
    startAngle: -90,
    iSize: 1,
    color: 'black',
  },
);
