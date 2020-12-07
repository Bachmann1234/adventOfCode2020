import {
  BagNode,
  buildBagTree,
  countNumberBagsRequired,
  countPotentialBags,
  YOUR_BAG
} from '../src/dayseven';

const nodes: BagNode[] = [
  { color: 'light red', inner: [] },
  { color: 'dark orange', inner: [] },
  { color: 'bright white', inner: [] },
  { color: 'muted yellow', inner: [] },
  { color: 'shiny gold', inner: [] },
  { color: 'dark olive', inner: [] },
  { color: 'vibrant plum', inner: [] },
  { color: 'faded blue', inner: [] },
  { color: 'dotted black', inner: [] }
];

const LIGHT_RED = nodes[0];
const DARK_ORANGE = nodes[1];
const BRIGHT_WHITE = nodes[2];
const MUTED_YELLOW = nodes[3];
const SHINY_GOLD = nodes[4];
const DARK_OLIVE = nodes[5];
const VIBRANT_PLUM = nodes[6];
const FADED_BLUE = nodes[7];
const DOTTED_BLACK = nodes[8];

LIGHT_RED.inner = [
  { numBags: 1, next: BRIGHT_WHITE },
  { numBags: 2, next: MUTED_YELLOW }
];
DARK_ORANGE.inner = [
  { numBags: 3, next: BRIGHT_WHITE },
  { numBags: 4, next: MUTED_YELLOW }
];
BRIGHT_WHITE.inner = [{ numBags: 1, next: SHINY_GOLD }];
MUTED_YELLOW.inner = [
  { numBags: 2, next: SHINY_GOLD },
  { numBags: 9, next: FADED_BLUE }
];
SHINY_GOLD.inner = [
  { numBags: 1, next: DARK_OLIVE },
  { numBags: 2, next: VIBRANT_PLUM }
];
DARK_OLIVE.inner = [
  { numBags: 3, next: FADED_BLUE },
  { numBags: 4, next: DOTTED_BLACK }
];
VIBRANT_PLUM.inner = [
  { numBags: 5, next: FADED_BLUE },
  { numBags: 6, next: DOTTED_BLACK }
];
FADED_BLUE.inner = [];
DOTTED_BLACK.inner = [];

it('Can build the bag tree', () => {
  expect(
    buildBagTree(`light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`)
  ).toStrictEqual(nodes);
});

it('Counts the number of bags that can contain your bag', () => {
  expect(countPotentialBags(nodes, YOUR_BAG)).toStrictEqual(4);
});

it('Counts the number of requiredBags', () => {
  expect(countNumberBagsRequired(nodes, YOUR_BAG)).toStrictEqual(32);
  expect(
    countNumberBagsRequired(
      buildBagTree(`shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`),
      YOUR_BAG
    )
  ).toStrictEqual(126);
});
