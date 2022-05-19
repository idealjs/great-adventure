import { NextApiRequest, NextApiResponse } from "next";

import gamePlay, { IGameData } from "../../../lib/gamePlay";

let gameData: IGameData = {
  currentMapId: "1",
  destination: [],
  lastComputedTimestamp: new Date().getTime(),
};

const calcGameData = async (gameData: IGameData) => {
  const currentTimestamp = new Date().getTime();
  let nextGameData = gameData;
  return new Promise<IGameData>((resolve) => {
    for (
      let index = 0;
      index < (currentTimestamp - gameData.lastComputedTimestamp) / 1000;
      index++
    ) {
      console.debug("[debug] calcGameData");
      nextGameData = {
        ...gamePlay(nextGameData),
        lastComputedTimestamp: currentTimestamp,
      };
    }
    resolve(nextGameData);
  });
};

const gameDataHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      const nextGameData = await calcGameData(gameData);

      gameData = nextGameData;
      res.status(200).json(nextGameData);

      return;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
  }
};

export default gameDataHandler;
