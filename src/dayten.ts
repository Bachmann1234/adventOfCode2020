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

export function countValidChains(joltages: number[]): number {
  let chains = 0;
  const chainsInProgress = [
    {
      chain: [0],
      remainingJoltages: joltages.slice()
    }
  ];
  while (chainsInProgress.length) {
    const chainInProgress = chainsInProgress.pop();
    if (!chainInProgress) {
      throw new Error('I dont think I can hit this but there was no chain');
    }
    const { chain, remainingJoltages } = chainInProgress;
    while (remainingJoltages.length) {
      let nextJoltage = remainingJoltages.shift();
      if (nextJoltage === undefined) {
        break;
      }
      const connector = chain.length === 0 ? 0 : chain[chain.length - 1];
      while (nextJoltage && remainingJoltages[0] && remainingJoltages[0] - connector <= 3) {
        const futureChain = chain.slice();
        futureChain.push(nextJoltage);
        chainsInProgress.push({
          chain: futureChain,
          remainingJoltages: remainingJoltages.slice()
        });
        nextJoltage = remainingJoltages.shift();
      }
      if (nextJoltage) {
        chain.push(nextJoltage);
      }
    }
    chains += 1;
  }
  return chains;
}

export function parseInput(data: string): number[] {
  return data.split('\n').map((x) => Number.parseInt(x, 10));
}

if (require.main === module) {
  const data = fs.readFileSync('input/dayTen', 'utf-8');
  const joltages = parseInput(data);
  const adaptorChain = buildAdaptorChain(joltages);
  console.log(computePartOne(adaptorChain));
  console.log(countValidChains(adaptorChain));
}
