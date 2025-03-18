import { readFileSync } from 'node:fs';

const [functionsData, qualityData] = readFileSync('input.txt', 'utf-8').trim().split('\n\n');

const functionComponents = functionsData.match(/\d+/g).map(BigInt);
const functionA = (input: bigint) => input + functionComponents[0];
const functionB = (input: bigint) => input * functionComponents[1];
const functionC = (input: bigint) => input ** functionComponents[2];

const roomQualityList = qualityData.split('\n').map(BigInt);

const medianQuality = roomQualityList.sort((a, b) => Number(a - b)).at(Math.floor(roomQualityList.length / 2));
const functionChain = [functionC, functionB, functionA];
const toPrice = (acc: bigint, cur: typeof functionA) => cur(acc);
const medianPrice = functionChain.reduce(toPrice, medianQuality);

console.log(`Part 1: ${medianPrice}`);

const evenNumberedRoomQuality = roomQualityList.filter(n => n % 2n === 0n).reduce((acc, cur) => acc + cur, 0n);
const upperBounds = functionChain.reduce(toPrice, evenNumberedRoomQuality);

console.log(`Part 2: ${upperBounds}`);

const maxBudget = 15000000000000;
const sortedQualityList = roomQualityList.toSorted((a, b) => Number(b - a));
const bestAffordableRoom = sortedQualityList.find(quality => functionChain.reduce(toPrice, quality) <= maxBudget);

console.log(`Part 3: ${bestAffordableRoom}`);
