import fs from 'fs';

export enum Tile {
  Ground = 0,
  Tree
}

type Slope = Tile[][];

type Route = {
  right: number;
  down: number;
};

export const PART_ONE_ROUTE = { right: 3, down: 1 };
export const PART_TWO_ROUTES = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 }
];

export function parseMap(input: string): Slope {
  const result = input.split('\n').map((line) => {
    return [...line].map((c) => (c === '#' ? Tile.Tree : Tile.Ground));
  });
  return result;
}

function countTreesRecurse(
  slope: Slope,
  route: Route,
  row: number,
  column: number,
  count: number,
  rowLength: number
): number {
  return slope[column] === undefined
    ? count
    : countTreesRecurse(
        slope,
        route,
        row + route.right,
        column + route.down,
        count + slope[column][row % rowLength],
        rowLength
      );
}

export function countTrees(slope: Slope, route: Route): number {
  return countTreesRecurse(slope, route, route.right, route.down, 0, slope[0].length);
}

export function countTreesIterative(slope: Slope, route: Route): number {
  let count = 0;
  let row = route.right;
  let col = route.down;
  while (slope[col]) {
    count += slope[col][row % slope[0].length];
    row += route.right;
    col += route.down;
  }
  return count;
}

if (require.main === module) {
  try {
    const data = fs.readFileSync('input/dayThree', 'utf8');
    const slope = parseMap(data);
    console.log(countTrees(slope, PART_ONE_ROUTE));
    console.log(PART_TWO_ROUTES.map((r) => countTrees(slope, r)).reduce((cur, acc) => acc * cur));
  } catch (err) {
    console.error(err);
  }
}
