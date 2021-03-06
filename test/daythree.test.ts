import { parseMap, Tile, countTrees, PART_ONE_ROUTE, countTreesIterative } from '../src/daythree';

// prettier-ignore
const exampleMap = [
   [Tile.Ground, Tile.Ground, Tile.Tree, Tile.Tree, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Ground ],
   [Tile.Tree, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Tree, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Tree, Tile.Ground, Tile.Ground ],
   [Tile.Ground, Tile.Tree, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Tree, Tile.Ground, Tile.Ground, Tile.Tree, Tile.Ground ],
   [Tile.Ground, Tile.Ground, Tile.Tree, Tile.Ground, Tile.Tree, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Tree, Tile.Ground, Tile.Tree ],
   [Tile.Ground, Tile.Tree, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Tree, Tile.Tree, Tile.Ground, Tile.Ground, Tile.Tree, Tile.Ground ],
   [Tile.Ground, Tile.Ground, Tile.Tree, Tile.Ground, Tile.Tree, Tile.Tree, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Ground ],
   [Tile.Ground, Tile.Tree, Tile.Ground, Tile.Tree, Tile.Ground, Tile.Tree, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Tree ],
   [Tile.Ground, Tile.Tree, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Tree ],
   [Tile.Tree, Tile.Ground, Tile.Tree, Tile.Tree, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Tree, Tile.Ground, Tile.Ground, Tile.Ground ],
   [Tile.Tree, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Tree, Tile.Tree, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Tree ],
   [Tile.Ground, Tile.Tree, Tile.Ground, Tile.Ground, Tile.Tree, Tile.Ground, Tile.Ground, Tile.Ground, Tile.Tree, Tile.Ground, Tile.Tree ]
];

test('can parse the input file', () => {
  expect(
    parseMap(
      `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`
    )
  ).toStrictEqual(exampleMap);
});

test('can count Trees', () => {
  expect(countTrees(exampleMap, PART_ONE_ROUTE)).toStrictEqual(7);
});

test('can count Trees without recursion', () => {
  expect(countTreesIterative(exampleMap, PART_ONE_ROUTE)).toStrictEqual(7);
});
