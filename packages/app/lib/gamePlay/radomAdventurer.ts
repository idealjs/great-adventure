import {
  adjectives,
  colors,
  names,
  uniqueNamesGenerator,
} from "unique-names-generator";

import { IAdventurer } from ".";

const radomAdventurer = (seed?: string): IAdventurer => {
  return {
    name: uniqueNamesGenerator({
      dictionaries: [colors, adjectives, names],
      seed,
    }),
    level: 1,
    maxHP: 100,
    curHP: 100,
    maxMP: 100,
    curMP: 100,
    maxExp: 100,
    curExp: 0,
    attack: 1,
    defense: 1,
    AP: 0,
    agility: 1,
    equipments: [],
  };
};

export default radomAdventurer;
