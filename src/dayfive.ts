import fs from 'fs';

const MAX_ROW = 127;
const MAX_COL = 7;
export enum Partition {
  Upper = 0,
  Lower
}

type BoardingPass = {
  rowPartition: [Partition, Partition, Partition, Partition, Partition, Partition, Partition];
  columnPartition: [Partition, Partition, Partition];
};

export class Seat {
  row: number;

  column: number;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }

  get seatId(): number {
    return this.row * 8 + this.column;
  }
}

export function parseBoardingPasses(data: string): BoardingPass[] {
  return data.split('\n').map((pass) => {
    const partitions = [...pass].map((c) =>
      c === 'B' || c === 'R' ? Partition.Upper : Partition.Lower
    );
    return {
      rowPartition: [
        partitions[0],
        partitions[1],
        partitions[2],
        partitions[3],
        partitions[4],
        partitions[5],
        partitions[6]
      ],
      columnPartition: [partitions[7], partitions[8], partitions[9]]
    };
  });
}

function findPosition(partitions: Partition[], maxValue: number): number {
  let pivot = maxValue / 2;
  let partition;
  let lower = 0;
  let upper = maxValue;
  while (partitions.length > 0) {
    partition = partitions.shift();
    if (partition === Partition.Upper) {
      lower = Math.ceil(pivot);
    } else {
      upper = Math.floor(pivot);
    }
    pivot = (lower + upper) / 2;
  }
  return partition === Partition.Upper ? upper : lower;
}

export function findSeatPosition(boardingPass: BoardingPass): Seat {
  return new Seat(
    findPosition(boardingPass.rowPartition, MAX_ROW),
    findPosition(boardingPass.columnPartition, MAX_COL)
  );
}

export function findMaxSeatId(seats: Seat[]): number {
  return seats.map((s) => s.seatId).reduce((acc, cur) => (cur > acc ? cur : acc));
}

export function findMissingSeatId(seats: Seat[]): number {
  const seatIds = seats.map((s) => s.seatId).sort((a, b) => a - b);
  while (seatIds.length) {
    const current = seatIds.shift();
    if (current === undefined) {
      throw new Error('I dont think I can get here but I wanna make tsc happy');
    }
    const next = current + 1;
    if (seatIds[0] !== next) {
      return next;
    }
  }
  return -1;
}

if (require.main === module) {
  try {
    const data = fs.readFileSync('input/dayFive', 'utf8');
    const seats = parseBoardingPasses(data).map((p) => findSeatPosition(p));
    console.log(findMaxSeatId(seats));
    console.log(findMissingSeatId(seats));
  } catch (err) {
    console.error(err);
  }
}
