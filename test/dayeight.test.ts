import {
  fixAndRunProgram,
  Operation,
  parseInstructions,
  runStopOnRepeatInstruction
} from '../src/dayeight';

it('should parse the instructions', () => {
  expect(
    parseInstructions(`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`)
  ).toStrictEqual([
    {
      op: Operation.NOP,
      arg: 0
    },
    {
      op: Operation.ACC,
      arg: 1
    },
    {
      op: Operation.JMP,
      arg: 4
    },
    {
      op: Operation.ACC,
      arg: 3
    },
    {
      op: Operation.JMP,
      arg: -3
    },
    {
      op: Operation.ACC,
      arg: -99
    },
    {
      op: Operation.ACC,
      arg: 1
    },
    {
      op: Operation.JMP,
      arg: -4
    },
    {
      op: Operation.ACC,
      arg: 6
    }
  ]);
});

it('can stop when an instruction is repeated', () => {
  expect(
    runStopOnRepeatInstruction(
      parseInstructions(`nop +0
   acc +1
   jmp +4
   acc +3
   jmp -3
   acc -99
   acc +1
   jmp -4
   acc +6`)
    )
  ).toStrictEqual([1, 5]);
});

it('can fix infinite loop', () => {
  expect(
    fixAndRunProgram(
      parseInstructions(`nop +0
   acc +1
   jmp +4
   acc +3
   jmp -3
   acc -99
   acc +1
   jmp -4
   acc +6`)
    )
  ).toStrictEqual(8);
});
