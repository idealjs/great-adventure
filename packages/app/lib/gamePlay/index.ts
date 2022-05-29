import {
  Adventurer,
  Buff,
  Character,
  Equipment,
  GameData,
  Journey,
  Place,
  TravelRoute,
} from "@prisma/client/gameData";

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

export interface IAdventurer extends PartialOmitAnyId<Adventurer> {
  equipments: IEquipment[];
}

export interface IGameData extends PartialOmit<GameData, "id"> {
  journeys: IJourney[];
  adventurers: IAdventurer[];
  enemies: ICharacter[];
}

const gamePlay = (gameData: IGameData): IGameData => {
  if (gameData.journeys.length !== 0) {
    return {
      ...gameData,
      ...calcJourney(gameData),
    };
  }
  if (gameData.helpWanted) {
    return {
      ...gameData,
      helpWanted: false,
      adventurers: [radomAdventurer(), ...gameData.adventurers],
    };
  }

  return gameData;
};

export default gamePlay;
