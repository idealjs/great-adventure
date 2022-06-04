import { IAdventurer, ICharacter } from ".";

const battle = (adventurers: IAdventurer[], enemies: ICharacter[]) => {
  return {
    adventurers: adventurers,
    enemies: enemies,
  };
};
