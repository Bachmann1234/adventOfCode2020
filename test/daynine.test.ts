import { findBadNumber, parseInput, findEncryptionWeakness } from '../src/daynine';

it('can parse the input', () => {
  expect(
    parseInput(
      `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`
    )
  ).toStrictEqual([
    35,
    20,
    15,
    25,
    47,
    40,
    62,
    55,
    65,
    95,
    102,
    117,
    150,
    182,
    127,
    219,
    299,
    277,
    309,
    576
  ]);
});

it('can find the invalid number', () => {
  expect(
    findBadNumber(
      [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576],
      5
    )
  ).toBe(127);
});

it('can find the encryption weakness', () => {
  expect(
    findEncryptionWeakness(
      [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576],
      127
    )
  ).toBe(62);
});
