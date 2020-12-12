import {
  parseInput,
  AbsoluteDirection,
  CardinalDirection,
  computeManhattanDistance,
  executeCommandsPartOne,
  executeCommandsPartTwo,
  reletiveRotate
} from '../src/daytwelve';

const exampleCommands = [
  { unit: 10, direction: AbsoluteDirection.FORWARD },
  { unit: 3, direction: CardinalDirection.NORTH },
  { unit: 7, direction: AbsoluteDirection.FORWARD },
  { unit: 90, direction: AbsoluteDirection.RIGHT },
  { unit: 11, direction: AbsoluteDirection.FORWARD }
];

it('can parse the input', () => {
  expect(
    parseInput(`F10
N3
F7
R90
F11`)
  ).toStrictEqual(exampleCommands);
});

it('can compute manhattan distance', () => {
  expect(
    computeManhattanDistance({ x: 10, y: -10, facing: CardinalDirection.NORTH })
  ).toStrictEqual(20);
  expect(computeManhattanDistance({ x: 17, y: -8, facing: CardinalDirection.NORTH })).toStrictEqual(
    25
  );
  expect(
    computeManhattanDistance({ x: -5, y: 110, facing: CardinalDirection.NORTH })
  ).toStrictEqual(115);
});

it('can follow commands part one', () => {
  expect(
    executeCommandsPartOne({ x: 0, y: 0, facing: CardinalDirection.EAST }, exampleCommands)
  ).toStrictEqual({
    facing: CardinalDirection.SOUTH,
    x: 17,
    y: -8
  });
  expect(
    executeCommandsPartOne({ x: 0, y: 0, facing: CardinalDirection.EAST }, [
      { unit: 10, direction: AbsoluteDirection.FORWARD },
      { unit: 270, direction: AbsoluteDirection.RIGHT },
      { unit: 90, direction: AbsoluteDirection.LEFT },
      { unit: 10, direction: CardinalDirection.NORTH },
      { unit: 5, direction: CardinalDirection.SOUTH },
      { unit: 1, direction: CardinalDirection.EAST },
      { unit: 2, direction: CardinalDirection.WEST },
      { unit: 5, direction: AbsoluteDirection.FORWARD }
    ])
  ).toStrictEqual({
    facing: CardinalDirection.WEST,
    x: 4,
    y: 5
  });
});

it('can rotate reletive', () => {
  // QUAD 1 RIGHT
  expect(reletiveRotate({ x: 10, y: 4 }, AbsoluteDirection.RIGHT)).toStrictEqual({ x: 4, y: -10 });
  // QUAD 1 LEFT
  expect(reletiveRotate({ x: 4, y: -10 }, AbsoluteDirection.LEFT)).toStrictEqual({ x: 10, y: 4 });
  // QUAD 2 RIGHT
  expect(reletiveRotate({ x: -10, y: 1 }, AbsoluteDirection.RIGHT)).toStrictEqual({ x: 1, y: 10 });
  // QUAD 2 LEFT
  expect(reletiveRotate({ x: 1, y: 10 }, AbsoluteDirection.LEFT)).toStrictEqual({ x: -10, y: 1 });
  // QUAD 3 RIGHT
  expect(reletiveRotate({ x: -1, y: -10 }, AbsoluteDirection.RIGHT)).toStrictEqual({
    x: -10,
    y: 1
  });
  // QUAD 3 LEFT
  expect(reletiveRotate({ x: -10, y: 1 }, AbsoluteDirection.LEFT)).toStrictEqual({
    x: -1,
    y: -10
  });
  // QUAD 4 LEFT
  expect(reletiveRotate({ x: 4, y: -10 }, AbsoluteDirection.LEFT)).toStrictEqual({ x: 10, y: 4 });
  // QUAD 4 RIGHT
  expect(reletiveRotate({ x: 10, y: 4 }, AbsoluteDirection.RIGHT)).toStrictEqual({
    x: 4,
    y: -10
  });
});

it('can follow commands part two', () => {
  expect(
    executeCommandsPartTwo(
      {
        shipPosition: { x: 0, y: 0, facing: CardinalDirection.EAST },
        wayPointOffset: { x: 10, y: 1 }
      },
      exampleCommands
    )
  ).toStrictEqual({
    shipPosition: { x: 214, y: -72, facing: CardinalDirection.EAST },
    wayPointOffset: { x: 4, y: -10 }
  });
});
