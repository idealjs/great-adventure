import {
  Buff,
  Character,
  Equipment,
  GameData,
  Journey,
  Place,
  TravelRoute,
} from "@prisma/client/gameData";

import battle from "./battle";
import calcJourney from "./calcJourney";
import radomAdventurer from "./radomAdventurer";

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

export interface ICharacter extends PartialOmitAnyId<Character> {}

export interface IGameData extends PartialOmit<GameData, "id"> {
  journeys: IJourney[];
  characters: ICharacter[];
}

const gamePlay = (gameData: IGameData): IGameData => {
  if (gameData.characters.length !== 0) {
    return battle(gameData);
  }
  if (gameData.journeys.length !== 0) {
    return calcJourney(gameData);
  }
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
