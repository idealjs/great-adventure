import { GameData, Place, TravelRoute } from "@prisma/client/gameData";

export interface IPlace extends Place {
  travelRoutes: ITravelRoute[];
}

export interface ITravelRoute extends TravelRoute {}

export interface IGameData extends GameData {
  travelRoutes: ITravelRoute[];
}

const gamePlay = (gameData: IGameData): IGameData => {
  return { ...gameData };
};

export default gamePlay;
