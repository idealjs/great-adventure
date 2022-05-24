import {
  GameData,
  Journey,
  PrismaClient,
  TravelRoute,
} from "@prisma/client/gameData";
import differenceWith from "lodash.differencewith";
import { NextApiRequest, NextApiResponse } from "next";

import gamePlay, { IGameData } from "../../../lib/gamePlay";

const prisma = new PrismaClient();

const calcGameData = async (
  gameData: GameData & {
    journeys: Journey[];
  }
) => {
  const currentTimestamp = new Date();
  let nextGameData = gameData;
  return new Promise<
    GameData & {
      journeys: Journey[];
    }
  >((resolve) => {
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
          journeys: true,
        },
      });

      if (gameData) {
        const { journeys, ...nextGameData } = await calcGameData(gameData);
        const deletion = differenceWith(gameData.journeys, journeys);
        const { lastComputedTimestamp, ...data } = await prisma.gameData.update(
          {
            where: {
              id: nextGameData.id,
            },
            data: {
              ...nextGameData,
              journeys: {
                connectOrCreate: journeys.map(({ gameDataId, ...journey }) => {
                  return {
                    where: {
                      id: journey.id,
                    },
                    create: journey,
                  };
                }),
                update: journeys.map(({ gameDataId, ...journey }) => {
                  return {
                    where: {
                      id: journey.id,
                    },
                    data: journey,
                  };
                }),
                delete: deletion.map((d) => {
                  return {
                    id: d.id,
                  };
                }),
              },
            },
            include: {
              journeys: true,
            },
          }
        );
        res.json({
          data,
        });
      }
      res.status(404);
      return;
    case "PATCH": {
      const { journeys, ...nextGameData } = body;
      const gameData = await prisma.gameData.findUnique({
        where: {
          userId: "1",
        },
        include: {
          journeys: true,
        },
      });
      if (gameData) {
        const deletion = differenceWith(gameData.journeys, journeys);

        res.json({
          data: await prisma.gameData.update({
            where: {
              id: body.id,
            },
            data: {
              ...nextGameData,
              lastComputedTimestamp: new Date(),
              journeys: {
                connectOrCreate: body.journeys.map((journey: Journey) => {
                  return {
                    where: {
                      id: journey.id,
                    },
                    create: journey,
                  };
                }),
                delete: deletion.map((d) => {
                  return {
                    id: d.id,
                  };
                }),
              },
            },
          }),
        });
      }

      return;
    }
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
  }
};

export default gameDataHandler;
