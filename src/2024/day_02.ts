import { readFileSync } from 'node:fs';

const inputData = readFileSync('input.txt', 'utf-8').trim().split('\n').map(x => x === 'TRUE');

const checksum = inputData.reduce((acc, cur, i) => cur ? acc + i + 1 : acc, 0);
console.log(`Part 1: ${checksum}`);

const toNextLayer = (acc: Array<boolean>, cur: boolean, i: number, arr: Array<boolean>) => {
  const next = arr[i + 1];
  if (i % 2 !== 0) return acc;
  if (i % 4 === 0) return [...acc, cur && next];
  return [...acc, cur || next];
};

const toNumberOfTrueGates = (acc: number, cur: boolean) => cur ? acc + 1 : acc;

const numberOfTrueGates = inputData.reduce(toNextLayer, []).reduce(toNumberOfTrueGates, 0);
console.log(`Part 2: ${numberOfTrueGates}`);

const collapseLayers = () => {
  let currentLayer = [...inputData];
  let numberOfTrueGates = 0;

  while (true) {
    if (currentLayer.length === 1) return numberOfTrueGates;
    numberOfTrueGates += currentLayer.reduce(toNumberOfTrueGates, 0);
    currentLayer = currentLayer.reduce(toNextLayer, []);
  }
};

const circuitScore = collapseLayers();
console.log(`Part 3: ${circuitScore}`);
