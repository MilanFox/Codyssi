import { readFileSync } from 'node:fs';

const inputData = readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => line.split(' '));

const compositionSum = inputData.reduce((acc, [_, base]) => acc + Number(base), 0);
console.log(`Part 1: ${compositionSum}`);

const toInt = ([reading, base]: [string, string]) => parseInt(reading, Number(base));
const toSum = (acc: number, cur: number) => acc + cur;
const sumOfReadings = inputData.map(toInt).reduce(toSum, 0);
console.log(`Part 2: ${sumOfReadings}`);

const convertToBase65 = (base10Number: number) => {
  const digitMap = [
    "0","1","2","3","4","5","6","7","8","9",
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
    "!","@","#"];

  const remainders = [];
  let rest = base10Number;

  while (true) {
    const quotient = Math.floor(rest / 65);
    const remainder = rest % 65;
    remainders.push(remainder)
    if (quotient === 0) break;
    rest = quotient;
  }

  remainders.reverse();
  return remainders.map(num => digitMap[num]).join('');
};

console.log(`Part 3: ${convertToBase65(sumOfReadings)}`)
