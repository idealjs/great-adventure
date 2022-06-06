import {
  Buff,
  Character,
  CHARACTER_TYPE,
  Equipment,
  GameData,
  Journey,
  Place,
  TravelRoute,
} from "@prisma/client/gameData";

import getRandomIntInclusive from "../getRandomIntInclusive";
import battle from "./battle";
import calcJourney from "./calcJourney";
import radomAdventurer from "./radomAdventurer";
import radomEnemy from "./radomEnemy";

type PartialOmit<T, K extends string> = Pick<T, Exclude<keyof T, K>> &
  Partial<Pick<T, Extract<keyof T, K>>>;

type PartialOmitAnyId<T> = PartialOmit<T, "id" | `${string | ""}Id`>;

export interface IPlace extends PartialOmitAnyId<Place> {
  travelRoutes: ITravelRoute[];
}

export interface ITravelRoute extends PartialOmitAnyId<TravelRoute> {}

export interface IJourney extends PartialOmitAnyId<Journey> {}

export interface IBuff extends PartialOmitAnyId<Buff> {}

export interface IEquipment extends PartialOmitAnyId<Equipment> {}

export interface ICharacter extends PartialOmitAnyId<Character> {
  equipments: IEquipment[];
}

export interface IGameData extends PartialOmit<GameData, "id"> {
  journeys: IJourney[];
  characters: ICharacter[];
}

const gamePlay = (gameData: IGameData): IGameData => {
  const radomNum = getRandomIntInclusive(0, 9);

  // 战斗
  if (
    gameData.characters.filter((c) => c.type === CHARACTER_TYPE.ENEMY)
      .length !== 0
  ) {
    return battle(gameData);
  }

  // 随机敌人
  if (
    gameData.characters.filter((c) => c.type === CHARACTER_TYPE.ADVENTURER)
      .length !== 0 &&
    radomNum === 0
  ) {
    return {
      ...gameData,
      characters: [radomEnemy(), ...gameData.characters],
    };
  }

  // 旅行
  if (gameData.journeys.length !== 0) {
    return calcJourney(gameData);
  }

  // 招募
  if (gameData.helpWanted) {
    return {
      ...gameData,
      helpWanted: false,
      characters: [radomAdventurer(), ...gameData.characters],
    };
  }

  return gameData;
};

export default gamePlay;
