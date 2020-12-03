import fs from 'fs';

export enum Tile {
  Tree,
  Ground
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

export function countTrees(slope: Slope, route: Route): number {
  let columnPos = 0;
  let rowPos = 0;
  let treeCount = 0;
  const rowLength = slope[0].length;
  while (columnPos + route.down < slope.length) {
    columnPos += route.down;
    rowPos += route.right;
    if (rowPos >= rowLength) {
      rowPos -= rowLength;
    }
    if (slope[columnPos][rowPos] === Tile.Tree) {
      treeCount += 1;
    }
  }
  return treeCount;
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
