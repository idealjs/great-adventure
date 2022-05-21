import { PrismaClient } from "@prisma/client/gameData";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const travelRouteshandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { from },
    body,
    method,
  } = req;

  switch (method) {
    case "GET": {
      res.json({
        data: await prisma.travelRoute.findMany({
          where: {
            from: {
              in: from,
            },
          },
        }),
      });
      return;
    }
    case "POST": {
      if (typeof body !== "object") {
        res.status(400).json({});
        return;
      }

      if (body.from === null || body.to === null || body.distance === null) {
        res.status(400).json({});
        return;
      }

      res.json({
        data: await prisma.travelRoute.create({
          data: {
            from: body.from,
            to: body.to,
            distance: body.distance,
            Place: {
              connect: {
                id: body.from,
              },
            },
          },
        }),
      });

      return;
    }

    default:
      break;
  }
};

export default travelRouteshandler;
