import { PrismaClient } from "@prisma/client/gameData";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const adventurersHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { body, method } = req;

  switch (method) {
    case "PATCH": {
      const { userId } = body;

      res.json(
        await prisma.gameData.update({
          where: { userId },
          data: { helpWanted: true },
        })
      );

      break;
    }
    default:
      res.setHeader("Allow", ["PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
  }
};

export default adventurersHandler;
