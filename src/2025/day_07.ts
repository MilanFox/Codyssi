import { readFileSync } from 'node:fs';

const [frequencyData, swapData, testData] = readFileSync('input.txt', 'utf-8').trim().split('\n\n');

const frequencies = frequencyData.split('\n').map(Number);
const swapInstructions = swapData.split('\n').map(instr => instr.split('-').map(Number));
const testIndex = Number(testData);

const standard1 = [...frequencies];

swapInstructions.forEach(([x, y]) => {
  [standard1[x - 1], standard1[y - 1]] = [standard1[y - 1], standard1[x - 1]];
});

console.log(`Part 1: ${standard1[testIndex - 1]}`);

const standard2 = [...frequencies];

swapInstructions.forEach(([x, y], i) => {
  const z = swapInstructions[(i + 1) % swapInstructions.length].at(0);
  [standard2[x - 1], standard2[y - 1], standard2[z - 1]] = [standard2[z - 1], standard2[x - 1], standard2[y - 1]];
});

console.log(`Part 2: ${standard2[testIndex - 1]}`);

