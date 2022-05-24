import { GameData, Journey, Place, TravelRoute } from "@prisma/client/gameData";

export interface IPlace extends Place {
  travelRoutes: ITravelRoute[];
}

export interface ITravelRoute {
  from: string;
  to: string;
  distance: number;
}

export interface IGameData {
  userId: string;
  currentPlaceId: string;
  journeys: ITravelRoute[];
}

const gamePlay = (
  gameData: GameData & {
    journeys: Journey[];
  }
): GameData & {
  journeys: Journey[];
} => {
  let currentPlaceId = gameData.currentPlaceId;
  let journeys = gameData.journeys;

  if (gameData.journeys.length !== 0) {
    const [currentRoute, ...tail] = gameData.journeys;

    if (currentRoute.distance === 0) {
      currentPlaceId = currentRoute.to;
      journeys = tail;
    } else {
      currentRoute.distance = currentRoute.distance - 1;
    }
  }

  return {
    ...gameData,
    currentPlaceId,
    journeys,
  };
};

export default gamePlay;
