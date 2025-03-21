import { readFileSync } from 'node:fs';

class Island {
  x: number;
  y: number;

  constructor(data: string) {
    [this.x, this.y] = data.match(/-?\d+(\.\d+)?/g).map(Number);
  }

  getDistance({ x, y }: { x: number, y: number } = { x: 0, y: 0 }) {
    return Math.abs(x - this.x) + Math.abs(y - this.y);
  }
}

const islands = readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => new Island(line));

const distances = islands.sort((a, b) => a.getDistance() - b.getDistance());
const closestIsland = distances.at(0);
const furthestIsland = distances.at(-1);

console.log(`Part 1: ${furthestIsland.getDistance() - closestIsland.getDistance()}`);

const nextClosestIsland = distances.reduce((acc, island) => {
  if (acc.island === island) return acc;
  const distance = closestIsland.getDistance(island);
  if (distance < acc.distance) return { island, distance };
  return acc;
}, { island: distances[0], distance: Infinity });

console.log(`Part 2: ${nextClosestIsland.distance}`);

const findTrace = () => {
  const visited: Island[] = [{ x: 0, y: 0 } as Island];
  let totalDistance = 0;

  while (visited.length <= islands.length) {
    const currentLocation = visited.at(-1);

    const closest = islands
      .filter(island => !visited.includes(island))
      .sort((a, b) => {
        const distDiff = a.getDistance(currentLocation) - b.getDistance(currentLocation);
        if (distDiff !== 0) return distDiff;
        if (a.x !== b.x) return a.x - b.x;
        return a.y - b.y;
      })
      .at(0);

    visited.push(closest);
    totalDistance += closest.getDistance(currentLocation);
  }

  return totalDistance;
};

console.log(`Part 3: ${findTrace()}`);
