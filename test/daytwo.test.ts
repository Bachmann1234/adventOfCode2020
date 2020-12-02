import {
  parsePasswordFile,
  countValidPasswords,
  isValidPasswordPolicyOne,
  isValidPasswordPolicyTwo
} from '../src/daytwo';

test('can identify valid passwords with the first policy', () => {
  expect(
    countValidPasswords(
      [
        [{ specOne: 1, specTwo: 3, targetLetter: 'a' }, 'abcde'],
        [{ specOne: 1, specTwo: 3, targetLetter: 'b' }, 'cdefg'],
        [{ specOne: 2, specTwo: 9, targetLetter: 'c' }, 'ccccccccc']
      ],
      isValidPasswordPolicyOne
    )
  ).toStrictEqual(2);
});

test('can identify valid passwords with the second policy', () => {
  expect(
    countValidPasswords(
      [
        [{ specOne: 1, specTwo: 3, targetLetter: 'a' }, 'abcde'],
        [{ specOne: 1, specTwo: 3, targetLetter: 'b' }, 'cdefg'],
        [{ specOne: 2, specTwo: 9, targetLetter: 'c' }, 'ccccccccc']
      ],
      isValidPasswordPolicyTwo
    )
  ).toStrictEqual(1);
});

test('can parse password file', () => {
  expect(
    parsePasswordFile(`1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`)
  ).toStrictEqual([
    [{ specOne: 1, specTwo: 3, targetLetter: 'a' }, 'abcde'],
    [{ specOne: 1, specTwo: 3, targetLetter: 'b' }, 'cdefg'],
    [{ specOne: 2, specTwo: 9, targetLetter: 'c' }, 'ccccccccc']
  ]);
});
