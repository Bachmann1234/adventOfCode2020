import fs from 'fs';

export enum Operation {
  NOP = 1,
  ACC,
  JMP
}

type Instruction = {
  op: Operation;
  arg: number;
};

const INFO_LOG = false;

function opFromString(opString: string): Operation {
  switch (opString) {
    case 'nop':
      return Operation.NOP;
    case 'acc':
      return Operation.ACC;
    case 'jmp':
      return Operation.JMP;
    default:
      throw new Error(`Unknown op : ${opString}`);
  }
}

export function parseInstructions(data: string): Instruction[] {
  return data.split('\n').map((x) => {
    const match = x.match(/(\w{3}) ([+-])(\d+)/);
    if (match === null) {
      throw new Error('Input did not match');
    }
    const num = Number.parseInt(match[3], 10);
    return {
      op: opFromString(match[1]),
      arg: match[2] === '+' ? num : num * -1
    };
  });
}
function infoLog(text: string): void {
  if (INFO_LOG) {
    console.log(text);
  }
}
export function runStopOnRepeatInstruction(instructions: Instruction[]): [number, number] {
  const visited = new Set();
  let accumulator = 0;
  let programCounter = 0;
  while (programCounter < instructions.length) {
    if (visited.has(programCounter)) {
      infoLog(`Stopping on repeat! ${programCounter}`);
      break;
    } else {
      visited.add(programCounter);
    }
    const inst = instructions[programCounter];
    if (inst.op === Operation.ACC) {
      accumulator += inst.arg;
      infoLog(`${programCounter}: ACC ${inst.arg} -> ${accumulator}`);
    } else if (inst.op === Operation.JMP) {
      infoLog(`${programCounter}: JUMP ${inst.arg} -> ${accumulator}`);
      programCounter += inst.arg - 1;
    } else {
      infoLog(`${programCounter}: NOOP ${inst.arg} -> ${accumulator}`);
    }
    programCounter += 1;
  }

  infoLog(`DONE ${accumulator}`);
  return [programCounter, accumulator];
}

export function fixAndRunProgram(instructions: Instruction[]): number {
  let [programCounter, result] = runStopOnRepeatInstruction(instructions);
  for (let i = 0; i < instructions.length && programCounter < instructions.length; i += 1) {
    const instruction = instructions[i];
    if (instruction.op === Operation.JMP) {
      const testsInstructions = instructions.slice();
      testsInstructions[i] = { op: Operation.NOP, arg: 0 };
      [programCounter, result] = runStopOnRepeatInstruction(testsInstructions);
    }
  }
  return result;
}

if (require.main === module) {
  try {
    const data = fs.readFileSync('input/dayeight', 'utf8');
    console.log(`Part 1 ${runStopOnRepeatInstruction(parseInstructions(data))[1]}`);
    console.log(`Part 2 ${fixAndRunProgram(parseInstructions(data))}`);
  } catch (err) {
    console.log(err);
  }
}
