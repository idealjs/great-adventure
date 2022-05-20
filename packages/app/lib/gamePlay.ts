export interface IPlace {
  id: string;
  name: string;
  travelRoutes: ITravelRoute[];
}

export interface ITravelRoute {
  from: string;
  to: string;
  distance: number;
}

export interface IGameData {
  currentPlaceId: string;
  travelRoutes: ITravelRoute[];
  lastComputedTimestamp: number;
}

const gamePlay = (gameData: IGameData): IGameData => {
  return { ...gameData };
};

export default gamePlay;
