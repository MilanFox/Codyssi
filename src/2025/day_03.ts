import { readFileSync } from 'node:fs';

const ranges = readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')
  .map(line => line.split(' ').map(range => range.split('-').map(Number)));

const totalNumberOfBoxes = ranges.flat().reduce((acc, [start, end]) => acc + ((end - start) + 1), 0);

console.log(`Part 1: ${totalNumberOfBoxes}`);

const actualNumberOfBoxes = ranges
  .reduce((acc, [[r1start, r1end], [r2start, r2end]]) => {
    const range1boxes = r1end - r1start + 1;
    const range2boxes = r2end - r2start + 1;
    const overlap = Math.max(0, Math.min(r1end, r2end) - Math.max(r1start, r2start) + 1);
    return acc + range1boxes + range2boxes - overlap;
  }, 0);

console.log(`Part 2: ${actualNumberOfBoxes}`);

const uniqueLabels = ranges.map((localRanges) => {
  const labels = new Set();
  for (const [start, end] of localRanges) {
    for (let i = start; i <= end; i++) labels.add(i);
  }
  return labels;
});

let maximumNumberOfUniqueBoxes = 0;

for (let i = 0; i < ranges.length - 1; i++) {
  const uniqueBoxes = new Set([...uniqueLabels[i], ...uniqueLabels[i + 1]]).size;
  maximumNumberOfUniqueBoxes = Math.max(maximumNumberOfUniqueBoxes, uniqueBoxes);
}

console.log(`Part 3: ${maximumNumberOfUniqueBoxes}`);
