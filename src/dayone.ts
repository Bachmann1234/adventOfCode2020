import fs from 'fs';

function find(data: number[], target: number) {
  let start = 0;
  let end = data.length - 1;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (data[mid] === target) {
      return data[mid];
    }
    if (data[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return null;
}

export function prepInput(data: string): number[] {
  const values: number[] = [];
  data.split('\n').forEach((x) => values.push(parseInt(x, 10)));
  values.sort((x, y) => x - y);
  return values;
}

function findTwoThatSumToTarget(values: number[], target: number): number[] | null {
  for (const first of values) {
    const remainder = target - first;
    const second = find(values, remainder);
    if (second !== null) {
      return [first, second];
    }
  }
  return null;
}

export function findTwoThatSumTo2020(values: number[]): string {
  const result = findTwoThatSumToTarget(values, 2020);
  if (result !== null) {
    const [first, second] = result;
    return `${first} + ${second} = ${first + second} | ${first * second}`;
  }
  return '';
}

export function findThreeThatSumTo2020(values: number[]): string {
  for (const first of values) {
    const remainder = 2020 - first;
    const result = findTwoThatSumToTarget(values, remainder);
    if (result !== null) {
      const [second, third] = result;
      return `${first} + ${second} + ${third} = ${first + second + third} | ${
        first * second * third
      }`;
    }
  }
  return '';
}

if (require.main === module) {
  try {
    const data = fs.readFileSync('input/dayOne', 'utf8');
    const values = prepInput(data);
    console.log(findTwoThatSumTo2020(values));
    console.log(findThreeThatSumTo2020(values));
  } catch (err) {
    console.error(err);
  }
}
