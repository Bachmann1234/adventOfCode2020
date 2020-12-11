import fs from 'fs';

export enum SeatState {
  FLOOR = 0,
  EMPTY,
  OCCUPIED
}

const DEBUG = false;

export function countOccupiedSeats(seatRows: SeatState[][]): number {
  return seatRows.reduce((total, row) => {
    return (
      total +
      row.reduce((subTotal, seat) => (seat === SeatState.OCCUPIED ? subTotal + 1 : subTotal), 0)
    );
  }, 0);
}
function extractValue(seatRows: SeatState[][], row: number, col: number): SeatState | undefined {
  const fullRow = seatRows[row];
  if (fullRow === undefined) {
    return undefined;
  }
  return fullRow[col];
}

function isSeatState(x: unknown): x is SeatState {
  return x === SeatState.EMPTY || x === SeatState.OCCUPIED || x === SeatState.FLOOR;
}

export function computeAdjacencies(seatRows: SeatState[][], row: number, col: number): SeatState[] {
  const adjacents = [
    extractValue(seatRows, row - 1, col - 1),
    extractValue(seatRows, row - 1, col),
    extractValue(seatRows, row - 1, col + 1),
    extractValue(seatRows, row, col - 1),
    extractValue(seatRows, row, col + 1),
    extractValue(seatRows, row + 1, col - 1),
    extractValue(seatRows, row + 1, col),
    extractValue(seatRows, row + 1, col + 1)
  ];
  return adjacents.filter(isSeatState);
}

export function partOneRules(seatRows: SeatState[][]): SeatState[][] {
  const result: SeatState[][] = [];
  for (const [rowNum, row] of seatRows.entries()) {
    const newRow = [];
    for (const [colNum, seat] of row.entries()) {
      if (seat !== SeatState.FLOOR) {
        const adjacents = computeAdjacencies(seatRows, rowNum, colNum);
        const countOccupied = adjacents.reduce(
          (acc, cur) => (cur === SeatState.OCCUPIED ? acc + 1 : acc),
          0
        );
        if (countOccupied >= 4) {
          newRow.push(SeatState.EMPTY);
        } else if (countOccupied === 0) {
          newRow.push(SeatState.OCCUPIED);
        } else {
          newRow.push(seat);
        }
      } else {
        newRow.push(seat);
      }
    }
    result.push(newRow);
  }
  return result;
}

export function boardToString(seatRows: SeatState[][]): string {
  return seatRows
    .map((row) =>
      row
        .map((s) => {
          if (s === SeatState.EMPTY) {
            return 'L';
          }
          if (s === SeatState.OCCUPIED) {
            return '#';
          }
          return '.';
        })
        .join('')
    )
    .join('\n');
}

export function countVisibleOccupiedSeats(
  seatRows: SeatState[][],
  rowNum: number,
  colNum: number
): number {
  let result = 0;
  let visible: SeatState | undefined = SeatState.FLOOR;
  let curRow = rowNum;
  let curCol = colNum;
  // right
  while (visible !== undefined) {
    curCol += 1;
    visible = extractValue(seatRows, curRow, curCol);
    if (visible === SeatState.OCCUPIED) {
      result += 1;
      break;
    } else if (visible === SeatState.EMPTY) {
      break;
    }
  }
  curRow = rowNum;
  curCol = colNum;
  visible = SeatState.FLOOR;
  // left
  while (visible !== undefined) {
    curCol -= 1;
    visible = extractValue(seatRows, curRow, curCol);
    if (visible === SeatState.OCCUPIED) {
      result += 1;
      break;
    } else if (visible === SeatState.EMPTY) {
      break;
    }
  }
  curRow = rowNum;
  curCol = colNum;
  visible = SeatState.FLOOR;
  // down
  while (visible !== undefined) {
    curRow += 1;
    visible = extractValue(seatRows, curRow, curCol);
    if (visible === SeatState.OCCUPIED) {
      result += 1;
      break;
    } else if (visible === SeatState.EMPTY) {
      break;
    }
  }
  curRow = rowNum;
  curCol = colNum;
  visible = SeatState.FLOOR;
  // up
  while (visible !== undefined) {
    curRow -= 1;
    visible = extractValue(seatRows, curRow, curCol);
    if (visible === SeatState.OCCUPIED) {
      result += 1;
      break;
    } else if (visible === SeatState.EMPTY) {
      break;
    }
  }
  curRow = rowNum;
  curCol = colNum;
  visible = SeatState.FLOOR;
  // diag Down Right
  while (visible !== undefined) {
    curRow += 1;
    curCol += 1;
    visible = extractValue(seatRows, curRow, curCol);
    if (visible === SeatState.OCCUPIED) {
      result += 1;
      break;
    } else if (visible === SeatState.EMPTY) {
      break;
    }
  }
  curRow = rowNum;
  curCol = colNum;
  visible = SeatState.FLOOR;
  // diag Down Left
  while (visible !== undefined) {
    curCol += 1;
    curRow -= 1;
    visible = extractValue(seatRows, curRow, curCol);
    if (visible === SeatState.OCCUPIED) {
      result += 1;
      break;
    } else if (visible === SeatState.EMPTY) {
      break;
    }
  }
  curRow = rowNum;
  curCol = colNum;
  visible = SeatState.FLOOR;
  // diag Up Right
  while (visible !== undefined) {
    curCol -= 1;
    curRow += 1;
    visible = extractValue(seatRows, curRow, curCol);
    if (visible === SeatState.OCCUPIED) {
      result += 1;
      break;
    } else if (visible === SeatState.EMPTY) {
      break;
    }
  }
  curRow = rowNum;
  curCol = colNum;
  visible = SeatState.FLOOR;
  // diag UP Left
  while (visible !== undefined) {
    curCol -= 1;
    curRow -= 1;
    visible = extractValue(seatRows, curRow, curCol);
    if (visible === SeatState.OCCUPIED) {
      result += 1;
      break;
    } else if (visible === SeatState.EMPTY) {
      break;
    }
  }
  curRow = rowNum;
  curCol = colNum;

  return result;
}

export function partTwoRules(seatRows: SeatState[][]): SeatState[][] {
  const result: SeatState[][] = [];
  for (const [rowNum, row] of seatRows.entries()) {
    const newRow = [];
    for (const [colNum, seat] of row.entries()) {
      if (seat !== SeatState.FLOOR) {
        const occupied = countVisibleOccupiedSeats(seatRows, rowNum, colNum);
        if (occupied >= 5) {
          newRow.push(SeatState.EMPTY);
        } else if (occupied === 0) {
          newRow.push(SeatState.OCCUPIED);
        } else {
          newRow.push(seat);
        }
      } else {
        newRow.push(seat);
      }
    }
    result.push(newRow);
  }
  return result;
}

export function simulateSeating(
  seatRows: SeatState[][],
  computeRound: (n: SeatState[][]) => SeatState[][]
): SeatState[][] {
  let lastStateString = seatRows.flatMap((row) => row).join(',');
  if (DEBUG) {
    console.log(boardToString(seatRows));
  }
  let curState = computeRound(seatRows);
  let curStateString = curState.flatMap((row) => row).join(',');
  while (curStateString !== lastStateString) {
    if (DEBUG) {
      console.log(boardToString(curState));
    }
    lastStateString = curStateString;
    curState = computeRound(curState);
    curStateString = curState.flatMap((row) => row).join(',');
  }
  return curState;
}

export function parseSeatMap(data: string): SeatState[][] {
  return data.split('\n').map((row) => {
    return row.split('').map((char) => {
      if (char === '.') {
        return SeatState.FLOOR;
      }
      if (char === 'L') {
        return SeatState.EMPTY;
      }
      return SeatState.OCCUPIED;
    });
  });
}

if (require.main === module) {
  const data = fs.readFileSync('input/dayEleven', 'utf-8');
  const initialMap = parseSeatMap(data);
  const finalMapPartOne = simulateSeating(initialMap, partOneRules);
  console.log(countOccupiedSeats(finalMapPartOne));
  const finalMapPartTwo = simulateSeating(initialMap, partTwoRules);
  console.log(countOccupiedSeats(finalMapPartTwo));
}
