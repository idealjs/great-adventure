import { CHARACTER_TYPE } from "@prisma/client/gameData";
import {
  adjectives,
  colors,
  names,
  uniqueNamesGenerator,
} from "unique-names-generator";

import { ICharacter } from ".";

const radomAdventurer = (seed?: string): ICharacter => {
  return {
    name: uniqueNamesGenerator({
      dictionaries: [colors, adjectives, names],
      seed,
    }),
    type: CHARACTER_TYPE.ADVENTURER,
    alive: true,
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
    agility: 10,
    equipments: [],
  };
};

export default radomAdventurer;
