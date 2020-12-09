import fs from 'fs';

const PART_ONE_PREAMBLE_LENGTH = 25;

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

function canSumFromPotentials(potentials: number[], value: number): boolean {
  const sortedPotentials = potentials.slice().sort((a, b) => a - b);
  for (const first of sortedPotentials) {
    const second = value - first;
    if (first !== second && find(sortedPotentials, second)) {
      return true;
    }
  }
  return false;
}

export function findEncryptionWeakness(masking: number[], badNumber: number): number {
  let firstIndex = 0;
  let lastIndex = 1;
  let sum = masking[firstIndex] + masking[lastIndex];
  for (let i = lastIndex + 1; i < masking.length; i += 1) {
    if (sum === badNumber) {
      const sortedSlice = masking.slice(firstIndex, lastIndex + 1).sort((a, b) => a - b);
      return sortedSlice[0] + sortedSlice[sortedSlice.length - 1];
    }
    if (sum < badNumber) {
      lastIndex += 1;
      sum += masking[lastIndex];
    } else {
      sum -= masking[firstIndex];
      firstIndex += 1;
    }
  }
  return -1;
}

export function findBadNumber(masking: number[], preambleLength: number): number {
  const potentials: number[] = [];
  for (const n of masking) {
    if (potentials.length < preambleLength) {
      potentials.push(n);
    } else {
      if (!canSumFromPotentials(potentials, n)) {
        return n;
      }
      potentials.shift();
      potentials.push(n);
    }
  }
  return 0;
}

export function parseInput(data: string): number[] {
  return data.split('\n').map((element) => {
    return Number.parseInt(element.trim(), 10);
  });
}

if (require.main === module) {
  const data = fs.readFileSync('input/daynine', 'utf8');
  const input = parseInput(data);
  const badNumber = findBadNumber(input, PART_ONE_PREAMBLE_LENGTH);
  console.log(badNumber);
  const encryptionWeakness = findEncryptionWeakness(input, badNumber);
  console.log(encryptionWeakness);
}
