import {
  adjectives,
  colors,
  names,
  uniqueNamesGenerator,
} from "unique-names-generator";

import { IAdventurer } from ".";

const radomAdventurer = (): IAdventurer => {
  return {
    name: uniqueNamesGenerator({
      dictionaries: [colors, adjectives, names],
    }),
    health: 100,
    attack: Math.floor(Math.random() * 10),
    defense: Math.floor(Math.random() * 10),
    pointUp: Math.floor(Math.random() * 10),
    actionPoint: 0,
    equipments: [],
  };
};

export default radomAdventurer;
