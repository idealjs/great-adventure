import { GameData, Prisma, TravelRoute } from "@prisma/client/gameData";

import { IGameData } from "./gamePlay";

export const apiGameData = "/api/gameData";

export const updateGameData = async (gameData: GameData) => {
  return await fetch(apiGameData, {
    method: "update",
    headers: {},
  });
};

export const patchGameData = async (
  gameData: IGameData
): Promise<{ data: IGameData }> => {
  const res = await fetch(apiGameData, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameData),
  });
  return res.json();
};

export const apiPlaces = "/api/places";

export const createPlace = async (place: Prisma.PlaceCreateInput) => {
  return await fetch(apiPlaces, {
    method: "post",
  });
};
