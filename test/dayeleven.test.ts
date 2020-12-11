import {
  computeAdjacencies,
  countOccupiedSeats,
  parseSeatMap,
  SeatState,
  simulateSeating,
  boardToString,
  partOneRules,
  partTwoRules
} from '../src/dayeleven';

// prettier-ignore
const finalMapPartOne = [
  [SeatState.OCCUPIED,SeatState.FLOOR,SeatState.OCCUPIED,SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.OCCUPIED,SeatState.FLOOR,SeatState.OCCUPIED,SeatState.OCCUPIED],
  [SeatState.OCCUPIED,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.OCCUPIED,SeatState.EMPTY,SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.OCCUPIED],
  [SeatState.EMPTY,SeatState.FLOOR,SeatState.OCCUPIED,SeatState.FLOOR,SeatState.EMPTY,SeatState.FLOOR,SeatState.FLOOR,SeatState.OCCUPIED,SeatState.FLOOR,SeatState.FLOOR],
  [SeatState.OCCUPIED,SeatState.EMPTY,SeatState.OCCUPIED,SeatState.OCCUPIED,SeatState.FLOOR,SeatState.OCCUPIED,SeatState.OCCUPIED,SeatState.FLOOR,SeatState.EMPTY,SeatState.OCCUPIED],
  [SeatState.OCCUPIED,SeatState.FLOOR,SeatState.OCCUPIED,SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.EMPTY],
  [SeatState.OCCUPIED,SeatState.FLOOR,SeatState.OCCUPIED,SeatState.EMPTY,SeatState.OCCUPIED,SeatState.EMPTY,SeatState.OCCUPIED,SeatState.FLOOR,SeatState.OCCUPIED,SeatState.OCCUPIED],
  [SeatState.FLOOR,SeatState.FLOOR,SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.FLOOR,SeatState.FLOOR,SeatState.FLOOR,SeatState.FLOOR,SeatState.FLOOR],
  [SeatState.OCCUPIED,SeatState.EMPTY,SeatState.OCCUPIED,SeatState.EMPTY,SeatState.OCCUPIED,SeatState.OCCUPIED,SeatState.EMPTY,SeatState.OCCUPIED,SeatState.EMPTY,SeatState.OCCUPIED],
  [SeatState.OCCUPIED,SeatState.FLOOR,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY],
  [SeatState.OCCUPIED,SeatState.FLOOR,SeatState.OCCUPIED,SeatState.EMPTY,SeatState.OCCUPIED,SeatState.EMPTY,SeatState.OCCUPIED,SeatState.FLOOR,SeatState.OCCUPIED,SeatState.OCCUPIED]
];

// prettier-ignore
const initialMap = [
  [SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.EMPTY],
  [SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.EMPTY],
  [SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.FLOOR,SeatState.FLOOR,SeatState.EMPTY,SeatState.FLOOR,SeatState.FLOOR],
  [SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.EMPTY],
  [SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.EMPTY],
  [SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.EMPTY],
  [SeatState.FLOOR,SeatState.FLOOR,SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.FLOOR,SeatState.FLOOR,SeatState.FLOOR,SeatState.FLOOR,SeatState.FLOOR],
  [SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY],
  [SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY],
  [SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.EMPTY,SeatState.FLOOR,SeatState.EMPTY,SeatState.EMPTY]
];

it('Can parse the input', () => {
  expect(
    parseSeatMap(`L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`)
  ).toStrictEqual(initialMap);
  expect(
    parseSeatMap(`#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##`)
  ).toStrictEqual(finalMapPartOne);
});

it('Can turn the map back into a string', () => {
  expect(
    boardToString(
      parseSeatMap(`L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`)
    )
  ).toStrictEqual(`L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`);
});

it('can extract adjacent seats', () => {
  expect(computeAdjacencies(finalMapPartOne, SeatState.OCCUPIED, 4)).toStrictEqual([
    SeatState.EMPTY,
    SeatState.OCCUPIED,
    SeatState.EMPTY,
    SeatState.FLOOR,
    SeatState.FLOOR,
    SeatState.OCCUPIED,
    SeatState.FLOOR,
    SeatState.OCCUPIED
  ]);
});
it('can simulate seating until stability part one', () => {
  expect(simulateSeating(initialMap, partOneRules)).toStrictEqual(finalMapPartOne);
});
it('can count occupied seats', () => {
  expect(countOccupiedSeats(finalMapPartOne)).toStrictEqual(37);
});

it('can simulate seating until stability part two', () => {
  expect(
    simulateSeating(
      parseSeatMap(`L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`),
      partTwoRules
    )
  ).toStrictEqual(
    parseSeatMap(`#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.LL.L#
#.LLLL#.LL
..#.L.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#`)
  );
});
