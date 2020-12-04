import fs from 'fs';

type Passport = {
  birthYear: number | null;
  issueYear: number | null;
  expirationYear: number | null;
  height: string | null;
  hairColor: string | null;
  eyeColor: string | null;
  passportId: string | null;
  countryId: string | null;
};

function createPassport(fields: string[]): Passport {
  let birthYear = null;
  let issueYear = null;
  let expirationYear = null;
  let height = null;
  let hairColor = null;
  let eyeColor = null;
  let passportId = null;
  let countryId = null;
  fields.forEach((f) => {
    const [field, value] = f.split(':');
    switch (field) {
      case 'byr':
        birthYear = parseInt(value, 10);
        break;
      case 'iyr':
        issueYear = parseInt(value, 10);
        break;
      case 'eyr':
        expirationYear = parseInt(value, 10);
        break;
      case 'hgt':
        height = value;
        break;
      case 'hcl':
        hairColor = value;
        break;
      case 'pid':
        passportId = value;
        break;
      case 'cid':
        countryId = value;
        break;
      case 'ecl':
        eyeColor = value;
        break;
      default:
        throw new Error(`Unknown field ${field}`);
    }
  });
  return {
    birthYear,
    issueYear,
    expirationYear,
    height,
    hairColor,
    eyeColor,
    passportId,
    countryId
  };
}

export function parsePassports(data: string): Passport[] {
  return data.split('\n\n').map((passportString) => createPassport(passportString.split(/\s/)));
}

function validHeight(height: string | null): boolean {
  if (height === null) {
    return false;
  }
  const heightRegex = /(\d+)(\D+)/;
  const match = height.match(heightRegex);
  if (!match) {
    return false;
  }
  const unit = match[2];
  const value = match[1] ? parseInt(match[1], 10) : undefined;
  if (!(unit && value)) {
    return false;
  }
  if (!(unit === 'cm' || unit === 'in')) {
    return false;
  }
  if (unit === 'cm') {
    if (value < 150 || value > 193) {
      return false;
    }
  }
  if (unit === 'in') {
    if (value < 59 || value > 76) {
      return false;
    }
  }
  return true;
}

const VALID_EYE_COLORS = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);

export function isValidPassport(passport: Passport): boolean {
  if (!passport.birthYear || passport.birthYear < 1920 || passport.birthYear > 2002) {
    return false;
  }
  if (!passport.issueYear || passport.issueYear < 2010 || passport.issueYear > 2020) {
    return false;
  }
  if (
    !passport.expirationYear ||
    passport.expirationYear < 2020 ||
    passport.expirationYear > 2030
  ) {
    return false;
  }
  if (!validHeight(passport.height)) {
    return false;
  }
  if (!passport.hairColor || !passport.hairColor.match(/^#[0-9a-f]{6}$/)) {
    return false;
  }
  if (!passport.eyeColor || !VALID_EYE_COLORS.has(passport.eyeColor)) {
    return false;
  }
  if (!passport.passportId || !passport.passportId.match(/^\d{9}$/)) {
    return false;
  }
  return true;
}

function requiredFieldsPresent(passport: Passport): boolean {
  return [
    passport.birthYear,
    passport.issueYear,
    passport.expirationYear,
    passport.height,
    passport.hairColor,
    passport.eyeColor,
    passport.passportId
  ].every((x) => !!x);
}

export function countValidPassportsPartOne(passports: Passport[]): number {
  return passports.reduce((acc, cur) => {
    return requiredFieldsPresent(cur) ? acc + 1 : acc;
  }, 0);
}

export function countValidPassportsPartTwo(passports: Passport[]): number {
  return passports.reduce((acc, cur) => {
    return isValidPassport(cur) ? acc + 1 : acc;
  }, 0);
}

if (require.main === module) {
  try {
    const data = fs.readFileSync('input/dayFour', 'utf8');
    const passports = parsePassports(data);
    console.log(countValidPassportsPartOne(passports));
    console.log(countValidPassportsPartTwo(passports));
  } catch (err) {
    console.error(err);
  }
}
