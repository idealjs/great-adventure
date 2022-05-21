import { PrismaClient } from "@prisma/client/gameData";
import { NextApiRequest, NextApiResponse } from "next";

import gamePlay, { IGameData } from "../../../lib/gamePlay";

const prisma = new PrismaClient();

const calcGameData = async (gameData: IGameData) => {
  const currentTimestamp = new Date();
  let nextGameData = gameData;
  return new Promise<IGameData>((resolve) => {
    for (
      let index = 0;
      index <
      (currentTimestamp.getTime() - gameData.lastComputedTimestamp.getTime()) /
        1000;
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
      let gameData = await prisma.gameData.findUnique({
        where: {
          userId: "1",
        },
        include: {
          travelRoutes: true,
        },
      });

      if (gameData) {
        const nextGameData = await calcGameData(gameData);
        gameData = nextGameData;
        res.json({
          data: nextGameData,
        });
      }

      res.status(404);
      return;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
  }
};

export default gameDataHandler;
