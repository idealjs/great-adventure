import { PrismaClient } from "@prisma/client/gameData";
import differenceWith from "lodash.differencewith";
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
          journeys: true,
          adventurers: {
            include: {
              equipments: {
                include: {
                  buff: true,
                },
              },
            },
          },
          enemies: true,
        },
      });

      if (gameData) {
        const { journeys, adventurers, enemies, ...nextGameData } =
          await calcGameData(gameData);
        const journeysDeletion = differenceWith(gameData.journeys, journeys);

        const { lastComputedTimestamp, ...data } = await prisma.gameData.update(
          {
            where: {
              id: nextGameData.id,
            },
            data: {
              ...nextGameData,
              journeys: {
                connectOrCreate: journeys.map((journey) => {
                  return {
                    where: {
                      id: journey.id,
                    },
                    create: journey,
                  };
                }),
                update: journeys.map((journey) => {
                  return {
                    where: {
                      id: journey.id,
                    },
                    data: journey,
                  };
                }),
                delete: journeysDeletion.map((d) => {
                  return {
                    id: d.id,
                  };
                }),
              },
              adventurers: {
                update: adventurers.map((adventurer) => {
                  return {
                    where: {
                      id: adventurer.id,
                    },
                    data: adventurer,
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
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
  }
};

export default gameDataHandler;
