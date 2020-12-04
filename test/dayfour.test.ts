import { countValidPassportsPartOne, isValidPassport, parsePassports } from '../src/dayfour';

const examplePassports = [
  {
    eyeColor: 'gry',
    passportId: '860033327',
    expirationYear: 2020,
    hairColor: '#fffffd',
    birthYear: 1937,
    issueYear: 2017,
    countryId: '147',
    height: '183cm'
  },
  {
    eyeColor: 'amb',
    passportId: '028048884',
    expirationYear: 2023,
    hairColor: '#cfa07d',
    birthYear: 1929,
    issueYear: 2013,
    countryId: '350',
    height: null
  },
  {
    eyeColor: 'brn',
    passportId: '760753108',
    expirationYear: 2024,
    hairColor: '#ae17e1',
    birthYear: 1931,
    issueYear: 2013,
    countryId: null,
    height: '179cm'
  },
  {
    eyeColor: 'brn',
    passportId: '166559648',
    hairColor: '#cfa07d',
    birthYear: null,
    issueYear: 2011,
    countryId: null,
    expirationYear: 2025,
    height: '59in'
  }
];

test('it can parse the passport file', () => {
  expect(
    parsePassports(`ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`)
  ).toStrictEqual(examplePassports);
});

test('it can count valid passports', () => {
  expect(countValidPassportsPartOne(examplePassports)).toStrictEqual(2);
});

test('it can catch invalid passports', () => {
  expect(
    isValidPassport({
      eyeColor: 'gry',
      passportId: '860033327',
      expirationYear: 2020,
      hairColor: '#fffffd',
      birthYear: 2002,
      issueYear: 2017,
      countryId: '147',
      height: '183cm'
    })
  ).toBeTruthy();
  expect(
    isValidPassport({
      eyeColor: 'gry',
      passportId: '860033327',
      expirationYear: 2020,
      hairColor: '#fffffd',
      birthYear: 2003,
      issueYear: 2017,
      countryId: '147',
      height: '183cm'
    })
  ).toBeFalsy();
  expect(
    isValidPassport({
      eyeColor: 'gry',
      passportId: '860033327',
      expirationYear: 2020,
      hairColor: '#fffffd',
      birthYear: 2002,
      issueYear: 2017,
      countryId: '147',
      height: '60in'
    })
  ).toBeTruthy();
  expect(
    isValidPassport({
      eyeColor: 'gry',
      passportId: '860033327',
      expirationYear: 2020,
      hairColor: '#fffffd',
      birthYear: 2002,
      issueYear: 2017,
      countryId: '147',
      height: '190cm'
    })
  ).toBeTruthy();
  expect(
    isValidPassport({
      eyeColor: 'gry',
      passportId: '860033327',
      expirationYear: 2020,
      hairColor: '#fffffd',
      birthYear: 2002,
      issueYear: 2017,
      countryId: '147',
      height: '190in'
    })
  ).toBeFalsy();
  expect(
    isValidPassport({
      eyeColor: 'gry',
      passportId: '860033327',
      expirationYear: 2020,
      hairColor: '#fffffd',
      birthYear: 2002,
      issueYear: 2017,
      countryId: '147',
      height: '190'
    })
  ).toBeFalsy();
  expect(
    isValidPassport({
      eyeColor: 'gry',
      passportId: '860033327',
      expirationYear: 2020,
      hairColor: '#123abc',
      birthYear: 2002,
      issueYear: 2017,
      countryId: '147',
      height: '190cm'
    })
  ).toBeTruthy();
  expect(
    isValidPassport({
      eyeColor: 'gry',
      passportId: '860033327',
      expirationYear: 2020,
      hairColor: '#123abz',
      birthYear: 2002,
      issueYear: 2017,
      countryId: '147',
      height: '190cm'
    })
  ).toBeFalsy();
  expect(
    isValidPassport({
      eyeColor: 'gry',
      passportId: '860033327',
      expirationYear: 2020,
      hairColor: '123abc',
      birthYear: 2002,
      issueYear: 2017,
      countryId: '147',
      height: '190cm'
    })
  ).toBeFalsy();
  expect(
    isValidPassport({
      eyeColor: 'brn',
      passportId: '860033327',
      expirationYear: 2020,
      hairColor: '#123abc',
      birthYear: 2002,
      issueYear: 2017,
      countryId: '147',
      height: '190cm'
    })
  ).toBeTruthy();
  expect(
    isValidPassport({
      eyeColor: 'wat',
      passportId: '860033327',
      expirationYear: 2020,
      hairColor: '#123abc',
      birthYear: 2002,
      issueYear: 2017,
      countryId: '147',
      height: '190cm'
    })
  ).toBeFalsy();
  expect(
    isValidPassport({
      eyeColor: 'brn',
      passportId: '000000001',
      expirationYear: 2020,
      hairColor: '#123abc',
      birthYear: 2002,
      issueYear: 2017,
      countryId: '147',
      height: '190cm'
    })
  ).toBeTruthy();
  expect(
    isValidPassport({
      eyeColor: 'brn',
      passportId: '0123456789',
      expirationYear: 2020,
      hairColor: '#123abc',
      birthYear: 2002,
      issueYear: 2017,
      countryId: '147',
      height: '190cm'
    })
  ).toBeFalsy();
});
