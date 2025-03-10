import { readFileSync } from 'node:fs';

const connections = readFileSync('input.txt', 'utf-8').trim().split('\n').map(x => x.split(' <-> '));

const numberOfUniqueDestinations = new Set(connections.flat()).size;
console.log(`Part 1: ${numberOfUniqueDestinations}`);

class Location {
  constructor(name: string) {
    this.name = name;
  }

  name: string;
  neighbors: Location[] = [];
}

class Map {
  constructor(connections: string[][]) {
    connections.forEach((locations) => {
      locations.forEach(loc => {
        if (!this.locations[loc]) this.locations[loc] = new Location(loc);
      });
      const [locA, locB] = locations;
      this.locations[locA].neighbors.push(this.locations[locB]);
      this.locations[locB].neighbors.push(this.locations[locA]);
    });
  }

  locations: Record<string, Location> = {};

  run = (start: Location, range: number) => {
    const visited = new Set([start.name]);
    const distance: Record<string, number> = { [start.name]: 0 };
    const queue: Array<[Location, number]> = [[start, 1]];

    while (queue.length) {
      const [cur, localRange] = queue.shift();
      if (localRange >= range) continue;
      for (const loc of this.locations[cur.name].neighbors) {
        if (!visited.has(loc.name)) {
          visited.add(loc.name);
          distance[loc.name] = localRange;
          queue.push([loc, localRange + 1]);
        }
      }
    }

    return { visited, distance };
  };
}

const map = new Map(connections);

const startNode = map.locations['STT'];
const reachableLocations = map.run(startNode, 3).visited.size;
console.log(`Part 2: ${reachableLocations}`);

const totalTime = Object.values(map.run(startNode, Infinity).distance).reduce((acc, cur) => acc + cur, 0);
console.log(`Part 3: ${totalTime}`);
