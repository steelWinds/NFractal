interface ITurtlePoint {
  setPosition(x: number, y: number): void;

  get coords(): {x: number, y: number};

  get rotate(): number;
  set rotate(angle: number);
}

export type {ITurtlePoint};
