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

  findReachableLocations = (start: Location, range: number) => {
    const visited = new Set([start.name]);
    const queue: Array<[Location, number]> = [[start, range]];

    while (queue.length) {
      const [cur, localRange] = queue.shift();
      if (localRange === 0) continue;
      for (const loc of this.locations[cur.name].neighbors) {
        if (!visited.has(loc.name)) {
          visited.add(loc.name);
          queue.push([loc, localRange - 1]);
        }
      }
    }

    return visited.size;
  };
}

const map = new Map(connections);

console.log(`Part 2: ${map.findReachableLocations(map.locations['STT'], 3)}`);
