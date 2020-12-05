import {
  findMaxSeatId,
  findMissingSeatId,
  findSeatPosition,
  parseBoardingPasses,
  Partition,
  Seat
} from '../src/dayfive';

it('can parse boarding passes', () => {
  expect(
    parseBoardingPasses(`FBFBBFFRLR
BFFFBBFRRR`)
  ).toStrictEqual([
    {
      rowPartition: [
        Partition.Lower,
        Partition.Upper,
        Partition.Lower,
        Partition.Upper,
        Partition.Upper,
        Partition.Lower,
        Partition.Lower
      ],
      columnPartition: [Partition.Upper, Partition.Lower, Partition.Upper]
    },
    {
      rowPartition: [
        Partition.Upper,
        Partition.Lower,
        Partition.Lower,
        Partition.Lower,
        Partition.Upper,
        Partition.Upper,
        Partition.Lower
      ],
      columnPartition: [Partition.Upper, Partition.Upper, Partition.Upper]
    }
  ]);
});

it('can find seat from boarding pass', () => {
  expect(findSeatPosition(parseBoardingPasses('FBFBBFFRLR')[0])).toStrictEqual(new Seat(44, 5));
  expect(findSeatPosition(parseBoardingPasses('BFFFBBFRRR')[0])).toStrictEqual(new Seat(70, 7));
  expect(findSeatPosition(parseBoardingPasses('FFFBBBFRRR')[0])).toStrictEqual(new Seat(14, 7));
  expect(findSeatPosition(parseBoardingPasses('BBFFBBFRLL')[0])).toStrictEqual(new Seat(102, 4));
});

it('computes seat position', () => {
  expect(new Seat(44, 5).seatId).toStrictEqual(357);
});

it('Can find the max seat id', () => {
  expect(findMaxSeatId([new Seat(44, 5)])).toStrictEqual(357);
  expect(findMaxSeatId([new Seat(44, 5), new Seat(70, 7)])).toStrictEqual(567);
});

it('can find missing seat id', () => {
  expect(
    findMissingSeatId([new Seat(44, 5), new Seat(44, 6), new Seat(44, 7), new Seat(44, 9)])
  ).toStrictEqual(360);
});
