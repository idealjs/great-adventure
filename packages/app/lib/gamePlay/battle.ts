import { CHARACTER_TYPE } from "@prisma/client/gameData";

import { IGameData } from ".";

const battle = (data: IGameData): IGameData => {
  const { characters } = data;
  let currentAdventurers = characters
    .filter((c) => c.type === CHARACTER_TYPE.ADVENTURER)
    .map((c) => {
      if (c.alive) {
        return {
          ...c,
          AP: c.AP + c.agility,
        };
      }
      return c;
    });

  let currentEnemies = characters
    .filter((c) => c.type === CHARACTER_TYPE.ENEMY)
    .map((c) => {
      if (c.alive) {
        return {
          ...c,
          AP: c.AP + c.agility,
        };
      }
      return c;
    });

  [...currentAdventurers, ...currentEnemies]
    .filter((d) => {
      return d.AP > 100;
    })
    .sort((a, b) => {
      return b.AP - a.AP;
    })
    .forEach((c) => {
      if (c.type === CHARACTER_TYPE.ADVENTURER) {
        const attackTargets = currentEnemies.filter((c) => c.alive);
        const index = Math.floor(Math.random() * attackTargets.length);
        const selected = attackTargets[index];
        selected.curHP = selected.curHP - (selected.defense - c.attack);
      }

      if (c.type === CHARACTER_TYPE.ENEMY) {
        const attackTargets = currentAdventurers.filter((c) => c.alive);
        const index = Math.floor(Math.random() * attackTargets.length);
        const selected = attackTargets[index];
        selected.curHP = selected.curHP - (selected.defense - c.attack);
      }
      c.AP = c.AP - 100;
    });

  return { ...data, characters };
};

export default battle;
