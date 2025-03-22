import { readFileSync } from 'node:fs';

const inputData = readFileSync('input.txt', 'utf-8').trim();

const uncorruptedData = inputData.match(/\w/g);
console.log(`Part 1: ${uncorruptedData.length}`);

const lowerCaseLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
const upperCaseLetter = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const charCode = [...lowerCaseLetters, ...upperCaseLetter];

const getCharValue = (char: string) => charCode.findIndex(c => c === char) + 1;

const corruptChecksum = uncorruptedData.reduce((acc, cur) => acc + getCharValue(cur), 0);
console.log(`Part 2: ${corruptChecksum}`);

const mendedData: number[] = [];

const getMendedValue = (i: number) => {
  const baseValue = (mendedData[i - 1] * 2) - 5;
  if (baseValue >= 1 && baseValue <= 52) return baseValue;
  if (baseValue < 1) return baseValue + 52;
  return baseValue - 52;
};

for (let i = 0; i < inputData.length; i++) {
  let charValue = getCharValue(inputData[i]);
  if (charValue < 1) charValue = getMendedValue(i);
  mendedData.push(charValue);
}

const mendedChecksum = mendedData.reduce((acc, cur) => acc + cur, 0);
console.log(`Part 3: ${mendedChecksum}`);
