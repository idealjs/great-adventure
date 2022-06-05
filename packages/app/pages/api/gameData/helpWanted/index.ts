import { PrismaClient } from "@prisma/client/gameData";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  switch (method) {
    case "POST":
      const { userId } = body as { userId: string };

      res.json({
        data: await prisma.gameData.update({
          where: {
            userId: userId,
          },
          data: {
            helpWanted: true,
          },
        }),
      });
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
  }
};

export default handler;
