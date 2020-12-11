import fs from 'fs';

export function computePartOne(adaptorChain: number[]): number {
  let oneDifferences = 0;
  let threeDifferences = 0;
  let lastJoltage = 0;
  adaptorChain.forEach((j) => {
    const diff = j - lastJoltage;
    if (diff === 1) {
      oneDifferences += 1;
    } else if (diff === 3) {
      threeDifferences += 1;
    }
    lastJoltage = j;
  });
  return oneDifferences * threeDifferences;
}

export function buildAdaptorChain(joltages: number[]): number[] {
  const sortedJoltages = joltages.slice().sort((a, b) => a - b);
  sortedJoltages.push(sortedJoltages[sortedJoltages.length - 1] + 3);
  return sortedJoltages;
}

function countValidChainsRecurse(
  chain: number[],
  joltages: number[],
  solutions: Map<string, number>,
  curCount: 0
): number {
  const key = joltages.join(',');
  const solution = solutions.get(key);
  let count = curCount;
  if (solution) {
    return curCount + solution;
  }
  while (joltages.length) {
    let nextJoltage = joltages.shift();
    const connector = chain.length === 0 ? 0 : chain[chain.length - 1];
    while (nextJoltage && joltages[0] && joltages[0] - connector <= 3) {
      const futureChain = chain.slice();
      futureChain.push(nextJoltage);
      count += countValidChainsRecurse(futureChain, joltages.slice(), solutions, curCount);
      nextJoltage = joltages.shift();
    }
    if (nextJoltage) {
      chain.push(nextJoltage);
    }
  }
  solutions.set(key, count + 1);
  return count + 1;
}
export function countValidChains(joltages: number[]): number {
  return countValidChainsRecurse([], joltages, new Map(), 0);
}

export function parseInput(data: string): number[] {
  return data.split('\n').map((x) => Number.parseInt(x, 10));
}

if (require.main === module) {
  const data = fs.readFileSync('input/dayTen', 'utf8');
  const joltages = parseInput(data);
  const adaptorChain = buildAdaptorChain(joltages);
  console.log(computePartOne(adaptorChain));
  console.log(countValidChains(adaptorChain));
}
