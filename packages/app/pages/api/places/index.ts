import { PrismaClient } from "@prisma/client/gameData";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const placesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { placeId },
    body,
    method,
  } = req;

  switch (method) {
    case "GET": {
      res.json({
        data: await prisma.place.findMany({
          where: {
            id: {
              in: placeId,
            },
          },
          include: {
            travelRoutes: true,
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
      if (body.name === null) {
        res.status(400).json({});
        return;
      }
      res.json({
        data: await prisma.place.create({
          data: body,
        }),
      });
      return;
    }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
  }
};

export default placesHandler;
