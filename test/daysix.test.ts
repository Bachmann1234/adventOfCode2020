import { parseGroups, countAnswers, countAnswersEveryoneAffirmed } from '../src/daysix';

it('should parse the groups', () => {
  expect(
    parseGroups(`abc

a
b
c

ab
ac

a
a
a
a

b`)
  ).toStrictEqual([
    { answers: ['abc'] },
    { answers: ['a', 'b', 'c'] },
    { answers: ['ab', 'ac'] },
    { answers: ['a', 'a', 'a', 'a'] },
    { answers: ['b'] }
  ]);
});

it('should count answers', () => {
  expect(
    countAnswers([
      { answers: ['abc'] },
      { answers: ['a', 'b', 'c'] },
      { answers: ['ab', 'ac'] },
      { answers: ['a', 'a', 'a', 'a'] },
      { answers: ['b'] }
    ])
  ).toStrictEqual(11);
});

it('should count answers everyone affirmed', () => {
  expect(
    countAnswersEveryoneAffirmed([
      { answers: ['abc'] },
      { answers: ['a', 'b', 'c'] },
      { answers: ['ab', 'ac'] },
      { answers: ['a', 'a', 'a', 'a'] },
      { answers: ['b'] }
    ])
  ).toStrictEqual(6);
});
