import { readFileSync } from 'node:fs';

const inputData = readFileSync('input.txt', 'utf-8').trim().split('\n');

const signs = inputData.pop().split('').map(x => x === '+' ? 1 : -1);
const offsets = inputData.map(Number);

const toOffset = (acc: number, cur: number, i: number) => acc + (cur * (signs[i - 1] || 1));
const compassOffset = offsets.reduce(toOffset, 0);
console.log(`Part 1: ${compassOffset}`);

signs.reverse();
const actualCompassOffset = offsets.reduce(toOffset, 0);
console.log(`Part 2: ${actualCompassOffset}`);

const doubleDigitOffsets = offsets.reduce((acc, _, i, arr) => {
  if (i % 2 !== 0) return acc;
  return [...acc, Number(`${arr[i]}${arr[i + 1]}`)];
}, []);

const actualActualCompassOffset = doubleDigitOffsets.reduce(toOffset, 0);
console.log(`Part 3: ${actualActualCompassOffset}`);
