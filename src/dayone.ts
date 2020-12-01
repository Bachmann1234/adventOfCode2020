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

function find2020(data: string): string {
  const values: number[] = [];
  data.split('\n').forEach((x) => values.push(parseInt(x, 10)));
  values.sort((x, y) => x - y);
  for (const first of values) {
    const remainder = 2020 - first;
    const second = find(values, remainder);
    if (second !== null) {
      return `${first} + ${second} = ${first + second} | ${first * second}`;
    }
  }
  return '';
}

try {
  const data = fs.readFileSync('input/dayOne', 'utf8');
  console.log(find2020(data));
} catch (err) {
  console.error(err);
}
