import { readFileSync } from 'node:fs';

const inputData = readFileSync('input.txt', 'utf-8').trim().split('\n').map(Number);

const toSum = (acc: number, cur: number) => acc + cur;

const totalSum = inputData.reduce(toSum, 0);
console.log(`Part 1: ${totalSum}`);

const discountedSum = inputData.toSorted((a, b) => a - b).slice(0, -20).reduce(toSum, 0);
console.log(`Part 2: ${discountedSum}`);

const sumOfEvenEntries = inputData.filter((_, i) => i % 2 === 0).reduce(toSum);
const sumOfOddEntries = inputData.filter((_, i) => i % 2 !== 0).reduce(toSum);
const sumAfterVoucher = sumOfEvenEntries - sumOfOddEntries;
console.log(`Part 3: ${sumAfterVoucher}`);

