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
    ['A(x, y)', (x) => `F(${x + 1})+A(${x + 1}, ${x})`],
  ],
);

ls.draw(
  'F(1)+A(1.2, 2)',
  5,
  {
    startPoints: [600, 900],
    lenSegments: 20,
    angleSegments: 45,
    startAngle: -90,
    iSize: 1,
    color: 'black',
  },
);
