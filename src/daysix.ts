import fs from 'fs';

type Group = {
  answers: string[];
};

export function parseGroups(data: string): Group[] {
  return data.split('\n\n').map((g) => {
    return { answers: g.split('\n') };
  });
}

export function countAnswers(groups: Group[]): number {
  return groups.reduce((result, curGroup) => {
    return result + new Set(curGroup.answers.flatMap((x) => [...x])).size;
  }, 0);
}

export function countAnswersEveryoneAffirmed(groups: Group[]): number {
  return groups.reduce((result, curGroup) => {
    return (
      result +
      curGroup.answers.reduce((finalSet, answers) => {
        return new Set([...answers].filter((a) => finalSet.has(a)));
      }, new Set([...curGroup.answers[0]])).size
    );
  }, 0);
}

if (require.main === module) {
  try {
    const data = fs.readFileSync('input/daySix', 'utf8');
    console.log(countAnswers(parseGroups(data)));
    console.log(countAnswersEveryoneAffirmed(parseGroups(data)));
  } catch (err) {
    console.error(err);
  }
}
