import { NextApiRequest, NextApiResponse } from "next";

export interface IGameData {
  pointId: string;
}

const gameDataHandler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    data: {
      pointId: "1",
    },
  });
};

export default gameDataHandler;
