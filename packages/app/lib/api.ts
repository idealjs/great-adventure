import { GameData, Place, Prisma } from "@prisma/client/gameData";

export const apiGameData = "/api/gameData";

export const updateGameData = async (gameData: GameData) => {
  return await fetch(apiGameData, {
    method: "update",
    headers: {},
  });
};

export const patchGameData = (gameData: Prisma.GameDataCreateInput) => {};

export const apiPlaces = "/api/places";

export const createPlace = async (place: Prisma.PlaceCreateInput) => {
  return await fetch(apiPlaces, {
    method: "post",
  });
};
