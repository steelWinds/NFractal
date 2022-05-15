import FractalCreator from '@/classes/FractalCreator';

const cre = new FractalCreator();

cre.initCanvas(
  'canvas1',
  {
    iSize: 400,
    bSize: 400,
    parent: 'body',
    styleClass: 'fractal',
  },
);

const ls = cre.LSystem2D;

console.log(ls);
