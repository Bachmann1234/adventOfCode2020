import fs from 'fs';

export type PasswordSpec = {
  specOne: number;
  specTwo: number;
  targetLetter: string;
};

export type ProblemLine = [PasswordSpec, string];

export function isValidPasswordPolicyOne([spec, password]: ProblemLine): boolean {
  const targetCount = [...password].reduce((acc, cur) => {
    return cur === spec.targetLetter ? acc + 1 : acc;
  }, 0);
  return targetCount >= spec.specOne && targetCount <= spec.specTwo;
}

export function isValidPasswordPolicyTwo([spec, password]: ProblemLine): boolean {
  let count = 0;
  if (password[spec.specOne - 1] === spec.targetLetter) {
    count += 1;
  }
  if (password[spec.specTwo - 1] === spec.targetLetter) {
    count += 1;
  }
  return count === 1;
}

export function countValidPasswords(
  passwords: ProblemLine[],
  validator: (p: ProblemLine) => boolean
): number {
  return passwords.reduce((acc, curr) => {
    return validator(curr) ? acc + 1 : acc;
  }, 0);
}

export function parsePasswordFile(input: string): ProblemLine[] {
  return input.split('\n').map((line) => {
    const [counts, letter, password] = line.split(/\s+/);
    const [specOne, specTwo] = counts.split('-');
    return [
      {
        specOne: Number.parseInt(specOne, 10),
        specTwo: Number.parseInt(specTwo, 10),
        targetLetter: letter.replace(':', '')
      },
      password
    ];
  });
}

try {
  const data = fs.readFileSync('input/dayTwo', 'utf8');
  const values = parsePasswordFile(data);
  console.log(countValidPasswords(values, isValidPasswordPolicyOne));
  console.log(countValidPasswords(values, isValidPasswordPolicyTwo));
} catch (err) {
  console.error(err);
}
