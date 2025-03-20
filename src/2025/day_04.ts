import { readFileSync } from 'node:fs';

const inputData = readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => line.split(''));

const getMemoryUnit = (char: string) => {
  const maybeNumber = Number(char);
  if (!Number.isNaN(maybeNumber)) return maybeNumber;
  return char.charCodeAt(0) - 64;
};

const toMemoryUsage = (acc: number, cur: string) => acc + getMemoryUnit(cur);

const getTotalMemoryNeeded = (messages: string[][]) => messages
  .map(line => line.reduce(toMemoryUsage, 0))
  .reduce((acc, cur) => acc + cur, 0);

const totalMemoryUsage = getTotalMemoryNeeded(inputData);

console.log(`Part 1: ${totalMemoryUsage}`);

const lossyCompress = (msg: string[]) => {
  const charsKept = Math.floor(msg.length / 10);
  const deleteCount = msg.length - (charsKept * 2);
  return msg.toSpliced(charsKept, deleteCount, ...deleteCount.toString());
};

const lossyCompressedMemoryUsage = getTotalMemoryNeeded(inputData.map(lossyCompress));

console.log(`Part 2: ${lossyCompressedMemoryUsage}`);

const losslessCompress = (msg: string[]) => {
  const data = msg.reduce((metaInfo, cur, i) => {
    if (cur === metaInfo.currentChar || metaInfo.currentChar === undefined) {
      metaInfo.currentChar = cur;
      metaInfo.currentRun += 1;
      if (i !== msg.length - 1) return metaInfo;
    }
    metaInfo.compressedData += `${metaInfo.currentRun}${metaInfo.currentChar}`;
    metaInfo.currentChar = cur;
    metaInfo.currentRun = 1;
    return metaInfo;
  }, { currentChar: undefined, currentRun: 0, compressedData: '' });

  return [...data.compressedData];
};

const losslessCompressedMemoryUsage = getTotalMemoryNeeded(inputData.map(losslessCompress));

console.log(`Part 3: ${losslessCompressedMemoryUsage}`);

