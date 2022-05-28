import { Journey, PrismaClient } from "@prisma/client/gameData";
import differenceWith from "lodash.differencewith";
import { NextApiRequest, NextApiResponse } from "next";

import { IGameData } from "../../../../lib/gamePlay";

const prisma = new PrismaClient();

const journeysHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  switch (method) {
    case "PATCH": {
      const { journeys, ...nextGameData } = body as IGameData;
      const gameData = await prisma.gameData.findUnique({
        where: {
          userId: body.userId,
        },
        include: {
          journeys: true,
        },
      });

      if (journeys.length === 0 || gameData?.journeys.length === 0) {
        if (gameData) {
          const deletion = differenceWith(
            gameData.journeys,
            journeys,
            (a, b) => {
              return a.from === b.from && a.to === b.to;
            }
          );

          res.json({
            data: await prisma.gameData.update({
              where: {
                userId: body.userId,
              },
              data: {
                ...nextGameData,
                lastComputedTimestamp: new Date(),
                journeys: {
                  create: journeys,
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
      }

      return;
    }
    default:
      res.setHeader("Allow", ["PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
  }
};

export default journeysHandler;
