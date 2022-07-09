import FractalCreator from '@/classes/FractalCreator';
// import {useGaussinRandom} from '@/helpers/math/useGaussinRandom';
// import {useRadians} from '@/helpers/math/useRadians';

const cv = globalThis.document.createElement('canvas');

cv.width = 1100;
cv.height = 1100;

globalThis.document.body.append(cv);

const creator = new FractalCreator();

const ls = creator.use({
  type: creator.LSystem2D,
  canvas: {
    id: 'canvas1',
    el: cv,
  },
});

ls.setLRules(
  [
    ['F', 'F[+FF][-FF]F[-F][+F]F'],
  ],
);

ls.draw(
  {
    fractal: {
      axiom: 'F',
      iterations: 1,
      lenSegments: 10,
      angleSegments: 35,
    },
    coords: {
      startPoints: [600, 800],
      startAngle: -90,
    },
    line: {
      iSize: 1,
      cap: 'round',
      color: 'brown',
    },
  },
);

// ls.setLCommandFunctions([
//  ['F', ({ctx, turtle, rotates, len, params, drawLine}) => {
//    const x = turtle.coords.x + (len * params[0]) * rotates.x;
//    const y = turtle.coords.y + (len * params[0]) * rotates.y;

//    drawLine({
//      ctx,
//      coords: {x, y},
//      styleFn: (coords) => {
//        ctx.lineWidth = params[1];

//        turtle.setPosition(coords.x, coords.y);
//      },
//      dropStyles: true,
//    });
//  }],

//  ['-', ({turtle, angle, params}) => {
//    turtle.rotate -= angle * params[0];
//  }],

//  ['+', ({turtle, angle, params}) => {
//    turtle.rotate += angle * params[0];
//  }],

//  ['A', ({ctx, turtle, rotates, drawLine}) => {
//    const x = turtle.coords.x + (10) * rotates.x;
//    const y = turtle.coords.y + (10) * rotates.y;

//    drawLine({
//      ctx,
//      coords: {x, y},
//      styleFn: () => {
//        ctx.strokeStyle = 'green';
//      },
//      dropStyles: true,
//    });
//  }],
// ]);
