import { PrismaClient, TravelRoute } from "@prisma/client/gameData";
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
  const { query, body, method } = req;

  switch (method) {
    case "GET":
      const gameData = await prisma.gameData.findUnique({
        where: {
          userId: "1",
        },
        include: {
          travelRoutes: true,
        },
      });

      if (gameData) {
        const { travelRoutes, ...nextGameData } = await calcGameData(gameData);

        res.json({
          data: await prisma.gameData.update({
            where: {
              id: nextGameData.id,
            },
            data: {
              ...nextGameData,
              travelRoutes: {
                set: travelRoutes.map((route: TravelRoute) => ({
                  id: route.id,
                })),
              },
            },
          }),
        });
      }
      res.status(404);
      return;
    case "PATCH": {
      const { travelRoutes, ...nextGameData } = body;
      res.json({
        data: await prisma.gameData.update({
          where: {
            id: body.id,
          },
          data: {
            ...nextGameData,
            lastComputedTimestamp: new Date(),
            travelRoutes: {
              set: body.travelRoutes.map((route: TravelRoute) => ({
                id: route.id,
              })),
            },
          },
        }),
      });
      return;
    }
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
  }
};

export default gameDataHandler;
