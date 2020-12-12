import {
  parseInput,
  AbsoluteDirection,
  CardinalDirection,
  computeManhattanDistance,
  executeCommands
} from '../src/daytwelve';

const partOneExampleCommands = [
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
  ).toStrictEqual(partOneExampleCommands);
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

it('can follow commands', () => {
  expect(
    executeCommands({ x: 0, y: 0, facing: CardinalDirection.EAST }, partOneExampleCommands)
  ).toStrictEqual({
    facing: CardinalDirection.SOUTH,
    x: 17,
    y: -8
  });
  expect(
    executeCommands({ x: 0, y: 0, facing: CardinalDirection.EAST }, [
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
