export interface IPoint {
  id: string;
  name: string;
}

export interface IPlace {
  point: IPoint;
  distance: number;
}

export interface IGameData {
  currentMapId: string;
  destination: IPlace[];
  lastComputedTimestamp: number;
}

const gamePlay = (gameData: IGameData): IGameData => {
  return { ...gameData };
};

export default gamePlay;
