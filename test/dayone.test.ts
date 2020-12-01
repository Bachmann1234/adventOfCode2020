import { findTwoThatSumTo2020, findThreeThatSumTo2020, prepInput } from '../src/dayone';

test('Can find 2 that sum to 2020', () => {
  expect(findTwoThatSumTo2020(prepInput('1721\n979\n366\n299\n675\n1456'))).toStrictEqual(
    '299 + 1721 = 2020 | 514579'
  );
});

test('Can find 3 that sum to 2020', () => {
  expect(findThreeThatSumTo2020(prepInput('1721\n979\n366\n299\n675\n1456'))).toStrictEqual(
    '366 + 675 + 979 = 2020 | 241861950'
  );
});
